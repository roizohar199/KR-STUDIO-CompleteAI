# פריסה ב-AWS עם תצורה חזקה יותר

## בחירת Instance Type

### מומלץ לזיכרון גבוה:
- **t3.xlarge**: 4 vCPU, 16GB RAM - $0.166/שעה
- **t3.2xlarge**: 8 vCPU, 32GB RAM - $0.332/שעה
- **c5.2xlarge**: 8 vCPU, 16GB RAM - $0.34/שעה

### מומלץ עם GPU:
- **g4dn.xlarge**: 4 vCPU, 16GB RAM, GPU - $0.526/שעה
- **g5.xlarge**: 4 vCPU, 16GB RAM, GPU - $0.438/שעה

## הגדרת EC2 Instance

### 1. יצירת Instance
```bash
# יצירת key pair
aws ec2 create-key-pair --key-name kr-studio-key --query 'KeyMaterial' --output text > kr-studio-key.pem
chmod 400 kr-studio-key.pem

# יצירת security group
aws ec2 create-security-group --group-name kr-studio-sg --description "KR Studio Audio Separation"

# הוספת rules
aws ec2 authorize-security-group-ingress --group-name kr-studio-sg --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name kr-studio-sg --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name kr-studio-sg --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-name kr-studio-sg --protocol tcp --port 10000 --cidr 0.0.0.0/0
```

### 2. התחברות ל-Instance
```bash
ssh -i kr-studio-key.pem ubuntu@YOUR_INSTANCE_IP
```

## התקנת תוכנות נדרשות

### 1. עדכון המערכת
```bash
sudo apt update && sudo apt upgrade -y
```

### 2. התקנת Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# הגדרת זיכרון גבוה יותר
export NODE_OPTIONS="--max-old-space-size=8192"
```

### 3. התקנת Python ו-Dependencies
```bash
sudo apt install -y python3 python3-pip python3-venv ffmpeg

# יצירת virtual environment
python3 -m venv kr-studio-env
source kr-studio-env/bin/activate

# התקנת Demucs
pip install torch==2.0.1 torchaudio==2.0.2
pip install demucs==4.0.0
pip install -r requirements.txt
```

### 4. הגדרת Swap (אם נדרש)
```bash
# יצירת swap file של 8GB
sudo fallocate -l 8G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# הוספה ל-fstab
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## הגדרת הפרויקט

### 1. העתקת הקבצים
```bash
# יצירת תיקיית הפרויקט
mkdir -p /home/ubuntu/kr-studio
cd /home/ubuntu/kr-studio

# העתקת קבצים מה-Git repository
git clone https://github.com/your-repo/kr-studio.git .
```

### 2. התקנת Dependencies
```bash
npm install
```

### 3. הגדרת Environment Variables
```bash
cat > .env << EOF
NODE_ENV=production
NODE_OPTIONS=--max-old-space-size=8192
PORT=10000
PYTHONUNBUFFERED=1
OMP_NUM_THREADS=1
MKL_NUM_THREADS=1
OPENBLAS_NUM_THREADS=1
VECLIB_MAXIMUM_THREADS=1
NUMEXPR_NUM_THREADS=1
PYTORCH_CUDA_ALLOC_CONF=max_split_size_mb:128
EOF
```

## הגדרת PM2 לניהול התהליך

### 1. התקנת PM2
```bash
npm install -g pm2
```

### 2. יצירת קובץ הגדרות PM2
```bash
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'kr-studio',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '6G',
    env: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=8192',
      PORT: 10000
    },
    env_production: {
      NODE_ENV: 'production',
      NODE_OPTIONS: '--max-old-space-size=8192',
      PORT: 10000
    }
  }]
};
EOF
```

### 3. הפעלת השרת
```bash
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## הגדרת Nginx (אופציונלי)

### 1. התקנת Nginx
```bash
sudo apt install -y nginx
```

### 2. הגדרת Reverse Proxy
```bash
sudo tee /etc/nginx/sites-available/kr-studio << EOF
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:10000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/kr-studio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## הגדרת SSL עם Let's Encrypt

### 1. התקנת Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 2. קבלת Certificate
```bash
sudo certbot --nginx -d your-domain.com
```

## ניטור ובדיקות

### 1. בדיקת זיכרון
```bash
free -h
htop
```

### 2. בדיקת לוגים
```bash
pm2 logs kr-studio
pm2 monit
```

### 3. בדיקת Demucs
```bash
# בדיקת מודלים
python -m demucs --list-models

# בדיקה ידנית
python -m demucs --two-stems=vocals --cpu test.mp3
```

## הגדרות אופטימיזציה

### 1. הגדרת ulimits
```bash
echo '* soft nofile 65536' | sudo tee -a /etc/security/limits.conf
echo '* hard nofile 65536' | sudo tee -a /etc/security/limits.conf
```

### 2. הגדרת sysctl
```bash
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
echo 'vm.max_map_count=262144' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## גיבוי ושחזור

### 1. גיבוי קבצים
```bash
# גיבוי יומי
sudo crontab -e
# הוספת: 0 2 * * * tar -czf /backup/kr-studio-$(date +\%Y\%m\%d).tar.gz /home/ubuntu/kr-studio
```

### 2. שחזור
```bash
tar -xzf backup-file.tar.gz -C /home/ubuntu/
pm2 restart kr-studio
```

## עלויות משוערות

- **t3.xlarge**: ~$120/חודש
- **t3.2xlarge**: ~$240/חודש
- **g4dn.xlarge**: ~$380/חודש

## יתרונות AWS על Fly.io

1. **זיכרון גבוה יותר**: עד 32GB RAM
2. **GPU זמין**: תמיכה ב-CUDA
3. **גמישות**: בחירת תצורה מדויקת
4. **ניטור מתקדם**: CloudWatch
5. **גיבוי**: EBS Snapshots
6. **Auto Scaling**: אפשרות להגדלה אוטומטית
