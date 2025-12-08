# 🪑 Mueblería Hermanos Jota

E-commerce fullstack de muebles de diseño contemporáneo argentino, desarrollado con **React** y **Node.js/Express**.

[![Deploy Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=flat&logo=vercel)](https://itba-muebleria-jota.vercel.app)
[![Deploy Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat&logo=render)](https://itba-muebleria-jota.onrender.com)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Demo](#-demo)
- [Stack Tecnológico](#-stack-tecnológico)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## ✨ Características

- 🛒 **Carrito de compras** con persistencia de sesión
- 🔐 **Autenticación JWT** con roles (usuario/admin)
- 👤 **Gestión de perfil** y pedidos del usuario
- 📦 **CRUD completo de productos** (solo admins)
- 🎨 **Diseño responsive** y moderno con CSS custom
- 🔍 **Catálogo por categorías** con carrusel horizontal
- 💳 **Sistema de órdenes** con estados (pendiente, confirmado, enviado)

---

## 🎬 Demo

**Frontend**: [https://itba-muebleria-jota.vercel.app](https://itba-muebleria-jota.vercel.app)  
**Backend**: [https://itba-muebleria-jota.onrender.com](https://itba-muebleria-jota.onrender.com)

### Credenciales de Prueba

- **Usuario regular**: `user@gmail.com` / `123456`
- **Administrador**: `admin@gmail.com` / `123456`

---

## 🛠 Stack Tecnológico

### Frontend
- **React** 19.1.1
- **React Router DOM** 7.9.5
- **Vite** 7.1.7
- **CSS Modules** (sin frameworks externos)

### Backend
- **Node.js** + **Express** 5.1.0
- **MongoDB** + **Mongoose** 8.19.2
- **JWT** (jsonwebtoken 9.0.2)
- **Bcrypt** 6.0.0 para encriptación

### Herramientas
- **ESLint** para linting
- **Nodemon** para desarrollo
- **CORS** habilitado

---

## 🚀 Instalación

### Prerequisitos

- Node.js >= 18
- MongoDB (local o remoto)
- npm o yarn

### Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/muebleria-hermanos-jota.git
cd muebleria-hermanos-jota
```

### Instalar dependencias

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```
---

## 📁 Estructura del Proyecto

```
muebleria-hermanos-jota/
├── client/                    # Frontend React
│   ├── public/
│   │   └── logo.svg
│   ├── src/
│   │   ├── components/        # Componentes reutilizables
│   │   ├── contexts/          # Context API (Auth)
│   │   ├── pages/             # Páginas de la app
│   │   ├── styles/            # Estilos CSS
│   │   ├── App.jsx            # Componente principal
│   │   └── main.jsx           # Entry point
│   └── package.json
│
└── server/                    # Backend Node/Express
    ├── controllers/           # Lógica de negocio
    ├── models/                # Modelos Mongoose
    ├── routes/                # Rutas de la API
    ├── middleware/            # Middlewares (auth, errors)
    ├── database/              # Configuración MongoDB
    ├── seed.js                # Script de datos iniciales
    ├── server.js              # Entry point
    └── package.json
```
