# Ledger

A full-stack note-taking application built with Next.js, TypeScript, and modern web technologies.

## Description

Ledger is a responsive web application that allows users to create, manage, and organize their notes. It features user authentication, a clean dashboard interface, and a RESTful API for note management operations.

## Features

- 🔐 User Authentication (Login/Signup)
- 📝 Create, Read, Update, Delete notes
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design
- 🔒 JWT-based authentication
- 🗃️ Database integration
- ⚡ Built with Next.js 15 and React 19

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: JWT tokens
- **Database**: MySQL
- **UI Components**: Radix UI
- **Development**: pnpm, ESLint, PostCSS

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
   git clone https://github.com/YashPalav-26/Ledger.git
   cd ledger
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
# Database Configuration
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=notes_manager

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

```

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
  "name": "John Doe"
}
```

#### GET `/api/auth/me`
Get current user information (requires authentication).

### Notes Endpoints

#### GET `/api/notes`
Get all notes for the authenticated user.

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

#### DELETE `/api/notes/[id]`
Delete a specific note.

## Project Structure

```
notes-manager/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── me/
│   │   └── notes/
│   ├── dashboard/
│   ├── login/
│   ├── signup/
│   └── globals.css
├── components/
│   ├── auth/
│   ├── notes/
│   ├── ui/
│   └── theme-provider.tsx
├── contexts/
│   ├── auth-context.tsx
│   └── notes-context.tsx
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   ├── db.ts
│   └── utils.ts
├── scripts/
│   └── database-setup-scripts/
└── public/
```

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