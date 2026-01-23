#!/usr/bin/env bash

################################################################################
# Alpecon Backend Deployment Script for VPS
# Usage: ./deploy.sh [options]
# Options:
#   --initial    First time setup (installs PM2, creates .env from example)
#   --skip-build Skip TypeScript build (for quick restarts)
#   --skip-deps  Skip npm install (when dependencies haven't changed)
################################################################################

# Ensure we're running in bash
if [ -z "$BASH_VERSION" ]; then
    echo "This script requires bash. Please run with: bash deploy.sh"
    exit 1
fi

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse command line arguments
INITIAL_SETUP=false
SKIP_BUILD=false
SKIP_DEPS=false

for arg in "$@"; do
    case $arg in
        --initial)
            INITIAL_SETUP=true
            shift
            ;;
        --skip-build)
            SKIP_BUILD=true
            shift
            ;;
        --skip-deps)
            SKIP_DEPS=true
            shift
            ;;
        --help|-h)
            echo "Usage: ./deploy.sh [options]"
            echo ""
            echo "Options:"
            echo "  --initial    First time setup (installs PM2, creates .env)"
            echo "  --skip-build Skip TypeScript build (for quick restarts)"
            echo "  --skip-deps  Skip npm install (when dependencies unchanged)"
            echo "  --help, -h   Show this help message"
            exit 0
            ;;
    esac
done

echo ""
echo "=========================================="
echo "🚀 Alpecon Backend Deployment"
echo "=========================================="
echo ""

################################################################################
# INITIAL SETUP MODE
################################################################################
if [ "$INITIAL_SETUP" = true ]; then
    echo -e "${BLUE}🔧 Running initial setup...${NC}"
    echo ""

    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed!${NC}"
        echo "Please install Node.js first:"
        echo "  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
        echo "  sudo apt-get install -y nodejs"
        exit 1
    fi

    echo -e "${GREEN}✓ Node.js version: $(node --version)${NC}"
    echo -e "${GREEN}✓ npm version: $(npm --version)${NC}"
    echo ""

    # Check if PM2 is installed
    if ! command -v pm2 &> /dev/null; then
        echo -e "${YELLOW}📦 Installing PM2 globally...${NC}"
        sudo npm install -g pm2

        # Setup PM2 to start on system boot
        echo -e "${YELLOW}⚙️  Setting up PM2 startup script...${NC}"
        sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
        echo -e "${GREEN}✓ PM2 installed and configured${NC}"
    else
        echo -e "${GREEN}✓ PM2 is already installed${NC}"
    fi
    echo ""

    # Create .env file if it doesn't exist
    if [ ! -f .env ]; then
        echo -e "${YELLOW}📝 Creating .env file from .env.example...${NC}"
        cp .env.example .env
        echo ""
        echo -e "${RED}⚠️  IMPORTANT: Please configure your .env file before continuing!${NC}"
        echo ""
        echo "Required steps:"
        echo "1. Generate a secure JWT secret:"
        echo "   npm install && npm run generate:jwt-secret"
        echo ""
        echo "2. Hash your admin password:"
        echo "   npm run hash:password 'YourSecurePassword'"
        echo ""
        echo "3. Update .env file with:"
        echo "   - JWT_SECRET (from step 1)"
        echo "   - ADMIN_USERNAME (your admin username)"
        echo "   - ADMIN_PASSWORD (hashed password from step 2)"
        echo "   - DATABASE_URL (if using PostgreSQL)"
        echo ""
        echo "4. Run this script again without --initial flag"
        echo ""
        exit 0
    else
        echo -e "${GREEN}✓ .env file already exists${NC}"
    fi
    echo ""
fi

################################################################################
# PRE-DEPLOYMENT CHECKS
################################################################################
echo -e "${BLUE}🔍 Running pre-deployment checks...${NC}"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo ""
    echo "Run: ./deploy.sh --initial"
    echo "Then configure your .env file and run again"
    exit 1
fi

# Validate critical environment variables
echo -e "${YELLOW}Validating environment variables...${NC}"

# Load environment variables
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    exit 1
fi

# Export variables from .env file (bash-compatible way)
set -a
source .env 2>/dev/null || . .env
set +a

if [ -z "$JWT_SECRET" ] || [ "$JWT_SECRET" = "your-secret-key-here-change-in-production" ]; then
    echo -e "${RED}❌ JWT_SECRET is not set or using default value!${NC}"
    echo "Generate a secure secret: npm run generate:jwt-secret"
    exit 1
fi

if [ -z "$ADMIN_USERNAME" ]; then
    echo -e "${RED}❌ ADMIN_USERNAME is not set!${NC}"
    exit 1
fi

if [ -z "$ADMIN_PASSWORD" ] || [ "$ADMIN_PASSWORD" = "admin" ]; then
    echo -e "${RED}❌ ADMIN_PASSWORD is not set or using default value!${NC}"
    echo "Hash your password: npm run hash:password 'YourPassword'"
    exit 1
fi

if [ "$NODE_ENV" = "production" ] && [ "$ADMIN_PASSWORD" = "admin" ]; then
    echo -e "${RED}❌ Cannot use default password in production!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Environment variables validated${NC}"
echo ""

# Check if git repo
if [ -d .git ]; then
    echo -e "${YELLOW}📥 Checking for updates from Git...${NC}"

    # Fetch latest changes
    git fetch origin

    LOCAL=$(git rev-parse @)
    REMOTE=$(git rev-parse @{u})

    if [ $LOCAL = $REMOTE ]; then
        echo -e "${GREEN}✓ Already up to date${NC}"
    else
        echo -e "${YELLOW}Pulling latest changes...${NC}"
        git pull origin main || git pull origin master
        echo -e "${GREEN}✓ Updated to latest version${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Not a git repository, skipping git pull${NC}"
fi
echo ""

################################################################################
# INSTALL DEPENDENCIES
################################################################################
if [ "$SKIP_DEPS" = false ]; then
    echo -e "${BLUE}📦 Installing dependencies...${NC}"

    # Check if package.json has changed
    if [ -f "package-lock.json" ]; then
        npm ci --production=false
    else
        npm install
    fi

    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
else
    echo -e "${YELLOW}⏭️  Skipping dependency installation${NC}"
    echo ""
fi

################################################################################
# DATABASE SETUP
################################################################################
echo -e "${BLUE}🗄️  Setting up database...${NC}"

# Generate Prisma Client
echo -e "${YELLOW}Generating Prisma Client...${NC}"
npm run prisma:generate

# Run migrations
echo -e "${YELLOW}Running database migrations...${NC}"
if [ "$NODE_ENV" = "production" ]; then
    # In production, use deploy (non-interactive)
    npx prisma migrate deploy
else
    # In development, use migrate dev
    npm run prisma:migrate
fi

echo -e "${GREEN}✓ Database configured${NC}"
echo ""

################################################################################
# BUILD APPLICATION
################################################################################
if [ "$SKIP_BUILD" = false ]; then
    echo -e "${BLUE}🏗️  Building application...${NC}"

    # Clean previous build
    rm -rf dist

    # Build TypeScript
    npm run build

    # Verify build succeeded
    if [ ! -d "dist" ] || [ ! -f "dist/index.js" ]; then
        echo -e "${RED}❌ Build failed! dist/index.js not found${NC}"
        exit 1
    fi

    echo -e "${GREEN}✓ Build completed successfully${NC}"
    echo ""
else
    echo -e "${YELLOW}⏭️  Skipping build${NC}"
    echo ""
fi

################################################################################
# CREATE UPLOADS DIRECTORY
################################################################################
echo -e "${YELLOW}📁 Creating uploads directory...${NC}"
mkdir -p uploads
chmod 755 uploads
echo -e "${GREEN}✓ Uploads directory ready${NC}"
echo ""

################################################################################
# PM2 DEPLOYMENT
################################################################################
echo -e "${BLUE}🔄 Deploying with PM2...${NC}"

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}❌ PM2 is not installed!${NC}"
    echo "Run: ./deploy.sh --initial"
    exit 1
fi

# Check if process exists
if pm2 list | grep -q "alpecon-backend"; then
    echo -e "${YELLOW}Restarting existing PM2 process...${NC}"
    pm2 restart alpecon-backend --update-env
    pm2 save
else
    echo -e "${YELLOW}Starting new PM2 process...${NC}"
    pm2 start dist/index.js \
        --name alpecon-backend \
        --max-memory-restart 500M \
        --log-date-format "YYYY-MM-DD HH:mm:ss Z" \
        --time
    pm2 save
fi

echo -e "${GREEN}✓ PM2 process updated${NC}"
echo ""

################################################################################
# POST-DEPLOYMENT
################################################################################
echo ""
echo "=========================================="
echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo "=========================================="
echo ""

# Show server status
echo -e "${BLUE}📊 Server Status:${NC}"
pm2 status alpecon-backend
echo ""

# Test health endpoint
echo -e "${BLUE}🏥 Health Check:${NC}"
sleep 2  # Give server time to start
if curl -f -s http://localhost:${PORT:-3002}/health > /dev/null; then
    echo -e "${GREEN}✓ Server is responding${NC}"
    curl -s http://localhost:${PORT:-3002}/health | jq 2>/dev/null || curl -s http://localhost:${PORT:-3002}/health
else
    echo -e "${RED}⚠️  Server health check failed${NC}"
    echo "Check logs with: pm2 logs alpecon-backend"
fi
echo ""

# Show recent logs
echo -e "${BLUE}📝 Recent logs:${NC}"
pm2 logs alpecon-backend --lines 15 --nostream
echo ""

echo "=========================================="
echo -e "${GREEN}🎉 Deployment finished!${NC}"
echo "=========================================="
echo ""
echo "Useful commands:"
echo "  pm2 logs alpecon-backend       # View logs"
echo "  pm2 restart alpecon-backend    # Restart server"
echo "  pm2 stop alpecon-backend       # Stop server"
echo "  pm2 status                     # Check status"
echo "  pm2 monit                      # Monitor resources"
echo ""
echo "Quick redeploy:"
echo "  ./deploy.sh --skip-deps        # Skip npm install"
echo "  ./deploy.sh --skip-build       # Skip build (restart only)"
echo ""
