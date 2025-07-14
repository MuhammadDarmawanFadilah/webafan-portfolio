# WebAfan Portfolio Backend Redeployment Guide

## Quick Backend Redeployment - One Command

### **Backend Redeployment (Tomcat)**
```bash
sudo systemctl stop tomcat && \
sudo rm -rf /tmp/webafan-backend-backup && \
sudo mv /tmp/webafan-portfolio /tmp/webafan-backend-backup 2>/dev/null || true && \
sudo git clone https://github.com/MuhammadDarmawanFadilah/webafan.git /tmp/webafan-portfolio && \
cd /tmp/webafan-portfolio/backend && \
sudo cp src/main/resources/application-production.properties src/main/resources/application.properties && \
sudo ive=production && \
sudo rm -f /opt/tomcat/webapps/portfolio.war && \
sudo rm -rf /opt/tomcat/webapps/portfolio && \
sudo cp target/*.war /opt/tomcat/webapps/portfolio.war && \
sudo chown tomcat:tomcat /opt/tomcat/webapps/portfolio.war && \
sudo systemctl start tomcat && \
echo "🎉 WEBAFAN BACKEND REDEPLOYMENT COMPLETE!" && \
echo "✅ Backend API: https://mdarmawanf.my.id/portfolio/api" && \
echo "✅ Database: webafan_portfolio (MySQL)" && \
echo "✅ Config: application-production.properties applied" && \
echo "✅ File Uploads: /opt/webafan/uploads" && \
sleep 30 && \
curl -I https://mdarmawanf.my.id/portfolio/api/health
```

### **Verification Commands**
```bash
# Check backend API status
curl -I https://mdarmawanf.my.id/portfolio/api/health

# Check Tomcat status
sudo systemctl status tomcat --no-pager

# Check application logs
sudo tail -f /opt/tomcat/logs/catalina.out

# Check database connection
mysql -u root -e "SHOW DATABASES;" | grep webafan_portfolio
```

### **Rollback (if needed)**
```bash
sudo systemctl stop tomcat && \
sudo rm -rf /tmp/webafan-portfolio && \
sudo mv /tmp/webafan-backend-backup /tmp/webafan-portfolio && \
cd /tmp/webafan-portfolio/backend && \
sudo mvn clean package -DskipTests -Dspring.profiles.active=production && \
sudo rm -f /opt/tomcat/webapps/portfolio.war && \
sudo rm -rf /opt/tomcat/webapps/portfolio && \
sudo cp target/*.war /opt/tomcat/webapps/portfolio.war && \
sudo chown tomcat:tomcat /opt/tomcat/webapps/portfolio.war && \
sudo systemctl start tomcat
```

### **Database Backup (recommended before redeployment)**
```bash
sudo mysqldump -u root webafan_portfolio > /opt/webafan/backup_$(date +%Y%m%d_%H%M%S).sql
```

### 📊 BACKEND SPECS
- **Framework**: Spring Boot + Tomcat deployment
- **Config**: Uses existing application-production.properties
- **Database**: webafan_portfolio (MySQL)
- **File Storage**: /opt/webafan/uploads
- **Backup**: Automatic backup before deployment
- **Permissions**: tomcat:tomcat

### 🌐 ACCESS POINTS
- **API Endpoint**: https://mdarmawanf.my.id/portfolio/api
- **Health Check**: https://mdarmawanf.my.id/portfolio/api/health
- **File Uploads**: https://mdarmawanf.my.id/uploads
- **Context Path**: /portfolio

---
**Backend Redeployment**: Ubuntu 25.04 VPS  
**Resource Allocation**: Tomcat optimized  
**Deployment Time**: ~3 minutes