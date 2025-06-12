# 📝 Task Management Web App

A web application for managing personal or team tasks. Users can create groups, assign tasks, and track progress collaboratively. Built with **React.js + TailwindCSS** for the frontend and **ASP.NET Core Web API + Entity Framework Core** for the backend, using **MySQL** as the database.

---

## 🚀 Key Features

- 🔐 User registration, login, and role-based authorization
- 👥 Create or join groups via group code
- ✅ Create and assign tasks to group members
- 📅 Track task status (Pending, In Progress, Done)
- 🧑‍🤝‍🧑 Manage group members (Leader, Member)
- 📊 Monitor task progress with status updates
- 🔄 Seamless communication between frontend and backend via RESTful APIs

---

## 🛠️ Technologies Used

### 📌 Frontend

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- React Router, Axios

### 📌 Backend

- [ASP.NET Core Web API](https://dotnet.microsoft.com/en-us/apps/aspnet)
- [Entity Framework Core (EF Core)](https://learn.microsoft.com/en-us/ef/core/)
- JWT Authentication
- RESTful API design

### 📌 Database

- [MySQL](https://www.mysql.com/)

---


# Getting Started with ASP.NET Core

This project was built using **ASP.NET Core**.

## Available Commands

In the project directory, you can run:

### `dotnet run`

Runs the app in development mode.  
Open `http://localhost:5000` or `https://localhost:5001` to view it in your browser (depending on your launch settings).

The app will restart automatically when you make code changes.

---

### `dotnet watch run`

Runs the app and watches for file changes.  
Good for development and debugging.

---

### `dotnet build`

Builds the application and all its dependencies.

---

### `dotnet publish`

Builds and publishes the app for production to the `bin/Release/netX/publish` folder.  
Replace `netX` with your .NET version (e.g., `net6.0` or `net7.0`).

---

### `dotnet test`

Runs all unit tests in the solution (if available).

---

## Project Structure

├── Controllers/ # API or MVC controllers
├── Models/ # Data models or entities
├── Data/ # Database context and seeding
├── Services/ # Business logic
├── Program.cs # Main entry point
└── appsettings.json # App configuration

