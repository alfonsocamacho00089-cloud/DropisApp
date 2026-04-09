importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCaUyhX2iBMl4A5xeKeu_4SeE6HClp4V1s",
  authDomain: "real-market-elite-2025.firebaseapp.com",
  projectId: "real-market-elite-2025",
  messagingSenderId: "226489002778",
  appId: "1:226489002778:web:6722d21a9e78b33b5b1aa3"
});

const messaging = firebase.messaging();

// Manejo en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('[sw.js] Mensaje recibido:', payload);

  const notificationTitle = payload.notification?.title || "DropisChat";
  const notificationOptions = {
    body: payload.notification?.body || "Tienes un nuevo mensaje",
    icon: '/logo.png', // Asegúrate de que esta ruta sea válida
    badge: '/badge.png',
    tag: 'new-message',
    renotify: true
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
