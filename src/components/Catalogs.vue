<template>
  <RecycleScroller
    :items="podcastData.items"
    :item-size="220"
    key-field="guid"
    v-slot="{ item }"
  >
    <el-card :class="$style.contents">
      <div :class="$style.card">
        <img :src="item.itunes.image" :class="$style.img"/>
        <div>
          <p :class="$style.date">
            {{ item.pubDate }}
          </p>
          <p :class="$style.title">
            {{ item.title }}
          </p>
          <p :class="$style.content">
            {{ item.content }}
          </p>
        </div>
      </div>
    </el-card>
  </RecycleScroller>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Catalogs',
  components: {
  },
  computed: {
    ...mapState(['podcastData'])
  }
}
</script>

<style lang="scss" module>
@import 'src/SCSS/index.scss';

.contents {
  height: 200px;
  width: 98%;
  margin: 0 auto;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 0px 10px 0 rgb(0 0 0 / 30%);
  }

  .card {
    display: flex;
    align-content: center;
  }

  .img {
    width: 160px;
    height: 160px;
    object-fit: contain;
    margin-right: 10px;
  }

  .date {
    color: $grey-medium;
    font-size: $date-size;
  }

  .title {
    color: $grey;
    font-weight: 500;
    font-size: $author-size;
    margin-top: 10px;
  }

  .content {
    color: $grey;
    font-weight: 300;
    font-size: $text-size;
    margin-top: 10px;
    line-height: 1.6;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
}
</style>
