# 🏪 Store Rating Web Application

## 📌 Overview
This is a web application that allows users to submit ratings for stores registered on the platform. The system includes role-based access with functionalities tailored to system administrators, normal users, and store owners.

## 🛠 Tech Stack
- **Backend**: 🚀 Express.js
- **Database**: 🗄 MySQL
- **Frontend**: 🎨 React.js

## 🌟 Features
### 🔹 System Administrator
- ➕ Add new stores, normal users, and admin users.
- 📊 Access a dashboard displaying:
  - 👥 Total number of users
  - 🏪 Total number of stores
  - ⭐ Total number of submitted ratings
- 👀 Manage users by adding, viewing, filtering, and editing user details.
- 🏢 View store details including name, email, address, and rating.
- 🔍 Apply filters on listings based on name, email, address, and role.
- 🔓 Logout functionality.

### 👤 Normal User
- 📝 Sign up and log in.
- 🔑 Update password after logging in.
- 🏪 View a list of all registered stores.
- 🔍 Search for stores by name and address.
- ⭐ Submit, view, and modify ratings (1-5) for stores.
- 🔓 Logout functionality.

### 🏬 Store Owner
- 🔑 Log in and update password.
- 📊 View a dashboard displaying:
  - 👥 List of users who rated their store.
  - ⭐ Average store rating.
- 🔓 Logout functionality.

## ✅ Form Validations
- **📛 Name**: Min 20 characters, Max 60 characters.
- **🏠 Address**: Max 400 characters.
- **🔑 Password**: 8-16 characters, must include at least one uppercase letter and one special character.
- **📧 Email**: Must follow standard email validation rules.

## 🚀 Additional Features
- 🔄 All tables support sorting (ascending/descending) for key fields (Name, Email, etc.).
- ✅ Best practices followed for both frontend and backend development.
- 🎯 Optimized database schema design adhering to best practices.

## ⚙️ Installation and Setup
1. 📥 Clone the repository:
   ```sh
   git clone https://github.com/Jagapathi55/Store_Rating_Management.git
   ```
2. 📂 Navigate to the project directory:
   ```sh
   cd Store_Rating_Management
   ```
3. 📦 Install backend dependencies:
   ```sh
   cd backend
   npm install
   ```
4. ⚙️ Configure database connection in `.env` file.
5. ▶️ Run the backend server:
   ```sh
   npm start
   ```
6. 📦 Install frontend dependencies:
   ```sh
   cd ../frontend
   npm install
   ```
7. ▶️ Start the frontend application:
   ```sh
   npm start
   ```
8. 🌐 Access the application at `http://localhost:3000`.

## 🤝 Contributing
Feel free to fork the repository, make changes, and submit pull requests.

## 📜 License
This project is licensed under the MIT License.

---
**👨‍💻 Author**: [Jagapathi]  
**🐙 GitHub**: [Jagapathi55](https://github.com/Jagapathi55)

