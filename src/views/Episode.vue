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
      @changeSound="changeSound($event)"
      @episodeAssign="episodeAssign($event)"
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
  components: {
    Catalog,
    AudioComponent
  },
  data () {
    return {
      playing: false,
      autoPlay: false
    }
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
      if (this.index <= 0) return
      this.autoPlay = true
      this.$router.push({
        name: 'Episode',
        params: {
          index: (this.index - 1)
        }
      })
    },
    checked (type) {
      const len = this.podcastData.items.length
      // 為最新 沒有下一篇
      if ((type === 'next') && (this.index <= 0)) {
        this.$notify({
          title: '已經是最新的一集了！',
          position: 'bottom-left'
        })
        return false
      }
      // 為最舊 沒有上一篇
      if ((type === 'previous') && (this.index >= len - 1)) {
        this.$notify({
          title: '已經是最舊的一集了！',
          position: 'bottom-left'
        })
        return false
      }
      this.$refs.AudioComponent.audioParams.playing = false
      this.autoPlay = true
      this.$refs.AudioComponent.audioParams.speedIndex = 3
      return true
    },
    changeSound (type) {
      if (!this.checked(type)) return
      this.$router.push({
        name: 'Episode',
        params: {
          index: (type === 'next' ? this.index - 1 : this.index + 1)
        }
      })
    },
    episodeAssign (type) {
      if (!this.checked(type === 'new' ? 'next' : 'previous')) return
      const len = this.podcastData.items.length
      this.$router.push({
        name: 'Episode',
        params: {
          index: (type === 'new' ? 0 : len - 1)
        }
      })
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
  &:global(.el-button) {
    margin-top: 20px;
  }
}
</style>
