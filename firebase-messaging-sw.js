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
  // Extraemos la información del payload que viene de Firebase
  const notificationTitle = payload.notification.title || "TuPropina"; 
  
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png', 
    badge: '/badge.png',
    // ESTA LÍNEA ES LA QUE FALTA:
    image: payload.notification.image || payload.data.image || '/logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
