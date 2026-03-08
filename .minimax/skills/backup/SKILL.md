---
name: backup
description: Complete backup and snapshot procedures for VPS and applications running on Coolify.
---

# Backup & Snapshot Skill

This skill provides comprehensive backup and snapshot procedures for your VPS and deployed applications.

## Backup Types

### 1. VPS Snapshot
Creates a complete server image including all data, configurations, and applications.

**When to use**:
- Before major updates
- Before system changes
- For disaster recovery
- When moving to a new server

**How to create**:
1. SSH into Hostinger control panel
2. Go to VPS management
3. Create snapshot/backup
4. Wait for completion
5. Verify snapshot status

### 2. Application Backup
Backs up specific applications, databases, and files.

**When to use**:
- Before deploying updates
- Regular maintenance
- When migrating applications

**Components to backup**:
- Application source code
- Database (MySQL, PostgreSQL, MongoDB)
- Uploaded files/media
- Configuration files
- Environment variables

### 3. Database Backup
Specific database dumps for MySQL, PostgreSQL, or MongoDB.

## Backup Procedures

### MySQL Database Backup

```bash
# SSH into VPS
ssh root@141.136.35.208

# Find MySQL container
docker ps | grep mysql

# Backup database
docker exec <container_name> mysqldump -u<user> -p<password> <database_name> > backup_$(date +%Y%m%d).sql

# Or with docker exec
docker exec <container> sh -c 'mysqldump -u<user> -p<password> <db>' > /backups/db_$(date +%Y%m%d).sql
```

### PostgreSQL Database Backup

```bash
# Find PostgreSQL container
docker ps | grep postgres

# Backup database
docker exec <container_name> pg_dump -U <user> <database_name> > backup_$(date +%Y%m%d).sql
```

### MongoDB Database Backup

```bash
# Find MongoDB container
docker ps | grep mongo

# Backup database
docker exec <container_name> mongodump --out=/backup
docker cp <container_name>:/backup ./mongo_backup_$(date +%Y%m%d)
```

### Files Backup

```bash
# Create tar archive of application files
tar -czvf app_backup_$(date +%Y%m%d).tar.gz /path/to/application

# Backup with compression
tar -czvf backup_$(date +%Y%m%d_%H%M%S).tar.gz \
  /opt/coolify/applications/* \
  /opt/coolify/databases/*
```

### Complete Server Backup Script

```bash
#!/bin/bash
# Full backup script for Coolify VPS

BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup all Docker volumes
docker run --rm \
  -v coolify_dbdata:/data \
  -v $BACKUP_DIR:/backup \
  alpine tar czf /backup/volumes_$DATE.tar.gz -C /data .

# Backup databases
docker ps --format '{{.Names}}' | grep -E 'mysql|postgres|mongo' | while read container; do
  docker exec $container sh -c 'mysqldump -u$USER -p$PASS $DB' > $BACKUP_DIR/${container}_$DATE.sql
done

# Create archive
tar -czvf full_backup_$DATE.tar.gz -C $BACKUP_DIR .

# Clean up old backups (keep last 7)
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs -r rm
```

## Restore Procedures

### Restore MySQL Database

```bash
# Restore from backup
docker exec -i <container_name> mysql -u<user> -p<password> <database_name> < backup.sql

# Or restore specific table
docker exec -i <container_name> mysql -u<user> -p<password> <database_name> -T <table> < backup.sql
```

### Restore PostgreSQL Database

```bash
# Restore from backup
docker exec -i <container_name> psql -U <user> <database_name> < backup.sql
```

### Restore Files

```bash
# Extract backup
tar -xzvf app_backup_20240101.tar.gz -C /path/to/restore

# Or specific files
tar -xzvf app_backup_20240101.tar.gz -C / path/to/file
```

## Backup Verification

Always verify backups:

1. **Check file size**: Ensure backup isn't empty
2. **Test restore**: Restore to test environment
3. **Verify integrity**: Check SQL files for corruption
4. **Document**: Record backup date, size, contents

## Automation

### Schedule Regular Backups

```bash
# Add to crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1
```

### Backup Retention Policy

- **Daily backups**: Keep for 7 days
- **Weekly backups**: Keep for 4 weeks
- **Monthly backups**: Keep for 12 months
- **Yearly backups**: Keep indefinitely

## Backup Checklist

Before any major operation:
- [ ] Create application backup
- [ ] Create database backup
- [ ] Verify backup file sizes
- [ ] Test restore on staging (if possible)
- [ ] Document backup location
- [ ] Note backup timestamp

## Emergency Recovery

If server fails:

1. **Contact Hostinger**: Request VPS restore from snapshot
2. **Deploy fresh**: Use Coolify to redeploy applications
3. **Restore databases**: Import from database backups
4. **Restore files**: Extract file backups
5. **Verify**: Test all applications
6. **Update DNS**: Point domains to new IP if changed
