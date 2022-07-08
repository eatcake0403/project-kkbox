<template>
  <div :class="[$style.root, { [$style.close]: collapse }]" id="AudioComponent">
    <audio
      id="audioId"
      ref="audio"
      preload="auto"
      :class="$style.dn"
      :src="theUrl"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
      @pause="audioParams.playing = false"
      @ended="onEnded"
      @error="onError"
    />
    <div :class="$style.btncollapse">
      <img
        :src="require(`@/assets/icon/${ collapse ? 'collapseup' : 'collapsedown' }.svg`)"
        @click="collapse = !collapse"
        :class="$style.cursorpointer"
      >
    </div>
    <el-slider
      v-model="sliderTime"
      :format-tooltip="formatProcess"
      :class="[$style.slider, $style.none]"
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
      <div :class="$style.btns">
        <div>
          <el-button
            :class="$style.button"
            circle
            @click="changeSpeed(false)"
          >
            <img
              src="@/assets/icon/speed.svg"
            />
          </el-button>
        </div>
        <div>
          <el-button
            @click="$emit('changeSound', 'previous')"
            :class="$style.button"
            circle
          >
            <img
              src="@/assets/icon/previous.svg"
            />
          </el-button>
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
            @click="$emit('changeSound', 'next')"
            :class="$style.button"
            circle
          >
            <img
              src="@/assets/icon/next.svg"
            />
          </el-button>
        </div>
        <div>
          <el-button
            :class="$style.button"
            round
            @click="$emit('episodeAssign', 'new')"
          >
            最新一集
          </el-button>
          <el-button
            :class="$style.button"
            round
            @click="$emit('episodeAssign', 'old')"
          >
            最舊一集
          </el-button>
        </div>
      </div>
      <div :class="$style.sound">
        <el-slider
          v-model="volume"
          :format-tooltip="formatVolumeToolTip"
          :class="$style.slider"
        />
        <img
          @click="startMutedOrNot"
          :class="$style.cursorpointer"
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
      volume: 50,
      speeds: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      collapse: false
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
    changeSpeed (changeSound) {
      const speeds = this.speeds
      if (!changeSound) {
        const index = this.audioParams.speedIndex + 1
        this.audioParams.speedIndex = (index >= speeds.length) ? 0 : index
      }
      this.$refs.audio.playbackRate = speeds[this.audioParams.speedIndex]
    },
    onEnded () {
      this.$emit('ended')
    },
    onError () {
      this.$notify({
        type: 'error',
        title: 'oops! 檔案發生錯誤',
        position: 'bottom-left'
      })
    }
  }
}
</script>

<style lang="scss" module>
@import 'src/SCSS/index.scss';

.root {
  border-radius: 35px 35px 0 0;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  background: $primary-alpha;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.close {
    justify-content: flex-start;
    height: 50px;
    width: 100px;
    overflow: hidden;
  }
}

.cursorpointer {
  cursor: pointer;
}

.btncollapse {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 30px;
}

.time {
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: $white;
  font-weight: bold;
  font-size: $time-size;
}

.slider {
  width: 100%;
  margin: 0 auto;

  :global(.el-slider__button) {
    border-color: $primary;
  }

  :global(.el-slider__bar) {
    background: $primary;
  }
}

.dn {
  display: none;
}

.playandsound {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  .btns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 30px;

    .button {
      margin: 0 10px;
    }
  }

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
  font-size: $date-size;
}
</style>
