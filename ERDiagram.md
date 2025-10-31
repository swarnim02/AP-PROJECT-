
---

🧩 Hostel Room Allotment System — ER Diagram

🧠 Overview

The Hostel Room Allotment System is designed to manage student accommodation efficiently.
This ER diagram defines the relationships between User, Room, and Allotment models in your Prisma schema.


---

📘 Entities and Attributes

👤 User

Field	Type	Description

id	Int (PK)	Unique identifier for each user
name	String	Full name of the user
email	String	Unique email used for login
password	String	Encrypted password
role	String	Defines whether the user is a student or admin
allotment	Relation	One-to-one relation with Allotment model



---

🏠 Room

Field	Type	Description

id	Int (PK)	Unique identifier for each room
roomNumber	String	Unique room number
capacity	Int	Maximum number of students that can occupy the room
status	String	Either Available or Occupied
allotments	Relation	One-to-many relation with Allotment model



---

📄 Allotment

Field	Type	Description

id	Int (PK)	Unique identifier for each allotment
studentId	Int (FK)	References the User.id of the student
roomId	Int (FK)	References the Room.id assigned
dateOfAllotment	DateTime	Timestamp when the room was allotted



---

🔗 Relationships

Relationship	Description

User → Allotment	One user (student) can have one allotment (1 → 1).
Room → Allotment	One room can have multiple allotments (1 → N), though logically capacity limits apply.
Allotment → User & Room	Each allotment links exactly one user to one room.



---

🧾 ER Diagram (Text Representation)

┌────────────┐             ┌──────────────┐              ┌─────────────┐
 │   User     │ 1         1 │  Allotment   │ N          1 │    Room     │
 │────────────│◀────────────│──────────────│────────────▶│─────────────│
 │ id (PK)    │             │ id (PK)      │              │ id (PK)     │
 │ name       │             │ studentId(FK)│              │ roomNumber  │
 │ email      │             │ roomId(FK)   │              │ capacity    │
 │ password   │             │ dateOfAllot. │              │ status      │
 │ role       │             └──────────────┘              │ allotments[]│
 │ allotment? │                                            └─────────────┘
 └────────────┘


---

🧭 Summary

User ↔ Allotment → One-to-One relation (Each student can have only one room).

Room ↔ Allotment → One-to-Many relation (A room can have multiple students until capacity is reached).

Allotment serves as a junction model linking users (students) and rooms.



