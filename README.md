# 🏙️ Expansive App

Una aplicación full-stack de administración de ubicaciones con autenticación JWT, mapa interactivo de Google Maps y panel de administración, desplegada en AWS EC2.

## 🔧 Tecnologías

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api)

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/) (Autenticación)

### Infraestructura
- Servidor Ubuntu 22.04 en EC2
- Node y PM2 para correr la aplicación
- UFW para reglas de firewall
- nginx (opcional) como proxy inverso

## 🚀 Características

- 🔐 Login seguro con JWT
- 🗺️ Visualización de ubicaciones en Google Maps
- ➕ Crear, editar y eliminar ubicaciones (solo si estás autenticado)
- 🌍 Despliegue en EC2 con control de acceso

## 📦 Instalación

### 1. Clonar el proyecto

```bash
git clone https://github.com/jesusone77/expansive-app.git
cd expansive-app
