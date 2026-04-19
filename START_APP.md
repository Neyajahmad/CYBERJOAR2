# How to Run the Urban Growth Dashboard

## Complete Step-by-Step Guide

### Prerequisites
- MongoDB installed and running
- Node.js installed
- All dependencies installed

---

## 🚀 Starting the Application (3 Terminals)

### Terminal 1: Start MongoDB

```powershell
mongod
```

**Keep this terminal running**

Expected output:
```
[initandlisten] waiting for connections on port 27017
```

---

### Terminal 2: Start Backend Server

```powershell
cd D:\Drive2\server
npm start
```

**Keep this terminal running**

Expected output:
```
Server running on port 5000
MongoDB Connected: localhost
Loading sample data...
Sample data loaded successfully
```

✅ **Backend is ready when you see "Sample data loaded successfully"**

---

### Terminal 3: Start Frontend Client

```powershell
cd D:\Drive2\client
npm start
```

**Keep this terminal running**

Expected output:
```
Compiled successfully!

You can now view urban-growth-client in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

✅ **Browser will automatically open to http://localhost:3000**

---

## 🎯 What You Should See

1. **Dashboard loads** with India map
2. **16 markers** appear on the map (Delhi, Mumbai, Bangalore, etc.)
3. **Heatmap overlay** shows red/yellow/green zones
4. **Sidebar** with 3 tabs: Add Area, Top Areas, Filters

---

## 🧪 Quick Test

### Test 1: Search for Delhi
1. Click **"Filters"** tab
2. Type **"Delhi"** in search box
3. Should show 4 Delhi areas with markers

### Test 2: View Top Areas
1. Click **"Top Areas"** tab
2. Should see top 5 Indian cities ranked by growth score

### Test 3: Click a Marker
1. Click any marker on the map
2. Popup shows area details and growth score

---

## ⚠️ Troubleshooting

### Problem: "mongod is not recognized"
**Solution:** MongoDB not installed or not in PATH
```powershell
# Install MongoDB from: https://www.mongodb.com/try/download/community
# Or use MongoDB Atlas (cloud) - update server/.env with connection string
```

### Problem: "Port 5000 already in use"
**Solution:**
```powershell
npx kill-port 5000
```

### Problem: "Port 3000 already in use"
**Solution:** Press 'Y' when prompted to use a different port

### Problem: No markers showing
**Solution:**
```powershell
# Check database has Indian data
cd D:\Drive2\server
node checkData.js

# If shows 0 or old US cities, clear and restart:
node clearData.js
npm start
```

### Problem: Backend won't start
**Solution:**
```powershell
# Reinstall dependencies
cd D:\Drive2\server
rm -r node_modules
npm install
npm start
```

### Problem: Frontend won't start
**Solution:**
```powershell
# Reinstall dependencies
cd D:\Drive2\client
Remove-Item -Recurse -Force node_modules
npm install
npm start
```

---

## 🔄 Restarting the App

If you closed everything and want to restart:

```powershell
# Terminal 1
mongod

# Terminal 2
cd D:\Drive2\server
npm start

# Terminal 3
cd D:\Drive2\client
npm start
```

---

## 🛑 Stopping the App

To stop all services:

1. **Terminal 1 (MongoDB):** Press **Ctrl+C**
2. **Terminal 2 (Backend):** Press **Ctrl+C**
3. **Terminal 3 (Frontend):** Press **Ctrl+C**

---

## 📝 Quick Commands Reference

### Check if MongoDB is running:
```powershell
mongo --eval "db.version()"
```

### Check database content:
```powershell
cd D:\Drive2\server
node checkData.js
```

### Clear database:
```powershell
cd D:\Drive2\server
node clearData.js
```

### Test backend API:
```powershell
curl http://localhost:5000/api/areas
```

### Test backend health:
```powershell
curl http://localhost:5000/api/health
```

---

## 🎉 Success Checklist

✅ MongoDB running (Terminal 1)
✅ Backend running on port 5000 (Terminal 2)
✅ Frontend running on port 3000 (Terminal 3)
✅ Browser shows dashboard at http://localhost:3000
✅ Map displays with markers
✅ Can search for "Delhi" and see results
✅ Top Areas tab shows Indian cities
✅ Can add new areas via form

---

## 📱 Access from Other Devices

If you want to access from phone/tablet on same network:

1. Find your computer's IP address:
```powershell
ipconfig
```
Look for "IPv4 Address" (e.g., 192.168.1.100)

2. Update `client/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://192.168.1.100:5000/api';
```

3. Access from other device:
```
http://192.168.1.100:3000
```

---

## 🚀 Production Deployment (Optional)

### Build for production:
```powershell
cd D:\Drive2\client
npm run build
```

This creates optimized production files in `client/build/`

---

## 💡 Tips

- Keep all 3 terminals open while using the app
- If you see errors, check all 3 terminals for error messages
- Use **Ctrl+C** to stop any terminal process
- Use **Ctrl+Shift+R** in browser for hard refresh
- Press **F12** in browser to see console logs for debugging

---

## 📚 Additional Resources

- **Full Testing Guide:** See `TESTING_GUIDE.md`
- **India Setup:** See `INDIA_SETUP.md`
- **Debug Steps:** See `DEBUG_STEPS.md`
- **Main README:** See `README.md`

---

Enjoy your Urban Growth Dashboard! 🇮🇳
