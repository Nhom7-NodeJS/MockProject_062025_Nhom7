# Express TypeScript REST API

A robust RESTful API built with Express.js, TypeScript, and TypeORM, following best practices for scalability and maintainability.

## Development Priorities

### Completed
- [x] Basic CRUD operations
- [x] Database setup (TypeORM + MySQL)
- [x] API response formatting
- [x] Environment configuration

### In Progress
- [ ] Input Validation
  - [ ] Enhance update operation validation
  - [ ] Add query parameter validation
  - [ ] Validate email format
  - [ ] Add password strength requirements

- [ ] Error Handling
  - [ ] More specific error messages
  - [ ] Handle duplicate email errors
  - [ ] Add error codes for different scenarios
  - [ ] Improve validation error responses

### Next Up
- [ ] Security
  - [ ] JWT Authentication
  - [ ] Password hashing (bcrypt)
  - [ ] Protected routes
  - [ ] Rate limiting

- [ ] API Improvements
  - [ ] Add search functionality
  - [ ] Implement filtering
  - [ ] Add sorting options
  - [ ] Response caching

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/nmnguyen130/Express-REST-API.git
   cd Express-REST-API
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

5. **Run database migrations**
   ```bash
   # Run pending migrations
   npm run migration:run
   
   # (Optional) If you need to undo the last migration
   # npm run migration:revert
   ```
   
   After making changes to your entities, create a new migration:
   ```bash
   npm run migration:generate src/migrations/YourMigrationName
   ```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier

## Database Migrations

Migrations help manage your database schema changes. Here are the available scripts:

- `npm run migration:run` - Run all pending migrations
- `npm run migration:revert` - Revert the last migration
- `npm run migration:generate` - Create a new migration
- `npm run migration:show` - Show migration status

**Note:** All database schema changes should be done through migrations, not by directly modifying the database.

## Project Structure

```
src/
├── migrations/                   # Database migration files
├── modules/                      # Feature modules
│   └── users/                    # User module
│       ├── dto/                  # Data Transfer Objects
│       ├── entities/             # TypeORM entities
│       ├── user.controller.ts    # Request handlers
│       ├── user.routes.ts        # Route definitions
│       ├── user.service.ts       # Business logic
├── shared/                       # Shared utilities  
│   ├── config/                   # Configuration management
│   ├── constants/                # Application constants
│   ├── database/                 # Database connection and utils
│   ├── dto/                      # Data Transfer Objects
│   ├── interfaces/               # TypeScript interfaces
│   ├── middleware/               # Global middleware
│   └── utils/                    # Utility functions
└── main.ts                       # Application entry point
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

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [MySQL](https://www.mysql.com/)
