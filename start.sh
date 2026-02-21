#!/bin/bash
# ============================================
# İDE - İslam Düşünce Enstitüsü
# Desktop App Launcher
# ============================================

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT=8765

echo ""
echo "  ╔══════════════════════════════════════════╗"
echo "  ║   İDE – İslam Düşünce Enstitüsü          ║"
echo "  ║   Masaüstü Uygulaması Başlatılıyor...    ║"
echo "  ╚══════════════════════════════════════════╝"
echo ""

# Kill any process using the port
lsof -ti:$PORT | xargs kill -9 2>/dev/null

# Start Python HTTP server
cd "$DIR"
python3 "$DIR/server.py" &
SERVER_PID=$!
echo "  ✅ Sunucu başlatıldı: http://localhost:$PORT"
echo "  🔧 Admin panel: http://localhost:$PORT/admin.html"
echo "  📌 PID: $SERVER_PID"
echo ""

# Wait for server to be ready
sleep 0.8

# Open in browser
if command -v open &>/dev/null; then
  open "http://localhost:$PORT"
elif command -v xdg-open &>/dev/null; then
  xdg-open "http://localhost:$PORT"
fi

echo "  🌐 Tarayıcı açılıyor..."
echo "  ⚡ Kapatmak için: Ctrl+C"
echo ""

# Keep server running
trap "kill $SERVER_PID 2>/dev/null; echo '  👋 Uygulama kapatıldı.'; exit 0" INT TERM
wait $SERVER_PID
