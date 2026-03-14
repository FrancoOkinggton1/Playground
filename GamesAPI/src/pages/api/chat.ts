import type { APIRoute } from 'astro';
import { Groq } from 'groq-sdk';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { message } = await request.json();
        const GROQ_KEY = import.meta.env.GROQ_API_KEY;
        const RAWG_KEY = import.meta.env.PUBLIC_RAWG_KEY;
        const groq = new Groq({ apiKey: GROQ_KEY });

        // Registro de seguridad: Verifica si las llaves existen (Verás esto en la terminal)
        console.log("--- DEBUG CHAT ---");
        console.log("¿Hay GROQ Key?:", !!GROQ_KEY);
        console.log("¿Hay RAWG Key?:", !!RAWG_KEY);
        console.log("Mensaje recibido:", message);

        if (!GROQ_KEY || !RAWG_KEY) {
            return new Response(JSON.stringify({ texto: "Error: Faltan las llaves en el .env" }), { status: 500 });
        }

        const prompt = `Eres un experto gamer. Responde a: "${message}". 
        Devuelve SOLO un JSON: {"respuesta": "tu texto", "juego_sugerido": "nombre"}`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: "moonshotai/kimi-k2-instruct-0905",
            temperature: 0.6,
            max_completion_tokens: 4096,
            top_p: 1,
            stream: false // Cambia a true si quieres manejar streaming
        });

        const rawText = chatCompletion.choices[0]?.message?.content || "";
        const cleanJson = JSON.parse(rawText.replace(/```json|```/g, ''));

        const rawgResponse = await fetch(`https://api.rawg.io/api/games?key=${RAWG_KEY}&search=${cleanJson.juego_sugerido}&page_size=1`);
        const rawgData = await rawgResponse.json();
        const game = rawgData.results[0];

        return new Response(JSON.stringify({
            texto: cleanJson.respuesta,
            link: game ? `https://rawg.io/games/${game.slug}` : null,
            nombre: game ? game.name : cleanJson.juego_sugerido
        }), { status: 200 });

    } catch (error) {
        // ESTO APARECERÁ EN TU TERMINAL DE VS CODE
        console.error("--- ERROR CRÍTICO EN API ---");
        console.error(error);
        return new Response(JSON.stringify({ texto: "Hubo un error interno en el servidor." }), { status: 500 });
    }
};