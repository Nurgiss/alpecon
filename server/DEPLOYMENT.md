# Deployment Guide - Alpecon Backend

This guide will help you deploy the Alpecon backend to your VPS.

## Prerequisites

- Ubuntu/Debian VPS with root or sudo access
- Node.js 18+ installed
- Git installed
- Domain name pointed to your VPS (optional but recommended)
- Nginx or Apache installed (for reverse proxy)

---

## 1. Prepare Your VPS

### Install Node.js (if not installed)

```bash
# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node -v
npm -v
```

### Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### Install Nginx (if not installed)

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 2. Clone Your Repository

```bash
# Navigate to your web directory
cd /var/www

# Clone your repository
sudo git clone https://github.com/yourusername/alpecon.git
cd alpecon/server

# Set proper permissions
sudo chown -R $USER:$USER /var/www/alpecon
```

---

## 3. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit the .env file
nano .env
```

**Update these values:**

```env
DATABASE_URL="file:./production.db"
NODE_ENV=production
PORT=3002

# Generate a secure JWT secret (run: openssl rand -base64 32)
JWT_SECRET=your-generated-secret-here

# CHANGE admin credentials!
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password

# Your domain
CORS_ORIGINS=https://yourdomain.com
```

---

## 4. Install Dependencies & Build

```bash
# Install dependencies
npm ci --production=false

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Migrate data from old news.json (if needed)
npm run migrate:data

# Build TypeScript
npm run build

# Install production dependencies only
npm ci --production
```

---

## 5. Start with PM2

```bash
# Start the server
pm2 start dist/index.js --name alpecon-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions from the command output
```

### Useful PM2 Commands

```bash
pm2 list                  # List all processes
pm2 logs alpecon-backend  # View logs
pm2 restart alpecon-backend
pm2 stop alpecon-backend
pm2 delete alpecon-backend
pm2 monit                 # Monitor CPU/Memory
```

---

## 6. Configure Nginx Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/alpecon-backend
```

**Add this configuration:**

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;  # or use your main domain

    # API endpoints
    location /api {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;

        # Increase timeout for file uploads
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }

    # Static uploads
    location /uploads {
        proxy_pass http://localhost:3002;
        proxy_http_version 1.1;
        proxy_set_header Host $host;

        # Cache uploaded files
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # File upload size limit
    client_max_body_size 10M;
}
```

**Enable the site:**

```bash
sudo ln -s /etc/nginx/sites-available/alpecon-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. Setup SSL with Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Auto-renewal is set up automatically
```

---

## 8. Firewall Configuration

```bash
# Allow Nginx
sudo ufw allow 'Nginx Full'

# Allow SSH (if not already)
sudo ufw allow OpenSSH

# Enable firewall
sudo ufw enable
```

---

## 9. Database Backup (Important!)

Create a backup script:

```bash
nano ~/backup-db.sh
```

**Add this content:**

```bash
#!/bin/bash
BACKUP_DIR="/var/www/alpecon/server/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
cp /var/www/alpecon/server/production.db $BACKUP_DIR/production_$DATE.db

# Keep only last 30 backups
ls -t $BACKUP_DIR/production_*.db | tail -n +31 | xargs -r rm

echo "Backup completed: production_$DATE.db"
```

**Make it executable and schedule:**

```bash
chmod +x ~/backup-db.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add this line:
0 2 * * * /home/yourusername/backup-db.sh
```

---

## 10. Deployment Updates

When you push updates to your repository:

```bash
# Navigate to project
cd /var/www/alpecon/server

# Pull latest changes
git pull origin main

# Install any new dependencies
npm ci --production=false

# Run migrations (if any)
npm run prisma:migrate

# Rebuild
npm run build

# Install production dependencies
npm ci --production

# Restart with PM2
pm2 restart alpecon-backend

# Check logs
pm2 logs alpecon-backend --lines 50
```

---

## 11. Monitoring & Logs

### View Logs

```bash
# PM2 logs
pm2 logs alpecon-backend

# Nginx error logs
sudo tail -f /var/log/nginx/error.log

# Nginx access logs
sudo tail -f /var/log/nginx/access.log
```

### Check Status

```bash
# PM2 status
pm2 status

# Check if server is running
curl http://localhost:3002/health

# Check from outside
curl https://api.yourdomain.com/health
```

---

## 12. Troubleshooting

### Server won't start

```bash
# Check PM2 logs
pm2 logs alpecon-backend --err

# Check if port is in use
sudo lsof -i :3002

# Verify environment variables
cat .env
```

### Database errors

```bash
# Check database file permissions
ls -la production.db

# Regenerate Prisma Client
npm run prisma:generate

# Reset database (CAUTION: This deletes data!)
# npm run prisma:migrate reset
```

### Nginx errors

```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# Reload Nginx
sudo systemctl reload nginx
```

---

## Security Checklist

- [ ] Changed default admin credentials
- [ ] Generated secure JWT_SECRET
- [ ] Configured firewall (UFW)
- [ ] Set up SSL certificate
- [ ] Restricted database file permissions
- [ ] Set up regular backups
- [ ] Configured CORS properly
- [ ] Updated NODE_ENV to production
- [ ] Removed unnecessary packages

---

## Performance Tips

1. **Enable Nginx caching** for static files
2. **Use CDN** for uploaded images (Cloudflare, etc.)
3. **Enable gzip compression** in Nginx
4. **Monitor with PM2** for memory leaks
5. **Regular database backups**
6. **Consider PostgreSQL** when scaling beyond 100k users

---

## Next Steps

After successful deployment:
1. Test all API endpoints
2. Deploy frontend to VPS or Vercel/Netlify
3. Set up monitoring (UptimeRobot, New Relic)
4. Configure email notifications for errors
5. Implement rate limiting (already installed, needs configuration)

---

**Need help?** Check the logs first, then review this guide carefully.
