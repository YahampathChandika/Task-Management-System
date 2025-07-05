# Task Management System - Frontend

A modern task management application built with React. Manage employees, assign tasks, and track progress with a clean, responsive interface.

## Features

- **User Authentication** - Secure login with JWT tokens
- **Employee Management** - Add, edit, and delete employees
- **Task Management** - Create tasks, assign to employees, track status
- **Dashboard** - Overview of tasks, employees, and key metrics
- **Dark/Light Mode** - Toggle between themes
- **Mobile Responsive** - Works great on all devices

## Tech Stack

- React 19 with Vite
- RTK Query for API calls
- Tailwind CSS for styling
- shadcn/ui components
- React Router for navigation

## Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/YahampathChandika/Task-Management-System.git
   cd task-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. **Start the app**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Go to `http://localhost:5173`

## Backend Required

This frontend needs the backend services running:
- API Gateway: `localhost:3000`
- Auth Service: `localhost:3001`
- Employee Service: `localhost:3002`
- Task Service: `localhost:3003`

## Project Structure

```
src/
├── components/          # UI components
│   ├── ui/             # shadcn/ui components
│   ├── employees/      # Employee components
│   ├── tasks/          # Task components
│   └── dashboard/      # Dashboard components
├── pages/              # Page components
├── store/              # Redux store & API
└── App.jsx            # Main app
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Endpoints

The app connects to these backend endpoints:

- `POST /auth/login` - User login
- `GET /employees` - Get all employees
- `POST /employees` - Create employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee
- `GET /tasks` - Get all tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PUT /tasks/:id/assign` - Assign task to employee

## Development

1. Make sure backend services are running
2. Install dependencies: `npm install`
3. Start dev server: `npm run dev`
4. Make your changes
5. Test on both desktop and mobile

## Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Test everything works
5. Submit a pull request

---

Need help? Create an issue or contact yhmpth@gmail.com
