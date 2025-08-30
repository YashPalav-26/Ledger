# Notes Manager

A full-stack note-taking application built with Next.js 15, TypeScript, and modern web technologies.

## Description

Notes Manager is a responsive web application that allows users to create, manage, and organize their notes. It features user authentication, a clean dashboard interface, and a RESTful API for note management operations. The application is production-ready with cloud database integration and optimized performance.

## Features

- 🔐 **User Authentication** (Login/Signup with JWT)
- 📝 **Full CRUD Operations** for notes
- 🎨 **Modern UI** with Tailwind CSS v4 and OKLCH colors
- 📱 **Responsive Design** for all devices
- 🔒 **Secure Authentication** with JWT tokens
- 🗃️ **Cloud Database Integration** (MySQL compatible)
- ⚡ **High Performance** with optimized logging
- 🏷️ **Note Categories** and search functionality
- ❤️ **Favorites System** for important notes
- 🎯 **Clean Architecture** with proper error handling
- 🌙 **Theme Support** with modern design system

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4 with OKLCH color format
- **Backend**: Next.js API Routes
- **Authentication**: JWT tokens with secure middleware
- **Database**: MySQL (Cloud deployment ready)
- **UI Components**: Radix UI, shadcn/ui components
- **Development**: pnpm, ESLint, PostCSS
- **Deployment**: Vercel-ready with environment configuration

## Table of Contents

- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd notes-manager
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up the database (see Environment Setup section)

4. Run the development server:
   ```bash
   pnpm dev
   ```

## Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# Database Configuration (required)
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=notes_manager
DB_PORT=3306

# JWT Configuration (required)
JWT_SECRET=your_jwt_secret_key_here
```

**Important Notes:**
- For production deployment (Vercel), use a cloud database (PlanetScale, Railway, AWS RDS)
- Set environment variables in Vercel project dashboard under Settings → Environment Variables
- Use the `/api/health` endpoint to verify your configuration
- Test scripts are available: `test-config.sh` (Unix) or `test-config.bat` (Windows)

## Development

Start the development server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## API Documentation

### Health Check

#### GET `/api/health`
Check application and database connectivity status.

**Response:**
```json
{
  "status": "healthy",
  "message": "All systems operational",
  "timestamp": "2024-08-30T..."
}
```

### Authentication Endpoints

#### POST `/api/auth/login`
Authenticate user and return JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### GET `/api/auth/me`
Get current user information (requires authentication).

### Notes Endpoints

#### GET `/api/notes`
Get all notes for the authenticated user. Supports filtering and search.

**Query Parameters:**
- `category`: Filter by category (optional)
- `search`: Search in title and content (optional)

#### POST `/api/notes`
Create a new note.

**Request Body:**
```json
{
  "title": "Note Title",
  "content": "Note content here...",
  "category": "personal"
}
```

#### GET `/api/notes/[id]`
Get a specific note by ID.

#### PUT `/api/notes/[id]`
Update a specific note.

**Request Body:**
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "category": "work",
  "isFavorite": true
}
```

#### DELETE `/api/notes/[id]`
Delete a specific note.

## Project Structure

```
notes-manager/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/           # Login API route
│   │   │   ├── signup/          # Signup API route
│   │   │   └── me/              # Get current user route
│   │   ├── health/              # Health check endpoint
│   │   │   └── route.ts
│   │   └── notes/               # Notes CRUD endpoints
│   │       ├── [id]/            # Individual note operations
│   │       └── route.ts         # Notes collection operations
│   ├── dashboard/               # Dashboard page
│   │   └── page.tsx
│   ├── forgot-password/         # Password reset page
│   │   └── page.tsx
│   ├── login/                   # Login page
│   │   └── page.tsx
│   ├── signup/                  # Registration page
│   │   └── page.tsx
│   ├── error.tsx                # Global error boundary
│   ├── globals.css              # Global styles with Tailwind imports
│   ├── layout.tsx               # Root layout component
│   ├── loading.tsx              # Global loading UI
│   ├── not-found.tsx            # 404 page
│   └── page.tsx                 # Home/landing page
├── components/                   # React components
│   ├── auth/                    # Authentication components
│   │   ├── login-form.tsx
│   │   ├── protected-route.tsx
│   │   └── signup-form.tsx
│   ├── notes/                   # Notes-related components
│   │   ├── note-card.tsx
│   │   ├── note-form.tsx
│   │   ├── notes-grid.tsx
│   │   └── notes-header.tsx
│   ├── ui/                      # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── toast.tsx
│   │   └── ... (40+ other UI components)
│   └── theme-provider.tsx       # Theme context provider
├── contexts/                    # React contexts
│   ├── auth-context.tsx         # Authentication state management
│   └── notes-context.tsx        # Notes state management
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile detection hook
│   └── use-toast.ts            # Toast notifications hook
├── lib/                         # Utility libraries
│   ├── api.ts                  # API client functions
│   ├── auth.ts                 # Authentication utilities
│   ├── db.ts                   # Database connection
│   └── utils.ts                # General utilities
├── public/                      # Static assets
│   ├── notes-taking-img.png    # Landing page image
│   ├── placeholder-logo.png    # Logo placeholder
│   ├── placeholder-logo.svg    # SVG logo placeholder
│   ├── placeholder-user.jpg    # User avatar placeholder
│   ├── placeholder.jpg         # General placeholder image
│   └── placeholder.svg         # General placeholder SVG
├── scripts/                     # Database setup scripts
│   ├── 01-create-database.sql  # Database creation
│   ├── 02-create-users-table.sql # Users table schema
│   ├── 03-create-notes-table.sql # Notes table schema
│   └── 04-seed-sample-data.sql # Sample data insertion
├── styles/                      # Additional stylesheets
│   └── globals.css             # Legacy global styles
├── types/                       # TypeScript type definitions
│   └── modules.d.ts            # Module declarations
├── .env                        # Environment variables (local)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── components.json             # shadcn/ui configuration
├── next-env.d.ts               # Next.js TypeScript declarations
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
├── pnpm-lock.yaml              # pnpm lockfile
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── vercel.json                 # Vercel deployment configuration
```

### Key Architecture Components

- **App Router Structure**: Uses Next.js 15 App Router for file-based routing
- **API Routes**: RESTful API with proper authentication middleware
- **Component Architecture**: Modular components with clear separation of concerns
- **State Management**: Context-based state management for auth and notes
- **Database Integration**: MySQL connection with prepared statements
- **UI System**: shadcn/ui components with Tailwind CSS v4 styling
- **Type Safety**: Full TypeScript implementation with proper type definitions

## Missing Elements & Recommendations

### Currently Missing (Optional Enhancements)

1. **Testing Infrastructure**
   - Unit tests (Jest/React Testing Library)
   - Integration tests for API endpoints
   - E2E tests (Playwright/Cypress)
   - Test configuration files

2. **Development Tools**
   - ESLint configuration file
   - Prettier configuration
   - Husky git hooks for pre-commit checks
   - VS Code workspace settings

3. **Documentation**
   - API documentation (OpenAPI/Swagger)
   - Component documentation (Storybook)
   - Database schema documentation
   - Deployment guide

4. **Monitoring & Analytics**
   - Error tracking (Sentry)
   - Performance monitoring
   - User analytics
   - Logging configuration

5. **Security Enhancements**
   - Rate limiting middleware
   - CORS configuration
   - Security headers
   - Input validation schemas

6. **Performance Optimization**
   - Image optimization
   - Bundle analysis tools
   - Caching strategies
   - Service worker/PWA features

7. **Backup & Recovery**
   - Database backup scripts
   - Data migration tools
   - Recovery procedures

### Recommended Next Steps

1. **Add Testing** - Start with unit tests for utilities and components
2. **Configure Linting** - Set up ESLint and Prettier for code quality
3. **API Documentation** - Document all endpoints with OpenAPI
4. **Performance Monitoring** - Add basic analytics and error tracking
5. **Security Hardening** - Implement rate limiting and input validation

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [YashPalav-26](https://github.com/YashPalav-26)
- Email: yashpalav48@gmail.com

## Acknowledgements

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React](https://reactjs.org/) - UI library