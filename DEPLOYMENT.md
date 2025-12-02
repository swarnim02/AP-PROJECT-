# 🚀 Deployment Guide - Render

## 📋 Prerequisites
1. GitHub repository with your code
2. Render account (free tier available)
3. Database provider (we'll use Render PostgreSQL)

## 🗄️ Step 1: Setup Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `hostel-database`
   - **Database**: `hostel_db`
   - **User**: `hostel_user`
   - **Region**: Choose closest to you
   - **Plan**: Free
4. Click "Create Database"
5. **Save the connection details** (you'll need them)

## 🔧 Step 2: Deploy Backend

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `hostel-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   PORT=5002
   DATABASE_URL=postgresql://hostel_user:password@hostname:port/hostel_db
   JWT_SECRET=your-super-secret-jwt-key-here
   ```
   
   Replace the DATABASE_URL with your actual database connection string from Step 1.

5. Click "Create Web Service"

## 🌐 Step 3: Deploy Frontend

1. In Render Dashboard, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `hostel-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`

4. **Add Environment Variables**:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com
   ```
   
   Replace with your actual backend URL from Step 2.

5. Click "Create Static Site"

## 🔄 Step 4: Update Frontend API URLs

Update all API calls in your frontend to use the environment variable:

```javascript
// Instead of: http://localhost:5002
// Use: process.env.REACT_APP_API_URL || 'http://localhost:5002'

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5002';

// Example usage:
const response = await fetch(`${API_BASE}/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(credentials)
});
```

## 📝 Step 5: Update Database Schema

Your backend will automatically run Prisma migrations on deployment. Make sure your `prisma/schema.prisma` uses PostgreSQL:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

## ✅ Step 6: Verify Deployment

1. **Backend**: Visit your backend URL - should show "Server running"
2. **Frontend**: Visit your frontend URL - should load the login page
3. **Database**: Check Render dashboard for database connection status

## 🔧 Troubleshooting

### Backend Issues:
- Check logs in Render dashboard
- Verify environment variables
- Ensure DATABASE_URL is correct

### Frontend Issues:
- Check build logs
- Verify REACT_APP_API_URL is set
- Check browser console for CORS errors

### Database Issues:
- Verify connection string format
- Check database status in Render dashboard
- Ensure Prisma schema matches database type

## 🌍 Your Live URLs

After deployment, you'll have:
- **Frontend**: `https://hostel-frontend.onrender.com`
- **Backend**: `https://hostel-backend.onrender.com`
- **Database**: Internal Render PostgreSQL

## 🔄 Auto-Deploy

Render automatically deploys when you push to your main branch. No additional setup needed!

---

**Note**: Free tier services may sleep after 15 minutes of inactivity. First request after sleep may take 30-60 seconds to wake up.