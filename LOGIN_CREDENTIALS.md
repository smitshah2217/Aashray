# 🔐 AASHRAY - Login Credentials

## Quick Access

The application now has a login page with three user types. You can either:
1. Enter credentials manually
2. Use Quick Login buttons for instant access

---

## 👤 Dummy User Accounts

### 🎓 Student User
- **Email**: `student@aashray.com`
- **Password**: `student123`
- **Access**: Student Dashboard with housing discovery, map view, filters, and rent notifications

### 🏢 Property Owner
- **Email**: `owner@aashray.com`
- **Password**: `owner123`
- **Access**: Owner Dashboard with occupancy grid, rent tracker, and amenities control

### 👥 Roommate Seeker
- **Email**: `roommate@aashray.com`
- **Password**: `roommate123`
- **Access**: Roommate Swipe interface with profile matching

---

## 🚀 How to Use

### Method 1: Manual Login
1. Start the application: `npm run dev`
2. Click any card on the landing page
3. Enter email and password from above
4. Click "Login" button

### Method 2: Quick Login (Recommended)
1. Start the application: `npm run dev`
2. Click any card on the landing page
3. Click one of the Quick Login buttons:
   - 🎓 Student
   - 🏢 Property Owner
   - 👥 Roommate Seeker
4. Instantly access the respective dashboard

---

## 🔄 Navigation Flow

```
Landing Page
    ↓ (Click any card)
Login Page
    ↓ (Login as Student/Owner/Roommate)
Respective Dashboard
    ↓ (Click Logout)
Landing Page
```

---

## ✨ Features

- **No Toggle Navigation**: Each user sees only their relevant dashboard
- **Role-Based Access**: Login determines which view you see
- **Logout Button**: Return to landing page anytime
- **User Badge**: Shows current role in navigation bar
- **Same Styling**: Consistent AASHRAY design throughout

---

## 🎯 Testing Real-Time Sync

1. Open application in two browser windows
2. Window 1: Quick Login as **Owner**
3. Window 2: Quick Login as **Student**
4. In Owner window: Toggle amenities or mark rent as paid
5. In Student window: See instant updates!

---

## 📝 Notes

- All credentials are dummy/demo data
- No actual authentication backend
- State persists during session
- Logout clears user role and returns to home
- Real-time sync works across all logged-in views

---

**Ready to test!** 🚀
