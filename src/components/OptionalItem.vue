<template>
  <div class="option-wrapper">
    <div class="option-wrapper option-item">
      <h3>{{ props.point.title }}</h3>
    </div>
    <div class="option-wrapper">
      <input
        type="number"
        step="50"
        min="0"
        :value="point.hourPrice"
        placeholder="Цена"
        @click.stop
        @change="setPrice(point.id, parseInt($event.target.value))"
      />
      <input
        type="number"
        :value="point.workTime"
        min="0"
        placeholder="Часы"
        @click.stop
        @change="setWorkTime(point.id, parseInt($event.target.value))"
      />
      <input disabled type="number" :value="point.endPrice" placeholder="Цена" @click.stop />
      <img
        src="/trash.svg"
        width="30"
        alt=""
        style="cursor: pointer"
        @click="deleteOption(point.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { useBlueprintStore } from "@/stores/blueprint";

const blueprintStore = useBlueprintStore();
const props = defineProps({
  point: {
    id: Number,
    title: String,
    workTime: {
      type: Number,
      required: false
    },
    hourPrice: {
      type: Number,
      required: false
    },
    endPrice: {
      type: Number,
      required: false
    }
  }
});

const setWorkTime = (id, value) => {
  if (Number.isNaN(value) || value <= 0) {
    blueprintStore.setOptionalBlockField(id, { workTime: 0 });
  } else {
    blueprintStore.setOptionalBlockField(id, { workTime: parseInt(value) });
  }
};
const setPrice = (id, value) => {
  if (Number.isNaN(value) || value <= 0) {
    blueprintStore.setOptionalBlockField(id, { hourPrice: 0 });
  } else {
    blueprintStore.setOptionalBlockField(id, { hourPrice: parseInt(value) });
  }
};
const deleteOption = (id) => {
  blueprintStore.deleteOptionById(id);
};
</script>

<style scoped>
.option-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.option-item > h2 {
  margin: 0;
}

input {
  padding: 3px;
  margin-left: 10px;
  border-radius: 10px;
  width: 100px;
}

@media print {
  img {
    display: none !important;
  }

  input {
    border: none;
    border-bottom: 1px dashed #cccccc;
    border-radius: 0;
  }
}
</style>
