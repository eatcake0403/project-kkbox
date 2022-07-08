<template>
  <div :class="$style.root">
    <div :class="$style.img"/>
    <el-button @click="$router.push({ name: 'Home' })">
        回首頁
    </el-button>
  </div>
</template>

<script>
</script>

<style lang="scss" module>
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.img {
  width: 350px;
  height: 350px;
  background: url('../../src/assets/icon/404error.svg');
  background-repeat: no-repeat;
  margin-bottom: 20px;
}
</style>
