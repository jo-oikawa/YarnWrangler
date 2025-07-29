# YarnWrangler Project Planning

## Objective
Bootstrap a local development environment for YarnWrangler, enabling rapid prototyping and testing.

## Planning Overview
This document outlines the key components, setup steps, and recommended order for building and testing YarnWrangler locally.

---

## 1. Project Initialization
- Choose tech stack (language, framework)
- Initialize project structure (folders, files)
- Set up version control (Git)

## 2. Local Development Environment
- Install dependencies (package manager: npm/yarn/pip/etc.)
- Configure environment variables
- Set up code editor (VS Code recommended)
- Add basic README with setup instructions

## 3. MVP Definition: Pattern Upload & Management Web App
**Core Features for Initial Build:**
- Upload knitting patterns (PDF/text files)
- Store pattern metadata (source, personal notes, tags)
- View uploaded patterns in a web interface
- Basic pattern listing with search/filter capability

**Key Components:**
- File upload system with validation
- Database for pattern metadata
- Web interface for pattern management
- File storage solution (local or cloud)

## 4. Testing & Validation
- Set up testing framework (Jest for JavaScript, pytest for Python)
- Write tests for file upload functionality
- Test pattern metadata storage and retrieval
- Manual testing for pattern viewing and user interface
- Cross-browser compatibility testing

## 5. Iteration & Expansion
- Plan for future features (yarn inventory, project tracking)
- Document user feedback and improvement requests
- Performance optimization for large pattern collections
- Mobile responsiveness improvements

---

## Setup TODO List
**Phase 1: Foundation (Days 1-2)**
1. ✅ Choose Tech Stack for Web App - **COMPLETED: Next.js Stack Selected**
2. ✅ Initialize Project Structure - **COMPLETED: Next.js app structure created**
3. ✅ Set up Git Repository - **COMPLETED: Git initialized and first commit made**
4. ✅ Create Package Configuration - **COMPLETED: package.json with all dependencies**

**Phase 2: Core Infrastructure (Days 3-4)**
6. ✅ Design Database Schema
7. ✅ Set up File Storage Solution
8. ✅ Create Environment Configuration
9. ✅ Set up Testing Framework

**Phase 3: MVP Features (Days 5-7)**
10. ✅ Implement File Upload Functionality
11. ✅ Add Pattern Metadata Form
12. ✅ Build Pattern Listing Interface
13. ✅ Implement Pattern Viewer

**Phase 4: Documentation & Testing (Day 8)**
14. ✅ Write Basic README
15. ✅ Create MVP Test Plan

---

## ✅ SELECTED TECH STACK: Next.js Full-Stack

**Final Technology Choices:**
- **Frontend & Backend:** Next.js 14+ with App Router
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js (for future user accounts)
- **File Storage:** Local file system (development) → AWS S3 (production)
- **Styling:** Tailwind CSS
- **File Processing:** PDF.js for PDF preview, Multer for uploads
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel (seamless Next.js integration)

**Why This Stack:**
- Single codebase for frontend and backend (faster development)
- Built-in API routes perfect for file uploads
- Excellent PDF handling with PDF.js
- Type-safe database queries with Prisma
- Easy deployment and scaling path

**Development Dependencies:**
```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@prisma/client": "^5.0.0",
    "multer": "^1.4.5",
    "pdfjs-dist": "^3.11.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "prisma": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0"
  }
}
```

---

## Recommended Tech Stack Options

**Option 1: JavaScript/Node.js Stack**
- Frontend: React with Next.js (built-in API routes, great for file uploads)
- Backend: Next.js API routes or Express.js
- Database: PostgreSQL with Prisma ORM
- File Storage: Local storage initially, AWS S3 for production
- Styling: Tailwind CSS for quick UI development

**Option 2: Python Stack**
- Frontend: React (separate from backend)
- Backend: FastAPI (excellent for file uploads and automatic API docs)
- Database: PostgreSQL with SQLAlchemy
- File Storage: Local storage initially, cloud storage later
- Styling: Tailwind CSS or Material-UI

**Recommended: Start with Option 1 (Next.js)** for rapid prototyping and built-in file upload capabilities.

---

## Notes
- Update this doc as the project evolves
- Use checklists for progress tracking
- Link to relevant resources and documentation
