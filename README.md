# 🏥 Hospital Management System

A lightweight hospital management backend that supports:

- OPD Token Queue System
- Bed Availability Tracking
- Patient Admission & Discharge
- Hospital-wise Admin Management

This system is built to simplify hospital workflows and visualize real-time patient and bed status.

---

## 🚀 Tech Stack

| Layer | Technology |
|------|------------|
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + Bcrypt |
| Validation | Zod |
| Tools | Postman, MongoDB Compass |

---

## 🧱 Core Modules

### 🏥 Hospital
Stores hospital details like:
- Name
- City
- Address
- Contact Number
- Departments
- Total Beds

### 🛏️ Beds
Tracks each bed:
- Bed Number
- Ward Type (`General / ICU`)
- Status (`Available / Occupied / Cleaning`)
- Assigned Patient (if admitted)

### 🎟️ OPD Patients (Token System)
Auto-generates token numbers for OPD queue:
- Status Flow → `Waiting → In-Consultation → Completed`

### 🛌 Admitted Patients
Handles admission & discharge:
- Assign bed → Mark bed **Occupied**
- Discharge → Bed becomes **Available**

### 🔐 Admin Users
Each hospital has its **own admin login** with control over:
- OPD queue
- Bed management

---

## 🔥 API Endpoints Overview

| Feature | Method | Endpoint |
|--------|--------|---------|
| Register Admin | POST | `/api/admin/register` |
| Login Admin | POST | `/api/admin/login` |
| Get All Hospitals | GET | `/api/hospitals` |
| Get Beds by Hospital | GET | `/api/beds/:hospitalId` |
| Generate OPD Token | POST | `/api/opd/generate` |
| View OPD Queue | GET | `/api/opd/queue/:hospitalId` |
| Admit Patient | POST | `/api/admitted/admit` |
| Discharge Patient | PUT | `/api/admitted/discharge/:id` |

---

## ▶️ Run Locally

```bash
npm install
npm start
