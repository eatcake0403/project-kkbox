<template>
  <el-card
    :class="[$style.contents, { [$style.catalog]: catalog }]"
    @click.native="$emit('cardEvent', catalogData.index)"
  >
    <div :class="$style.card">
      <div :class="$style.catalogDataImg">
        <img :src="catalogData.item.itunes.image" :class="$style.img"/>
        <slot name="bottom"/>
      </div>
      <div :class="$style.discription">
        <p :class="$style.date">
          {{ catalogData.item.pubDate }}
        </p>
        <p :class="$style.title">
          {{ catalogData.item.title }}
        </p>
        <p
          :class="[$style.content, { [$style.catalog]: catalog }]"
          v-html="!catalog ? catalogData.item.content : catalogData.item['content:encoded']"
        />
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Catalog',
  props: {
    catalogData: {
      type: Object,
      require: true
    },
    catalog: {
      type: Boolean,
      require: false
    }
  }
}
</script>

<style lang="scss" module>
@import 'src/SCSS/index.scss';

.contents {
  height: 200px;
  width: 98%;
  margin: 10px auto;
  cursor: pointer;

  &.catalog {
    height: 97vh;
  }

  &:hover {
    box-shadow: 0 0px 10px 0 rgb(0 0 0 / 30%);
  }

  .card {
    display: flex;
    align-content: center;

    .discription {
      overflow-y: auto;
      height: 93vh;
    }

    .catalogDataImg {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
    }
  }

  .img {
    width: 160px;
    height: 160px;
    object-fit: contain;
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

    &.catalog {
      display: block;
    }
  }
}
</style>
