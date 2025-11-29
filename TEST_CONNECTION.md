# 🔧 Testing Frontend-Backend Connection

## Quick Test Steps

### 1. Start Backend
```bash
cd backend
npm start
# Should show: 🚀 Server running on port 5002
```

### 2. Start Frontend
```bash
cd frontend
npm start
# Should open http://localhost:3000
```

### 3. Test Registration
1. Go to http://localhost:3000
2. Click "Register"
3. Fill form:
   - Name: Test User
   - Email: test@example.com
   - College: Test College
   - Year: 2nd Year
   - Password: password123
4. Click Register

### 4. Expected Results
- ✅ **Success:** Redirects to login page
- ❌ **Network Error:** Check if backend is running
- ❌ **CORS Error:** Backend CORS not configured
- ❌ **500 Error:** Database connection issue

## 🐛 Troubleshooting

### Network Error
```bash
# Check backend is running
curl http://localhost:5002/
# Should return: Hostel Backend Running 🚀
```

### Database Error
```bash
cd backend
# Check database connection
npx prisma db push
```

### CORS Error
- Backend should have `app.use(cors())` in app.js
- Check browser console for CORS messages

## 🧪 Manual API Test
```bash
# Test registration endpoint directly
curl -X POST http://localhost:5002/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com", 
    "password": "password123",
    "college": "Test College",
    "year": 2,
    "role": "student"
  }'
```

Expected response:
```json
{
  "message": "Signup successful",
  "user": { ... }
}
```