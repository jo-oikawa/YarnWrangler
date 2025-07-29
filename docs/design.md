# YarnWrangler Database Schema Design

## Overview

This document proposes a simple but extensible database schema for YarnWrangler, designed to support the initial MVP while providing a foundation for future feature expansion.

## Design Principles

1. **Start Simple**: Begin with core entities that support the MVP functionality
2. **Design for Growth**: Structure relationships to allow easy extension
3. **Avoid Over-Engineering**: Don't implement complex features until needed
4. **PostgreSQL + Prisma**: Leverage relational database strengths with modern ORM

## Core Entities

### 1. User (Foundation for Future Auth)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String?  @unique  // Optional for now, required later
  username  String?  @unique  // Optional for now
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relationships (for future expansion)
  patterns  Pattern[]
  projects  Project[]
  yarns     Yarn[]
  
  @@map("users")
}
```

### 2. Pattern (Core MVP Entity)
```prisma
model Pattern {
  id          String   @id @default(cuid())
  title       String
  description String?
  source      String?   // Where pattern was obtained
  notes       String?   // Personal notes
  tags        String[]  // Searchable tags
  difficulty  String?   // beginner, intermediate, advanced
  
  // File information
  fileName    String    // Original filename
  filePath    String    // Storage path
  fileType    String    // PDF, TXT, etc.
  fileSize    Int       // Size in bytes
  
  // Metadata
  uploadDate  DateTime  @default(now())
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // Relationships
  userId      String?   // Optional for now, required when auth is added
  user        User?     @relation(fields: [userId], references: [id], onDelete: SetNull)
  projects    ProjectPattern[]  // Many-to-many with projects
  
  @@map("patterns")
}
```

### 3. Project (Basic Project Tracking)
```prisma
model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  status      String   @default("planned") // planned, in_progress, completed, on_hold
  startDate   DateTime?
  endDate     DateTime?
  notes       String?
  
  // Metadata
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relationships
  userId      String?  // Optional for now
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  patterns    ProjectPattern[]  // Many-to-many with patterns
  yarns       ProjectYarn[]     // Many-to-many with yarns
  
  @@map("projects")
}
```

### 4. Yarn (Basic Inventory)
```prisma
model Yarn {
  id          String   @id @default(cuid())
  brand       String?
  name        String   // Yarn name/color
  color       String?
  weight      String?  // Lace, DK, Worsted, etc.
  fiberContent String? // 100% wool, cotton blend, etc.
  yardage     Int?     // Total yards/meters
  quantity    Int      @default(1) // Number of skeins/balls
  status      String   @default("in_stash") // in_stash, wishlist, used, shopping_list
  
  // Purchase information
  purchaseDate DateTime?
  purchasePrice Float?
  store       String?
  
  // Notes
  notes       String?
  
  // Metadata
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relationships
  userId      String?  // Optional for now
  user        User?    @relation(fields: [userId], references: [id], onDelete: SetNull)
  projects    ProjectYarn[] // Many-to-many with projects
  
  @@map("yarns")
}
```

### 5. Junction Tables (Many-to-Many Relationships)

```prisma
model ProjectPattern {
  id        String  @id @default(cuid())
  projectId String
  patternId String
  notes     String? // Specific notes about using this pattern in this project
  
  project   Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  pattern   Pattern @relation(fields: [patternId], references: [id], onDelete: Cascade)
  
  @@unique([projectId, patternId])
  @@map("project_patterns")
}

model ProjectYarn {
  id           String  @id @default(cuid())
  projectId    String
  yarnId       String
  quantityUsed Int?    // How much yarn was/will be used
  notes        String? // Specific notes about using this yarn in this project
  
  project      Project @relation(fields: [projectId], references: [id], onDelete: Cascade)
  yarn         Yarn    @relation(fields: [yarnId], references: [id], onDelete: Cascade)
  
  @@unique([projectId, yarnId])
  @@map("project_yarns")
}
```

## MVP Implementation Strategy

### Phase 1: Pattern Management Only
- Implement only the `Pattern` model
- Skip `userId` relationships (leave as optional/null)
- Focus on file upload and basic pattern metadata

### Phase 2: Add User Authentication
- Implement `User` model
- Enable user registration/login
- Associate patterns with users

### Phase 3: Basic Project Tracking
- Implement `Project` and `ProjectPattern` models
- Allow users to create projects and link patterns

### Phase 4: Yarn Inventory
- Implement `Yarn` and `ProjectYarn` models
- Basic yarn inventory management
- Link yarns to projects

## Future Expansion Possibilities

### Additional Entities (Future)
```prisma
// Photo storage for projects and patterns
model Photo {
  id        String   @id @default(cuid())
  fileName  String
  filePath  String
  caption   String?
  projectId String?
  patternId String?
  // ... relationships
}

// Needle/tool inventory
model Needle {
  id       String @id @default(cuid())
  type     String // circular, straight, dpn
  size     String // US size or metric
  length   String? // for circulars
  material String? // bamboo, metal, etc.
  // ... relationships
}

// Shopping lists
model ShoppingList {
  id        String @id @default(cuid())
  name      String
  completed Boolean @default(false)
  // ... items relationship
}
```

### Relationship Extensions
- Add photo attachments to patterns and projects
- Implement needle requirements for patterns
- Add shopping list functionality
- Create pattern ratings and reviews
- Add pattern categories/collections

## Technical Considerations

### Database Indexes
```prisma
// Add indexes for common queries
model Pattern {
  // ... fields
  @@index([userId])
  @@index([tags])
  @@index([uploadDate])
}

model Project {
  // ... fields
  @@index([userId])
  @@index([status])
}
```

### Migration Strategy
1. Start with minimal schema (Pattern only)
2. Add models incrementally as features are developed
3. Use Prisma migrations to safely evolve schema
4. Maintain backward compatibility when possible

## Benefits of This Design

1. **Minimal Start**: Can begin with just Pattern model for MVP
2. **Clear Growth Path**: Well-defined expansion strategy
3. **Flexible Relationships**: Junction tables allow complex associations
4. **User-Ready**: Prepared for authentication without breaking changes
5. **Query Efficient**: Designed for common access patterns

## Next Steps

1. Create initial Prisma schema with Pattern model only
2. Set up database and run first migration
3. Implement pattern upload functionality
4. Add remaining models as features are developed

---

*This design balances simplicity for quick MVP development with the flexibility needed for YarnWrangler's ambitious feature roadmap.*