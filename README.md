# Express TypeScript REST API

A robust RESTful API built with Express.js, TypeScript, and TypeORM, following best practices for scalability and maintainability.

## Features

- TypeScript for type safety
- Express.js for the web framework
- TypeORM for database operations
- MySQL database support
- Environment configuration
- Request validation
- Error handling
- CORS enabled
- API documentation (TBD)

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Copy `.env.example` to `.env`
   - Update the database configuration in `.env`

4. **Database setup**
   - Create a MySQL database
   - Update the connection details in `.env`

5. **Run migrations (if any)**
   ```bash
   # Add migration commands here when you have them
   ```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Project Structure

```
src/
├── modules/               # Feature modules
│   └── users/            # User module
│       ├── controllers/   # Request handlers
│       ├── services/      # Business logic
│       ├── routes/        # Route definitions
│       ├── entities/      # TypeORM entities
│       └── validators/    # Request validators
├── shared/                # Shared utilities
│   ├── config/           # Configuration files
│   ├── database/         # Database connection and utils
│   └── middleware/       # Global middleware
└── main.ts               # Application entry point
```

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development, production, test)
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
