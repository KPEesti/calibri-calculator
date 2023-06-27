<template>
  <div class="section-wrapper">
    <div>
      <h2>Дополнительные опции</h2>
    </div>
    <OptionalItem
      v-for="item in blueprintStore.blueprint.optional.entries.values()"
      :point="item"
      :key="item.id"
    />
    <div class="footer">
      <div class="select">
        <a-select
          :value="selected"
          placeholder="Добавить опцию"
          style="width: 200px"
          :options="options"
          show-search
          :filter-option="filterOption"
          @select="handleSelect"
        >
        </a-select>
      </div>
      <PriceSummary
        :end-price="blueprintStore.blueprint.optional.endPrice"
        :work-time="blueprintStore.blueprint.optional.workTime"
      />
    </div>
  </div>
</template>

<script setup>
import { useBlueprintStore } from "@/stores/blueprint";
import OptionalItem from "@/components/OptionalItem.vue";
import PriceSummary from "@/components/PriceSummary.vue";
import { computed, ref } from "vue";

const blueprintStore = useBlueprintStore();

const filterOption = (input, option) => {
  return option.label.toUpperCase().indexOf(input.toUpperCase()) >= 0;
};
const handleSelect = (value, option) => {
  console.log(value, option);
  blueprintStore
    .fetchOptionById(value)
    .then(() => blueprintStore.setSectionProps("optional"))
    .catch((reason) => console.log(reason));
};

const options = computed(() =>
  blueprintStore.options.map((option) => ({
    value: option.id,
    label: option.title
  }))
);
const selected = ref(null);
</script>

<style scoped>
.section-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  padding: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media print {
  .footer > .select {
    opacity: 0;
  }
}
</style>
