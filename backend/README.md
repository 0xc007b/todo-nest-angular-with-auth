# Todo List with Authentication - NestJS API

This is a backend API for a Todo List application with authentication, built using NestJS, Prisma ORM, and JWT for authentication.

## Features

- User authentication (register, login, logout)
- JWT-based authentication
- RESTful API for todos management
- User management

## Project Structure

The project follows a modular structure with the following main components:

- **Auth Module**: Handles user authentication and authorization
- **Users Module**: Manages user data and operations
- **Todos Module**: Manages todos for authenticated users
- **Prisma Service**: Database connectivity layer

## API Endpoints

### Authentication

- `POST /auth/register`: Register a new user
- `POST /auth/login`: Login with existing credentials
- `POST /auth/logout`: Logout current user

### Users

- `GET /users`: Get all users
- `GET /users/me`: Get current authenticated user
- `GET /users/:id`: Get user by ID
- `PATCH /users/:id`: Update user
- `DELETE /users/:id`: Delete user

### Todos

- `GET /todos`: Get all todos for the authenticated user
- `GET /todos/:id`: Get a specific todo
- `POST /todos`: Create a new todo
- `PATCH /todos/:id`: Update a todo
- `DELETE /todos/:id`: Delete a todo

## Authentication Flow

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Server issues a JWT token
3. Client includes this token in subsequent requests via Bearer Authentication
4. AuthGuard validates the token for protected routes

## Data Models

### User

```typescript
{
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Todo

```typescript
{
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- PostgreSQL or other database supported by Prisma

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/mydatabase"
   JWT_SECRET="your-jwt-secret"
   ```
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the server:
   ```bash
   npm run start:dev
   ```

## Development

### Running Tests

```bash
npm test
```

### API Documentation

The API uses Swagger for documentation. After starting the server, visit `/api-docs` to see the interactive API documentation.

## Security

- Passwords are hashed using bcrypt
- JWT tokens for secure authentication
- Guards for route protection

## Dependencies

- NestJS - Progressive Node.js framework
- Prisma - Next-generation ORM
- Passport - Authentication middleware
- JWT - JSON Web Tokens for authentication
- bcrypt - Password hashing
