# WebAfan Portfolio Frontend Redeployment Guide

## Quick Frontend Redeployment - One Command

### **Frontend Redeployment (React/Vite)**
```bash
sudo rm -rf /tmp/webafan-frontend-backup && \
sudo mv /tmp/webafan-portfolio /tmp/webafan-frontend-backup 2>/dev/null || true && \
sudo git clone https://github.com/MuhammadDarmawanFadilah/webafan.git /tmp/webafan-portfolio && \
cd /tmp/webafan-portfolio/frontend && \
sudo npm install && \
sudo npm run build && \
sudo rm -rf /var/www/mdarmawanf.my.id/* && \
sudo cp -r dist/* /var/www/mdarmawanf.my.id/ && \
sudo chown -R www-data:www-data /var/www/mdarmawanf.my.id && \
sudo systemctl reload nginx && \
echo "🎉 WEBAFAN FRONTEND REDEPLOYMENT COMPLETE!" && \
echo "✅ Frontend: https://mdarmawanf.my.id" && \
echo "✅ Build: React/Vite optimized" && \
echo "✅ Config: .env.production applied" && \
curl -I https://mdarmawanf.my.id
```

### **Verification Commands**
```bash
# Check frontend status
curl -I https://mdarmawanf.my.id

# Check Nginx status
sudo systemctl status nginx --no-pager

# Check file permissions
ls -la /var/www/mdarmawanf.my.id/
```

### **Rollback (if needed)**
```bash
sudo rm -rf /tmp/webafan-portfolio && \
sudo mv /tmp/webafan-frontend-backup /tmp/webafan-portfolio && \
cd /tmp/webafan-portfolio/frontend && \
sudo npm run build && \
sudo rm -rf /var/www/mdarmawanf.my.id/* && \
sudo cp -r dist/* /var/www/mdarmawanf.my.id/ && \
sudo chown -R www-data:www-data /var/www/mdarmawanf.my.id && \
sudo systemctl reload nginx
```

### 📊 FRONTEND SPECS
- **Framework**: React/Vite build optimized
- **Config**: Uses existing .env.production
- **Deployment**: /var/www/mdarmawanf.my.id
- **Backup**: Automatic backup before deployment
- **Permissions**: www-data:www-data

### 🌐 ACCESS POINTS
- **Main Portfolio**: https://mdarmawanf.my.id
- **Static Assets**: Cached with 1y expiration
- **SPA Routing**: try_files configured

---
**Frontend Redeployment**: Ubuntu 25.04 VPS  
**Resource Allocation**: Nginx optimized  
**Deployment Time**: ~2 minutes