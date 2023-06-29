<template>
  <transition name="error">
    <div v-if="appStore.error !== null" class="error">
      {{ appStore.error }}
    </div>
  </transition>
</template>

<script setup>
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
</script>

<style scoped>
.error {
  width: 20%;
  height: 80px;
  padding: 10px;
  position: fixed;
  top: 10px;
  left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e10606;
  border-radius: 10px;
}

.error-enter-active,
.error-leave-active {
  transition: transform 0.5s ease-in-out;
}

.error-enter-from,
.error-leave-to {
  transform: translate(-400px);
}

.error-enter-to,
.error-leave-from {
  transform: translate(0px);
}
</style>
