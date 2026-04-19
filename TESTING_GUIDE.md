# Complete Testing Guide - Urban Growth Dashboard

## Prerequisites Check

Before testing, ensure:
- ✅ MongoDB is installed and running
- ✅ Node.js is installed (v14+)
- ✅ Both client and server dependencies are installed

## Step-by-Step Testing Instructions

### 1. Start MongoDB

**Option A: Local MongoDB**
```powershell
# Open a new PowerShell terminal
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- If using cloud MongoDB, update `server/.env` with your connection string
- No need to run mongod locally

---

### 2. Start the Backend Server

**Open Terminal 1 (PowerShell):**
```powershell
cd D:\Drive2\server
npm start
```

**Expected Output:**
```
Server running on port 5000
MongoDB Connected: localhost (or your MongoDB host)
Loading sample data...
Sample data loaded successfully
```

**✅ Backend is ready when you see "Sample data loaded successfully"**

---

### 3. Start the Frontend Client

**Open Terminal 2 (PowerShell):**
```powershell
cd D:\Drive2\client
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view urban-growth-client in the browser.

Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

**✅ Browser should automatically open to http://localhost:3000**

---

## Testing Checklist

### ✅ Test 1: View the Dashboard
- [ ] Dashboard loads without errors
- [ ] Map displays centered on the USA
- [ ] You see multiple markers on the map
- [ ] Heatmap overlay is visible (red/yellow/green colors)

### ✅ Test 2: Interact with Markers
1. **Click on any marker** on the map
2. **Verify popup shows:**
   - Area name
   - Growth Score (calculated value)
   - Price Growth percentage
   - Rental Demand percentage
   - Infrastructure Score percentage

**Example popup:**
```
Downtown Austin
Growth Score: 87.40
─────────────────
Price Growth: 85%
Rental Demand: 90%
Infrastructure: 88%
```

### ✅ Test 3: View Top 5 Areas
1. Click the **"Top Areas"** tab in the sidebar
2. **Verify you see:**
   - 5 areas ranked by growth score
   - Each area shows all metrics
   - Areas are sorted from highest to lowest score

**Expected Top Areas (approximately):**
1. Silicon Valley (~90.9)
2. Nashville Gulch (~87.5)
3. Downtown Austin (~87.4)
4. Boston Back Bay (~85.1)
5. Seattle Downtown (~84.1)

### ✅ Test 4: Add New Area
1. Click the **"Add Area"** tab
2. Fill in the form:
   ```
   Area Name: Los Angeles Downtown
   Latitude: 34.0522
   Longitude: -118.2437
   Price Growth: 88
   Rental Demand: 85
   Infrastructure: 82
   ```
3. Click **"Add Area"** button
4. **Verify:**
   - Success message appears
   - New marker appears on the map (West Coast)
   - Form clears automatically
   - Top Areas list updates

**Expected Growth Score:** ~85.4
**Formula:** (0.4 × 88) + (0.3 × 85) + (0.3 × 82) = 85.3

### ✅ Test 5: Test Filters
1. Click the **"Filters"** tab
2. **Test Search:**
   - Type "Austin" in the search box
   - Verify only Austin area(s) show on map
   - Clear search

3. **Test High-Growth Filter:**
   - Check "Show only high-growth areas (score ≥ 70)"
   - Verify only high-scoring areas remain visible
   - Uncheck to see all areas again

4. Click **"Clear Filters"** button
   - Verify all areas reappear

### ✅ Test 6: Heatmap Visualization
**Verify color coding:**
- **Red zones** = High growth (score 70-100)
  - Example: Silicon Valley, Austin, Nashville
- **Yellow zones** = Medium growth (score 40-70)
  - Example: Portland, Phoenix
- **Green zones** = Low growth (score 0-40)
  - Example: Chicago Loop

### ✅ Test 7: Responsive UI
1. Resize browser window
2. Verify:
   - Sidebar remains functional
   - Map adjusts to available space
   - No layout breaks

### ✅ Test 8: API Testing (Optional)

**Test Backend APIs directly using PowerShell:**

```powershell
# Test 1: Get all areas
Invoke-RestMethod -Uri "http://localhost:5000/api/areas" -Method Get

# Test 2: Get top 5 areas
Invoke-RestMethod -Uri "http://localhost:5000/api/areas/top" -Method Get

# Test 3: Add new area
$body = @{
    areaName = "Test City"
    latitude = 40.7128
    longitude = -74.0060
    priceGrowth = 75
    rentalDemand = 80
    infrastructureScore = 85
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/areas" -Method Post -Body $body -ContentType "application/json"
```

### ✅ Test 9: Error Handling

**Test invalid input:**
1. Try adding area with empty fields → Should show error
2. Try adding area with score > 100 → Should show error
3. Try adding area with score < 0 → Should show error

### ✅ Test 10: Data Persistence
1. Add a new area
2. Refresh the browser (F5)
3. Verify the new area is still there (data persists in MongoDB)

---

## Sample Test Data

Use these coordinates to test different locations:

| City | Latitude | Longitude | Price | Rental | Infra |
|------|----------|-----------|-------|--------|-------|
| New York | 40.7128 | -74.0060 | 85 | 90 | 88 |
| Los Angeles | 34.0522 | -118.2437 | 82 | 85 | 80 |
| Chicago | 41.8781 | -87.6298 | 70 | 75 | 85 |
| Houston | 29.7604 | -95.3698 | 78 | 80 | 75 |
| Phoenix | 33.4484 | -112.0740 | 72 | 70 | 68 |

---

## Expected Results Summary

### Sample Data (12 areas preloaded):
- Downtown Austin
- Silicon Valley
- Brooklyn Heights
- Miami Beach
- Seattle Downtown
- Denver Tech Center
- Boston Back Bay
- Portland Pearl District
- Nashville Gulch
- Phoenix Scottsdale
- San Diego Gaslamp
- Chicago Loop

### Growth Score Formula:
```
Growth Score = (0.4 × priceGrowth) + (0.3 × rentalDemand) + (0.3 × infrastructureScore)
```

### API Endpoints:
- `POST /api/areas` - Add new area
- `GET /api/areas` - Get all areas
- `GET /api/areas?search=Austin` - Search areas
- `GET /api/areas?minScore=70` - Filter by score
- `GET /api/areas/top` - Get top 5 areas

---

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
```powershell
# Start MongoDB
mongod
```

### Issue: "Port 5000 already in use"
**Solution:**
```powershell
# Kill process on port 5000
npx kill-port 5000
# Or change PORT in server/.env
```

### Issue: "Port 3000 already in use"
**Solution:**
- Press 'Y' when prompted to use different port
- Or kill process: `npx kill-port 3000`

### Issue: Map not loading
**Solution:**
- Check browser console (F12)
- Verify Leaflet scripts loaded in Network tab
- Clear browser cache (Ctrl+Shift+Delete)

### Issue: No sample data showing
**Solution:**
```powershell
# Check MongoDB connection in server terminal
# Should see "Sample data loaded successfully"

# If not, restart server:
cd server
npm start
```

---

## Success Criteria

Your application is working correctly if:

✅ Backend server runs without errors
✅ Frontend loads at http://localhost:3000
✅ Map displays with 12 sample markers
✅ Heatmap overlay shows red/yellow/green zones
✅ Clicking markers shows detailed popups
✅ Top 5 areas display correctly
✅ Can add new areas via form
✅ Filters work (search and high-growth)
✅ Data persists after browser refresh
✅ No console errors in browser (F12)

---

## Performance Testing

### Load Test:
1. Add 20+ areas rapidly
2. Verify map still performs smoothly
3. Check heatmap updates correctly

### Browser Compatibility:
- Test in Chrome ✅
- Test in Firefox ✅
- Test in Edge ✅

---

## Next Steps After Testing

Once everything works:
1. ✅ Customize the growth score formula
2. ✅ Add more sample data
3. ✅ Modify heatmap colors
4. ✅ Add export functionality
5. ✅ Add charts/graphs
6. ✅ Deploy to production

---

## Quick Test Script

Run this complete test in one go:

```powershell
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
cd D:\Drive2\server
npm start

# Terminal 3: Start Frontend
cd D:\Drive2\client
npm start

# Browser will open automatically
# Follow the testing checklist above
```

Enjoy testing your Urban Growth Dashboard! 🚀
