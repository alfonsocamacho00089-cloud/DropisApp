importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCaUyhX2iBMl4A5xeKeu_4SeE6HClp4V1s",
  authDomain: "real-market-elite-2025.firebaseapp.com",
  projectId: "real-market-elite-2025",
  storageBucket: "real-market-elite-2025.appspot.com",
  messagingSenderId: "226489002778",
  appId: "1:226489002778:web:6722d21a9e78b33b5b1aa3"
});

const messaging = firebase.messaging();



  // En tu archivo firebase-messaging-sw.js
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "DropisShop";

  const notificationOptions = {
    body: payload.notification?.body,
    // Icono lateral (a color, transparente, 'maskable' en el manifest)
    icon: '/logo.png',
    // Badge de la barra de estado (blanco y transparente, cuadrado perfecto)
    badge: '/badge.png', 

    // AQUÍ ESTÁ EL TRUCO DEL TAMAÑO:
    // Si envías una imagen cuadrada, Android la hará circular y pequeña como en tus ejemplos.
    image: payload.data?.image_perfil || '/logo_cuadrado_perfil.png',

    vibrate: [200, 100, 200],
    tag: 'update-notification',
    renotify: true
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
