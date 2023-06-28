import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const appLoading = ref(true);
  const error = ref(null);

  function setAppStatus(newStatus) {
    appLoading.value = newStatus;
  }

  function setError(newError) {
    error.value = newError;
  }

  return {
    appLoading,
    error,
    setAppStatus,
    setError
  };
});
