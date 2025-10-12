## No se trabaja directamente en main.

## Todos los cambios se hacen en dev y desde ramas feature/....

# 🧉 Puros Mates - Front-End (Aplicaciones Interactivas)


--------------------------------------------------------------------------------------------------
# Puros Mates

Proyecto de e-commerce desarrollado con React, Vite y Tailwind CSS.

## 🚀 Tecnologías

- **React 19** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite** - Herramienta de construcción rápida para desarrollo frontend
- **Tailwind CSS 3** - Framework de CSS utility-first
- **React Router DOM** - Enrutamiento para aplicaciones React

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- npm (viene incluido con Node.js)

Verifica las instalaciones:
```bash
node --version
npm --version
```

## 📁 Estructura del Proyecto

```
front-purosmates/
├── public/              # Archivos públicos estáticos
├── src/
    ├── assets/          #
│   ├── components/      # Componentes reutilizables
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── views/          # Páginas de la aplicación
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Punto de entrada
│   └── index.css       # Estilos globales con Tailwind
├── tailwind.config.js  # Configuración de Tailwind
├── postcss.config.js   # Configuración de PostCSS
├── vite.config.js      # Configuración de Vite
└── package.json        # Dependencias y scripts
```

## ⚙️ Configuración de Tailwind CSS

El proyecto ya viene configurado con Tailwind CSS. Los archivos de configuración son:

**tailwind.config.js**
```js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**postcss.config.js**
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 🎨 Uso de Tailwind CSS

Puedes usar clases de Tailwind directamente en tus componentes:

```jsx
function MiComponente() {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Hola Mundo</h1>
    </div>
  );
}
```

## 📦 Dependencias Principales

```json
{
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-router-dom": "^6.28.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.17",
    "vite": "^5.0.0"
  }
}
```

## 🐛 Solución de Problemas

### Error: "Cannot find module 'tailwindcss'"
```bash
npm install -D tailwindcss postcss autoprefixer
```

### Error en package.json
Verifica que no haya comas faltantes o llaves sin cerrar. Usa [JSONLint](https://jsonlint.com/) para validar.

### El servidor no inicia
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

--------------------------------------------------------------------------------------------------

---

## 🌱 Flujo de trabajo con Git

Este es el flujo de trabajo que **todos los integrantes deben seguir** para colaborar en el proyecto.  

### 🔹 Ramas principales
- `main` → Rama estable. Solo se mergea acá lo que está probado y aprobado.
- `dev` → Rama de desarrollo. Acá se integran las nuevas features antes de pasar a `main`.

### 🔹 Cómo trabajar paso a paso

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd front-purosmates
```

2. **Instalar dependencias**
```bash
npm install
```
Esto instalará todas las dependencias necesarias listadas en `package.json`:
- react
- react-dom
- react-router-dom
- tailwindcss
- postcss
- autoprefixer

3. **Cambiar a la rama dev**
    git checkout dev
    git pull

4. **Desde la rama dev, crear tu propia rama de trabajo**
    git checkout -b feature/nombre-de-la-feature

5. **Hacer tus cambios, agregar y commitear**
    git add .
    git commit -m "feat: agregar endpoint de productos"

6. **Subir tu rama el repositorio remoto**
    git push -u origin feature/nombre-de-la-feature

7. **Crear un Pull Request (PR) en GitHub**
    Desde tu rama feature/... hacia dev.
    Otro compañero revisa y aprueba antes de mergear.

## 🏃‍♂️ Ejecutar el Proyecto

### Modo Desarrollo
```bash
npm run dev
```
La aplicación se abrirá en [http://localhost:5173](http://localhost:5173)

### Compilar para Producción
```bash
npm run build
```
Los archivos optimizados se generarán en la carpeta `dist/`

### Vista Previa de Producción
```bash
npm run preview
```

**Comentarios**
Mantener tu rama actualizada: cada vez que empieces a trabajar, asegurate de traer lo último de dev a tu rama feature con git merge dev de la siguiente manera:
    git checkout dev
    git pull
    git checkout feature/mi-feature
    git merge dev


👥 Equipo
    Nicolás Blanco
    Valentin Rocca
    Mateo Leonel Gayo
    Tomas Gonzalez Humphreys

