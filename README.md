# Predictive Urban Growth Modeling Dashboard

## Project Architecture

This application predicts and visualizes high-growth real estate areas using multiple factors:
- **Price Growth Trends**
- **Rental Demand**
- **Infrastructure Development**

### Architecture Overview

```
┌─────────────────┐
│   React Client  │ (Leaflet Maps + Heatmap)
└────────┬────────┘
         │ REST API
┌────────▼────────┐
│  Express Server │ (Growth Score Calculation)
└────────┬────────┘
         │ Mongoose ODM
┌────────▼────────┐
│    MongoDB      │ (Area Data Storage)
└─────────────────┘
```

### Growth Score Formula
```
Growth Score = (0.4 × priceGrowth) + (0.3 × rentalDemand) + (0.3 × infrastructureScore)
```

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Leaflet.js, Leaflet Heatmap Plugin
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Project Structure
```
predictive-urban-growth/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapView.jsx
│   │   │   ├── HeatmapLayer.jsx
│   │   │   ├── AreaForm.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── server/                 # Express backend
│   ├── models/
│   │   └── Area.js
│   ├── routes/
│   │   └── areas.js
│   ├── config/
│   │   └── db.js
│   ├── data/
│   │   └── sampleData.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### 1. Clone and Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

Create `server/.env` file (copy from .env.example):
```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your MongoDB connection:
```
MONGODB_URI=mongodb://localhost:27017/urban-growth
PORT=5000
```

**Note:** Never commit `.env` file to GitHub. Use `.env.example` as a template.

### 3. Start MongoDB
```bash
# If using local MongoDB
mongod
```

### 4. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```

### 5. Access the Application
Open browser: `http://localhost:3000`

## Features

✅ Manual area data input via form
✅ Automated growth score calculation
✅ Interactive map with markers
✅ Heatmap visualization (red=high growth, yellow=medium, green=low)
✅ Top 5 high-growth areas display
✅ Clickable markers with detailed popups
✅ Filter high-growth areas
✅ Search by area name
✅ Responsive UI
✅ Sample dataset preloaded

## API Endpoints

- `POST /api/areas` - Add new area
- `GET /api/areas` - Get all areas
- `GET /api/top-areas` - Get top 5 high-growth areas

## Sample Data

The application includes sample data for major cities demonstrating various growth patterns.
