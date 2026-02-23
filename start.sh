#!/bin/bash
# ============================================
# IBXI – Imom Buxoriy ilmiy tadqiqot markazi
# Desktop Application Launcher
# ============================================

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT=8765

echo ""
echo "  ╔══════════════════════════════════════════════╗"
echo "  ║  IBXI – Imom Buxoriy ilmiy tadqiqot markazi ║"
echo "  ║  Server ishga tushirilmoqda...               ║"
echo "  ╚══════════════════════════════════════════════╝"
echo ""

# Kill any process using the port
lsof -ti:$PORT | xargs kill -9 2>/dev/null

# Start Python HTTP server
cd "$DIR"
python3 "$DIR/server.py" &
SERVER_PID=$!
echo "  Server ishga tushdi: http://localhost:$PORT"
echo "  Admin panel: http://localhost:$PORT/admin.html"
echo "  PID: $SERVER_PID"
echo ""

# Wait for server to be ready
sleep 1

# Open in browser
if command -v open &>/dev/null; then
  open "http://localhost:$PORT"
elif command -v xdg-open &>/dev/null; then
  xdg-open "http://localhost:$PORT"
fi

echo "  Brauzer ochilmoqda..."
echo "  To'xtatish uchun: Ctrl+C"
echo ""

# Keep server running
trap "kill $SERVER_PID 2>/dev/null; echo '  Server to'\''xtatildi.'; exit 0" INT TERM
wait $SERVER_PID
