<template>
  <div class="option-wrapper" @click="props.handleClick">
    <div class="option-wrapper option-item">
      <a-checkbox
        @click.stop
        @change="checkAll(point.id, $event.target.checked)"
        :checked="point.defaultIn"
        :indeterminate="indeterminate"
      />
      <h3>{{ props.point.title }}</h3>
    </div>
    <div class="option-wrapper">
      <input disabled type="number" :value="point.workTime" placeholder="Часы" />
      <input disabled type="number" :value="point.endPrice" placeholder="Цена" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useBlueprintStore } from "@/stores/blueprint";

const blueprintStore = useBlueprintStore();

const props = defineProps({
  handleClick: {
    type: Function,
    required: false
  },
  point: {
    id: Number,
    title: String,
    defaultIn: Boolean,
    workTime: {
      type: Number,
      required: false
    },
    endPrice: {
      type: Number,
      required: false
    }
  }
});

const indeterminate = computed(() => {
  let tmp = new Set();

  for (const child of props.point.children.values()) {
    tmp.add(child.defaultIn);
  }

  return tmp.size !== 1;
});

const checkAll = (blockId, value) => {
  blueprintStore.checkBlock("default", blockId, value);
};
</script>

<style scoped>
.option-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.option-item > h3 {
  margin: 0;
}

input {
  padding: 3px;
  margin-left: 10px;
  border-radius: 10px;
}
</style>
