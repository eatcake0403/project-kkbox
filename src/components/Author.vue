<template>
  <div
    v-if="podcastData"
  >
    <div :class="$style.header">
      <el-card>
        <img :src="podcastData.image.url" :class="$style.img"/>
      </el-card>
      <el-card :class="$style.card">
        <p :class="$style.title">
          {{ podcastData.title  }}
        </p>
        <div :class="$style.author">
          {{ podcastData.itunes.author }}
          <span :class="$style.email">
            {{ podcastData.itunes.owner.email }}
          </span>
        </div>
        <p :class="$style.discription" v-html="podcastData.description"/>
        <div :class="$style.hashtags">
          <p
            v-for="(item, i) in podcastData.itunes.categories"
            :key="i + item"
            :class="$style.hashtag"
            v-text="`# ${item}`"
          />
        </div>
        <div :class="$style.btns">
          <el-button
            type="primary"
            round
            icon="el-icon-caret-right"
            @click="toSoundPage('new')"
            id="btnSoundtoNew"
          >
            最新單集
          </el-button>
          <el-button
            type="info"
            round
            icon="el-icon-question"
            @click="toSoundPage('random')"
            id="btnSoundtoRandom"
          >
            隨機播放
          </el-button>
        </div>
        <p
          :class="$style.lastBuildDate"
        >
          {{ `最後更新時間：${podcastData.lastBuildDate}` }}
        </p>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { randomNum } from '@/mixins'
export default {
  name: 'Author',
  computed: {
    ...mapState(['podcastData'])
  },
  methods: {
    toSoundPage (type) {
      if (type === 'random') {
        // randomNum range
        // ex: length = 5
        // range to 0~4
        const length = this.podcastData.items.length
        const random = randomNum(length)
        this.$emit('toSoundPage', random)
      } else {
        this.$emit('toSoundPage', 0)
      }
    }
  }
}
</script>

<style lang="scss" module>
@import 'src/SCSS/index.scss';

.header {
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: minmax(300px, auto);
  column-gap: 20px;

  .img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .card {
    padding: 10px 30px 0 30px;

    .title {
      font-weight: bold;
      font-size: $title-size;
      color: $primary;
      margin-bottom: 20px;
    }

    .author {
      font-weight: 500;
      font-size: $author-size;
      color: $grey;
      margin-bottom: 20px;

      .email {
        color: $grey-medium;
        font-size: $text-size;
      }
    }

    .discription {
      font-size: $text-size;
      color: $black;
    }

    .hashtags {
      margin-top: 20px;

      .hashtag {
        font-size: $text-size;
        color: $grey;
      }
    }

    .btns {
      margin-top: 20px;
    }

    .lastBuildDate {
      margin-top: 20px;
      text-align: right;
      font-size: $text-size;
      color: $grey-light;
    }
  }
}
</style>
