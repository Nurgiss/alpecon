#!/bin/bash

# Script to fix migration state when column already exists
# This handles the case where migration is marked as applied but column doesn't exist

echo "🔧 Fixing migration state..."

# Check if source column exists in database
COLUMN_EXISTS=$(sqlite3 dev.db "PRAGMA table_info(news);" | grep -c "source")

if [ "$COLUMN_EXISTS" -eq 0 ]; then
    echo "✓ Column 'source' does not exist in database"
    echo "  Adding column manually..."
    sqlite3 dev.db "ALTER TABLE news ADD COLUMN source TEXT;"
    echo "✓ Column added successfully"
else
    echo "✓ Column 'source' already exists in database"
fi

# Now ensure Prisma client is regenerated
echo ""
echo "🔄 Regenerating Prisma Client..."
npx prisma generate

echo ""
echo "✅ Migration state fixed!"
echo ""
echo "You can now run your application with: npm run dev"
