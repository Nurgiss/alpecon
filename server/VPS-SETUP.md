# VPS Setup Guide for Alpecon Backend

This guide will help you deploy the Alpecon backend to your VPS from scratch.

## Prerequisites

- Ubuntu 20.04+ or Debian 10+ VPS
- Root or sudo access
- Domain name (optional, but recommended)

## Step 1: Initial VPS Setup

### Connect to your VPS
```bash
ssh root@your-vps-ip
# or
ssh your-username@your-vps-ip
```

### Update system packages
```bash
sudo apt update && sudo apt upgrade -y
```

### Install essential packages
```bash
sudo apt install -y curl git build-essential
```

## Step 2: Install Node.js

### Install Node.js 20 LTS (recommended)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Verify installation
```bash
node --version  # Should show v20.x.x
npm --version   # Should show v10.x.x
```

## Step 3: Clone Your Repository

### Using HTTPS
```bash
cd /var/www  # or your preferred directory
sudo mkdir -p alpecon
sudo chown $USER:$USER alpecon
git clone https://github.com/your-username/alpecon.git
cd alpecon/server
```

### Using SSH (if you have SSH keys configured)
```bash
cd /var/www
sudo mkdir -p alpecon
sudo chown $USER:$USER alpecon
git clone git@github.com:your-username/alpecon.git
cd alpecon/server
```

## Step 4: Run Initial Setup

### Make deploy script executable
```bash
chmod +x deploy.sh
```

### Run initial setup (installs PM2, creates .env)
```bash
./deploy.sh --initial
```

This will:
- Check if Node.js is installed
- Install PM2 globally
- Configure PM2 to start on system boot
- Create `.env` file from `.env.example`
- Exit with instructions

## Step 5: Configure Environment Variables

### Install dependencies first (needed for helper scripts)
```bash
npm install
```

### Generate secure JWT secret
```bash
npm run generate:jwt-secret
```

Copy the generated JWT_SECRET value.

### Hash your admin password
```bash
npm run hash:password "YourSecurePassword123!"
```

Copy the generated bcrypt hash.

### Edit .env file
```bash
nano .env  # or vim .env
```

Update these required values:
```env
# Database (use PostgreSQL for production)
DATABASE_URL="postgresql://user:password@localhost:5432/alpecon"

# Server
NODE_ENV=production
PORT=3002

# JWT (paste generated secret)
JWT_SECRET=paste-your-generated-secret-here
JWT_EXPIRES_IN=24h

# Admin Credentials
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=paste-your-hashed-password-here

# CORS (add your domain)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

Save and exit (Ctrl+X, then Y, then Enter in nano).

## Step 6: Install PostgreSQL (Production Database)

### Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
```

### Create database and user
```bash
sudo -u postgres psql

# Inside PostgreSQL prompt:
CREATE DATABASE alpecon;
CREATE USER alpecon_user WITH ENCRYPTED PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE alpecon TO alpecon_user;
\q
```

### Update DATABASE_URL in .env
```env
DATABASE_URL="postgresql://alpecon_user:secure_password@localhost:5432/alpecon"
```

## Step 7: Deploy the Application

### Run deployment script
```bash
./deploy.sh
```

This will:
- Validate environment variables
- Pull latest code from git
- Install dependencies
- Generate Prisma client
- Run database migrations
- Build TypeScript
- Start/restart PM2 process
- Run health check

### Verify deployment
```bash
pm2 status
pm2 logs alpecon-backend
```

### Test the API
```bash
curl http://localhost:3002/health
```

Should return:
```json
{"status":"OK","timestamp":"2026-01-23T..."}
```

## Step 8: Setup Nginx Reverse Proxy (Optional but Recommended)

### Install Nginx
```bash
sudo apt install -y nginx
```

### Create Nginx configuration
```bash
sudo nano /etc/nginx/sites-available/alpecon-api
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # Change to your domain

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Max upload size
    client_max_body_size 10M;

    # Proxy to Node.js backend
    location / {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve uploaded images
    location /uploads {
        alias /var/www/alpecon/server/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable the site
```bash
sudo ln -s /etc/nginx/sites-available/alpecon-api /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### Setup SSL with Let's Encrypt
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

Follow the prompts to enable HTTPS.

## Step 9: Configure Firewall (Important!)

### Enable UFW firewall
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status
```

## Step 10: Setup Automatic Backups

### Create backup script
```bash
nano ~/backup-alpecon.sh
```

Paste:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/alpecon"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup database
pg_dump alpecon > "$BACKUP_DIR/db_$DATE.sql"

# Backup uploads
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" /var/www/alpecon/server/uploads

# Keep only last 7 days
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
```

### Make it executable
```bash
chmod +x ~/backup-alpecon.sh
```

### Add to crontab (daily at 2 AM)
```bash
crontab -e
```

Add this line:
```
0 2 * * * /home/your-username/backup-alpecon.sh >> /var/log/alpecon-backup.log 2>&1
```

## Quick Reference Commands

### Deployment
```bash
# Regular deployment (with build and deps)
./deploy.sh

# Quick restart (skip build and deps)
./deploy.sh --skip-deps --skip-build

# Update code only (skip deps)
./deploy.sh --skip-deps
```

### PM2 Management
```bash
pm2 status                    # Check status
pm2 logs alpecon-backend      # View logs
pm2 restart alpecon-backend   # Restart
pm2 stop alpecon-backend      # Stop
pm2 monit                     # Monitor resources
pm2 save                      # Save PM2 list
```

### Database
```bash
cd /var/www/alpecon/server
npx prisma studio             # Open database GUI
npm run prisma:migrate        # Run migrations
```

### Logs
```bash
# Application logs
pm2 logs alpecon-backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# System logs
sudo journalctl -u nginx -f
```

### Security Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Node.js packages
cd /var/www/alpecon/server
npm audit
npm audit fix
```

## Troubleshooting

### Server not starting
```bash
pm2 logs alpecon-backend --err  # Check error logs
pm2 describe alpecon-backend    # Detailed info
```

### Environment variable errors
```bash
source .env  # Load environment variables
echo $JWT_SECRET  # Check if set
```

### Database connection issues
```bash
# Test PostgreSQL connection
psql -U alpecon_user -d alpecon -h localhost
```

### Port already in use
```bash
sudo lsof -i :3002  # Find what's using port 3002
sudo kill -9 <PID>  # Kill the process
```

### PM2 not starting on boot
```bash
pm2 unstartup  # Remove old startup script
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME
pm2 save
```

## Security Checklist

- [ ] Changed default admin password
- [ ] Using secure JWT_SECRET (not default)
- [ ] Using bcrypt hashed password
- [ ] DATABASE_URL uses strong password
- [ ] Firewall (UFW) is enabled
- [ ] SSL certificate installed
- [ ] Regular backups configured
- [ ] Security headers in Nginx
- [ ] SSH key authentication enabled
- [ ] Root login disabled

## Support

For issues, check:
1. PM2 logs: `pm2 logs alpecon-backend`
2. Nginx logs: `sudo tail -f /var/log/nginx/error.log`
3. System logs: `sudo journalctl -xe`

## Next Steps

1. Configure your frontend to point to the API URL
2. Test login at `https://api.yourdomain.com/api/login`
3. Setup monitoring (optional): Consider tools like PM2 Plus, New Relic, or Datadog
4. Setup alerts for downtime
5. Document your backup restoration procedure
