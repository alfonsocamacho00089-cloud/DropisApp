// Función para pintar el QR en pantalla
function mostrarMiQR(idUnico) {
    const contenedor = document.getElementById('contenedor-qr');
    const urlDropis = `dropisapp://perfil/${idUnico}`;
    
    // Usamos la API de Google Charts para generar el QR rápido y fácil
    const qrUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${encodeURIComponent(urlDropis)}&choe=UTF-8`;
    
    contenedor.innerHTML = `
        <div style="text-align:center; background: white; padding: 20px; border-radius: 15px;">
            <img src="${qrUrl}" alt="Mi QR DropisApp" style="width: 100%; max-width: 250px;">
            <p style="color: #333; font-weight: bold; margin-top: 10px;">ID: ${idUnico}</p>
        </div>
    `;
}
