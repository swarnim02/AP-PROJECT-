---

# 🧠 **2️⃣ Ideation Document (for Submission / Report)**

```markdown
# 🧠 Hostel Room Allotment System – Project Ideation Document

---

## 👥 Team Members

| Name | Role |
|------|------|
| Atharv Soni | Backend Lead, Admin APIs |
| Ishita Singh | Authentication & User Module |
| Swarnim | Room Management |
| Ansh | Allotment Logic & Automation |

---

## 🎯 Project Idea

### Problem Statement
Hostel room allotment in most colleges is **manual and inefficient**.  
Students fill forms, admin staff manually assign rooms, and capacity tracking is often error-prone.  

This project aims to **automate the room allotment system** with clear rules:
- Each room is assigned only to students of **the same academic year**.
- Room **capacity and available seats** are dynamically updated.
- Admins can **manage all rooms, students, and allotments** easily.

---

## 💡 Objective

Create a **backend system** that:
- Allows students to register, log in, and apply for hostel rooms.
- Ensures fairness and accuracy using automation logic.
- Simplifies admin workload through API-based management.

---

## 🧩 System Architecture

### 🧱 Components
1. **User Service:** Handles student/admin registration, login, and JWT authentication.  
2. **Room Service:** Manages CRUD for room details (capacity, year group, etc.).  
3. **Allotment Service:** Automatically or manually assigns rooms while maintaining logical constraints.  

---

## 🧠 How It Solves the Problem

| Problem | Solution |
|----------|-----------|
| Manual allocation delays | Auto-allotment logic reduces human work |
| Room overbooking | Capacity tracking ensures no overfill |
| Cross-year mix-up | Year-based grouping keeps order |
| Poor visibility | Admin dashboard APIs show live data |

---

## ⚙️ Data Model Overview

**User**, **Room**, and **Allotment** models are linked as follows:

User (1) ---- (1) Allotment (M) ---- (1) Room

yaml
Copy code

- Each student has one allotment.  
- Each room can have multiple allotments (students).  

---

## 🧾 ER Diagram

┌──────────┐ ┌─────────────┐ ┌───────────────┐
│ User │ 1 --- 1│ Allotment │ *---1 │ Room │
│──────────│ │─────────────│ │───────────────│
│ id │ │ id │ │ id │
│ name │ │ studentId │ │ roomNumber │
│ email │ │ roomId │ │ totalCapacity │
│ year │ │ dateOfAllot │ │ availableSeats│
│ college │ └─────────────┘ │ yearGroup │
│ role │ │ status │
└──────────┘ └───────────────┘

yaml
Copy code

---

## 📦 API Endpoints Overview

| Endpoint | Method | Description | Access |
|-----------|---------|-------------|---------|
| `/api/users/register` | POST | Register user | Public |
| `/api/users/login` | POST | Login user | Public |
| `/api/rooms` | GET | Get all rooms | Admin |
| `/api/rooms` | POST | Create new room | Admin |
| `/api/allotment/apply` | POST | Apply for room | Student |
| `/api/allotment/auto` | POST | Auto-allot room | System |

---

## ⚡ Workflow Summary

1. Student registers → fills college name & year.  
2. Student applies → backend searches rooms with:
   - Matching `yearGroup`
   - `availableSeats > 0`
3. If found → assigns automatically.  
4. Updates seat count & status.  
5. Admin can view and modify everything through API.

---

## 🚀 Final Deliverables
- Backend (Node + Express + Prisma + MySQL)
- Optional React Dashboard (if time permits)
- API Documentation via Postman
- GitHub repository with individual commits

---

## 📊 Evaluation Criteria
| Criteria | Description |
|-----------|--------------|
| Functionality | Working backend with core logic |
| Code Quality | Proper structure, modular code |
| GitHub Activity | Commits by all 4 members |
| Presentation | Clear explanation and API demo |

---

## 🏁 Expected Outcome
A complete backend system that can:
- Automatically allocate hostel rooms.
- Prevent duplicate or invalid allocations.
- Serve as a base for a future full-stack web app.

---