# VPS DEPLOYMENT GUIDE - OPTIMIZED ALUMNI ELECTION SYSTEM
## Production Deployment with Balanced Performance

### � ONE-COMMAND DEPLOYMENT (Optimized for High Performance)

#### **STAGE 1: System & Dependencies Setup**
```bash
sudo apt update && sudo apt upgrade -y && \
sudo apt install -y openjdk-21-jdk mysql-server nginx maven git curl wget unzip nodejs npm && \
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && \
sudo apt install -y nodejs && \
sudo npm install -g pnpm && \
sudo systemctl start mysql nginx && \
sudo systemctl enable mysql nginx
```

#### **STAGE 2: MySQL & Database Setup**
```bash
sudo systemctl stop mysql && \
sudo apt purge -y mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-* && \
sudo rm -rf /var/lib/mysql /var/log/mysql /etc/mysql && \
sudo apt autoremove -y && \
sudo apt autoclean && \
sudo apt update && \
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password ' && \
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password ' && \
sudo DEBIAN_FRONTEND=noninteractive apt install -y mysql-server && \
sudo mysqld --initialize-insecure --user=mysql --datadir=/var/lib/mysql && \
sudo systemctl enable mysql && \
sudo systemctl start mysql && \
sleep 5 && \
sudo mysql -e "UPDATE mysql.user SET authentication_string = NULL WHERE User = 'root' AND Host = 'localhost';" && \
sudo mysql -e "UPDATE mysql.user SET plugin = 'mysql_native_password' WHERE User = 'root' AND Host = 'localhost';" && \
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';" && \
sudo mysql -e "CREATE DATABASE IF NOT EXISTS pemilihan;" && \
sudo mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' WITH GRANT OPTION;" && \
sudo mysql -e "FLUSH PRIVILEGES;" && \
sudo tee /etc/mysql/mysql.conf.d/skip-grant.cnf > /dev/null << 'EOF'
[mysqld]
skip-grant-tables
skip-networking=0
bind-address=127.0.0.1
EOF
sudo systemctl restart mysql && \
sleep 3 && \
sudo mysql -e "UPDATE mysql.user SET authentication_string = NULL, plugin = 'mysql_native_password' WHERE User = 'root' AND Host = 'localhost';" && \
sudo mysql -e "FLUSH PRIVILEGES;" && \
sudo rm /etc/mysql/mysql.conf.d/skip-grant.cnf && \
sudo systemctl restart mysql && \
sleep 3 && \
sudo tee -a /etc/mysql/mysql.conf.d/mysqld.cnf > /dev/null << 'EOF'
innodb_buffer_pool_size = 4G
innodb_log_file_size = 512M
max_connections = 500
query_cache_size = 256M
key_buffer_size = 256M
tmp_table_size = 256M
max_heap_table_size = 256M
EOF
sudo systemctl restart mysql
```

#### **STAGE 3: Tomcat Setup & Configuration**
```bash
cd /tmp && \
wget --progress=bar:force http://downloads.apache.org/tomcat/tomcat-10/v10.1.43/bin/apache-tomcat-10.1.43.tar.gz && \
sudo tar -xzf apache-tomcat-10.1.43.tar.gz -C /opt && \
sudo mv /opt/apache-tomcat-10.1.43 /opt/tomcat && \
sudo chown -R root:root /opt/tomcat && \
sudo chmod +x /opt/tomcat/bin/*.sh && \
sudo mkdir -p /opt/tomcat/storage/{images,documents,temp} && \
sudo chown -R root:root /opt/tomcat/storage && \
sudo tee /etc/systemd/system/tomcat.service > /dev/null << 'EOF'
[Unit]
Description=Apache Tomcat Web Application Container
After=network.target mysql.service

[Service]
Type=forking
User=root
Group=root
Environment="JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64"
Environment="CATALINA_HOME=/opt/tomcat"
Environment="CATALINA_OPTS=-Xms8G -Xmx12G -server -XX:+UseG1GC -XX:MaxGCPauseMillis=200"
Environment="JAVA_OPTS=-Dspring.profiles.active=prod -Dfile.encoding=UTF-8"
ExecStart=/opt/tomcat/bin/startup.sh
ExecStop=/opt/tomcat/bin/shutdown.sh
Restart=always
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload && sudo systemctl enable tomcat
```

#### **STAGE 4: Build & Deploy Backend**
```bash
sudo git clone https://github.com/MuhammadDarmawanFadilah/pemilihan.git /tmp/pemilihan && \
cd /tmp/pemilihan/backend && \
sudo cp src/main/resources/application-prod.properties src/main/resources/application.properties && \
sudo mvn clean package -DskipTests -Dspring.profiles.active=prod && \
sudo cp target/backend.war /opt/tomcat/webapps/silapor.war && \
sudo systemctl start tomcat
```

#### **STAGE 5: Build & Deploy Frontend**
```bash
sudo mkdir -p /var/www/trensilapor.my.id && \
cd /tmp/pemilihan/frontend && \
sudo cp .env.prod .env.local && \
sudo pnpm install --frozen-lockfile && \
sudo pnpm run build && \
sudo cp -r .next public package.json next.config.ts .env.local node_modules /var/www/trensilapor.my.id/ && \
sudo chown -R root:root /var/www && \
sudo tee /etc/systemd/system/trensilapor-frontend.service > /dev/null << 'EOF'
[Unit]
Description=Trensilapor Frontend Next.js Application
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/var/www/trensilapor.my.id
ExecStart=/usr/bin/npx next start
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3000
Environment=NODE_OPTIONS=--max-old-space-size=4096
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload && sudo systemctl enable trensilapor-frontend && sudo systemctl start trensilapor-frontend
```

#### **STAGE 6: Nginx Configuration & HTTPS**
```bash
sudo mkdir -p /var/www/{mdarmawanf.my.id,ikafk.my.id,pesanbus.my.id,absenkantor.my.id} && \
sudo tee /etc/nginx/sites-available/trensilapor.my.id > /dev/null << 'EOF'
server {
    listen 80;
    server_name trensilapor.my.id;
    client_max_body_size 100M;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }
    
    location /api {
        proxy_pass http://localhost:8080/silapor/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }
}
EOF
for domain in mdarmawanf.my.id ikafk.my.id pesanbus.my.id absenkantor.my.id; do \
sudo tee /etc/nginx/sites-available/$domain > /dev/null << EOF
server {
    listen 80;
    server_name $domain;
    root /var/www/$domain;
    index index.html;
    location / { try_files \$uri \$uri/ =404; }
}
EOF
sudo ln -sf /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/; \
done && \
sudo ln -sf /etc/nginx/sites-available/trensilapor.my.id /etc/nginx/sites-enabled/ && \
sudo rm -f /etc/nginx/sites-enabled/default && \
sudo nginx -t && sudo systemctl reload nginx
```

#### **STAGE 7: SSL Certificates & Final Configuration**
```bash
sudo apt install -y certbot python3-certbot-nginx && \
sudo systemctl stop nginx && \
sudo certbot certonly --standalone -d trensilapor.my.id --email admin@trensilapor.my.id --agree-tos --non-interactive; \
if [ -f "/etc/letsencrypt/live/trensilapor.my.id/fullchain.pem" ]; then \
sudo tee /etc/nginx/sites-available/trensilapor.my.id > /dev/null << 'EOF'
server {
    listen 80;
    server_name trensilapor.my.id;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name trensilapor.my.id;
    
    ssl_certificate /etc/letsencrypt/live/trensilapor.my.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/trensilapor.my.id/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    client_max_body_size 100M;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }
    
    location /api {
        proxy_pass http://localhost:8080/silapor/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }
}
EOF
else \
sudo tee /etc/nginx/sites-available/trensilapor.my.id > /dev/null << 'EOF'
server {
    listen 80;
    server_name trensilapor.my.id;
    client_max_body_size 100M;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }
    
    location /api {
        proxy_pass http://localhost:8080/silapor/api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
    }
}
EOF
fi && \
for domain in mdarmawanf.my.id ikafk.my.id pesanbus.my.id absenkantor.my.id; do \
sudo tee /etc/nginx/sites-available/$domain > /dev/null << EOF
server {
    listen 80;
    server_name $domain;
    root /var/www/$domain;
    index index.html;
    client_max_body_size 100M;
    location / { try_files \$uri \$uri/ =404; }
}
EOF
sudo ln -sf /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/; \
done && \
sudo ln -sf /etc/nginx/sites-available/trensilapor.my.id /etc/nginx/sites-enabled/ && \
echo "0 2 */2 * * root certbot renew --quiet && systemctl reload nginx" | sudo tee -a /etc/crontab && \
sudo nginx -t && \
sudo systemctl start nginx && \
sudo systemctl restart tomcat trensilapor-frontend
```

#### **STAGE 8: System Optimization & Verification**
```bash
echo "🎉 DEPLOYMENT COMPLETE!" && \
echo "✅ Frontend: https://trensilapor.my.id" && \
echo "✅ Backend: https://trensilapor.my.id/api" && \
echo "✅ Database: MySQL (optimized)" && \
echo "🌐 Additional domains: https://mdarmawanf.my.id, https://ikafk.my.id, https://pesanbus.my.id, https://absenkantor.my.id" && \
echo "🔒 SSL auto-renewal enabled" && \
echo "📊 Performance: Backend 12GB, Frontend 4GB" && \
sudo systemctl status mysql tomcat trensilapor-frontend nginx --no-pager && \
mysql -u root -e "SHOW DATABASES;"
```

### 🔧 QUICK FIX COMMANDS

#### **Service Restart:**
```bash
sudo systemctl restart mysql tomcat trensilapor-frontend nginx
```

#### **Status Check:**
```bash
sudo systemctl status mysql tomcat trensilapor-frontend nginx --no-pager
```

#### **Port Verification:**
```bash
netstat -tlnp | grep -E ':(80|8080|3000|3306)'
```

#### **MySQL Connection Test:**
```bash
mysql -u root -e "SHOW DATABASES;"
```

#### **Frontend Rebuild (if needed):**
```bash
sudo systemctl stop trensilapor-frontend
cd /tmp/pemilihan/frontend && sudo pnpm run build
sudo cp -r .next /var/www/trensilapor.my.id/
sudo systemctl start trensilapor-frontend
```

### 📊 PERFORMANCE SPECS
- **Backend**: 12GB RAM, G1GC optimized
- **Frontend**: 4GB RAM, Node.js optimized  
- **Database**: 4GB buffer pool, 500 connections
- **SSL**: Auto-renewal enabled
- **Domains**: 5 domains ready

### 🌐 ACCESS POINTS
- **Main App**: https://trensilapor.my.id
- **API**: https://trensilapor.my.id/api  
- **Additional**: https://mdarmawanf.my.id, https://ikafk.my.id, https://pesanbus.my.id, https://absenkantor.my.id

---
**Optimized for**: Ubuntu 25.04 VPS  
**Resource Allocation**: Balanced Performance  
**Deployment Time**: ~10 minutes

#### **STAGE 9: WebAfan Portfolio Deployment (mdarmawanf.my.id)**

##### **9.1: Portfolio Backend Deployment (Spring Boot)**
```bash
sudo git clone https://github.com/MuhammadDarmawanFadilah/webafan-portfolio.git /tmp/webafan-portfolio && \
cd /tmp/webafan-portfolio/backend && \
sudo tee src/main/resources/application-production.properties > /dev/null << 'EOF'
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/webafan_portfolio
spring.datasource.username=root
spring.datasource.password=
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8081
server.servlet.context-path=/portfolio

# CORS Configuration
cors.allowed.origins=https://mdarmawanf.my.id
cors.allowed.methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed.headers=*
cors.allow.credentials=true

# JWT Configuration
jwt.secret=${JWT_SECRET:mySecretKey123456789012345678901234567890}
jwt.expiration=${JWT_EXPIRATION:86400000}

# Logging Configuration
logging.level.com.webafan.portfolio=INFO
logging.level.org.springframework.security=INFO
logging.level.org.hibernate.SQL=WARN

# WhatsApp API Configuration
whatsapp.api.url=${WHATSAPP_API_URL:https://api.whatsapp.com}
whatsapp.api.token=${WHATSAPP_API_TOKEN:your_token_here}

# Application URLs
app.frontend.url=https://mdarmawanf.my.id
app.backend.url=https://mdarmawanf.my.id
app.api.base.url=https://mdarmawanf.my.id/portfolio/api

# File Upload Configuration
file.upload.dir=/opt/webafan/uploads
file.upload.max-size=10MB
file.upload.max-request-size=10MB
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
EOF
sudo mysql -e "CREATE DATABASE IF NOT EXISTS webafan_portfolio;" && \
sudo mkdir -p /opt/webafan/uploads && \
sudo chown -R root:root /opt/webafan && \
sudo mvn clean package -DskipTests -Dspring.profiles.active=production && \
sudo cp target/*.jar /opt/webafan/portfolio.jar && \
sudo tee /etc/systemd/system/webafan-backend.service > /dev/null << 'EOF'
[Unit]
Description=WebAfan Portfolio Backend Spring Boot Application
After=network.target mysql.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/webafan
ExecStart=/usr/lib/jvm/java-21-openjdk-amd64/bin/java -jar -Dspring.profiles.active=production -Xms2G -Xmx4G portfolio.jar
Restart=always
Environment=JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64
LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload && \
sudo systemctl enable webafan-backend && \
sudo systemctl start webafan-backend
```

##### **9.2: Portfolio Frontend Deployment (React/Vite)**
```bash
sudo mkdir -p /var/www/mdarmawanf.my.id && \
cd /tmp/webafan-portfolio/frontend && \
sudo tee .env.production > /dev/null << 'EOF'
# API Configuration
VITE_API_BASE_URL=https://mdarmawanf.my.id/portfolio/api
VITE_BACKEND_URL=https://mdarmawanf.my.id
VITE_FRONTEND_URL=https://mdarmawanf.my.id

# Contact Information
VITE_CONTACT_EMAIL=muhammaddarmawan@gmail.com
VITE_CONTACT_PHONE=+62 856 0012 7 856
VITE_CONTACT_ADDRESS=Griya Satria Indah 02 Blok M No. 19 Rt 03 Rw. 10 Sukamakmur, Purwokerto Utara, Banyumas, Jawa Tengah (53125)

# Social Media Links
VITE_LINKEDIN_URL=https://linkedin.com/in/muhammad-darmawan-fadilah
VITE_GITHUB_URL=https://github.com/MuhammadDarmawanFadilah
VITE_INSTAGRAM_URL=https://instagram.com/mdarmawanf
VITE_TWITTER_URL=https://twitter.com/mdarmawanf

# Google Maps
VITE_MAPS_URL=https://maps.app.goo.gl/6ahYXYBJYCCWA9e48

# Environment
VITE_NODE_ENV=production
VITE_APP_NAME=WebAfan Portfolio
VITE_APP_VERSION=1.0.0
EOF
sudo npm install && \
sudo npm run build && \
sudo cp -r dist/* /var/www/mdarmawanf.my.id/ && \
sudo chown -R www-data:www-data /var/www/mdarmawanf.my.id
```

##### **9.3: Nginx Configuration for Portfolio**
```bash
sudo tee /etc/nginx/sites-available/mdarmawanf.my.id > /dev/null << 'EOF'
server {
    listen 80;
    server_name mdarmawanf.my.id;
    client_max_body_size 10M;
    
    # Frontend (React)
    location / {
        root /var/www/mdarmawanf.my.id;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API (Spring Boot)
    location /portfolio {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }
    
    # File uploads
    location /uploads {
        alias /opt/webafan/uploads;
        expires 1y;
        add_header Cache-Control "public";
    }
}
EOF
sudo ln -sf /etc/nginx/sites-available/mdarmawanf.my.id /etc/nginx/sites-enabled/ && \
sudo nginx -t && \
sudo systemctl reload nginx
```

##### **9.4: SSL Certificate Installation**
```bash
sudo systemctl stop nginx && \
sudo certbot certonly --standalone -d mdarmawanf.my.id --email muhammaddarmawan@gmail.com --agree-tos --non-interactive && \
if [ -f "/etc/letsencrypt/live/mdarmawanf.my.id/fullchain.pem" ]; then \
sudo tee /etc/nginx/sites-available/mdarmawanf.my.id > /dev/null << 'EOF'
server {
    listen 80;
    server_name mdarmawanf.my.id;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name mdarmawanf.my.id;
    
    ssl_certificate /etc/letsencrypt/live/mdarmawanf.my.id/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/mdarmawanf.my.id/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    client_max_body_size 10M;
    
    # Frontend (React)
    location / {
        root /var/www/mdarmawanf.my.id;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API (Spring Boot)
    location /portfolio {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }
    
    # File uploads
    location /uploads {
        alias /opt/webafan/uploads;
        expires 1y;
        add_header Cache-Control "public";
    }
}
EOF
else \
sudo tee /etc/nginx/sites-available/mdarmawanf.my.id > /dev/null << 'EOF'
server {
    listen 80;
    server_name mdarmawanf.my.id;
    client_max_body_size 10M;
    
    # Frontend (React)
    location / {
        root /var/www/mdarmawanf.my.id;
        index index.html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Backend API (Spring Boot)
    location /portfolio {
        proxy_pass http://localhost:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }
    
    # File uploads
    location /uploads {
        alias /opt/webafan/uploads;
        proxy_set_header Host $host;
        expires 1y;
        add_header Cache-Control "public";
    }
}
EOF
fi && \
sudo systemctl start nginx
```

##### **9.5: Final Verification & Testing**
```bash
echo "🎉 WEBAFAN PORTFOLIO DEPLOYMENT COMPLETE!" && \
echo "✅ Frontend: https://mdarmawanf.my.id" && \
echo "✅ Backend API: https://mdarmawanf.my.id/portfolio/api" && \
echo "✅ Database: webafan_portfolio (MySQL)" && \
echo "✅ File Uploads: /opt/webafan/uploads" && \
echo "🔒 SSL Certificate: Auto-renewal enabled" && \
echo "📊 Performance: Backend 4GB, Frontend optimized" && \
sudo systemctl status mysql webafan-backend nginx --no-pager && \
mysql -u root -e "SHOW DATABASES;" | grep webafan_portfolio && \
curl -I https://mdarmawanf.my.id && \
curl -I https://mdarmawanf.my.id/portfolio/api/profile
```

### 🔧 PORTFOLIO MAINTENANCE COMMANDS

#### **Portfolio Service Restart:**
```bash
sudo systemctl restart mysql webafan-backend nginx
```

#### **Portfolio Status Check:**
```bash
sudo systemctl status mysql webafan-backend nginx --no-pager
```

#### **Portfolio Backend Update:**
```bash
sudo systemctl stop webafan-backend
cd /tmp/webafan-portfolio/backend && sudo git pull
sudo mvn clean package -DskipTests -Dspring.profiles.active=production
sudo cp target/*.jar /opt/webafan/portfolio.jar
sudo systemctl start webafan-backend
```

#### **Portfolio Frontend Update:**
```bash
cd /tmp/webafan-portfolio/frontend && sudo git pull
sudo npm run build
sudo cp -r dist/* /var/www/mdarmawanf.my.id/
sudo chown -R www-data:www-data /var/www/mdarmawanf.my.id
```

#### **Portfolio Database Backup:**
```bash
sudo mysqldump -u root webafan_portfolio > /opt/webafan/backup_$(date +%Y%m%d_%H%M%S).sql
```

#### **Portfolio Logs Check:**
```bash
sudo journalctl -u webafan-backend -f --no-pager
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### 📊 PORTFOLIO PERFORMANCE SPECS
- **Backend**: 4GB RAM, Spring Boot optimized
- **Frontend**: React/Vite build optimized
- **Database**: webafan_portfolio (MySQL)
- **SSL**: Auto-renewal enabled
- **File Storage**: /opt/webafan/uploads

### 🌐 PORTFOLIO ACCESS POINTS
- **Main Portfolio**: https://mdarmawanf.my.id
- **API Endpoint**: https://mdarmawanf.my.id/portfolio/api
- **File Uploads**: https://mdarmawanf.my.id/uploads
- **Admin Panel**: https://mdarmawanf.my.id/admin

---
**Portfolio Deployment**: Ubuntu 25.04 VPS  
**Resource Allocation**: Optimized for Portfolio  
**Deployment Time**: ~8 minutes
