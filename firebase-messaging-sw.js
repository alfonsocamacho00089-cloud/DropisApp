importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// PEGA AQUÍ TUS MISMOS DATOS DE CONFIGURACIÓN
firebase.initializeApp({
  apiKey: "AIzaSyCaUyhX2iBMl4A5xeKeu_4SeE6HClp4V1s",
  authDomain: "real-market-elite-2025.firebaseapp.com",
  projectId: "real-market-elite-2025",
  storageBucket: "real-market-elite-2025.appspot.com",
  messagingSenderId: "226489002778",
  appId: "1:226489002778:web:6722d21a9e78b33b5b1aa3"
});

const messaging = firebase.messaging();

// Este código muestra la notificación cuando llega
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png' // Si tienes un logo en tu carpeta, pon el nombre aquí
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
