import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      appLoading: true,
      error: null
    };
  },
  actions: {
    setAppStatus(value) {
      this.appLoading = value;
    },
    setError(error) {
      this.error = error;
    }
  }
});
