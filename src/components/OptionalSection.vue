<template>
  <div class="section-wrapper">
    <h2>Дополнительные опции</h2>
    <OptionalItem
      v-for="item in blueprintStore.blueprint.optional.entries"
      :point="item"
      :key="item"
      @handle-price="handlePrice"
      @handle-count="handleCount"
    />
    <PriceSummary
      :end-price="blueprintStore.blueprint.optional.endPrice"
      :work-time="blueprintStore.blueprint.optional.workTime"
    />
  </div>
</template>

<script setup>
import { useBlueprintStore } from "@/stores/blueprint";
import OptionalItem from "@/components/OptionalItem.vue";
import PriceSummary from "@/components/PriceSummary.vue";
import { watch } from "vue";

const blueprintStore = useBlueprintStore();
const point = blueprintStore.blueprint.optional;

watch(point, () => {
  blueprintStore.setSectionProps("optional");
});

const handlePrice = (id, value) => {
  point.entries = point.entries.map((item) => {
    if (item.id === id) {
      item.hourPrice = value;
      item.endPrice = item.hourPrice * item.workTime;
    }
    return item;
  });
};

const handleCount = (id, value) => {
  point.entries = point.entries.map((item) => {
    if (item.id === id) {
      item.workTime = value;
      item.endPrice = item.hourPrice * item.workTime;
    }
    return item;
  });
};
</script>

<style scoped>
.section-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 10px;
}
</style>
