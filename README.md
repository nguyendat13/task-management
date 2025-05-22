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

