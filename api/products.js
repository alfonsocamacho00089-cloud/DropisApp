export default async function handler(req, res) {
    // 1. Configuramos la URL de Mercado Libre Venezuela
    // Puedes cambiar "relojes" por lo que quieras probar
    const urlML = "https://api.mercadolibre.com/sites/MLV/search?q=relojes&limit=10";

    try {
        const respuesta = await fetch(urlML);
        const datos = await respuesta.json();

        // 2. IMPORTANTE: Mapeamos los datos de ML para que tengan 
        // la misma estructura que esperaba tu código de Shopify.
        // Así no tienes que cambiar casi nada en tu frontend.
        const productosMapeados = datos.results.map(prod => ({
            title: prod.title,
            handle: prod.id, // Usamos el ID como handle temporal
            image: { 
                // Mejoramos la calidad de la imagen de una vez
                src: prod.thumbnail.replace("-I.jpg", "-W.jpg") 
            },
            variants: [{ 
                price: prod.price.toString() // Lo pasamos a string como Shopify
            }],
            permalink: prod.permalink // Guardamos el link real de ML por si acaso
        }));

        // 3. Enviamos la respuesta exitosa
        res.status(200).json(productosMapeados);

    } catch (error) {
        console.error("Error en la prueba de ML:", error);
        res.status(500).json({ 
            error: "Error al obtener productos de prueba", 
            mensaje: error.message 
        });
    }
}
