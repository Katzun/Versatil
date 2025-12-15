# Versatil – Full-Stack Web Application

Versatil adalah aplikasi web full-stack yang dibangun sebagai proyek akademik dan pengembangan personal untuk mempelajari sistem terdistribusi dan container-based deployment.

## 🚀 Tech Stack
- Frontend: Vite + TypeScript
- Backend: Go (Gin Framework)
- Database: PostgreSQL
- Containerization: Docker
- Orchestration: Kubernetes

## ✨ Features
- User Registration & Login
- RESTful API
- Task Management (Create, Read, Update, Delete)
- Database integration with PostgreSQL
- Containerized services with Docker
- Kubernetes-based deployment (local cluster)

## 🏗 Architecture
- Frontend dan backend dipisahkan (decoupled architecture)
- Backend diakses melalui REST API
- Database berjalan sebagai service terpisah
- Semua service dijalankan menggunakan Docker & Kubernetes

## ⚙️ How to Run (Local – Kubernetes)
```bash
kubectl apply -f postgres.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-nodeport.yaml
kubectl apply -f frontend-deployment.yaml
