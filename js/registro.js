// Función para generar el ID Único (Hash SHA-256 simplificado)
async function generarDropisID(nombre) {
    const semilla = nombre + Date.now();
    const msgBuffer = new TextEncoder().encode(semilla);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // Sacamos 12 caracteres en mayúsculas para que sea fácil de leer
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 12).toUpperCase();
}

// Función para registrarte como el primer COMERCIO (Jurídica)
async function crearCuentaMaestra(nombreUsuario) {
    const idUnico = await generarDropisID(nombreUsuario);
    
    try {
        // CAMBIO AQUÍ: Usamos .ref() y .set() para Realtime Database
        await db.ref('usuarios/' + idUnico).set({
            nombre: nombreUsuario,
            tipo_legal: "Jurídica",
            perfil: "Comercio",
            id_publico: idUnico,
            plan: "Trial",
            creado_en: Date.now() // Guardamos la fecha actual
        });
        
        console.log("¡Éxito! Tu ID es: " + idUnico);
        return idUnico;
    } catch (error) {
        console.error("Error al registrar: ", error);
    }
}
