# Competencia-Gimnasio
En este repositorio se creara toda la funcionalidad de un sistema de gestión de usuarios para un gimnasio.

#  GYM-SOFT - Sistema de Gestión de Gimnasios

Sistema integral para la administración de socios, planes de membresía y control de suscripciones.

##  Tecnologías Utilizadas

### Frontend
* **React 19** con **TypeScript**.
* **Vite** para un desarrollo ultrarrápido.
* **Tailwind CSS v4** para el diseño de interfaz.
* **Lucide React** para la iconografía dinámica.
* **Axios** para el consumo de API.

### Backend
* **.NET 9 (ASP.NET Core)**.
* **Entity Framework Core** para el mapeo de datos.
* **PostgreSQL** como motor de base de datos.
* **Docker & Docker Compose** para la contenedorización.

##  Características Principales
* **Dashboard Inteligente:** Visualización de KPIs (Socios activos, ingresos, equipos).
* **Búsqueda Global:** Localización rápida de socios por nombre o CI.
* **Gestión de Membresías:** Creación de planes con precios y duraciones personalizadas.
* **Seguridad:** Panel de administración protegido por login.
* **Tickets de Venta:** Confirmación visual tras cada nueva suscripción.

##  Instalación (Local)

1. Clonar el repositorio.
2. Levantar la base de datos: `docker-compose up -d`.
3. Ejecutar el Backend: `cd backend/GymApi && dotnet run`.
4. Ejecutar el Frontend: `cd frontend/gym-app && npm run dev`.