# Movie Watchlist Application

A movie management REST API built with Node.js, Express.js, PostgreSQL, and Prisma. Users can authenticate, manage movies, and maintain a personal watchlist with ratings and viewing statuses.

## Tech Stack
- Node.js and Express.js
- PostgreSQL and Prisma ORM
- JWT Authentication
- bcryptjs for password hashing
- Zod for request validation

## Features
- User registration and login
- JWT-based authentication
- Movie management
- Add and remove movies from a watchlist
- Update watchlist status, ratings, and notes
- Request validation

## Installation

```bash
git clone https://github.com/7epbBCwM/Node_Backend.git
cd Node_Backend
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_secret_key"
JWT_EXPIRES_IN="7d"
NODE_ENV="development"
```

## Run the Application

```bash
npx prisma generate
npm run dev
```

## Author

GitHub: [7epbBCwM](https://github.com/7epbBCwM)
