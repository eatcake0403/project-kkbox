<template>
  <RecycleScroller
    :items="podcastData.items"
    :item-size="300"
    key-field="guid"
    v-slot="{ item }"
  >
    <div class="user">
      {{ item.title }}
    </div>
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

<style scoped>
/* @import 'src/SCSS/index.scss'; */
.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
