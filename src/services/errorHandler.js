import { useAppStore } from "@/stores/app";

export function handleError(error) {
  const appStore = useAppStore();
  appStore.setError(error);
  setTimeout(() => appStore.setError(null), 2000);
}
