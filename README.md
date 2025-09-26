# FitQuestPlus

FitQuestPlus is a modern fitness web application designed to help users achieve their fitness goals through workout guides, personalized programs, and a shopping experience for fitness products. It extends the original *FitQuest* by adding enhanced user flows such as a detailed Browse page, dynamic Cart views, and full Account management.

---

## 📚 Table of Contents
- [Project Description](#project-description)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Database & API](#database--api)
- [User Experience Views](#user-experience-views)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Contributors](#contributors)

---

## 🏋️ Project Description

FitQuestPlus provides:
- **Workout Guides** organized by muscle groups (chest, back, arms, shoulders, quads, hamstrings).
- **Tailored Programs** like Full Body, Core Conditioning, and Leg Day, with duration & intensity info.
- **Product Shop** where users can browse, add to cart, and checkout fitness gear.
- **Account Management** including signup/login, username updates, and account deletion.

Built with:
- **Frontend:** React.js  
- **Backend:** Express.js  
- **Database:** MySQL  

---

## ✨ Features

### User
- Sign up & log in
- Explore workout guides with hover previews
- Follow structured programs with details
- Shop fitness products & manage cart
- Checkout with dynamic totals & tax calculations
- Manage account settings (update username/password, delete account)

### Admin
- Manage users & access control via roles

---

## 🛠 System Architecture

- **Frontend (React.js):** Handles UI/UX (Login, Home, Workouts, Programs, Shop, Cart, Account).  
- **Backend (Express.js):** Provides API endpoints for authentication, signup, profile update, delete, and shop/cart actions.  
- **Database (MySQL):** Stores users, authentication, product data, and contacts.
  - **Configuration:** The MySQL database connection is set up directly in `backend/app.js`. All data operations (user login/signup, account management, contacts, etc.) are managed through this file.

---

## 🔗 Database & API

### Database Connection

- The MySQL database connection is established in `backend/app.js`.  
- You can configure database credentials in the `.env` file or directly inside `app.js` (as shown below):

```js
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "your_db_user",
  password: "your_db_password",
  database: "secoms3190",
});
```

### Database: `user` table
- `user`: username  
- `password`: hashed password  
- `role`: user role (admin/user)

### API Endpoints
- **POST** `/contact/login` — login with username & password  
- **POST** `/contact/signup` — create new user  
- **PUT** `/contact/update/:username` — update username  
- **DELETE** `/contact/delete/:username` — delete account  
- **GET** `/contact` — get all contacts  
- **POST** `/contact` — add a new contact (with image upload)

---

## 🎨 User Experience Views

### 1. Login & Signup
- **Login View**
  - Purpose: User authentication  
  - Inputs: Username, Password  
  - Buttons: Login, link to Sign Up  
- **Signup View**
  - Purpose: New user registration  
  - Inputs: Username, Password, Confirm Password  
  - Buttons: Sign Up, link to Login  

### 2. Browse Products Page
- About section: “Browse Products” intro with search bar & checkout button  
- Product grid with:
  - Image, name, price, description  
  - Quantity selector (+/-)  
- Order summary dynamically updates with subtotal & totals  

### 3. Cart Views
- **Cart Page**
  - Displays items in a clean table  
  - Quantity adjustments (+/-), auto-remove when 0  
  - Subtotal, tax (7.5%), total auto-update  
  - Payment form with name, email, card, address, etc.  
  - Green “Complete Order” button  
  - “Return to Shop” link  
- **Cart Summary Page**
  - Header: Nav bar (Home, Workouts, Browse, etc.)  
  - Order summary table with images, qty, price  
  - Final total in bold  
  - User info: Name, email, masked credit card  
  - Green “Back to Store” button  

### 4. Account Page
- Username field (edit)  
- Password field (update)  
- **Save Changes** button (blue)  
- **Delete Account** button (red)  

---

## 🧑‍💻 Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Styling:** CSS  
- **Tools:** VS Code, Git, GitHub  

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/KaungJr/fitquestplus.git
cd fitquestplus
```

### 2. Backend setup
```bash
cd backend
npm install
npm start   # or node App.js
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm start
```

### 4. Database setup
- Install MySQL
- Create a database and `user` table
- Configure `.env` in backend with your DB credentials or update directly in `app.js`:

  ```
  DB_HOST=127.0.0.1
  DB_USER=your_user
  DB_PASSWORD=your_password
  DB_NAME=secoms3190
  DB_PORT=3306
  ```

---
