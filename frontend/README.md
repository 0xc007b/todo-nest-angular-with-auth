# TodoNest - Task Management Application

TodoNest is a full-stack task management application built with Angular and NestJS. It allows users to create, manage, and track their daily tasks with an authentication system to keep user data private and secure.


## Features

- **User Authentication**
  - Registration with email and username
  - Secure login system
  - JWT-based authentication
  
- **Task Management**
  - Create new tasks with title and description
  - View all user tasks
  - Mark tasks as completed
  - Edit existing tasks
  - Delete tasks
  - Search functionality
  
- **Responsive Design**
  - Works on desktop and mobile devices
  - Clean and intuitive UI

## Technologies Used

### Frontend
- Angular 19
- TailwindCSS for styling
- Custom component library including:
  - Button component
  - Input component
  - Navbar component

### Backend
- NestJS
- PostgreSQL database
- JWT for authentication

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/        # Reusable components
│   │   │   ├── core/          # Core UI components
│   │   │   └── navbar/        # Navigation
│   │   ├── dashboard/         # Dashboard feature module
│   │   │   └── new-todo/      # Create new task feature
│   │   ├── entities/          # Data models
│   │   ├── login/             # Login feature
│   │   ├── register/          # Registration feature
│   │   ├── app.component.*    # Root component
│   │   ├── app.routes.ts      # Application routes
│   │   ├── auth.service.ts    # Authentication service
│   │   └── todos.service.ts   # Tasks service
│   ├── environments/          # Environment configurations
│   └── styles.css             # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Angular CLI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-nest-angular-with-auth.git
   cd todo-nest-angular-with-auth
   ```

2. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```

4. Configure the database connection in the backend.

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run start:dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   ng serve
   ```

3. Open your browser and navigate to `http://localhost:4200`

## Core Components

### Button Component

A versatile button component with various styles, states, and options:

- Multiple variants (primary, secondary, danger, etc.)
- Different appearances (solid, outline, ghost)
- Loading state
- Icon support
- Size options

### Input Component

A flexible input component for form controls:

- Different types (text, password, search, etc.)
- Success and error states
- Label support
- Password visibility toggle
- Mask support for formatted inputs

## Authentication Flow

1. User registers with email, username, and password
2. Upon login, the server returns a JWT token
3. Token is stored in localStorage
4. All API requests include the token in Authorization header
5. Protected routes verify the user is authenticated

## Environment Configuration

The application uses environment-specific configuration for API URLs:

- Development: `http://localhost:3000`
- Production: Configured for your production API

## Deployment

For production deployment:

1. Build the frontend:
   ```bash
   cd frontend
   ng build --configuration production
   ```

2. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

3. Deploy the built applications to your hosting provider of choice.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
