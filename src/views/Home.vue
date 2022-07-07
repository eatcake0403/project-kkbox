<template>
  <div :class="$style.root">
    <Author/>
    <Catalogs :class="$style.catalogs"/>
  </div>
          <!-- <div :class="$style.innercard">
        <img :src="data.image.url" :class="$style.img"/>
        <div :class="$style.discription">
          <p>{{ data.title }}</p>
          <p>{{ data.itunes.author }}</p>
        </div>
      </div> -->
    <!-- <el-card
      :class="$style.card"
      v-for="(item) in data.items"
      :key="item.guid"
    >
      <div :class="$style.innercard">
        <img :src="item.itunes.image" :class="$style.img"/>
        <div :class="$style.discription">
          <p>{{ item.title }}</p>
          <p v-html="item.content"></p>
        </div>
      </div>
    </el-card> -->
</template>

<script>
import { Author, Catalogs } from '@/components'
export default {
  components: {
    Author,
    Catalogs
  }
}
</script>

<style lang="scss" module>
.root {
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  flex-direction: column;
}

.catalogs  {
  margin-top: 20px;
  flex: 1;
}
</style>
