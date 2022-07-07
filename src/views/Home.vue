<template>
  <div :class="$style.root">
    <Author
      @toSoundPage="soundPage($event)"
    />
    <RecycleScroller
      :class="$style.catalogs"
      :items="podcastData.items"
      :item-size="220"
      key-field="guid"
      v-slot="{ item, index }"
    >
      <Catalog
        :catalogData="{ item, index }"
        @cardEvent="soundPage($event)"
      />
    </RecycleScroller>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Author, Catalog } from '@/components'
export default {
  components: {
    Author,
    Catalog
  },
  computed: {
    ...mapState(['podcastData'])
  },
  methods: {
    soundPage (index = 0) {
      this.$router.push({ name: 'Episode', params: { index } })
    }
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
