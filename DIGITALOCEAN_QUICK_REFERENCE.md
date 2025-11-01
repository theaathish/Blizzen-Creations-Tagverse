# DigitalOcean Quick Setup Reference

**Server IP:** `157.245.103.121`

---

## 🚀 Quick Start (Automated)

### Run on your Droplet:
```bash
ssh root@157.245.103.121
cd /tmp
wget https://raw.githubusercontent.com/theaathish/Blizzen-Creations-Tagverse/main/digitalocean-setup.sh
bash digitalocean-setup.sh
```

---

## Manual Setup Steps

### 1️⃣ Connect to Server
```bash
ssh root@157.245.103.121
```

### 2️⃣ Clone & Install
```bash
cd /opt
git clone https://github.com/theaathish/Blizzen-Creations-Tagverse.git blizzen-backend
cd blizzen-backend
npm install
```

### 3️⃣ Create `.env`
```bash
nano .env
```
Add:
```
MONGODB_URI=your_mongodb_uri
PORT=5001
NODE_ENV=production
```

### 4️⃣ Start Backend
```bash
pm2 start server/index.js --name blizzen-backend
pm2 startup
pm2 save
```

### 5️⃣ Setup GitHub Webhook
```bash
# Install webhook tool
apt install -y webhook

# Create deploy script
cat > /opt/blizzen-backend/deploy.sh << 'EOF'
#!/bin/bash
cd /opt/blizzen-backend
git pull origin main
npm install
pm2 restart blizzen-backend --update-env
EOF

chmod +x /opt/blizzen-backend/deploy.sh

# Create webhook config
mkdir -p /etc/webhook
nano /etc/webhook/hooks.json
```

Add to `hooks.json`:
```json
[{
  "id": "deploy-blizzen",
  "execute-command": "/opt/blizzen-backend/deploy.sh",
  "command-working-directory": "/opt/blizzen-backend"
}]
```

Start webhook:
```bash
webhook -hooks /etc/webhook/hooks.json -port 9000
```

### 6️⃣ Setup Cloudflare Tunnel
```bash
# Install
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared.deb

# Authenticate
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create blizzen-backend

# Create config
mkdir -p ~/.cloudflared
nano ~/.cloudflared/config.yml
```

Add to config:
```yaml
tunnel: blizzen-backend
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: api.blizzencreations.com
    service: http://localhost:5001
  - service: http_status:404
```

Route to domain:
```bash
cloudflared tunnel route dns blizzen-backend api.blizzencreations.com
```

Start service:
```bash
sudo cloudflared service install
sudo systemctl start cloudflared
```

### 7️⃣ GitHub Webhook Configuration

Go to: `https://github.com/theaathish/Blizzen-Creations-Tagverse/settings/hooks`

Add webhook:
- **URL:** `http://157.245.103.121:9000/hooks/deploy-blizzen`
- **Content type:** `application/json`
- **Events:** `Just the push event`

---

## 🔄 Auto-Restart Services

### Make PM2 auto-start
```bash
pm2 startup systemd -u root --hp /root
pm2 save
```

### Make Webhook auto-start
Create `/etc/systemd/system/webhook.service`:
```ini
[Unit]
Description=Webhook Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/webhook -hooks /etc/webhook/hooks.json -port 9000
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable:
```bash
systemctl daemon-reload
systemctl enable webhook
systemctl start webhook
```

### Make Cloudflare auto-start
```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
```

---

## 📊 Monitoring Commands

```bash
# View backend logs
pm2 logs blizzen-backend

# View webhook logs
journalctl -u webhook -f

# View cloudflare logs
journalctl -u cloudflared -f

# List running services
pm2 list
systemctl status webhook
systemctl status cloudflared
```

---

## 🧪 Testing

### Test backend
```bash
curl http://localhost:5001/api/health
```

### Test Cloudflare Tunnel
```bash
curl https://api.blizzencreations.com/api/health
```

### Test webhook
```bash
curl -X POST http://157.245.103.121:9000/hooks/deploy-blizzen
```

---

## 🔒 Security

### Setup Firewall
```bash
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 9000/tcp  # Webhook
ufw enable
```

### Restrict SSH
```bash
# Disable password login
nano /etc/ssh/sshd_config
# Change: PasswordAuthentication yes -> PasswordAuthentication no
systemctl restart sshd
```

---

## 🆘 Troubleshooting

### Service won't start
```bash
systemctl restart webhook
pm2 restart blizzen-backend
systemctl restart cloudflared
```

### Check logs
```bash
journalctl -u webhook -n 50
pm2 logs --lines 50
```

### Reboot safely
```bash
# Will auto-restart all services
reboot
```

---

## 📝 Environment Setup for Vercel

Set in Vercel Dashboard:
```
VITE_API_URL=https://api.blizzencreations.com
```

This will make your frontend use the Cloudflare Tunnel URL automatically.

---

**Everything is now automated! Push to GitHub → Auto-deploys to your server.** 🚀
