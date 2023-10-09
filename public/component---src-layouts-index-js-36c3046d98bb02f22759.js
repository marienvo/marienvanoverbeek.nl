if ("caches" in window) {
  // Clear all caches
  caches.keys().then((cacheNames) => {
    Promise.all(
      cacheNames.map((cacheName) => {
        return caches.delete(cacheName);
      }),
    )
      .then(() => {
        // Unregister all service workers
        return navigator.serviceWorker.getRegistrations();
      })
      .then((registrations) => {
        Promise.all(
          registrations.map((registration) => {
            return registration.unregister();
          }),
        ).then(() => {
          // Reload page once both caches and service workers are cleared
          location.reload();
        });
      });
  });
}
