---
name: deployment
description: Complete deployment workflow for deploying applications to Coolify VPS from GitHub, Hostinger shared hosting, or local files.
---

# Deployment Skill

This skill provides detailed workflows for deploying websites and applications to your Coolify VPS.

## Deployment Methods

### Method 1: Deploy from GitHub Repository

**Best for**: New applications, modern web apps

**Steps**:
1. User provides GitHub repository URL
2. Determine framework (Node.js, PHP, Python, Go, etc.)
3. SSH into VPS: `ssh root@141.136.35.208`
4. Access Coolify web interface
5. Add new application ’ Connect GitHub
6. Configure build pack:
   - Node.js: Use Nixpacks or Dockerfile
   - PHP: Use Nixpacks with PHP
   - Python: Use Nixpacks with Python
   - Static: Use static build pack
7. Set environment variables
8. Configure port (3000 for Node.js, 8000 for Python, 80 for PHP)
9. Deploy and verify

### Method 2: Deploy from Hostinger Shared Hosting

**Best for**: Migrating existing websites from shared hosting

**Steps**:
1. Export files from Hostinger:
   - Use Hostinger File Manager or FTP
   - Download public_html contents
2. Export database:
   - Access phpMyAdmin on Hostinger
   - Export MySQL database
3. Upload to VPS:
   - SSH into server
   - Create project directory
   - Upload files via SCP or Git
4. Configure in Coolify:
   - Create new application
   - Select appropriate build pack
   - Set up database connection
5. Deploy and test

### Method 3: Deploy from Local Files

**Best for**: Quick deployments, static sites

**Steps**:
1. User provides files (zip archive or directory)
2. Upload to VPS via SCP
3. Extract in appropriate directory
4. Configure Coolify for the application type
5. Deploy

## Framework-Specific Configurations

### Node.js Application
```bash
# Build pack: Nixpacks
# Start command: npm start or node index.js
# Port: 3000
# Environment variables:
#   NODE_ENV=production
```

### PHP Application
```bash
# Build pack: Nixpacks (PHP)
# Start command: (none needed - PHP-FPM)
# Port: 80
# Composer: enabled if needed
```

### Python Application
```bash
# Build pack: Nixpacks (Python)
# Start command: python main.py or gunicorn app:app
# Port: 8000
```

### Static Website
```bash
# Build pack: Static
# Output directory: public or dist
# No runtime needed
```

## Environment Variables

Common variables to set:
- `NODE_ENV=production`
- `DATABASE_URL=postgresql://...`
- `MYSQL_HOST`, `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`
- `API_KEYS`, `SECRET_KEYS`
- `PORT=3000`

## Troubleshooting

### Build Fails
- Check build logs in Coolify
- Verify package.json scripts
- Ensure all dependencies are in package.json

### Application Won't Start
- Check logs: `docker logs <container>`
- Verify port configuration
- Check environment variables
- Ensure database connections are correct

### Domain Not Working
- Verify DNS settings
- Check Coolify domain configuration
- Ensure SSL certificate is generated
- Check Nginx configuration

## Post-Deployment Checklist

- [ ] Application is running
- [ ] Domain resolves correctly
- [ ] SSL certificate is active
- [ ] Database connection works
- [ ] Environment variables are set
- [ ] Logs show no errors
- [ ] Website is accessible
