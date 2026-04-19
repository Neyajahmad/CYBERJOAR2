# Complete Setup Guide - Predictive Urban Growth Modeling Dashboard

## Prerequisites

Before starting, ensure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - Local: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)
- **npm** (comes with Node.js)

## Step-by-Step Installation

### 1. Install MongoDB

#### Option A: Local MongoDB
```bash
# Windows: Download installer from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt-get install mongodb

# Start MongoDB
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create free account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `server/.env` with your connection string

### 2. Install Server Dependencies

```bash
cd server
npm install
```

This installs:
- express (web framework)
- mongoose (MongoDB ODM)
- cors (cross-origin requests)
- dotenv (environment variables)

### 3. Configure Environment

The `server/.env` file is already created with:
```
MONGODB_URI=mongodb://localhost:27017/urban-growth
PORT=5000
```

If using MongoDB Atlas, update MONGODB_URI:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/urban-growth
```

### 4. Install Client Dependencies

```bash
cd ../client
npm install
```

This installs:
- react & react-dom
- leaflet & react-leaflet (mapping)
- leaflet.heat (heatmap plugin)
- axios (HTTP client)
- tailwindcss (styling)

### 5. Start the Application

#### Terminal 1 - Backend Server:
```bash
cd server
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected: localhost
Loading sample data...
Sample data loaded successfully
```

#### Terminal 2 - Frontend Client:
```bash
cd client
npm start
```

Browser will open automatically at `http://localhost:3000`

## Verification Checklist

✅ MongoDB is running (check Terminal 1 for "MongoDB Connected")
✅ Server is running on port 5000
✅ Client is running on port 3000
✅ Browser shows the dashboard
✅ Map displays with markers
✅ Heatmap overlay is visible
✅ Sample data is loaded (12 areas)

## Testing the Application

### 1. View Existing Data
- Check the map for markers across the US
- Click markers to see area details
- View "Top Areas" tab in sidebar

### 2. Add New Area
- Click "Add Area" tab
- Fill in the form:
  - Area Name: "Test Area"
  - Latitude: 34.0522
  - Longitude: -118.2437
  - Price Growth: 85
  - Rental Demand: 90
  - Infrastructure: 80
- Click "Add Area"
- Verify new marker appears on map

### 3. Test Filters
- Click "Filters" tab
- Toggle "Show only high-growth areas"
- Search for specific area names

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Start MongoDB with `mongod` command

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: 
- Kill process using port: `npx kill-port 5000`
- Or change PORT in server/.env

### Module Not Found
```
Error: Cannot find module 'express'
```
**Solution**: Run `npm install` in server directory

### Leaflet CSS Not Loading
**Solution**: Check that index.html includes Leaflet CSS CDN link

### Heatmap Not Showing
**Solution**: 
- Verify leaflet.heat is installed
- Check browser console for errors
- Ensure areas have valid coordinates

## API Testing (Optional)

Test backend APIs using curl or Postman:

```bash
# Get all areas
curl http://localhost:5000/api/areas

# Get top 5 areas
curl http://localhost:5000/api/areas/top

# Add new area
curl -X POST http://localhost:5000/api/areas \
  -H "Content-Type: application/json" \
  -d '{
    "areaName": "Test City",
    "latitude": 40.7128,
    "longitude": -74.0060,
    "priceGrowth": 75,
    "rentalDemand": 80,
    "infrastructureScore": 85
  }'
```

## Project Structure Overview

```
predictive-urban-growth/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html        # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapView.jsx   # Leaflet map with heatmap
│   │   │   ├── AreaForm.jsx  # Add area form
│   │   │   └── Sidebar.jsx   # Sidebar with tabs
│   │   ├── services/
│   │   │   └── api.js        # API calls
│   │   ├── App.jsx           # Main component
│   │   ├── index.js          # Entry point
│   │   └── index.css         # Tailwind styles
│   └── package.json
├── server/                    # Express backend
│   ├── models/
│   │   └── Area.js           # MongoDB schema
│   ├── routes/
│   │   └── areas.js          # API routes
│   ├── config/
│   │   └── db.js             # Database connection
│   ├── data/
│   │   └── sampleData.js     # Sample dataset
│   ├── server.js             # Entry point
│   ├── .env                  # Environment config
│   └── package.json
└── README.md
```

## Next Steps

1. Explore the dashboard and interact with the map
2. Add your own areas
3. Modify the growth score formula in `server/routes/areas.js`
4. Customize the UI in React components
5. Add more features (export data, charts, etc.)

## Support

If you encounter issues:
1. Check all dependencies are installed
2. Verify MongoDB is running
3. Check browser console for errors
4. Review server terminal for error messages
5. Ensure ports 3000 and 5000 are available

Enjoy building with the Urban Growth Dashboard! 🚀
