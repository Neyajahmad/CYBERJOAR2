# Debug Steps - No Markers Showing

## Step 1: Check Database Content

```powershell
cd D:\Drive2\server
node checkData.js
```

This will show:
- How many areas are in the database
- Sample area names
- Whether Indian cities are loaded

## Step 2: Check Browser Console

1. Open browser at http://localhost:3000
2. Press **F12** to open Developer Tools
3. Click **Console** tab
4. Look for these messages:
   - "Fetching areas with filters:"
   - "Received areas: X areas"
   - "MapView received areas: X"
   - "Rendering X markers on map"

## Step 3: Check Network Tab

1. In Developer Tools, click **Network** tab
2. Refresh page (F5)
3. Look for request to: `http://localhost:5000/api/areas`
4. Click on it and check:
   - Status: Should be 200
   - Response: Should show array of areas

## Common Issues & Solutions

### Issue 1: Database has old US data
**Check:** Run `node checkData.js` - if you see "Silicon Valley", "Austin", etc.

**Solution:**
```powershell
cd D:\Drive2\server
node clearData.js
npm start
```

### Issue 2: Backend not running
**Check:** Can you access http://localhost:5000/api/health in browser?

**Solution:**
```powershell
cd D:\Drive2\server
npm start
```

### Issue 3: CORS error in console
**Check:** Console shows "CORS policy" error

**Solution:** Backend should have CORS enabled (already configured)

### Issue 4: Leaflet not loaded
**Check:** Console shows "Leaflet not loaded"

**Solution:** Hard refresh browser (Ctrl+Shift+R)

### Issue 5: Areas fetched but not rendering
**Check:** Console shows "Received areas: 16" but "Cannot render markers"

**Solution:** Leaflet might not be ready. Refresh page.

## Step 4: Manual API Test

```powershell
# Test if API returns data
Invoke-RestMethod -Uri "http://localhost:5000/api/areas" -Method Get | ConvertTo-Json
```

Should show Indian cities.

## Step 5: Force Reload Everything

```powershell
# Stop all servers (Ctrl+C in both terminals)

# Clear and restart backend
cd D:\Drive2\server
node clearData.js
npm start

# In another terminal, restart frontend
cd D:\Drive2\client
npm start

# Hard refresh browser: Ctrl+Shift+R
```

## What to Look For

### ✅ Success Indicators:
- checkData.js shows 16 areas
- Console shows "Received areas: 16"
- Console shows "Rendering 16 markers"
- Network tab shows successful API call
- Map shows markers

### ❌ Problem Indicators:
- checkData.js shows 0 or 12 areas (old data)
- Console shows "Received areas: 0"
- Network tab shows 404 or 500 error
- Console has red errors

## Next Steps

After running these debug steps, share:
1. Output of `node checkData.js`
2. Browser console messages
3. Network tab response for /api/areas

This will help identify the exact issue!
