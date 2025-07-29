# YarnWrangler

A web application for organizing and managing knitting patterns, built with Next.js and PostgreSQL.

## Features

- **Pattern Management**: Upload and organize knitting patterns (PDF/text files)
- **Metadata Storage**: Store pattern source, personal notes, and searchable tags
- **Pattern Library**: Browse and search your pattern collection
- **File Viewer**: View PDF patterns directly in the browser

## Tech Stack

- **Frontend**: Next.js 14+ with App Router, React 18+, TypeScript
- **Backend**: Next.js API routes
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **File Handling**: Multer for uploads, PDF.js for viewing

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jo-oikawa/YarnWrangler.git
   cd YarnWrangler
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and configure your database connection:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/yarnwrangler"
   ```

4. Set up the database:
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database (for development)
   npm run db:push
   
   # Or run migrations (for production)
   npm run db:migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses a simple but extensible database schema. See [`docs/design.md`](docs/design.md) for the complete database design and expansion strategy.

### Current MVP Schema (Phase 1):
- **Patterns**: Core pattern management with file storage and metadata

### Planned Expansions:
- **Users**: Authentication and user management
- **Projects**: Project tracking and pattern-to-project relationships
- **Yarn Inventory**: Yarn stash management and project planning
- **Photos**: Image attachments for projects and patterns

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database (development)
- `npm run db:migrate` - Run database migrations (production)
- `npm run db:studio` - Open Prisma Studio

## Project Structure

```
YarnWrangler/
├── docs/                    # Documentation
│   ├── design.md           # Database schema design
│   ├── PLANNING.md         # Project planning
│   └── SPEC.md             # Full specification
├── src/
│   ├── app/                # Next.js App Router
│   ├── components/         # React components
│   └── lib/                # Utilities and configurations
├── prisma/                 # Database schema and migrations
├── public/
│   └── uploads/            # File storage (development)
├── __tests__/              # Test files
└── package.json           # Dependencies and scripts
```

## Development

### Database Changes

When modifying the database schema:

1. Edit `prisma/schema.prisma`
2. Run `npm run db:push` for development, or
3. Run `npm run db:migrate` to create a migration

### Adding New Features

The database schema is designed for incremental development:

1. Start with the current Pattern-only implementation
2. Add User authentication when needed
3. Implement Project tracking
4. Add Yarn inventory management
5. Extend with additional features as planned

See [`docs/design.md`](docs/design.md) for the complete expansion roadmap.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.

---

**Current Status**: MVP Phase 1 - Pattern Management
**Next Phase**: User Authentication and Project Tracking