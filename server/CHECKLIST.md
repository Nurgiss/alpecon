# VPS Deployment Checklist

Use this checklist to ensure a smooth deployment to your VPS.

## Pre-Deployment (Local)

- [ ] All code is committed to Git
- [ ] `.env` files are NOT committed (check .gitignore)
- [ ] `.env.example` files are committed
- [ ] Tested locally with `npm run dev`
- [ ] Built successfully with `npm run build`
- [ ] Database migrations work: `npm run prisma:migrate`
- [ ] Pushed all changes to Git repository

## VPS Setup

- [ ] VPS is running (Ubuntu/Debian recommended)
- [ ] You have SSH access: `ssh user@your-vps-ip`
- [ ] Node.js 18+ installed: `node -v`
- [ ] Git installed: `git --version`
- [ ] PM2 installed globally: `pm2 --version`
- [ ] Nginx installed: `nginx -v`

## Initial Deployment

- [ ] Cloned repository to `/var/www/alpecon`
- [ ] Navigated to server directory: `cd /var/www/alpecon/server`
- [ ] Created `.env` from `.env.example`: `cp .env.example .env`
- [ ] Edited `.env` with production values:
  - [ ] Changed `DATABASE_URL` to production database
  - [ ] Set `NODE_ENV=production`
  - [ ] Generated secure `JWT_SECRET` (run `openssl rand -base64 32`)
  - [ ] Changed admin username and password
  - [ ] Updated `CORS_ORIGINS` with your domain
  - [ ] Verified `PORT=3002`
- [ ] Installed dependencies: `npm ci --production=false`
- [ ] Generated Prisma Client: `npm run prisma:generate`
- [ ] Ran migrations: `npm run prisma:migrate`
- [ ] Migrated old data (if needed): `npm run migrate:data`
- [ ] Built project: `npm run build`
- [ ] Installed production deps: `npm ci --production`
- [ ] Started with PM2: `pm2 start dist/index.js --name alpecon-backend`
- [ ] Saved PM2 config: `pm2 save`
- [ ] Set PM2 startup: `pm2 startup` (follow instructions)
- [ ] Tested health check: `curl http://localhost:3002/health`

## Nginx Configuration

- [ ] Created Nginx config: `/etc/nginx/sites-available/alpecon-backend`
- [ ] Symlinked to sites-enabled
- [ ] Tested Nginx config: `sudo nginx -t`
- [ ] Reloaded Nginx: `sudo systemctl reload nginx`
- [ ] Configured firewall:
  - [ ] `sudo ufw allow 'Nginx Full'`
  - [ ] `sudo ufw allow OpenSSH`
  - [ ] `sudo ufw enable`
- [ ] Tested reverse proxy: `curl http://your-domain.com/api/health`

## SSL Certificate (Let's Encrypt)

- [ ] Installed Certbot: `sudo apt install certbot python3-certbot-nginx`
- [ ] Obtained certificate: `sudo certbot --nginx -d api.yourdomain.com`
- [ ] Tested HTTPS: `curl https://api.yourdomain.com/health`
- [ ] Verified auto-renewal: `sudo certbot renew --dry-run`

## Security

- [ ] Changed admin credentials from defaults
- [ ] Generated and set secure `JWT_SECRET`
- [ ] Configured firewall (UFW enabled)
- [ ] SSL certificate installed and working
- [ ] Restricted database file permissions: `chmod 600 production.db`
- [ ] `.env` file has restricted permissions: `chmod 600 .env`
- [ ] Removed `.env.local` if it exists
- [ ] CORS configured with proper origins (not `*`)

## Database Backup

- [ ] Created backup directory: `mkdir -p ~/backups`
- [ ] Created backup script: `~/backup-db.sh`
- [ ] Made script executable: `chmod +x ~/backup-db.sh`
- [ ] Tested backup manually: `~/backup-db.sh`
- [ ] Added to crontab for automatic backups: `crontab -e`
- [ ] Verified cron job is scheduled

## Testing

- [ ] Health check works: `https://api.yourdomain.com/health`
- [ ] GET all news: `https://api.yourdomain.com/api/news`
- [ ] GET single news works
- [ ] Frontend can connect to backend
- [ ] Image uploads work
- [ ] Admin panel can create/edit/delete news
- [ ] Multi-language fields work correctly

## Monitoring

- [ ] PM2 shows server running: `pm2 status`
- [ ] Can view logs: `pm2 logs alpecon-backend`
- [ ] Nginx access logs working: `/var/log/nginx/access.log`
- [ ] Nginx error logs working: `/var/log/nginx/error.log`
- [ ] Server auto-restarts after crash (PM2 handles this)
- [ ] Server starts on system boot (PM2 startup configured)

## Documentation

- [ ] Team knows where documentation is
- [ ] `.env.example` is up to date
- [ ] README.md is accurate
- [ ] DEPLOYMENT.md is accessible
- [ ] Noted any specific deployment quirks

## Post-Deployment

- [ ] Notified team of deployment
- [ ] Updated any API documentation
- [ ] Tested from multiple devices/browsers
- [ ] Verified mobile responsiveness
- [ ] Checked analytics/monitoring tools
- [ ] Created incident response plan

## Future Updates

To deploy updates:
```bash
cd /var/www/alpecon/server
git pull origin main
npm ci --production=false
npm run prisma:migrate
npm run build
npm ci --production
pm2 restart alpecon-backend
```

Or simply:
```bash
./deploy.sh
```

---

## Emergency Contacts

VPS Provider: ________________
Domain Registrar: ________________
Your VPS IP: ________________
SSH Port: ________________ (default: 22)
Database Location: /var/www/alpecon/server/production.db

---

## Rollback Plan

If something goes wrong:

1. **Check logs immediately:**
   ```bash
   pm2 logs alpecon-backend --err
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Rollback to previous Git commit:**
   ```bash
   git log  # Find previous working commit
   git checkout <commit-hash>
   npm run build
   pm2 restart alpecon-backend
   ```

3. **Restore database backup:**
   ```bash
   cp ~/backups/production_YYYYMMDD_HHMMSS.db production.db
   pm2 restart alpecon-backend
   ```

4. **Restart services:**
   ```bash
   pm2 restart alpecon-backend
   sudo systemctl restart nginx
   ```

---

**Date Deployed:** _____________
**Deployed By:** _____________
**Git Commit:** _____________
**Notes:** _____________________

