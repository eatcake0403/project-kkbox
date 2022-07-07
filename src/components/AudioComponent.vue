<template>
  <div :class="$style.root">
    <audio
      ref="audio"
      preload="auto"
      :class="$style.dn"
      :src="theUrl"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
      @pause="audioParams.playing = false"
      @ended="onEnded"
    />
    <el-slider
      v-model="sliderTime"
      :format-tooltip="formatProcess"
      :class="$style.slider"
      :max="audioParams.maxTime"
      @change="changeCurrentTime"
    />
    <div :class="$style.time">
      <div>
        {{ formatProcess(audioParams.currentTime) }}
        <span :class="$style.speed">
          {{ 'x ' + speeds[audioParams.speedIndex] }}
        </span>
      </div>
      <p>{{ formatProcess(audioParams.maxTime) }}</p>
    </div>
    <div :class="$style.playandsound">
      <div>
        <el-button
          @click="buttonStartPlay"
          :class="$style.button"
          circle
        >
          <img
            :src="require(`@/assets/icon/${ audioParams.playing ? 'pause' : 'play' }.svg`)"
          />
        </el-button>
        <el-button
          :class="$style.button"
          circle
          @click="changeSpeed"
        >
          <img
            src="@/assets/icon/speed.svg"
          />
        </el-button>
      </div>
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
    }
  },
  data () {
    return {
      audioParams: {
        currentTime: 0,
        maxTime: 0,
        playing: false,
        muted: false,
        speedIndex: 3
      },
      sliderTime: 0,
      volume: 100,
      speeds: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
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
      this.$emit('loadedmetadata')
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
    },
    changeSpeed () {
      const speeds = this.speeds
      const index = this.audioParams.speedIndex + 1
      this.audioParams.speedIndex = (index >= speeds.length) ? 0 : index
      this.$refs.audio.playbackRate = speeds[this.audioParams.speedIndex]
    },
    onEnded () {
      this.$emit('ended')
    }
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
  font-size: 16px;
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

.speed {
  margin-top: 10px;
  font-size: 12px;
}
</style>
