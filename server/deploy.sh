#!/bin/bash

# Alpecon Backend Deployment Script
# Usage: ./deploy.sh

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo "Please create .env file from .env.example and configure it"
    exit 1
fi

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes from Git...${NC}"
git pull origin main

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production=false

# Generate Prisma Client
echo -e "${YELLOW}🔧 Generating Prisma Client...${NC}"
npm run prisma:generate

# Run database migrations
echo -e "${YELLOW}🗄️  Running database migrations...${NC}"
npm run prisma:migrate -- --name auto_migration

# Build TypeScript
echo -e "${YELLOW}🏗️  Building TypeScript...${NC}"
npm run build

# Install production dependencies only
echo -e "${YELLOW}📦 Installing production dependencies...${NC}"
npm ci --production

# Restart PM2
echo -e "${YELLOW}🔄 Restarting PM2 process...${NC}"
if pm2 list | grep -q "alpecon-backend"; then
    pm2 restart alpecon-backend
else
    echo -e "${YELLOW}⚠️  PM2 process not found. Starting new process...${NC}"
    pm2 start dist/index.js --name alpecon-backend
    pm2 save
fi

# Show logs
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo ""
echo "📊 Server Status:"
pm2 status alpecon-backend

echo ""
echo "📝 Recent logs:"
pm2 logs alpecon-backend --lines 20 --nostream

echo ""
echo -e "${GREEN}🎉 Deployment finished!${NC}"
echo "Monitor logs with: pm2 logs alpecon-backend"
