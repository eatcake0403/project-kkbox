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
      playing: false
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
    play () {
      if (this.playing) return
      this.playing = true
      this.$refs.AudioComponent.buttonStartPlay()
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
</style>
