# Update API URL for Production

## Your Render URL

Find your Render backend URL from: https://dashboard.render.com

It looks like: `https://your-service-name.onrender.com`

## Update Steps:

### 1. Update client/.env.production

Replace the URL in `client/.env.production`:

```env
REACT_APP_API_URL=https://YOUR-ACTUAL-RENDER-URL.onrender.com/api
CI=false
```

### 2. Commit and Push

```bash
git add client/.env.production
git commit -m "Update production API URL"
git push origin main
```

### 3. Netlify Will Auto-Deploy

Wait 3-5 minutes for Netlify to rebuild with the correct URL.

---

## Alternative: Set in Netlify Dashboard

If you don't want to commit the URL:

1. Go to Netlify Dashboard
2. Site settings → Environment variables
3. Edit `REACT_APP_API_URL`
4. Set to: `https://YOUR-ACTUAL-RENDER-URL.onrender.com/api`
5. Click "Save"
6. Trigger redeploy: Deploys → Trigger deploy → Deploy site

---

## Verify Backend is Running

Before updating, test your Render backend:

```
https://YOUR-ACTUAL-RENDER-URL.onrender.com/api/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

If this doesn't work, your backend isn't deployed correctly.
