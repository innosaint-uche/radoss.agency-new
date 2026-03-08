---
name: monitoring
description: Server and application monitoring, health checks, and performance monitoring for Coolify VPS.
---

# Monitoring & Health Check Skill

This skill provides comprehensive monitoring procedures for your VPS and deployed applications.

## Server Health Checks

### SSH into VPS
```bash
ssh root@141.136.35.208
```

### System Resource Monitoring

#### CPU Usage
```bash
# Quick check
top -bn1 | head -20

# Or with uptime
uptime

# Detailed CPU info
mpstat -P ALL 1 1
```

#### Memory Usage
```bash
# Check memory
free -h

# Detailed memory info
cat /proc/meminfo
```

#### Disk Usage
```bash
# Check disk space
df -h

# Check specific directory
du -sh /opt/*

# Find large files
find / -type f -size +100M -exec ls -lh {} \;
```

#### Load Average
```bash
# Check load
uptime

# Meaning:
# - 1.00 = 1 core fully utilized
# - 2.00 = 2 cores fully utilized
# - > number of cores = overloaded
```

### Process Monitoring

```bash
# All running processes
ps aux

# Top processes by memory
ps aux --sort=-%mem | head -10

# Top processes by CPU
ps aux --sort=-%cpu | head -10

# Specific application processes
ps aux | grep node
ps aux | grep php
ps aux | grep nginx
```

## Docker & Coolify Monitoring

### Container Status
```bash
# List all containers
docker ps -a

# Container status with details
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Container resource usage
docker stats --no-stream
```

### Container Logs
```bash
# View logs
docker logs <container_name>

# Follow logs in real-time
docker logs -f <container_name>

# Last 100 lines
docker logs --tail 100 <container_name>

# Since specific time
docker logs --since 1h <container_name>
```

### Coolify Status

```bash
# Check Coolify service
systemctl status coolify

# Or check Coolify container
docker ps | grep coolify

# Coolify logs
docker logs coolify
```

## Application Health Checks

### Check All Deployed Applications

1. Access Coolify web interface: http://141.136.35.208
2. List all applications in dashboard
3. Check each application's status (running/stopped/error)

### Verify Application Accessibility

```bash
# Check if application responds
curl -I http://localhost:<port>

# Check with domain
curl -I https://yourdomain.com

# Check with wget
wget --spider https://yourdomain.com
```

### Database Connectivity

```bash
# Test MySQL connection
docker exec -it <mysql_container> mysql -u<user> -p -e "SELECT 1"

# Test PostgreSQL connection
docker exec -it <postgres_container> psql -U <user> -c "SELECT 1"

# Test MongoDB connection
docker exec -it <mongo_container> mongosh --eval "db.runCommand({ping:1})"
```

### Check Nginx/Proxy

```bash
# Check Nginx status
systemctl status nginx

# Test Nginx config
nginx -t

# Check Nginx logs
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log
```

## Network Monitoring

### Port Status
```bash
# Check listening ports
ss -tulpn

# Or
netstat -tulpn
```

### Network Connections
```bash
# Active connections
ss -s

# Established connections
ss -tn | grep ESTAB
```

### DNS Resolution
```bash
# Test DNS
nslookup yourdomain.com
dig yourdomain.com
```

## Performance Optimization

### High CPU Usage

1. Identify process: `top`
2. Check application logs
3. Look for infinite loops or heavy queries
4. Consider scaling or optimizing code

### High Memory Usage

1. Check memory: `free -h`
2. Identify heavy processes: `ps aux --sort=-%mem`
3. Check for memory leaks in logs
4. Consider adding swap or increasing RAM
5. Restart containers if needed

### High Disk Usage

1. Check disk: `df -h`
2. Find large directories: `du -sh /opt/*`
3. Clean logs: `docker system prune`
4. Remove old backups
5. Clean package caches

### High Load Average

1. Check load: `uptime`
2. Identify CPU-bound processes
3. Check I/O wait: `iostat`
4. Consider adding CPU cores
5. Optimize application performance

## Automated Monitoring

### Create Health Check Script

```bash
#!/bin/bash
# Server health check script

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "=== Server Health Check ==="
echo "Date: $(date)"
echo ""

# CPU Load
LOAD=$(uptime | awk -F'load average:' '{print $2}' | awk '{print $1}' | sed 's/,//')
echo -n "Load Average: $LOAD"

# Memory
MEMORY=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2 }')
echo -n " | Memory: $MEMORY"

# Disk
DISK=$(df -h | awk '$NF=="/"{printf "%s", $5}')
echo " | Disk: $DISK"
echo ""

# Docker Containers
RUNNING=$(docker ps --format "{{.Names}}" | wc -l)
TOTAL=$(docker ps -a --format "{{.Names}}" | wc -l)
echo -e "Containers: ${GREEN}$RUNNING${NC} running / $TOTAL total"

# Failed containers
FAILED=$(docker ps -a --filter "status=exited" --format "{{.Names}}" | wc -l)
if [ $FAILED -gt 0 ]; then
  echo -e "Failed containers: ${RED}$FAILED${NC}"
fi

# Coolify status
if docker ps | grep -q coolify; then
  echo -e "Coolify: ${GREEN}Running${NC}"
else
  echo -e "Coolify: ${RED}Not Running${NC}"
fi
```

### Schedule Regular Checks

```bash
# Add to crontab for hourly checks
crontab -e

# Health check every hour
0 * * * * /opt/scripts/health_check.sh >> /var/log/health.log 2>&1
```

## Alert Thresholds

Set up alerts for:
- CPU usage > 80% for 5 minutes
- Memory usage > 90%
- Disk usage > 85%
- Load average > number of CPU cores
- Any container stopped
- Application not responding

## Health Check Checklist

Daily checks:
- [ ] Server load is normal
- [ ] Memory usage is acceptable
- [ ] Disk space is sufficient
- [ ] All containers are running
- [ ] Coolify is accessible
- [ ] Applications respond correctly
- [ ] No error logs in applications

Weekly checks:
- [ ] Review resource trends
- [ ] Check backup status
- [ ] Review application logs
- [ ] Verify SSL certificates
- [ ] Test domain resolution
