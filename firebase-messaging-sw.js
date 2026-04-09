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

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  
  const notificationTitle = payload.notification?.title || "DropisShop";
  const notificationOptions = {
    body: payload.notification?.body || "Nuevo mensaje",
    icon: './logo.png',
    badge: './placa.png',
    tag: 'mensaje-nuevo', // Esta línea es clave para que no use datos viejos
    renotify: true
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
