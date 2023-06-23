<template>
  <div class="view-wrapper">
    <h2>Интернет Магазин</h2>
    <div v-if="!appStore.appLoading">
      <LogicalSection />
      <OptionalSection />
      <PriceSummary
        :end-price="blueprintStore.getEndPrice"
        :work-time="blueprintStore.getEndWorkTime"
      />
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
Promise.all([blueprintStore.fetchBlueprint("shopForm"), blueprintStore.fetchOptions()]).finally(
  () => appStore.setAppStatus(false)
);
</script>

<style scoped>
.view-wrapper {
  width: 70%;
  margin: auto;
  padding: 10px;
}
</style>
