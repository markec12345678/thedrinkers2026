# 🚀 PM2 Production Deployment Guide

## Prerequisites

- Node.js 18+ installed
- npm installed
- Server with SSH access (Linux/Windows)
- Domain configured (optional)

---

## 📦 Installation

### 1. Install PM2 Globally

```bash
npm install -g pm2
```

### 2. Verify Installation

```bash
pm2 --version
```

---

## 🔧 Deployment Steps

### Option A: Quick Deploy (Recommended)

```bash
# Navigate to project
cd f:\thedrinkers\the

# Install production dependencies
npm install --production

# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup
```

### Option B: Manual Start

```bash
# Install dependencies
npm install

# Build
npm run build

# Start with PM2
pm2 start npm --name "drinkers-site" -- start

# Save process list
pm2 save
```

---

## 📊 PM2 Commands Reference

### Process Management

```bash
# Start application
pm2 start ecosystem.config.js

# Stop application
pm2 stop drinkers-site

# Restart application
pm2 restart drinkers-site

# Delete from PM2
pm2 delete drinkers-site

# List all processes
pm2 list

# Show detailed info
pm2 show drinkers-site
```

### Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs drinkers-site

# View logs (tail)
pm2 logs drinkers-site --lines 100

# Clear logs
pm2 flush
```

### Cluster Mode

```bash
# Restart with zero downtime
pm2 reload drinkers-site

# Scale to specific instances
pm2 scale drinkers-site 4

# Reset restart count
pm2 reset drinkers-site
```

### System Startup

```bash
# Setup PM2 to start on boot
pm2 startup

# Save current process list
pm2 save

# Resurrect saved processes
pm2 resurrect
```

---

## 🔐 Environment Variables

### Create `.env.production`

```bash
# Production environment variables
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_SITE_URL=https://thedrinkers.si
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

### Load in `ecosystem.config.js`

The configuration already loads environment variables from the system.

---

## 📈 Monitoring & Maintenance

### Check Status

```bash
# Quick status
pm2 status

# Detailed status
pm2 list

# Memory usage
pm2 monit
```

### View Logs

```bash
# All logs
pm2 logs

# Specific app logs
pm2 logs drinkers-site

# Logs with timestamp
pm2 logs drinkers-site --timestamp
```

### Health Check

```bash
# Check if app is responding
curl http://localhost:3000

# Check PM2 daemon
pm2 ping
```

### Auto-Restart on Crash

PM2 automatically restarts your app if it crashes. Configure in `ecosystem.config.js`:

```javascript
{
  autorestart: true,
  max_restarts: 10,
  min_uptime: '10s'
}
```

---

## 🔄 Update Deployment

### Zero-Downtime Update

```bash
# Pull latest changes (if using Git)
git pull origin main

# Install new dependencies
npm install

# Rebuild
npm run build

# Reload with zero downtime
pm2 reload drinkers-site
```

### Manual Update

```bash
# Stop
pm2 stop drinkers-site

# Update code
git pull

# Install & build
npm install
npm run build

# Start
pm2 start drinkers-site
```

---

## 🔒 Security

### Run as Non-Root User

```bash
# Create dedicated user
sudo useradd -m -s /bin/bash drinkers-app

# Switch to user
sudo su - drinkers-app

# Install and run
pm2 start ecosystem.config.js
```

### Firewall Configuration

```bash
# Allow port 3000 (Ubuntu/Debian)
sudo ufw allow 3000/tcp

# Allow port 3000 (CentOS/RHEL)
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

### SSL/HTTPS with Nginx (Recommended)

Install Nginx:
```bash
sudo apt install nginx  # Ubuntu/Debian
sudo yum install nginx  # CentOS/RHEL
```

Nginx config (`/etc/nginx/sites-available/drinkers-site`):
```nginx
server {
    listen 80;
    server_name thedrinkers.si www.thedrinkers.si;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/drinkers-site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Get SSL certificate:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d thedrinkers.si -d www.thedrinkers.si
```

---

## 📊 Performance Tuning

### Cluster Mode (Multi-Core)

In `ecosystem.config.js`:
```javascript
{
  instances: 'max',  // Use all CPU cores
  exec_mode: 'cluster'
}
```

### Memory Management

```javascript
{
  max_memory_restart: '1G'  // Restart if memory exceeds 1GB
}
```

### Log Rotation

Install PM2 log rotation:
```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

---

## 🐛 Troubleshooting

### App Won't Start

```bash
# Check logs
pm2 logs drinkers-site --err

# Check if port is in use
netstat -tulpn | grep 3000

# Kill process on port 3000
kill $(lsof -t -i:3000)
```

### High Memory Usage

```bash
# Monitor memory
pm2 monit

# Restart app
pm2 restart drinkers-site

# Increase memory limit in ecosystem.config.js
max_memory_restart: '2G'
```

### App Crashes Repeatedly

```bash
# Check error logs
pm2 logs drinkers-site --lines 1000

# Check PM2 info
pm2 show drinkers-site

# Increase restart delay
min_uptime: '30s'
```

---

## 📋 Deployment Checklist

- [ ] PM2 installed globally
- [ ] Dependencies installed (`npm install --production`)
- [ ] Build completed (`npm run build`)
- [ ] PM2 config created (`ecosystem.config.js`)
- [ ] App started (`pm2 start ecosystem.config.js`)
- [ ] Process list saved (`pm2 save`)
- [ ] Startup configured (`pm2 startup`)
- [ ] Logs configured
- [ ] Monitoring enabled
- [ ] SSL configured (if using custom domain)
- [ ] Firewall configured
- [ ] Health check passing

---

## 🎯 Quick Commands Cheat Sheet

```bash
# Start
pm2 start ecosystem.config.js

# Stop
pm2 stop drinkers-site

# Restart
pm2 restart drinkers-site

# Status
pm2 list

# Logs
pm2 logs drinkers-site

# Monitor
pm2 monit

# Update
pm2 reload drinkers-site

# Delete
pm2 delete drinkers-site
```

---

## 📞 Support

- **PM2 Docs**: https://pm2.keymetrics.io/docs/
- **Next.js Production**: https://nextjs.org/docs/deployment
- **PM2 GitHub**: https://github.com/Unitech/pm2

---

**Ready to deploy with PM2! 🚀🎸**
