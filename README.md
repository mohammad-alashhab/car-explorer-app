# 🚗 Car Explorer App

A full-stack web application that allows users to explore vehicle makes, types, and models based on selected criteria.

Built as part of a Software Developer assignment using modern best practices, clean architecture, and production-ready deployment.

---

## 🌐 Live Demo

👉 http://16.171.197.206

---

## ✨ Features

* Browse all available car makes
* Select manufacturing year
* View vehicle types for a selected make
* View models based on make and year
* Responsive UI with loading & error handling

---

## 🏗️ Architecture

This project follows **Clean Architecture principles**:

* Separation of concerns (Domain, Application, Infrastructure, API)
* Dependency Injection
* Scalable and maintainable structure

---

## 🛠️ Tech Stack

### Backend

* ASP.NET Core Web API (.NET 10)
* Clean Architecture
* HttpClient for external APIs

### Frontend

* React (Vite + TypeScript)
* Modular feature-based structure
* Custom hooks & reusable components

### DevOps

* Docker (multi-stage builds)
* Docker Compose
* AWS EC2 (Free Tier deployment)

---

## 🧩 External APIs

Data is fetched from the official NHTSA API:

* Get Makes
  https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json

* Get Vehicle Types
  https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/{makeId}?format=json

* Get Models
  https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json

---

## 🚀 Run Locally (Docker)

Make sure Docker is installed, then run:

```bash
docker-compose up --build
```

### Access:

* Frontend: http://localhost
* Backend (Swagger): http://localhost:5000/swagger

---

## 🧪 Run Without Docker

### Backend

```bash
cd backend/src/CarExplorer.API
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ☁️ Deployment (AWS)

The application is deployed on an AWS EC2 instance using Docker.

### Steps performed:

1. Created EC2 instance (Ubuntu, Free Tier)
2. Configured Security Group (Ports 22, 80, 5000)
3. Installed Docker & Docker Compose
4. Cloned repository
5. Built and ran containers using:

   ```bash
   docker-compose up -d --build
   ```

---

## 📌 Notes

* CORS configured for production deployment
* Multi-stage Docker builds for optimized images
* Frontend served via Nginx
* Backend runs on port 5000
* Fully containerized environment

---

## 📬 Contact

* LinkedIn: https://www.linkedin.com/in/mohamad-alashhab
* Phone: +962781098325

---

## ⭐ Final Thoughts

This project demonstrates:

* Clean architecture implementation
* Fullstack integration
* Docker-based deployment
* Real-world cloud hosting (AWS)

---
