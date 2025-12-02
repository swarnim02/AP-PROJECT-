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