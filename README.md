# 🛒 VoiceStock AI

> **AI-Powered Voice Shopping Assistant**

VoiceStock AI is a full-stack web application that enables users to manage their shopping lists using voice commands. The application combines speech recognition, AI-inspired shopping assistance, user authentication, and real-time shopping list management to provide a modern shopping experience.

---

## 📌 Features

### 🎤 Voice Shopping
- Add products using voice commands
- Remove products using voice commands
- Search products using voice
- Natural language command parsing
- Speech feedback

### 🛍 Shopping List
- Add products
- Remove products
- Update quantity
- Shopping status
  - Added
  - Pending
  - Purchased
- Shopping overview
- Total price calculation

### 👤 User Authentication
- User Registration
- User Login
- JWT Authentication
- Secure Password Hashing
- Logout

### 👤 Profile Management
- Update Name
- Update Mobile Number
- Change Password
- Secure Profile Updates

### 🎨 User Experience
- Responsive UI
- Dark Mode
- Product Search
- Search Suggestions
- Activity History
- Modern Dashboard

---

# 🖥 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- React Icons
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js

## Browser APIs

- Web Speech API
- Speech Recognition API
- Speech Synthesis API

---

# 📂 Project Structure

```text
VoiceStock-AI
│
├── client
│   ├── public
│   ├── src
│   │
│   ├── api
│   ├── assets
│   ├── components
│   ├── context
│   ├── data
│   ├── hooks
│   ├── pages
│   ├── styles
│   └── utils
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/AnuragGupta2105/VoiceStock-AI.git

cd VoiceStock-AI
```

---

## Backend Setup

```bash
cd server

npm install

npm start
```

Backend runs on:

```
http://localhost:5000
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 🎙 Supported Voice Commands

Examples:

```
Add milk

Add 2 breads

Need eggs

Buy coffee

Remove milk

Delete bread

Search butter

Find shampoo
```

---

# 📸 Screenshots

### Dashboard

> Add dashboard screenshot here

---

### Voice Shopping Assistant

> Add screenshot here

---

### Shopping List

> Add screenshot here

---

### User Profile

> Add screenshot here

---

# 🔒 Authentication Features

- JWT Token Authentication
- Protected Routes
- Password Encryption
- Secure Login
- Secure Registration

---

# 📦 Shopping Features

- Voice Shopping
- Manual Shopping
- Product Search
- Quantity Controls
- Shopping Status
- Activity History
- Smart Suggestions

---

# 🌟 Future Improvements

- AI Product Recommendation
- Barcode Scanner
- OCR Bill Scanner
- Price Comparison
- Multi-language Voice Support
- Shopping Analytics
- Email Notifications
- Order History
- Wishlist

---

# 📄 License

This project is developed for educational and learning purposes.

---

# 👨‍💻 Author

**Anurag Gupta**

GitHub:
https://github.com/AnuragGupta2105

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.
