<template>
  <div :class="$style.root" v-if="theUrl">
    <audio
      ref="audio"
      preload="auto"
      :class="$style.dn"
      :src="theUrl"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
      @pause="audioParams.playing = false"
    />
    <el-slider
      v-model="sliderTime"
      :format-tooltip="formatProcess"
      :class="$style.slider"
      :max="audioParams.maxTime"
      @change="changeCurrentTime"
    />
    <div :class="$style.time">
      <p>{{ formatProcess(audioParams.currentTime) }}</p>
      <p>{{ formatProcess(audioParams.maxTime) }}</p>
    </div>
    <div :class="$style.playandsound">
      <el-button
        @click="buttonStartPlay"
        :class="$style.button"
        circle
      >
        <img
          :src="require(`@/assets/icon/${ audioParams.playing ? 'pause' : 'play' }.svg`)"
        />
      </el-button>
      <div :class="$style.sound">
        <el-slider
          v-model="volume"
          :format-tooltip="formatVolumeToolTip"
          :class="$style.slider"
        />
        <img
          @click="startMutedOrNot"
          :src="require(`@/assets/icon/${soundIcon}.svg`)"
        />
      </div>
    </div>
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
  computed: {
    soundIcon () {
      if (this.audioParams.muted) return 'muted'
      if (this.volume > 50) return 'sound'
      if (this.volume === 0) return 'soundoff'
      return 'soundsmall'
    }
  },
  methods: {
    // 音檔的秒數
    onLoadedmetadata (res) {
      this.audioParams.maxTime = numToFixed(res.target.duration, 0)
    },
    // 每秒會觸發的 callback
    onTimeupdate (res) {
      // debugger
      this.audioParams.currentTime = numToFixed(res.target.currentTime, 0)
      this.sliderTime = this.audioParams.currentTime
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
      this.$refs.audio.currentTime = numToFixed(index, 0)
    },
    // 目前秒數
    formatProcess (index = 0) {
      index = numToFixed(index, 0)
      return realFormatSecond(index)
    },
    // 音量 & 音量改變
    formatVolumeToolTip (index) {
      this.$refs.audio.volume = index / 100
      this.volume = index
      return '音量: ' + index
    },
    startMutedOrNot () {
      const muted = !this.audioParams.muted
      this.audioParams.muted = muted
      this.$refs.audio.muted = muted
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
    // // 当发生错误, 就出现loading状态
    // onError () {
    //   this.audio.waiting = true
    // }
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

.playandsound {
  width: 100%; //
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  .sound {
    width: 200px;
    display: flex;
    align-items: center;

    .slider {
      margin-right: 25px
    }
  }
}
</style>
