<template>
  <div class="view-wrapper">
    <h2>Тип сайта &mdash; Интернет Магазин</h2>
    <div v-if="!appStore.appLoading">
      <LogicalSection />
      <OptionalSection />
      <PriceSummary
        :end-price="blueprintStore.getEndPrice"
        :work-time="blueprintStore.getEndWorkTime"
      />
      <button class="print-button" @click="handleClick">Сформировать PDF</button>
    </div>
  </div>
</template>

<script setup>
import { useBlueprintStore } from "@/stores/blueprint";
import { useAppStore } from "@/stores/app";
import LogicalSection from "@/components/DefaultSection.vue";
import OptionalSection from "@/components/OptionalSection.vue";
import PriceSummary from "@/components/PriceSummary.vue";

const blueprintStore = useBlueprintStore();
const appStore = useAppStore();

appStore.setAppStatus(true);
Promise.all([blueprintStore.fetchBlueprint("shopForm"), blueprintStore.fetchOptions()]).then(() =>
  appStore.setAppStatus(false)
);

const handleClick = () => window.print();
</script>

<style scoped>
.view-wrapper {
  width: 70%;
  margin: auto;
  padding: 10px;
}

@media print {
  .view-wrapper {
    width: 100%;
    padding: 0;
  }

  .print-button {
    display: none !important;
  }
}
</style>
