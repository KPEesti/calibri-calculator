import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => {
    return {
      appLoading: true
    };
  },
  actions: {
    setAppStatus(value) {
      this.appLoading = value;
    }
  }
});
