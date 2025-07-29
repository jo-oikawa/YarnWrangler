# YarnWrangler Specification Outline

## 1. Introduction
- Purpose of the application
- Target users
- Overview of features

## 2. Features
### 2.1 Project Tracking
- Add, edit, and delete knitting projects
- Store project details (name, description, status, deadlines)
- Attach photos to projects

### 2.2 Pattern Management
- Store and organize knitting patterns
- Link patterns to projects
- Support for PDF/image uploads

### 2.3 Yarn Inventory
 Add, edit, and delete yarn entries
 Track yarn details (brand, color, weight, quantity)
 Search and filter inventory
 Mark yarn as 'in stash', 'wishlist', or 'purchased'
 Link yarn to planned or current projects

### 2.4 Planning & Scheduling
 Plan future projects
 Set reminders and deadlines
 Project planning assistant:
	 - Suggest yarn types and quantities based on selected patterns
	 - Track needle inventory and highlight gaps for upcoming projects
	 - Match yarn found in-store to suitable patterns/projects
	 - Calculate required yarn amounts for new projects
	 - Shopping list generation for missing supplies

### 2.5 Photo Storage
 Upload and organize photos for projects and patterns

 ### 2.6 Shopping & Matching Assistant
 - Match yarn to patterns/projects
 - Generate shopping lists for yarn, needles, and other supplies
 - Mobile-friendly features for use while shopping
## 3. User Interface
- Dashboard overview
- Project list and detail views
- Inventory management screens
- Pattern library

## 4. Data Model
- Project schema
- Pattern schema
- Yarn inventory schema
- Photo storage schema

## 5. Technical Requirements
**✅ SELECTED TECH STACK: Next.js Full-Stack Application**

### 5.1 Platform & Architecture
- **Platform:** Web application (responsive design for mobile/desktop)
- **Architecture:** Full-stack Next.js with API routes
- **Deployment:** Vercel (development/production)

### 5.2 Technology Stack
- **Frontend Framework:** Next.js 14+ with App Router
- **UI Library:** React 18+ with TypeScript
- **Styling:** Tailwind CSS for responsive design
- **Database:** PostgreSQL with Prisma ORM
- **File Storage:** Local filesystem (dev) → AWS S3 (production)
- **Authentication:** NextAuth.js (future implementation)

### 5.3 File Handling
- **Upload Processing:** Multer middleware for multipart/form-data
- **PDF Viewing:** PDF.js for in-browser PDF rendering
- **File Validation:** MIME type checking, file size limits
- **Storage Strategy:** Organized folder structure by upload date

### 5.4 Database Schema (Prisma)
```prisma
model Pattern {
  id          String   @id @default(cuid())
  title       String
  description String?
  source      String?  // Where pattern was obtained
  notes       String?  // Personal notes
  tags        String[] // Searchable tags
  fileName    String   // Original filename
  filePath    String   // Storage path
  fileType    String   // PDF, TXT, etc.
  fileSize    Int      // Size in bytes
  uploadDate  DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@map("patterns")
}
```

### 5.5 API Endpoints
- `POST /api/patterns/upload` - File upload with metadata
- `GET /api/patterns` - List patterns with filtering
- `GET /api/patterns/[id]` - Get specific pattern details
- `PUT /api/patterns/[id]` - Update pattern metadata
- `DELETE /api/patterns/[id]` - Remove pattern
- `GET /api/patterns/[id]/file` - Serve pattern file

## 6. Security & Privacy
- User authentication
- Data privacy considerations

## 7. Future Enhancements
- Community sharing
- Analytics and statistics

## 8. Appendix
- Glossary
- References
