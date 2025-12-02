# Hostel Room Allotment System — ER Diagram

🧩 **Entity Relationship Diagram**

## 🧠 Overview

The Hostel Room Allotment System is designed to manage student accommodation efficiently with profile approval workflow and room allocation based on student year and gender.

---

## 📘 Entities and Attributes

### 👤 User

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK) | Unique identifier for each user |
| name | String | Full name of the user |
| email | String | Unique email used for login |
| password | String | Encrypted password |
| role | String | student or admin |
| college | String | College name |
| year | Int | Academic year (1-4) |
| gender | String | Male or Female |
| profileApproved | Boolean | Profile approval status (null/true/false) |
| phone | String | Contact phone number |
| address | String | Home address |
| guardianName | String | Guardian's full name |
| guardianPhone | String | Guardian's contact number |
| switchCount | Int | Number of room switches used (max 2) |
| allotments | Relation | One-to-many relation with Allotment model |

### 🏠 Room

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK) | Unique identifier for each room |
| roomNumber | String | Unique room number |
| capacity | Int | Maximum number of students that can occupy the room |
| status | String | Available or Occupied |
| yearGroup | Int | Minimum year group allowed (1-4) |
| gender | String | Male or Female rooms |
| hostelName | String | Name of the hostel building |
| allotments | Relation | One-to-many relation with Allotment model |

### 📄 Allotment

| Field | Type | Description |
|-------|------|-------------|
| id | Int (PK) | Unique identifier for each allotment |
| studentId | Int (FK) | References the User.id of the student |
| roomId | Int (FK) | References the Room.id assigned |
| dateOfAllotment | DateTime | Timestamp when the room was allotted |
| status | String | pending, approved, or rejected |

---

## 🔗 Relationships

| Relationship | Description |
|--------------|-------------|
| User → Allotment | One user (student) can have multiple allotments (1 → N) |
| Room → Allotment | One room can have multiple allotments up to capacity (1 → N) |
| Allotment → User & Room | Each allotment links exactly one user to one room |

---

## 🧾 ER Diagram (Text Representation)

```
┌─────────────────┐             ┌──────────────┐              ┌──────────────────┐
│      User       │ 1         N │  Allotment   │ N          1 │      Room        │
│─────────────────│◀────────────│──────────────│────────────▶│──────────────────│
│ id (PK)         │             │ id (PK)      │              │ id (PK)          │
│ name            │             │ studentId(FK)│              │ roomNumber       │
│ email           │             │ roomId(FK)   │              │ capacity         │
│ password        │             │ dateOfAllot. │              │ status           │
│ role            │             │ status       │              │ yearGroup        │
│ college         │             └──────────────┘              │ gender           │
│ year            │                                            │ hostelName       │
│ gender          │                                            │ allotments[]     │
│ profileApproved │                                            └──────────────────┘
│ phone           │
│ address         │
│ guardianName    │
│ guardianPhone   │
│ switchCount     │
│ allotments[]    │
└─────────────────┘
```

---

## 🔄 Business Logic Flow

### Profile Approval Workflow
1. **Student Registration** → User created with basic info
2. **Profile Completion** → Student fills personal details
3. **Admin Review** → Admin approves/rejects profile
4. **Room Allocation** → Based on approval and year group

### Room Allocation Logic
- **1st Year Students**: Automatic random allocation after profile approval
- **2nd+ Year Students**: Manual room selection from available options
- **Gender-based**: Rooms are assigned based on student gender
- **Capacity Management**: Rooms marked as occupied when full

---

## 🧭 Summary

- **User ↔ Allotment** → One-to-Many relation (Students can have multiple allotments over time)
- **Room ↔ Allotment** → One-to-Many relation (Rooms can house multiple students up to capacity)
- **Profile Approval** → Three-state system (null=pending, true=approved, false=rejected)
- **Year-based Allocation** → Different allocation methods for different year groups
- **Gender Segregation** → Rooms are gender-specific for proper accommodation