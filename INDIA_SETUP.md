# India Urban Growth Dashboard - Setup & Testing

## What Changed

✅ **Map now centers on India** (instead of USA)
✅ **16 Indian cities preloaded** with real coordinates
✅ **Search works for Indian cities** (Delhi, Mumbai, Bangalore, etc.)

## Indian Cities Included

### Delhi NCR (6 areas):
1. **Connaught Place, Delhi** - Growth Score: ~89.8
2. **Gurgaon Cyber City** - Growth Score: ~91.3 (Highest!)
3. **Saket, Delhi** - Growth Score: ~86.5
4. **Dwarka, Delhi** - Growth Score: ~84.6
5. **Noida Sector 62** - Growth Score: ~82.3
6. **Rohini, Delhi** - Growth Score: ~79.8

### Other Major Cities:
- **Mumbai**: Bandra West, Andheri East
- **Bangalore**: Whitefield, Koramangala
- **Hyderabad**: Hitech City, Gachibowli
- **Pune**: Hinjewadi, Koregaon Park
- **Chennai**: OMR
- **Kolkata**: Salt Lake

## How to Start

### 1. Clear MongoDB Data (to load new Indian data)

**Option A: Drop the database**
```powershell
# Connect to MongoDB
mongo

# In MongoDB shell:
use urban-growth
db.areas.deleteMany({})
exit
```

**Option B: Restart with fresh data**
```powershell
# Just restart the server - it will reload sample data if empty
cd D:\Drive2\server
npm start
```

### 2. Start the Application

**Terminal 1: MongoDB**
```powershell
mongod
```

**Terminal 2: Backend**
```powershell
cd D:\Drive2\server
npm start
```
Wait for: "Sample data loaded successfully"

**Terminal 3: Frontend**
```powershell
cd D:\Drive2\client
npm start
```

## Testing with Indian Cities

### ✅ Test 1: View India Map
- Map should center on India
- See markers across Delhi, Mumbai, Bangalore, Hyderabad, Pune, Chennai, Kolkata

### ✅ Test 2: Search for Delhi
1. Go to **Filters** tab
2. Type "Delhi" in search box
3. Should show 4 Delhi areas:
   - Connaught Place
   - Dwarka
   - Rohini
   - Saket

### ✅ Test 3: View Top Indian Areas
Click **Top Areas** tab to see:
1. Gurgaon Cyber City (~91.3)
2. Bandra West, Mumbai (~92.8)
3. Koramangala, Bangalore (~90.1)
4. Connaught Place, Delhi (~89.8)
5. Whitefield, Bangalore (~88.3)

### ✅ Test 4: Add New Delhi Area
Click **Add Area** tab and try:

```
Area Name: Vasant Kunj, Delhi
Latitude: 28.5177
Longitude: 77.1560
Price Growth: 83
Rental Demand: 86
Infrastructure: 85
```

Or add other Delhi areas:

**Lajpat Nagar:**
```
Area Name: Lajpat Nagar, Delhi
Latitude: 28.5677
Longitude: 77.2433
Price Growth: 75
Rental Demand: 78
Infrastructure: 80
```

**Karol Bagh:**
```
Area Name: Karol Bagh, Delhi
Latitude: 28.6519
Longitude: 77.1900
Price Growth: 72
Rental Demand: 75
Infrastructure: 78
```

**Greater Kailash:**
```
Area Name: Greater Kailash, Delhi
Latitude: 28.5494
Longitude: 77.2426
Price Growth: 86
Rental Demand: 88
Infrastructure: 87
```

### ✅ Test 5: Filter High-Growth Areas
1. Go to **Filters** tab
2. Check "Show only high-growth areas (score ≥ 70)"
3. Should see most areas (Indian metros have high growth!)

### ✅ Test 6: Search Other Cities
Try searching:
- "Mumbai" → Shows 2 areas
- "Bangalore" → Shows 2 areas
- "Hyderabad" → Shows 2 areas
- "Gurgaon" → Shows 1 area
- "Noida" → Shows 1 area

## More Indian Cities to Add

### Delhi NCR:
```
Nehru Place: 28.5494, 77.2501
Janakpuri: 28.6219, 77.0815
Pitampura: 28.6942, 77.1314
Mayur Vihar: 28.6082, 77.2989
```

### Mumbai:
```
Powai: 19.1197, 72.9059
Worli: 19.0176, 72.8170
Lower Parel: 18.9984, 72.8301
```

### Bangalore:
```
Electronic City: 12.8456, 77.6603
Indiranagar: 12.9716, 77.6412
HSR Layout: 12.9116, 77.6473
```

### Hyderabad:
```
Banjara Hills: 17.4239, 78.4738
Kondapur: 17.4608, 78.3656
```

## Expected Heatmap Colors

**Red (High Growth - 85+):**
- Gurgaon Cyber City
- Bandra West, Mumbai
- Koramangala, Bangalore
- Connaught Place, Delhi

**Yellow (Medium Growth - 70-85):**
- Hinjewadi, Pune
- Salt Lake, Kolkata
- OMR, Chennai

**Green (Lower Growth - Below 70):**
- (Most Indian metros are high growth!)

## API Testing for Indian Cities

```powershell
# Search for Delhi areas
Invoke-RestMethod -Uri "http://localhost:5000/api/areas?search=Delhi" -Method Get

# Get high-growth areas (score >= 85)
Invoke-RestMethod -Uri "http://localhost:5000/api/areas?minScore=85" -Method Get

# Add new Delhi area
$body = @{
    areaName = "Vasant Kunj, Delhi"
    latitude = 28.5177
    longitude = 77.1560
    priceGrowth = 83
    rentalDemand = 86
    infrastructureScore = 85
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/areas" -Method Post -Body $body -ContentType "application/json"
```

## Success Checklist

✅ Map centers on India
✅ 16 Indian cities visible
✅ Search "Delhi" shows 4+ Delhi areas
✅ Top areas show Indian metros
✅ Can add new Delhi/Indian areas
✅ Heatmap shows growth hotspots in metros

## Next Steps

1. Add more Delhi neighborhoods
2. Add tier-2 cities (Jaipur, Ahmedabad, Chandigarh)
3. Customize growth formula for Indian market
4. Add property price ranges in INR
5. Add metro connectivity scores

Enjoy your India-focused Urban Growth Dashboard! 🇮🇳
