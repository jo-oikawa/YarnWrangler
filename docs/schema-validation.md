# Database Schema Validation

This document provides validation examples for the proposed YarnWrangler database schema.

## MVP Phase 1: Pattern Model Validation

### Sample Pattern Data
```json
{
  "id": "clxxxxx",
  "title": "Baby Blanket with Hearts",
  "description": "A beautiful baby blanket featuring heart motifs",
  "source": "Yarn Magazine Issue 42",
  "notes": "Need to buy yarn in soft pink and white",
  "tags": ["baby", "blanket", "hearts", "beginner"],
  "difficulty": "beginner",
  "fileName": "baby-blanket-hearts.pdf",
  "filePath": "/uploads/2024/01/baby-blanket-hearts.pdf",
  "fileType": "PDF",
  "fileSize": 2048576,
  "uploadDate": "2024-01-15T10:30:00Z",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Common Queries Supported
1. **List all patterns**: `SELECT * FROM patterns ORDER BY uploadDate DESC`
2. **Search by tags**: `SELECT * FROM patterns WHERE 'baby' = ANY(tags)`
3. **Filter by difficulty**: `SELECT * FROM patterns WHERE difficulty = 'beginner'`
4. **Search title/description**: `SELECT * FROM patterns WHERE title ILIKE '%blanket%'`

## Future Expansion Validation

### Phase 2: Adding Users
- All existing Pattern records will work without modification
- `userId` field remains NULL for existing patterns
- New patterns can be associated with users

### Phase 3: Adding Projects
- Existing patterns can be linked to new projects via junction table
- No changes needed to existing Pattern records

### Phase 4: Adding Yarn Inventory
- Yarn management is independent of existing patterns
- Can be linked to projects when both are implemented

## Schema Evolution Examples

### Step 1: Current MVP Schema
```sql
CREATE TABLE patterns (
  id VARCHAR PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  source VARCHAR,
  notes TEXT,
  tags VARCHAR[],
  difficulty VARCHAR,
  file_name VARCHAR NOT NULL,
  file_path VARCHAR NOT NULL,
  file_type VARCHAR NOT NULL,
  file_size INTEGER NOT NULL,
  upload_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Step 2: Add User Support (Non-breaking)
```sql
-- Add users table
CREATE TABLE users (
  id VARCHAR PRIMARY KEY,
  email VARCHAR UNIQUE,
  username VARCHAR UNIQUE,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add user relationship to patterns (optional)
ALTER TABLE patterns ADD COLUMN user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL;
```

### Step 3: Add Projects (Non-breaking)
```sql
-- Add projects table
CREATE TABLE projects (
  id VARCHAR PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  status VARCHAR DEFAULT 'planned',
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL
);

-- Add many-to-many relationship
CREATE TABLE project_patterns (
  id VARCHAR PRIMARY KEY,
  project_id VARCHAR NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  pattern_id VARCHAR NOT NULL REFERENCES patterns(id) ON DELETE CASCADE,
  notes TEXT,
  UNIQUE(project_id, pattern_id)
);
```

## Benefits Demonstrated

1. **Non-Breaking Evolution**: Each phase adds new functionality without modifying existing data
2. **Query Performance**: Proper indexes support common search patterns
3. **Data Integrity**: Foreign keys and constraints maintain data consistency
4. **Flexibility**: Optional fields and relationships allow gradual feature adoption

## Conclusion

This schema design successfully balances:
- **Immediate usability** for MVP pattern management
- **Future extensibility** for planned features
- **Data integrity** through proper relationships
- **Performance** via strategic indexing

The phased approach allows for rapid initial development while providing a clear path for feature expansion.