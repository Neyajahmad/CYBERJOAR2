# Windows Fix for Leaflet Error

## Steps to Fix (Windows PowerShell):

### 1. Stop the React development server (Ctrl+C if running)

### 2. Navigate to client folder and reinstall:
```powershell
cd client

# Remove node_modules folder
Remove-Item -Recurse -Force node_modules

# Remove package-lock.json
Remove-Item -Force package-lock.json

# Reinstall dependencies
npm install
```

### 3. Start the server:
```powershell
npm start
```

## Alternative (if above doesn't work):

```powershell
cd client
rmdir /s /q node_modules
del package-lock.json
npm install
npm start
```

The app should now work without the Leaflet errors!
