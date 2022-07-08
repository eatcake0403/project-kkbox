<template>
  <div
    v-if="podcastData"
  >
    <Catalog
      :catalogData="{ item: podcastData.items[index], index: index }"
      :catalog="true"
    >
      <template #bottom>
        <el-button
          round
          type="primary"
          @click="play"
          :disabled="playing"
          :class="$style.btn"
          id="playerBtn"
        >
          開始播放
        </el-button>
      </template>
    </Catalog>
    <AudioComponent
      v-show="playing"
      :class="$style.audioCSS"
      :theUrl="podcastData.items[index].enclosure.url"
      ref="AudioComponent"
      @ended="onEnded"
      @loadedmetadata="onLoadedmetadata"
    />
  </div>
</template>

<script>
import { Catalog, AudioComponent } from '@/components'
import { mapState } from 'vuex'
export default {
  props: {
    // router
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      playing: false,
      autoPlay: false
    }
  },
  components: {
    Catalog,
    AudioComponent
  },
  computed: {
    ...mapState(['podcastData'])
  },
  methods: {
    onLoadedmetadata () {
      if (!this.autoPlay) return
      this.$refs.AudioComponent.buttonStartPlay()
    },
    play () {
      if (this.playing) return
      this.playing = true
      this.$refs.AudioComponent.buttonStartPlay()
    },
    onEnded () {
      const length = this.podcastData.items.length
      if (length === (this.index + 1)) return
      this.autoPlay = true
      this.$router.push({ name: 'Episode', params: { index: this.index + 1 } })
    }
  }
}
</script>

<style lang="scss" module>
.audioCSS {
  position: fixed;
  bottom: 0;
  left: 0;
}

.btn {
  margin-top: 20px;
}
</style>
