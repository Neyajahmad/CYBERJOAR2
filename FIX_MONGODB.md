# Fix MongoDB Data Directory Error

## The Error
```
Data directory D:\data\db\ not found
```

## Solution: Create the Data Directory

### Option 1: Create Default Directory
```powershell
# Create the directory MongoDB expects
mkdir D:\data\db
```

Then start MongoDB:
```powershell
mongod
```

---

### Option 2: Use Custom Directory (Recommended)

Create data folder in your project:

```powershell
# Create data directory in project folder
mkdir D:\Drive2\mongodb-data

# Start MongoDB with custom path
mongod --dbpath D:\Drive2\mongodb-data
```

---

### Option 3: Use MongoDB as Windows Service

If you installed MongoDB as a service:

```powershell
# Start MongoDB service
net start MongoDB
```

Then you don't need to run `mongod` manually.

---

## Complete Setup Steps

### Step 1: Create Data Directory
```powershell
mkdir D:\Drive2\mongodb-data
```

### Step 2: Start MongoDB (Terminal 1)
```powershell
mongod --dbpath D:\Drive2\mongodb-data
```

**Keep this running** - You should see:
```
[initandlisten] waiting for connections on port 27017
```

### Step 3: Start Backend (Terminal 2)
```powershell
cd D:\Drive2\server
npm start
```

Wait for: "Sample data loaded successfully"

### Step 4: Start Frontend (Terminal 3)
```powershell
cd D:\Drive2\client
npm start
```

Browser opens at http://localhost:3000

---

## Alternative: Use MongoDB Atlas (Cloud - No Local Install)

If you don't want to run MongoDB locally:

1. **Create free account:** https://www.mongodb.com/cloud/atlas
2. **Create a cluster** (free tier)
3. **Get connection string** (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. **Update `server/.env`:**
```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/urban-growth
PORT=5000
```
5. **Start backend:**
```powershell
cd D:\Drive2\server
npm start
```

No need to run `mongod` command!

---

## Quick Start Commands

```powershell
# Terminal 1: MongoDB
mkdir D:\Drive2\mongodb-data
mongod --dbpath D:\Drive2\mongodb-data

# Terminal 2: Backend
cd D:\Drive2\server
npm start

# Terminal 3: Frontend
cd D:\Drive2\client
npm start
```

---

## Verify MongoDB is Running

In a new terminal:
```powershell
mongo --eval "db.version()"
```

Should show MongoDB version.

---

## Troubleshooting

### Error: "mongod is not recognized"
MongoDB not installed or not in PATH.

**Solution:** Add MongoDB to PATH or use full path:
```powershell
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath D:\Drive2\mongodb-data
```

### Error: Port 27017 already in use
MongoDB already running.

**Solution:** 
```powershell
# Find and kill process
netstat -ano | findstr :27017
taskkill /PID <PID_NUMBER> /F
```

Or just use the existing MongoDB instance!

---

## Success Indicators

✅ MongoDB terminal shows: "waiting for connections on port 27017"
✅ Backend shows: "MongoDB Connected: localhost"
✅ Backend shows: "Sample data loaded successfully"
✅ Frontend opens in browser
✅ Map shows Indian city markers

---

Now try again with the data directory created!
