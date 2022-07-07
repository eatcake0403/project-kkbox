<template>
  <div :class="$style.root" v-if="theUrl">
    <audio
      ref="audio"
      preload="auto"
      :class="$style.dn"
      :src="theUrl"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
    />
    <el-slider
      v-model="sliderTime"
      :format-tooltip="formatProcess"
      @change="changeCurrentTime"
      :class="$style.slider"
    />
    <div :class="$style.time">
      <p>{{ formatProcess() }}</p>
      <p>{{ audioParams.maxTime }}</p>
    </div>
    <el-button
      @click="buttonStartPlay"
      :class="$style.button"
      circle
    >
      <img
        :src="require(`@/assets/icon/${ audioParams.playing ? 'pause' : 'play' }.svg`)"
      />
    </el-button>
      <!-- <el-button
        type="text"
        @click="changeSpeed"
      >
        {{ audio.speed | transSpeed }}
      </el-button> -->
      <!-- <el-tag
        type="info">
        {{ audio.currentTime | formatSecond }}
      </el-tag> -->
      <!-- <el-tag type="info">
        {{ audio.maxTime | formatSecond }}
      </el-tag> -->
      <!-- <el-button
        type="text"
        @click="startMutedOrNot"
      >
        {{ audio.muted | transMutedOrNot }}
      </el-button> -->
      <!-- <el-slider
        v-model="volume"
        :format-tooltip="formatVolumeToolTip"
        @change="changeVolume"
        class="slider"
      /> -->
  </div>
</template>

<script>
import { realFormatSecond, numToFixed } from '@/mixins'
export default {
  name: 'AudioComponent',
  props: {
    theUrl: {
      type: String,
      required: true
    },
    theSpeeds: {
      type: Array,
      default () {
        return [1, 1.5, 2]
      }
    }
  },
  data () {
    return {
      audioParams: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speed: 1
      },
      sliderTime: 0,
      volume: 100,
      speeds: this.theSpeeds
    }
  },
  methods: {
    // 音檔的秒數
    onLoadedmetadata (res) {
      this.audioParams.maxTime = numToFixed(res.target.duration, 4)
    },
    // 每秒會觸發的 callback
    onTimeupdate (res) {
      this.audioParams.currentTime = res.target.currentTime
      this.sliderTime = numToFixed((this.audioParams.currentTime / this.audioParams.maxTime * 100), 4)
    },
    buttonStartPlay () {
      this.audioParams.playing = !this.audioParams.playing
      if (this.audioParams.playing) {
        this.$refs.audio.play()
      } else {
        this.$refs.audio.pause()
      }
    },
    // 進度條快轉
    changeCurrentTime (index) {
      this.$refs.audio.currentTime = numToFixed((index / 100 * this.audioParams.maxTime), 4)
    },
    // 目前秒數
    formatProcess (index = 0) {
      console.log(index)
      index = numToFixed((this.audioParams.maxTime / 100 * index), 0)
      return realFormatSecond(index)
    }
    // changeSpeed () {
    //   const index = this.speeds.indexOf(this.audio.speed) + 1
    //   this.audio.speed = this.speeds[index % this.speeds.length]
    //   this.$refs.audio.playbackRate = this.audio.speed
    // },
    // startMutedOrNot () {
    //   this.$refs.audio.muted = !this.$refs.audio.muted
    //   this.audio.muted = this.$refs.audio.muted
    // },
    // // 音量条toolTip
    // formatVolumeToolTip (index) {
    //   return '音量条: ' + index
    // },
    // // 音量改变
    // changeVolume (index = 0) {
    //   this.$refs.audio.volume = index / 100
    //   this.volume = index
    // },
    // // 当音频暂停
    // onPause () {
    //   this.audio.playing = false
    // },
    // // 当发生错误, 就出现loading状态
    // onError () {
    //   this.audio.waiting = true
    // },
    // // 当音频开始等待
    // onWaiting (res) {
    //   console.log(res)
    // },
  }
}
</script>

<style lang="scss" module>
.root {
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background: #204e7882;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.time {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}

.slider {
  width: 100%;
  margin: 0 auto;
  :global(.el-slider__button) {
    border-color: rgba(84, 111, 136, 1);
  }
  :global(.el-slider__bar) {
    background: rgba(84, 111, 136, 1);
  }
}

.dn {
  display: none;
}
</style>
