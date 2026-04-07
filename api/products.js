export default async function handler(req, res) {
    const tienda = "mitiendat4dns0-ds.myshopify.com";
    const token = process.env.SHOPIFY_TOKEN;

    // 1. Verificación de seguridad: ¿Vercel está leyendo la variable?
    if (!token) {
        return res.status(500).json({ error: "Falta la variable SHOPIFY_TOKEN en Vercel" });
    }

    try {
        const respuesta = await fetch(`https://${tienda}/api/2024-01/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Storefront-Access-Token': token,
            },
            body: JSON.stringify({
                query: `{
                    products(first: 10) {
                        edges {
                            node {
                                handle
                                title
                                images(first: 1) { edges { node { url } } }
                                variants(first: 1) { edges { node { price { amount } } } }
                            }
                        }
                    }
                }`
            })
        });

        const datos = await respuesta.json();

        // 2. Revisar si Shopify devolvió errores internos (como token inválido)
        if (datos.errors) {
            console.error("Errores de Shopify:", datos.errors);
            return res.status(401).json({ error: "Token de Shopify inválido o sin permisos", detalles: datos.errors });
        }

        // 3. Mapeo seguro: Evita que el código rompa si un producto no tiene imagen o precio
        const productos = datos.data.products.edges.map(p => ({
            title: p.node.title || "Sin título",
            handle: p.node.handle,
            image: { src: p.node.images.edges[0]?.node.url || "https://via.placeholder.com/150" },
            variants: [{ price: p.node.variants.edges[0]?.node.price.amount || "0.00" }]
        }));

        res.status(200).json(productos);

    } catch (error) {
        // 4. Esto imprimirá el error real en los Logs de Vercel
        console.error("Error en la función API:", error);
        res.status(500).json({ 
            error: "Error interno del servidor", 
            mensaje: error.message 
        });
    }
                      }
