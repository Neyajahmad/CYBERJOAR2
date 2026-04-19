# Clear Old Data and Load Indian Cities

## The Problem
Your backend still has old US cities data. We need to clear it and reload with Indian cities.

## Solution - Follow These Steps:

### Step 1: Stop the Backend Server
In the terminal running the server, press **Ctrl+C**

### Step 2: Clear Old Data
```powershell
cd D:\Drive2\server
node clearData.js
```

You should see: "✅ Old data cleared successfully!"

### Step 3: Restart Backend Server
```powershell
npm start
```

Wait for: "Sample data loaded successfully"

### Step 4: Refresh Browser
Go to http://localhost:3000 and press **Ctrl+Shift+R** (hard refresh)

## Verify It Worked

1. You should now see markers on the India map
2. Search "Mumbai" - should show 2 results
3. Search "Delhi" - should show 4 results
4. Top Areas should show Indian cities

## If Still Not Working

### Alternative: Manual MongoDB Clear

```powershell
# Open MongoDB shell
mongo

# In MongoDB shell, type:
use urban-growth
db.areas.deleteMany({})
exit
```

Then restart the server:
```powershell
cd D:\Drive2\server
npm start
```

## Quick Test After Restart

```powershell
# Test the API
curl http://localhost:5000/api/areas
```

You should see Indian cities like "Connaught Place, Delhi", "Bandra West, Mumbai", etc.
