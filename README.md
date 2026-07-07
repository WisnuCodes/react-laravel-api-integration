# React Laravel API Integration

A frontend application built with **React** and **Vite** that integrates with a **Laravel REST API**. The application demonstrates user authentication, protected routes, user management, and product catalog features while following a modern component-based architecture.

---

## Overview

This project serves as the frontend client for a Laravel REST API. It communicates with the backend using Axios, manages authentication through Laravel Sanctum, and provides a responsive user interface built with Material UI.

---

## Features

* User authentication with Laravel Sanctum
* Login and registration
* Automatic login after successful registration
* Protected routes for authenticated users
* User list with pagination
* User detail page
* Product catalog
* Automatic token management using Axios Interceptors
* Global authentication state using React Context API
* Responsive user interface with Material UI

---

## Tech Stack

| Technology        | Description                            |
| ----------------- | -------------------------------------- |
| React             | Frontend library                       |
| Vite              | Build tool and development server      |
| React Router DOM  | Client-side routing                    |
| Material UI       | UI component library                   |
| Emotion           | Styling engine for Material UI         |
| Axios             | HTTP client for REST API communication |
| React Context API | Global authentication state management |
| ESLint            | Code linting and quality assurance     |

---

## Installation

Clone the repository:

```bash
git clone https://github.com/WisnuCodes/react-laravel-api-integration.git
cd react-laravel-api-integration
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

Before running the frontend application, ensure that the Laravel backend is running at `http://localhost:8000`.

---

## API Endpoints

| Method | Endpoint          | Description                   |
| ------ | ----------------- | ----------------------------- |
| POST   | `/api/login`      | Authenticate a user           |
| POST   | `/api/register`   | Register a new user           |
| POST   | `/api/logout`     | Logout the authenticated user |
| GET    | `/api/users`      | Retrieve all users            |
| GET    | `/api/users/{id}` | Retrieve user details         |
| GET    | `/api/products`   | Retrieve product catalog      |

---

## Repositories

### Frontend

* https://github.com/WisnuCodes/react-laravel-api-integration

### Backend

* https://github.com/WisnuCodes/order-management-api

---

## Notes

* Authentication is implemented using Laravel Sanctum.
* Access tokens are automatically attached to authenticated requests using Axios Interceptors.
* Authentication state is managed globally with React Context API.
* The project follows a reusable, component-based architecture for better scalability and maintainability.

---

## Author

**Wisnu Nugraha**

GitHub: https://github.com/WisnuCodes
