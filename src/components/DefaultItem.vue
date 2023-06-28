<template>
  <div
    class="option-wrapper"
    :class="{ unprintable: !props.point.defaultIn }"
    @click="props.handleClick"
  >
    <div class="option-wrapper option-item">
      <div>
        <a-checkbox
          class="checkbox"
          @click.stop
          @change="setDefaultIn(point.id, $event.target.checked)"
          :checked="point.defaultIn"
        />
      </div>
      <h3>{{ props.point.title }}</h3>
    </div>
    <div class="option-wrapper">
      <input
        type="number"
        step="50"
        min="0"
        :disabled="!point.defaultIn"
        :value="point.hourPrice"
        placeholder="Цена"
        @click.stop
        @change="setPrice(point.id, parseInt($event.target.value))"
      />
      <input
        type="number"
        min="0"
        :disabled="!point.defaultIn"
        :value="point.workTime"
        placeholder="Часы"
        @click.stop
        @change="setWorkTime(point.id, parseInt($event.target.value))"
      />
      <input disabled type="number" :value="endPrice" placeholder="Цена" @click.stop />
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
    hourPrice: {
      type: Number,
      required: false
    }
  },
  parentId: Number
});

const endPrice = computed(() => props.point.workTime * props.point.hourPrice);

const setWorkTime = (id, value) => {
  if (Number.isNaN(value) || value <= 0) {
    blueprintStore.setField("default", props.parentId, id, { workTime: 0 });
  } else {
    blueprintStore.setField("default", props.parentId, id, { workTime: parseInt(value) });
  }
};
const setPrice = (id, value) => {
  if (Number.isNaN(value) || value <= 0) {
    blueprintStore.setField("default", props.parentId, id, { hourPrice: 0 });
  } else {
    blueprintStore.setField("default", props.parentId, id, { hourPrice: parseInt(value) });
  }
};
const setDefaultIn = (id, value) => {
  blueprintStore.setField("default", props.parentId, id, { defaultIn: Boolean(value) });
};
</script>

<style scoped>
.option-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.option-item {
  margin-left: 20px;
}

.option-item > h3 {
  margin: 0;
}

input {
  padding: 3px;
  margin-left: 10px;
  border-radius: 10px;
}

@media print {
  .option-item > div {
    display: none !important;
  }

  .unprintable {
    display: none !important;
  }
}
</style>
