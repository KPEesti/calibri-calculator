<template>
  <div v-if="primary" class="summary">
    <p class="summary-item">
      Итоговое время: <span>{{ workTime }} {{ declOfHour }}</span>
    </p>
    <p class="summary-item">
      Итоговая цена: <span>{{ endPrice }} &#8381;</span>
    </p>
  </div>
  <div v-else class="summary">
    <p class="summary-item">
      Суммарное время: <span>{{ workTime }} {{ declOfHour }}</span>
    </p>
    <p class="summary-item">
      Суммарная цена: <span>{{ endPrice }} &#8381;</span>
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  workTime: Number,
  endPrice: Number,
  primary: {
    type: Boolean,
    default: false
  }
});

const declOfHour = computed(() => {
  // const hours = Math.floor(props.workTime);
  const titles = ["час", "часа", "часов"];
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[
    props.workTime % 100 > 4 && props.workTime % 100 < 20
      ? 2
      : cases[props.workTime % 10 < 5 ? props.workTime % 10 : 5]
  ];
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
