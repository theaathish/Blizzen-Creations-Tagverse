#!/bin/bash

# DigitalOcean Auto-Setup Script
# Run this on your fresh DigitalOcean Droplet
# Usage: bash digitalocean-setup.sh

set -e

echo "🚀 Starting DigitalOcean Server Setup..."
echo "=================================================="

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration (change these)
GITHUB_REPO="https://github.com/theaathish/Blizzen-Creations-Tagverse.git"
GITHUB_BRANCH="main"
WEBHOOK_SECRET="your_strong_webhook_secret_here_change_me"
CLOUDFLARE_DOMAIN="api.blizzencreations.com"
TUNNEL_NAME="blizzen-backend"

# ===== STEP 1: Update System =====
echo -e "${BLUE}Step 1: Updating system...${NC}"
apt update && apt upgrade -y
apt install -y nodejs npm git curl wget nano ufw
echo -e "${GREEN}✓ System updated${NC}\n"

# ===== STEP 2: Install Global Tools =====
echo -e "${BLUE}Step 2: Installing global tools...${NC}"
npm install -g pm2
pm2 startup systemd -u root --hp /root
pm2 save
echo -e "${GREEN}✓ PM2 configured${NC}\n"

# ===== STEP 3: Clone Repository =====
echo -e "${BLUE}Step 3: Cloning GitHub repository...${NC}"
mkdir -p /opt
cd /opt
if [ ! -d "blizzen-backend" ]; then
    git clone $GITHUB_REPO blizzen-backend
    cd blizzen-backend
    git checkout $GITHUB_BRANCH
    npm install
    echo -e "${GREEN}✓ Repository cloned${NC}\n"
else
    echo -e "${GREEN}✓ Repository already exists${NC}\n"
fi

# ===== STEP 4: Create .env =====
echo -e "${BLUE}Step 4: Creating .env file...${NC}"
cd /opt/blizzen-backend
if [ ! -f ".env" ]; then
    cat > .env << EOF
MONGODB_URI=your_mongodb_connection_string_here
PORT=5001
NODE_ENV=production
EOF
    echo -e "${GREEN}✓ .env created (edit with your MongoDB URI)${NC}\n"
    echo "IMPORTANT: Edit .env with your MongoDB connection string:"
    echo "nano /opt/blizzen-backend/.env"
else
    echo -e "${GREEN}✓ .env already exists${NC}\n"
fi

# ===== STEP 5: Start Backend =====
echo -e "${BLUE}Step 5: Starting backend with PM2...${NC}"
cd /opt/blizzen-backend
if ! pm2 list | grep -q "blizzen-backend"; then
    pm2 start server/index.js --name "blizzen-backend" --env production
    pm2 save
fi
pm2 list
echo -e "${GREEN}✓ Backend started${NC}\n"

# ===== STEP 6: Setup Webhook =====
echo -e "${BLUE}Step 6: Setting up GitHub webhook...${NC}"
apt install -y webhook

# Create deploy script
cat > /opt/blizzen-backend/deploy.sh << 'DEPLOY_SCRIPT'
#!/bin/bash
set -e

echo "📦 Starting deployment..."
cd /opt/blizzen-backend

git pull origin main
echo "✓ Git pulled successfully"

npm install
echo "✓ Dependencies installed"

pm2 restart blizzen-backend --update-env
echo "✓ Backend restarted"

echo "[$(date)] Deployment completed" >> /var/log/blizzen-deploy.log
DEPLOY_SCRIPT

chmod +x /opt/blizzen-backend/deploy.sh
echo -e "${GREEN}✓ Deploy script created${NC}\n"

# Create webhook config
mkdir -p /etc/webhook
cat > /etc/webhook/hooks.json << EOF
[
  {
    "id": "deploy-blizzen",
    "execute-command": "/opt/blizzen-backend/deploy.sh",
    "command-working-directory": "/opt/blizzen-backend",
    "trigger-rule": {
      "match": {
        "type": "payload-hash-sha256",
        "secret": "$WEBHOOK_SECRET",
        "parameter": {
          "source": "header",
          "name": "X-Hub-Signature-256"
        }
      }
    }
  }
]
EOF

# Create webhook systemd service
cat > /etc/systemd/system/webhook.service << 'WEBHOOK_SERVICE'
[Unit]
Description=Webhook Service for GitHub Auto-Deploy
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/etc/webhook
ExecStart=/usr/bin/webhook -hooks /etc/webhook/hooks.json -port 9000 -verbose
Restart=on-failure
RestartSec=10
StandardOutput=append:/var/log/webhook.log
StandardError=append:/var/log/webhook.log

[Install]
WantedBy=multi-user.target
WEBHOOK_SERVICE

systemctl daemon-reload
systemctl enable webhook
systemctl start webhook
systemctl status webhook
echo -e "${GREEN}✓ Webhook configured${NC}\n"

# ===== STEP 7: Install Cloudflare Tunnel =====
echo -e "${BLUE}Step 7: Installing Cloudflare Tunnel...${NC}"
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
dpkg -i cloudflared.deb
rm cloudflared.deb
echo -e "${GREEN}✓ Cloudflare Tunnel installed${NC}\n"

echo -e "${BLUE}IMPORTANT: Cloudflare Tunnel Setup (Manual Steps)${NC}"
echo "1. Run: cloudflared tunnel login"
echo "2. Run: cloudflared tunnel create $TUNNEL_NAME"
echo "3. Create config file: nano ~/.cloudflared/config.yml"
echo "4. Add this content:"
echo "   tunnel: $TUNNEL_NAME"
echo "   credentials-file: /root/.cloudflared/YOUR_TUNNEL_ID.json"
echo "   ingress:"
echo "     - hostname: $CLOUDFLARE_DOMAIN"
echo "       service: http://localhost:5001"
echo "     - service: http_status:404"
echo "5. Run: cloudflared tunnel route dns $TUNNEL_NAME $CLOUDFLARE_DOMAIN"
echo "6. Run: sudo cloudflared service install"
echo "7. Run: sudo systemctl start cloudflared"
echo ""

# ===== STEP 8: Setup Firewall =====
echo -e "${BLUE}Step 8: Configuring firewall...${NC}"
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
ufw allow 9000/tcp  # Webhook
ufw enable
ufw status
echo -e "${GREEN}✓ Firewall configured${NC}\n"

# ===== FINAL STATUS =====
echo "=================================================="
echo -e "${GREEN}✅ Server setup complete!${NC}"
echo "=================================================="
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. Edit MongoDB connection:"
echo "   nano /opt/blizzen-backend/.env"
echo ""
echo "2. Test backend:"
echo "   curl http://localhost:5001/api/health"
echo ""
echo "3. Setup Cloudflare Tunnel:"
echo "   cloudflared tunnel login"
echo "   cloudflared tunnel create $TUNNEL_NAME"
echo "   (Follow instructions printed above)"
echo ""
echo "4. Add GitHub Webhook:"
echo "   URL: http://157.245.103.121:9000/hooks/deploy-blizzen"
echo "   Secret: $WEBHOOK_SECRET"
echo ""
echo "5. Verify auto-start on reboot:"
echo "   reboot"
echo ""
echo -e "${BLUE}Logs:${NC}"
echo "Backend: pm2 logs blizzen-backend"
echo "Webhook: journalctl -u webhook -f"
echo "Cloudflare: journalctl -u cloudflared -f"
echo ""
echo "🚀 Your server is ready!"
