<template>
  <div :class="$style.root" v-if="data">
    <el-card :class="$style.card">
      <div :class="$style.innercard">
        <img :src="data.image.url" :class="$style.img"/>
        <div :class="$style.discription">
          <p>{{ data.title }}</p>
          <p>{{ data.itunes.author }}</p>
        </div>
      </div>
    </el-card>
    <el-card
      :class="$style.card"
    >
      <div :class="$style.innercard">
        <img :src="data.items[0].itunes.image" :class="$style.img"/>
        <div :class="$style.discription">
          <p>{{ data.items[0].title }}</p>
          <p v-html="data.items[0].content"></p>
        </div>
        <AudioComponent
          :class="$style.audioCSS"
          :theUrl="data.items[0].enclosure.url"
          :type="data.items[0].enclosure.type"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { AudioComponent } from '@/components'
import { mapState } from 'vuex'
export default {
  components: {
    AudioComponent
  },
  computed: {
    ...mapState(['data'])
  }
}
</script>

<style lang="scss" module>
.root {
  width: 100%;
}

.card {
  height: 500px;
}

.img {
  width: 300px;
  height: 300px;
  object-fit: contain;
}

.innercard {
  display: flex;
}

.audioCSS {
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>
