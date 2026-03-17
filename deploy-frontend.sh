#!/bin/bash

# =============================================================
# Alpecon Frontend Deployment Script
# Usage: ./deploy-frontend.sh
# Requires: SSH access to VPS
# =============================================================

# ⚠️ НАСТРОЙТЕ ЭТИ ПЕРЕМЕННЫЕ ПОД ВАШИ ДАННЫЕ:
VPS_USER="root"                        # Пользователь SSH
VPS_IP="YOUR_SERVER_IP"               # IP-адрес вашего VPS
REMOTE_PATH="/var/www/alpecon/dist"   # Путь на сервере

# =============================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "================================================"
echo "🚀 Alpecon Frontend Deployment"
echo "================================================"
echo ""

# Проверяем, что IP настроен
if [ "$VPS_IP" = "YOUR_SERVER_IP" ]; then
  echo -e "${RED}❌ Укажите VPS_IP в начале скрипта!${NC}"
  exit 1
fi

# Собираем проект
echo -e "${YELLOW}📦 Building project...${NC}"
npm run build
echo -e "${GREEN}✓ Build completed${NC}"
echo ""

# Загружаем на сервер
echo -e "${YELLOW}📤 Uploading dist/ to $VPS_USER@$VPS_IP:$REMOTE_PATH ...${NC}"
rsync -avz --delete dist/ "$VPS_USER@$VPS_IP:$REMOTE_PATH/"
echo -e "${GREEN}✓ Upload completed${NC}"
echo ""

echo "================================================"
echo -e "${GREEN}✅ Frontend deployed successfully!${NC}"
echo "================================================"
echo ""
echo "Site should be live at: https://alpecon.kz"
echo ""
