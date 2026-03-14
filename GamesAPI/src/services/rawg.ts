const API_KEY = import.meta.env.PUBLIC_RAWG_KEY;

// Función existente para buscar lista de juegos
export const getGames = async (search?: string, genre?: string) => {
    let url = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=12`;
    if (search) url += `&search=${search}`;
    if (genre) url += `&genres=${genre}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching games:", error);
        return [];
    }
}

// --- NUEVA FUNCIÓN ---
// Obtiene los detalles de UN solo juego usando su "slug"
export const getGameDetails = async (slug: string) => {
    try {
        // Hacemos dos peticiones en paralelo: detalles y capturas de pantalla
        const [detailsResponse, screenshotsResponse] = await Promise.all([
            fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`),
            fetch(`https://api.rawg.io/api/games/${slug}/screenshots?key=${API_KEY}`)
        ]);

        if (!detailsResponse.ok) throw new Error('Juego no encontrado');

        const details = await detailsResponse.json();
        const screenshotsData = await screenshotsResponse.json();

        // Combinamos la información y devolvemos un solo objeto
        return {
            ...details,
            screenshots: screenshotsData.results || []
        };

    } catch (error) {
        console.error("Error fetching game details:", error);
        return null; // Retornamos null si falla para manejarlo en la página
    }
}