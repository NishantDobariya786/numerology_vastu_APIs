function mountCriticalErrorHandlers() {
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });
}

export { mountCriticalErrorHandlers };
