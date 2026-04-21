# 🚗 Car Explorer App

A full-stack web application that allows users to explore vehicle makes, types, and models using official NHTSA data.

Built with a focus on **Clean Architecture**, scalability, and production-ready deployment.

---

## 🌐 Live Demo

👉 http://16.171.197.206

---

## ✨ Features

- Browse all available vehicle makes  
- Filter by manufacturing year  
- View vehicle types per make  
- Explore models based on make & year  
- Smooth UX with loading & error states  
- Optimized dropdowns (lazy loading + search)  

---

## 🏗️ Architecture

The backend follows **Clean Architecture principles**:

- Domain-driven structure  
- Separation of concerns  
- Dependency Injection  
- Scalable and testable design  

---

## 🛠️ Tech Stack

### Backend
- ASP.NET Core Web API (.NET 10)  
- Clean Architecture  
- HttpClient (external API integration)  

### Frontend
- React (Vite + TypeScript)  
- Feature-based folder structure  
- Custom hooks & reusable UI components  

### DevOps
- Docker (multi-stage builds)  
- Docker Compose  
- AWS EC2 (Free Tier)  

---

## 🌍 External API

Data is fetched from the official NHTSA API:

- Get Makes  
  https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json  

- Get Vehicle Types  
  https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMakeId/{makeId}?format=json  

- Get Models  
  https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/{makeId}/modelyear/{year}?format=json  

---

## 🚀 Run Locally (Docker)

Make sure Docker is installed, then run:

```bash
docker-compose up --build
```

### Access:

- Frontend: http://localhost  
- Backend (Swagger): http://localhost:5000/swagger  

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

## ⚙️ Environment Configuration

### 📍 Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## ⚠️ Important (Local Development Configuration)

If you cloned the project after deployment, both frontend and backend are configured for the production environment (EC2).

You must update them to work locally.

---

## 🎯 Frontend Configuration

The frontend might still point to the production API:

```env
VITE_API_BASE_URL=http://16.171.197.206/api
```

This will NOT work locally.

👉 Update `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Then restart the frontend:

```bash
npm run dev
```

---

## 🎯 Backend Configuration (CORS)

The backend is configured to allow requests from the production frontend:

```csharp
.WithOrigins("http://16.171.197.206")
```

This will block local frontend requests.

---

### ✅ Update `Program.cs`:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost:5173",
                "http://localhost:3000"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
```

---

### 🚀 Restart backend:

```bash
dotnet run
```

---

## 💡 Notes

- `localhost:5173` → Vite (current frontend)  
- `localhost:3000` → fallback (CRA)  
- In production, switch back to your EC2 URL  

---

## ☁️ Deployment (AWS EC2)

The application is deployed on AWS using Docker.

### Steps:

1. Created EC2 instance (Ubuntu - Free Tier)  
2. Configured Security Group (Ports 22, 80, 5000)  
3. Installed Docker & Docker Compose  
4. Cloned repository  
5. Ran containers:

```bash
docker-compose up -d --build
```

---

## 📌 Notes

- Fully containerized (frontend + backend)  
- Frontend served via Nginx  
- Backend runs on port 5000  
- CORS configured for production  
- Optimized dropdown performance (lazy loading)  

---

## 📬 Contact

- LinkedIn: https://www.linkedin.com/in/mohamad-alashhab  
- Phone: +962781098325  

---

## ⭐ Final Thoughts

This project demonstrates:

- Clean Architecture in real-world usage  
- Full-stack integration  
- Docker-based deployment  
- Cloud hosting (AWS EC2)  
- Performance optimization in UI  

---