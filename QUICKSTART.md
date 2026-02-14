# AASHRAY - Quick Start Guide

## 📦 What's Included

Your complete production-ready AASHRAY application with:

✅ Full React + TypeScript + Tailwind setup
✅ 3 Complete dashboards (Student, Owner, Roommate)
✅ 10+ Reusable components
✅ Global state management
✅ Comprehensive animations
✅ Hardcoded realistic data
✅ Mobile responsive
✅ Production-grade code quality

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd aashray
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: http://localhost:5173

## 🎯 What You'll See

### Landing Page (Default)
- Hero section with brand identity
- 3 feature cards (Student, Roommate, Owner)
- Click any card to navigate to that dashboard

### Student Dashboard 🎓
- Browse 4 listings with safety scores
- Filter by budget (₹5k-₹25k), safety tier, distance
- Image carousels on each listing
- Bookmark favorite properties
- Real-time safety score updates

### Roommate Swipe 👥
- Tinder-style card interface
- 6 roommate profiles to swipe through
- Swipe right (💚) to match, left (❌) to pass
- Match celebration animation
- View all matches at the end

### Owner Dashboard 🏢
- Occupancy grid showing all rooms and beds
- Red = occupied, Green = available
- Rent tracker with payment toggles
- Click "Mark as Paid" to update status
- Amenities control panel
- Toggle CCTV, Guards, Biometric, Fire Safety
- Watch safety scores update in real-time

## 🎨 Key Features to Explore

### 1. Dynamic Safety Scores
- Navigate to Owner Dashboard
- Toggle any amenity (CCTV, Guards, etc.)
- See toast notification
- Go to Student Dashboard
- Watch safety scores recalculate with animation

### 2. Rent Management
- Owner Dashboard → Rent Tracker
- Click "Mark as Paid" on any tenant
- Toast notification appears
- Status updates with smooth transition

### 3. Roommate Matching
- Roommate Swipe page
- Drag cards left/right OR click buttons
- Swipe right on 2-3 profiles
- See match celebration animation
- View matched profiles at the end

### 4. Advanced Filtering
- Student Dashboard → Filters sidebar
- Adjust budget slider
- Change safety tier requirement
- Modify distance range
- Watch listings update in real-time

## 📱 Mobile Testing

The app is fully responsive! Test on:
- Desktop (1920px+)
- Tablet (768px-1024px)
- Mobile (375px-767px)

Open DevTools and toggle device emulation.

## 🎭 Animations Showcase

Watch for these smooth animations:
1. **Page Load**: Staggered fade-in of all elements
2. **Card Hover**: Lift effect on listing cards
3. **Safety Score**: Count-up animation when scores change
4. **Toast Notifications**: Slide-in from top-right
5. **Swipe Cards**: Drag, rotate, and fade animations
6. **Match Celebration**: Scale and bounce effects
7. **Bed Status**: Color transitions on hover

## 🏗️ Architecture Highlights

### State Management
- Global state via React Context
- Shared across all pages
- Updates propagate automatically

### Component Structure
- Fully modular and reusable
- TypeScript for type safety
- Memoized where needed for performance

### Data Flow
```
AppContext (Global State)
    ↓
Pages (Student, Owner, Roommate)
    ↓
Components (Cards, Grids, etc.)
    ↓
User Interactions
    ↓
State Updates → Re-render
```

## 🔧 Customization Guide

### Adding More Listings
Edit: `src/data/mockData.ts` → `initialListings`

### Changing Safety Score Logic
Edit: `src/utils/helpers.ts` → `calculateSafetyScore`

### Adding New Amenities
Edit: `src/data/mockData.ts` → `initialAmenities`

### Modifying Colors
Edit: `src/index.css` or Tailwind classes directly

### Adding More Roommate Profiles
Edit: `src/data/mockData.ts` → `initialRoommateProfiles`

## 🎯 Testing Checklist

- [ ] Install dependencies successfully
- [ ] Dev server starts without errors
- [ ] Landing page loads and displays correctly
- [ ] Navigate to Student dashboard
- [ ] Apply filters and see results update
- [ ] Click image carousel arrows
- [ ] Bookmark a listing
- [ ] Navigate to Roommate Swipe
- [ ] Swipe through profiles
- [ ] Get a match
- [ ] Navigate to Owner dashboard
- [ ] Toggle amenity switches
- [ ] Mark rent as paid
- [ ] See toast notifications
- [ ] Hover over beds in occupancy grid
- [ ] Test on mobile viewport

## 📊 Tech Stack Summary

| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Context | State Management |
| Custom Hooks | Reusable Logic |

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
npx kill-port 5173
# Then restart
npm run dev
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

## 🚀 Production Build

When ready to deploy:
```bash
npm run build
```

Output will be in `dist/` folder.

Deploy to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting

## 📚 Next Steps

1. ✅ Get the app running locally
2. ✅ Explore all 3 dashboards
3. ✅ Test interactive features
4. ✅ Review the code structure
5. 🎯 Customize for your needs
6. 🚀 Deploy to production

## 💡 Pro Tips

1. **Watch the Console**: Open browser DevTools to see any warnings
2. **Use React DevTools**: Install React DevTools extension to inspect component state
3. **Hot Reload**: Changes auto-reload, no need to restart server
4. **Type Safety**: TypeScript will catch errors before runtime
5. **Tailwind IntelliSense**: Install Tailwind CSS IntelliSense extension in VS Code

## 🎉 You're All Set!

This is a complete, production-ready application. Every feature works, every animation is smooth, and the code is clean and well-organized.

Enjoy building with AASHRAY! 🏠✨
