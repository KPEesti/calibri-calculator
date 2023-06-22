<template>
  <div class="option-wrapper" @click="props.handleClick">
    <div class="option-wrapper option-item">
      <a-checkbox
        v-if="checkable"
        @click.stop
        @change="setDefaultIn(point.id, $event.target.checked)"
        :checked="point.defaultIn"
      />
      <h3>{{ props.point.title }}</h3>
    </div>
    <div class="option-wrapper">
      <input
        type="number"
        step="50"
        :disabled="!point.defaultIn"
        :value="point.hourPrice"
        placeholder="Цена"
        @click.stop
        @change="setPrice(point.id, $event.target.value)"
      />
      <input
        type="number"
        :disabled="!point.defaultIn"
        :value="point.workTime"
        placeholder="Часы"
        @click.stop
        @change="setworkTime(point.id, $event.target.value)"
      />
      <input disabled type="number" :value="endPrice" placeholder="Цена" @click.stop />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  handleClick: {
    type: Function,
    required: false
  },
  checkable: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped></style>
