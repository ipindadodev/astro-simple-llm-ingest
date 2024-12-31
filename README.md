# Astro Simple LLM Ingest

**Astro Simple LLM Ingest** es un plugin sencillo para Astro que convierte tu documentación en texto plano listo para ser usado con Modelos de Lenguaje Grandes (LLM). Ideal para aquellos que desean extraer contenido de sitios de documentación generados con Astro y Starlight para alimentar sistemas de IA o motores de búsqueda.

---

## 🚀 Características

- Genera un archivo de texto global con todo el contenido del sitio de documentación.
- Crea archivos de texto separados por secciones, basándose en las subcarpetas del directorio `docs`.
- Fácil integración en proyectos Astro existentes.

---

## 📦 Instalación

Instala el plugin desde NPM:

```bash
npm install astro-simple-llm-ingest
```

## 🛠 Uso

Agrega el plugin a tu configuración de Astro (astro.config.mjs):

```javascript   
import llmIngest from 'astro-simple-llm-ingest';

export default {
  integrations: [llmIngest()],
};

```

Al construir tu sitio con astro build, el plugin generará automáticamente los archivos de texto en la carpeta dist/llm-ingest.

## 📂 Estructura de salida
Supongamos que tu proyecto tiene esta estructura de contenido en src/content/docs:

```javascript   
src/content/docs/
├── index.md
├── sales/
│   ├── overview.md
│   ├── strategies.md
├── engineering/
│   ├── docs.md
│   ├── guides/
│       ├── api.md
│       ├── setup.md

```
El plugin generará la siguiente estructura en la carpeta dist/llm-ingest:

```javascript
dist/llm-ingest/
├── full_site_llm_feed.txt       // Todo el contenido del sitio
├── sales_llm_feed.txt           // Contenido de la carpeta sales/
├── engineering_llm_feed.txt     // Contenido de la carpeta engineering/
```

## ✨ Ejemplo de uso

El archivo full_site_llm_feed.txt contendrá algo como esto:

```markdown
---
File: sales/overview.md

## Overview
Este archivo contiene información general sobre ventas...

---
File: engineering/docs.md

## Engineering Docs
Este archivo contiene guías técnicas para ingenieros...
```

## 🌟 Ventajas
- Preparación para LLMs: Extrae fácilmente todo el contenido de la documentación para alimentar chatbots o sistemas de IA.
- Estructura organizada: Divide el contenido en secciones para facilitar su procesamiento.
- Automático: No necesitas realizar pasos adicionales, el plugin lo hace todo durante el proceso de construcción (astro build).

## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Si tienes sugerencias, encuentras un error o deseas agregar nuevas funcionalidades, no dudes en abrir un issue o enviar un pull request en el repositorio de GitHub.

## 📝 Licencia
Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo LICENSE para más información.