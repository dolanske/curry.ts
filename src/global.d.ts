interface IdleDetector {
  addEventListener(type: "change", listener: (this: IdleDetector, ev: { userState: "active" | "idle", screenState: "locked" | "unlocked" }) => unknown, options?: boolean | AddEventListenerOptions): void;
  start(options: { threshold: number, signal: AbortSignal }): Promise<void>;
  screenState: "locked" | "unlocked";
  userState: "active" | "idle";
}

declare const IdleDetector: {
  new(): IdleDetector;
  requestPermission(): Promise<"granted" | "denied">;
};