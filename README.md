# The Wild Oasis

A modern hotel management dashboard built with **React, TypeScript, and a custom Express + PostgreSQL backend**, designed to manage cabins, bookings, guests, and business operations through a scalable and production-oriented architecture.

This project demonstrates advanced frontend engineering practices including React design patterns, state management strategies, and real-world API integration.

---

## Overview

The Wild Oasis is a full-featured hotel management system that allows hotel staff to manage:

- Cabins
- Bookings
- Guests
- Check-in / Check-out workflows
- Business analytics dashboard

The application is built with a strong focus on scalability, maintainability, and clean architecture.

---

## Features

### Core Features

- Cabin Management (CRUD operations)
- Booking Management
- Guest Management
- Check-in / Check-out system
- Dashboard with business overview
- Advanced filtering system
- Dynamic sorting
- Pagination (implemented for large datasets)
- Form validation with schema-based rules
- Toast notifications for user feedback
- Responsive UI design

---

### State & Data Management

- Server State Management with React Query
- Optimistic updates
- Background refetching
- Query caching & synchronization

---

### UI / UX Features

- Reusable component system
- Loading & error states handling
- Error Boundaries for crash prevention
- Dark mode (implemented using CSS Variables)
- Consistent design system

---

## React Patterns & Architecture

This project applies advanced React patterns to improve scalability and maintainability.

### Compound Components

Used in complex UI systems such as:

- Modals
- Context Menus

This pattern allows implicit shared state and flexible composition.

---

### Higher-Order Components (HOC)

Used to encapsulate reusable logic and cross-cutting concerns such as:

- Access control wrappers
- Behavioral enhancements

---

### Render Props

Used where dynamic rendering logic is required while keeping components reusable and decoupled.

---

### Custom Hooks

Encapsulate reusable logic and API interactions, improving separation of concerns and reducing duplication.

---

### Component Composition

The entire UI is built using composition over inheritance, ensuring high reusability and flexibility.

---

## Architecture

Feature-based architecture is used to ensure scalability and separation of concerns.

src
├── features
│ ├── bookings
│ ├── cabins
│ ├── guests
│ ├── settings
│ ├── check-in-out
│ ├── dashboard
│ └── auth
│
├── ui
│ └── reusable components
│
├── pages
│
├── hooks
│
├── context
│
├── services
│
├── utils
│
└── styles

````

---

## Tech Stack

### Frontend

* React 18
* TypeScript
* Vite
* React Router DOM

### State Management

* TanStack Query (React Query)
* Context API

### Forms & Validation

* React Hook Form
* Zod

### Styling

* Styled Components
* CSS Variables (Dark Mode Support)

### API Communication

* Axios

### UI & Utilities

* date-fns
* React Hot Toast
* React Icons

### Backend

Custom backend built with:

* Express.js
* Prisma ORM
* PostgreSQL

---

## Performance Optimizations

* React Query caching strategy
* Background data synchronization
* Optimized rendering patterns
* Component reusability
* Efficient state separation
* Pagination for large datasets
* Lazy data fetching

---

## Error Handling

* Global Error Boundaries
* API-level error handling
* User-friendly error feedback
* Safe UI fallback states

---

## Authentication & Authorization (Planned)

* JWT Authentication
* Refresh Token flow
* Role-Based Access Control (RBAC)
* Protected routes system

---

## Dark Mode (Planned)

* Implemented using CSS Variables
* Theme switching architecture prepared for scalability
* Easy extension for multiple themes

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/Soroush47/the-wild-oasis.git

cd the-wild-oasis
````

---

### Install Dependencies

```bash
npm install
```

---

### Environment Variables

```env
VITE_API_URL=http://localhost:3000/api
```

---

### Run Development Server

```bash
npm run dev
```

---

### Build for Production

```bash
npm run build
```

---

## Future Improvements

- Authentication & Authorization system
- Interactive charts (Recharts)
- Advanced analytics dashboard
- Real-time updates
- Testing (unit + integration + e2e)
- CI/CD pipeline
- Dockerization
- Performance monitoring

---

## Why This Project?

This project was built to demonstrate real-world frontend engineering skills beyond basic CRUD applications.

It showcases:

- Advanced React architecture
- Scalable state management strategies
- Real-world API integration
- Component design systems
- Professional UI/UX patterns
- Backend integration with custom API
- Production-ready frontend practices

---

## Project Status

🚧 Active Development

The project is continuously being improved with new features, architectural refinements, and performance enhancements.

---

## Author

**Soroush Ghasemi**

Frontend Developer | React / TypeScript Developer | Full-Stack JavaScript Enthusiast

GitHub: https://github.com/Soroush47
