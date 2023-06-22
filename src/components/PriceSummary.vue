<template>
  <div class="summary">
    <p class="summary-item">
      Итоговое время: <span>{{ workTime }}</span>
    </p>
    <p class="summary-item">
      Итоговая цена: <span>{{ endPrice }} &#8381;</span>
    </p>
  </div>
</template>

<script setup>
defineProps({
  workTime: Number,
  endPrice: Number
});
</script>

<style scoped>
.summary {
  margin: 0;
  padding: 10px;
  text-align: end;
}

.summary-item {
  margin: 0;
  font-size: 15px;
}

.summary-item > span {
  font-weight: 700;
}
</style>
