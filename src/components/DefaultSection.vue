<template>
  <div class="section-wrapper">
    <h2>Стандартные опции</h2>
    <OptionsBlock
      v-for="id in blueprintStore.blueprint.default.entries.keys()"
      :id="id"
      :key="id"
    />
    <PriceSummary
      :end-price="blueprintStore.blueprint.default.endPrice"
      :work-time="blueprintStore.blueprint.default.workTime"
    />
  </div>
</template>

<script setup>
import OptionsBlock from "@/components/DefaultBlock.vue";
import { useBlueprintStore } from "@/stores/blueprint";
import { watch } from "vue";
import PriceSummary from "@/components/PriceSummary.vue";

const blueprintStore = useBlueprintStore();

watch(blueprintStore.blueprint.default, () => {
  blueprintStore.setSectionProps("default");
});
</script>

<style scoped>
.section-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
