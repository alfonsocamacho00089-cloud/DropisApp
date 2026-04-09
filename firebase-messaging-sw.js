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

messaging.onBackgroundMessage((payload) => {
  console.log('Mensaje recibido en segundo plano:', payload);
  const notificationTitle = payload.notification.title || "TuPropina";
  const notificationOptions = {
    body: payload.notification.body || "Nueva actualización de tasa disponible",
    icon: '/logo.png' 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
