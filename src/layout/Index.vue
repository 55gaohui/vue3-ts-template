<!-- 布局 -->
<template>
  <div>
    <router-view v-slot="{ Component }">
      <!-- <transition name="fade" mode="out-in"> -->
      <component :is="Component" />
      <!-- </transition> -->
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>
<style scope lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
</style>
