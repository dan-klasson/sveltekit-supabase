import { writable } from "svelte/store";

type AlertType = "info" | "success" | "error";

export interface Alert {
  type: AlertType;
  message: string;
}

export const alerts = writable<Alert[]>([]);

export interface User {
  email?: string;
}
export const user = writable<User | false>(false);
