<template>
  <div class="option-wrapper">
    <div class="option-wrapper option-item">
      <h3>{{ props.point.title }}</h3>
    </div>
    <div class="option-wrapper">
      <input
        type="number"
        step="50"
        :value="point.hourPrice"
        placeholder="Цена"
        @click.stop
        @change="setPrice(point.id, $event.target.value)"
      />
      <input
        type="number"
        :value="point.workTime"
        placeholder="Часы"
        @click.stop
        @change="setWorkTime(point.id, $event.target.value)"
      />
      <input disabled type="number" :value="point.endPrice" placeholder="Цена" @click.stop />
    </div>
  </div>
</template>

<script setup>
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
const emit = defineEmits(["handleCount", "handlePrice"]);

const setWorkTime = (id, value) => {
  emit("handleCount", parseInt(id), parseInt(value));
};
const setPrice = (id, value) => {
  emit("handlePrice", parseInt(id), parseInt(value));
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
}
</style>
