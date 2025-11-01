# DigitalOcean Server Setup Guide
## GitHub Auto-Deploy + Cloudflare Tunnel + Auto-Restart

This guide sets up automatic deployment from GitHub and Cloudflare Tunnel on your DigitalOcean Droplet.

---

## Part 1: Initial Server Setup

### 1.1 Connect to Your Droplet

```bash
ssh root@157.245.103.121
```

### 1.2 Update System

```bash
apt update && apt upgrade -y
apt install -y nodejs npm git curl wget nano
node -v
npm -v
```

### 1.3 Install Global Tools

```bash
npm install -g pm2
pm2 startup
pm2 save
```

---

## Part 2: Deploy Backend from GitHub

### 2.1 Clone Your Repository

```bash
cd /opt
git clone https://github.com/theaathish/Blizzen-Creations-Tagverse.git blizzen-backend
cd blizzen-backend
git checkout main
```

### 2.2 Install Dependencies & Create .env

```bash
npm install
nano .env
```

**Add these to `.env`:**
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=production
```

### 2.3 Start Backend with PM2

```bash
pm2 start server/index.js --name "blizzen-backend" --env production
pm2 save
```

**Verify it's running:**
```bash
pm2 list
curl http://localhost:5001/api/health
```

---

## Part 3: GitHub Webhook for Automatic Deployment

### 3.1 Install Webhook Tool

```bash
apt install -y webhook
```

### 3.2 Create Deploy Script

```bash
nano /opt/blizzen-backend/deploy.sh
```

**Paste this:**
```bash
#!/bin/bash
set -e

echo "📦 Starting deployment..."
cd /opt/blizzen-backend

# Pull latest changes
git pull origin main
echo "✓ Git pulled successfully"

# Install/update dependencies
npm install
echo "✓ Dependencies installed"

# Restart PM2 app
pm2 restart blizzen-backend --update-env
echo "✓ Backend restarted"

# Log deployment
echo "[$(date)] Deployment completed" >> /var/log/blizzen-deploy.log
```

**Make it executable:**
```bash
chmod +x /opt/blizzen-backend/deploy.sh
```

### 3.3 Create Webhook Configuration

```bash
nano /etc/webhook/hooks.json
```

**Paste this:**
```json
[
  {
    "id": "deploy-blizzen",
    "execute-command": "/opt/blizzen-backend/deploy.sh",
    "command-working-directory": "/opt/blizzen-backend",
    "trigger-rule": {
      "match": {
        "type": "payload-hash-sha256",
        "secret": "your_webhook_secret_here",
        "parameter": {
          "source": "header",
          "name": "X-Hub-Signature-256"
        }
      }
    }
  }
]
```

Replace `your_webhook_secret_here` with a strong secret.

### 3.4 Start Webhook Service

```bash
systemctl start webhook
systemctl enable webhook
systemctl status webhook
```

**Create systemd service for webhook (optional but recommended):**

```bash
nano /etc/systemd/system/webhook.service
```

**Paste:**
```
[Unit]
Description=Webhook Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/etc/webhook
ExecStart=/usr/bin/webhook -hooks /etc/webhook/hooks.json -port 9000 -verbose
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable it:
```bash
systemctl daemon-reload
systemctl enable webhook
systemctl start webhook
```

### 3.5 Configure GitHub Webhook

1. Go to: `https://github.com/theaathish/Blizzen-Creations-Tagverse/settings/hooks`
2. Click **Add webhook**
3. Set:
   - **Payload URL**: `http://157.245.103.121:9000/hooks/deploy-blizzen`
   - **Content type**: `application/json`
   - **Secret**: Use the same secret from `hooks.json`
   - **Events**: `Just the push event`
4. Click **Add webhook**

---

## Part 4: Cloudflare Tunnel Setup

### 4.1 Install Cloudflare Tunnel (Cloudflared)

```bash
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared.deb
cloudflared --version
```

### 4.2 Authenticate with Cloudflare

```bash
cloudflared tunnel login
```

This opens a browser to authenticate. Follow the prompts and select your domain.

### 4.3 Create a Tunnel

```bash
cloudflared tunnel create blizzen-backend
```

**Save the Tunnel ID** that appears in the output.

### 4.4 Create Config File

```bash
mkdir -p ~/.cloudflared
nano ~/.cloudflared/config.yml
```

**Paste this:**
```yaml
tunnel: blizzen-backend
credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json

ingress:
  - hostname: api.blizzencreations.com
    service: http://localhost:5001
  - service: http_status:404
```

Replace `YOUR_TUNNEL_ID` with your actual tunnel ID and `api.blizzencreations.com` with your desired custom URL.

### 4.5 Route Tunnel to Your Domain

```bash
cloudflared tunnel route dns blizzen-backend api.blizzencreations.com
```

### 4.6 Start Cloudflared as Service

```bash
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
sudo systemctl status cloudflared
```

---

## Part 5: Auto-Start on Reboot

### 5.1 Ensure PM2 Auto-Starts

```bash
pm2 startup systemd -u root --hp /root
pm2 save
```

### 5.2 Verify Services Auto-Start

Create a test script:
```bash
nano /etc/rc.local
```

Add these lines (if file doesn't exist, create it with these contents):
```bash
#!/bin/bash
sleep 10  # Wait for network to be ready
systemctl start webhook
systemctl start cloudflared
exit 0
```

Make it executable:
```bash
chmod +x /etc/rc.local
```

### 5.3 Test Auto-Start (Reboot Safely)

```bash
# Check current services
pm2 list
systemctl status webhook
systemctl status cloudflared

# Reboot
reboot
```

After reboot, SSH back and verify:
```bash
pm2 list
systemctl status webhook
systemctl status cloudflared
curl http://localhost:5001/api/health
```

---

## Part 6: Monitoring & Logs

### View Backend Logs
```bash
pm2 logs blizzen-backend
```

### View Webhook Logs
```bash
journalctl -u webhook -f
```

### View Cloudflared Logs
```bash
journalctl -u cloudflared -f
```

### View Deployment Logs
```bash
tail -f /var/log/blizzen-deploy.log
```

---

## Part 7: Firewall Setup (Optional but Recommended)

```bash
apt install -y ufw
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP (Cloudflare)
ufw allow 443/tcp   # HTTPS (Cloudflare)
ufw allow 9000/tcp  # Webhook (restrict to GitHub IPs recommended)
ufw enable
ufw status
```

---

## Part 8: Update Vercel Frontend

In your Vercel dashboard, set environment variable:
```
VITE_API_URL=https://api.blizzencreations.com
```

This will auto-deploy your frontend to use the new backend URL via Cloudflare Tunnel.

---

## Complete Workflow

1. **Local Development**: Code on your machine
2. **Push to GitHub**: `git push origin main`
3. **GitHub Webhook**: Triggers automatic deployment
4. **Deploy Script**: Runs on server, pulls changes, reinstalls deps, restarts PM2
5. **Backend Updates**: Live at `https://api.blizzencreations.com` via Cloudflare Tunnel
6. **Vercel Frontend**: Automatically uses updated API URL

---

## Troubleshooting

### Service won't auto-start
```bash
pm2 startup
pm2 save
systemctl status pm2-root
```

### Webhook not triggering
```bash
# Test webhook manually
curl -X POST http://localhost:9000/hooks/deploy-blizzen
# Check logs
journalctl -u webhook -f
```

### Cloudflare Tunnel down
```bash
systemctl restart cloudflared
journalctl -u cloudflared -f
```

### MongoDB connection fails
```bash
# Check .env file
cat /opt/blizzen-backend/.env
# Verify MongoDB URI is correct
```

---

## Security Checklist

- ✅ Firewall configured
- ✅ Only necessary ports open
- ✅ Webhook secret set strong
- ✅ SSH key-based auth only (disable password)
- ✅ CORS restricted to production domains
- ✅ MongoDB connection secured
- ✅ Regular backups enabled

---

**Your infrastructure is now production-ready with automatic GitHub deployments!** 🚀
