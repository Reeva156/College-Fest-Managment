# 📌 PULSE '26 — College Fest Management Platform
> **React.js + Redux + Axios + Node.js + Express + JWT + Bcrypt + Tailwind CSS**  
> **UI/UX Design:** Pinterest-Inspired Aesthetic (Staggered Masonry Pin Feed, Moodboard Boards, Signature Crimson Red `#E60023`, Pill Navigation & Search, Canvas Certificates & QR Passes)

---

## 🛠️ Exact Technology Stack Requested
- **Frontend Framework:** `React.js` (Vite)
- **State Management:** `Redux Toolkit` (`@reduxjs/toolkit` + `react-redux`)
- **HTTP Client:** `Axios` with JWT Request/Response Interceptors
- **Styling:** `Tailwind CSS` (Pinterest Vibe Colors `#FAF8F5`, `#E60023`, `#AD081B`, `#F7F4F0`, Pill Shapes, Soft Shadows)
- **Backend:** `Node.js` + `Express`
- **Security & Auth:** `jsonwebtoken` (JWT), `bcryptjs`, `cors`

---

## 👑 Admin Set By User (Not Hardcoded by Default)
- **No default admin account is forced.**
- On initial launch or whenever no admin exists, the platform displays a prominent **"👑 Set Up Admin"** button/modal.
- You configure your own Admin account:
  - Name
  - Official Email
  - Password
  - Department
- Once created, password is encrypted with `bcrypt` and authenticated with `jsonwebtoken`.
- The Admin holds exclusive authority to create Teacher/Organizer or Student accounts, publish pins, verify attendance, and declare winners.

---

## ⚡ How to Run

### Run Complete App (Frontend + Backend on Port 5000):
```bash
npm start
```
*(or `node server/server.js`)*
Open: **[http://localhost:5000](http://localhost:5000)**

### Run in Development Mode:
1. **Backend:** `cd server && node server.js` (Port 5000)
2. **Frontend:** `cd client && npm run dev` (Port 5173)


## Project video 
### video link :- " "
