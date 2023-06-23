<template>
  <div class="wrapper">
    <div>
      <ParentOptionItem :static="true" :handleClick="handleCollapse" :point="point" />
    </div>
    <transition name="collapse">
      <div v-if="collapsed" class="collapse-block">
        <DefaultItem
          v-for="child of point.children.values()"
          :key="child.id"
          :point="child"
          :parent-id="point.id"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ParentOptionItem from "@/components/ParentDefaultItem.vue";
import { useBlueprintStore } from "@/stores/blueprint";
import DefaultItem from "@/components/DefaultItem.vue";

const collapsed = ref(false);
const handleCollapse = () => {
  collapsed.value = !collapsed.value;
};

const props = defineProps({
  id: Number
});

const blueprintStore = useBlueprintStore();

const point = blueprintStore.blueprint.default.entries.get(props.id);
</script>

<style scoped>
.wrapper {
  border: 1px solid #f5f5f5;
  overflow: hidden;
  height: auto;
}

.collapse-block {
  background-color: #f5f5f5;
}

.collapse-enter-active,
.collapse-leave-active {
  transition: max-height 0.5s ease;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 300px;
}
</style>
