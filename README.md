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
### 2. Instalar dependencias
cd backend
npm install
cd ../frontend
npm install

3. Variables de entorno
Backend (backend/.env)

PORT=3001
MONGO_URI=mongodb://localhost:27017/expansive
JWT_SECRET=tu_clave_secreta
Frontend (frontend/.env)

VITE_GOOGLE_MAPS_API_KEY=tu_api_key
4. Ejecutar localmente
cd backend
npm run dev

cd frontend
npm run dev

Despliegue en EC2
# Instalar Node y NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install --lts

# Clonar, instalar y levantar con PM2
git clone https://github.com/tu-usuario/expansive-app.git
cd expansive-app/backend
npm install
pm2 start index.js

# Abrir puertos con UFW
sudo ufw allow 3001
sudo ufw allow 80
sudo ufw enable

Jesús E. B. H.
💼 Desarrollador Full Stack


