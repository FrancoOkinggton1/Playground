# 🎮 GameZone - El Multiverso del Gaming

**GameZone** es una plataforma web inmersiva diseñada para el descubrimiento y exploración de videojuegos. Construida con un enfoque en el rendimiento y la experiencia de usuario (UX), la aplicación combina un catálogo dinámico extraído de la API de RAWG con un asistente virtual impulsado por Inteligencia Artificial (Google Gemini) que ofrece recomendaciones personalizadas en tiempo real.

![GameZone Hero Preview](/public/Gemini_Generated_Image_kbm3zfkbm3zfkbm3.png)
*(Nota: Vista previa del Hero dinámico con efecto Parallax).*

---

## 🚀 Características Principales

* **🔍 Catálogo Dinámico y Buscador:** Integración nativa con la **API de RAWG** para acceder a miles de títulos. Permite buscar juegos por nombre y visualizar metadatos clave (calificación, fecha de lanzamiento).
* **🤖 Asistente IA Integrado (GameZone AI):** Un chatbot flotante construido con **Google Gemini 1.5 Flash**. Actúa como un experto en gaming, procesando lenguaje natural para recomendar títulos y generando enlaces directos al catálogo interno.
* **📄 Vistas de Detalle Generadas Dinámicamente:** Rutas dinámicas (`/game/[id]`) que cargan información profunda de cada juego, incluyendo:
    * Descripciones completas y metadatos.
    * Galería de imágenes (Screenshots).
    * Plataformas, géneros, desarrolladores y editores.
    * **Smart Store Links:** Botones de compra que identifican automáticamente la tienda (Steam, PlayStation, Xbox, Nintendo, etc.) y renderizan su logo oficial para una experiencia visual premium.
* **🎨 UI/UX Moderna y Responsiva:** Diseño "Dark Gaming" fluido utilizando **Tailwind CSS** y **DaisyUI**, con transiciones suaves, efectos glassmorphism (backdrop-blur) y navegación optimizada.

---

## 🛠️ Stack Tecnológico

El proyecto utiliza una arquitectura moderna de renderizado híbrido (SSR/SSG):

* **Framework Core:** [Astro v5](https://astro.build/) (Configurado con `output: 'server'`).
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para tipado estático y escalabilidad.
* **Estilos y Componentes:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/).
* **APIs Externas:** * [RAWG Video Games Database API](https://rawg.io/apidocs) (Datos del catálogo).
    * [Google AI Studio / Gemini API](https://ai.google.dev/) (Motor del Chatbot).
* **Iconografía:** [Icons8](https://icons8.com/) (Logos dinámicos de tiendas).

---

## 📂 Arquitectura del Proyecto

El código está estructurado de forma modular para facilitar el mantenimiento y la escalabilidad:

```text
📦 web/Buscador_Juegos
├── 📂 public/               # Assets estáticos públicos (imágenes, favicon)
├── 📂 src/
│   ├── 📂 assets/           # SVGs y recursos internos
│   ├── 📂 components/       # Componentes de UI reutilizables
│   │   ├── 🧩 Chatbot.astro # Interfaz y lógica del cliente del asistente IA
│   │   ├── 🧩 Footer.astro  # Pie de página estructurado
│   │   ├── 🧩 Header.astro  # Navegación principal
│   │   ├── 🧩 Hero.astro    # Sección de impacto visual (Parallax)
│   │   └── 🧩 Welcome.astro # Componente base
│   ├── 📂 layouts/
│   │   └── 📐 Layout.astro  # Wrapper principal (HTML, Head, Metadata)
│   ├── 📂 pages/            # Enrutamiento basado en archivos de Astro
│   │   ├── 📂 api/
│   │   │   └── ⚙️ chat.ts   # Serverless Endpoint para la IA (Oculta la API Key)
│   │   ├── 📂 game/
│   │   │   └── 📄 [id].astro# Ruta Dinámica para los detalles de cada juego
│   │   ├── 📄 index.astro   # Landing page y catálogo principal
│   │   └── 📄 Inicio.astro  # Vista de inicio alternativa
│   ├── 📂 services/
│   │   └── 🔌 rawg.ts       # Funciones de fetching (getGames, getGameDetails)
│   └── 📂 styles/
│       └── 🎨 global.css    # Estilos globales y directivas de Tailwind
├── ⚙️ astro.config.mjs      # Configuración del framework (Modo Server activado)
├── ⚙️ tailwind.config.mjs   # Configuración de diseño y plugins
├── ⚙️ tsconfig.json         # Reglas de TypeScript
└── 🔐 .env                  # Variables de entorno (No incluido en el repo)
# Playground
My personal sandbox for experimenting with new technologies, web frameworks, and creative coding. Home to all my mini-projects and web experiments.
