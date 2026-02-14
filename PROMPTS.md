# 📝 AASHRAY - Two Comprehensive Implementation Prompts

## Prompt 1: Student Discovery Platform

```
Build a comprehensive Student Housing Discovery Platform with the following features:

CORE REQUIREMENTS:

1. MAP-BASED DISCOVERY LAYOUT
   - Interactive map showing all property listings
   - Color-coded markers based on safety scores:
     * Gold (Yellow): 85+ points
     * Silver (Gray): 70-84 points  
     * Basic (Orange): <70 points
   - Clickable markers that show listing preview on hover
   - Click marker to open detailed listing modal
   - Toggle button to switch between Grid and Map views
   - Map legend showing tier meanings

2. LISTING CARDS WITH VIRTUAL TOUR
   - Multi-image carousel with smooth transitions
   - Left/Right navigation arrows
   - Image indicators (dots) showing current position
   - Bookmark functionality (heart icon toggle)
   - Safety score badge overlay on image
   - Display: rent, distance, amenities
   - Click card to open detailed modal
   - Hover effects with lift animation

3. DETAILED LISTING MODAL
   - Full-screen virtual tour image slider
   - Image counter (e.g., "2 / 3")
   - Comprehensive Safety Scorecard showing:
     * Overall safety score (50-100)
     * Base score: 50 points
     * Active amenities with points:
       - CCTV: +10 points (green background)
       - 24/7 Guard: +15 points (green background)
       - Biometric Entry: +20 points (green background)
       - Fire Safety: +5 points (green background)
     * Inactive amenities (grayed out, +0 points)
     * Tier badge (Gold/Silver/Basic) with gradient
     * Safety tips based on tier level
   - Property description and location
   - Availability status (X available, Y occupied beds)
   - Monthly rent with "Book Now" button
   - Close button (X) and click-outside-to-close

4. DYNAMIC SAFETY SCORE CALCULATION
   - Base score: 50 points (always)
   - Add points for each ACTIVE amenity:
     * CCTV: +10
     * 24/7 Guard: +15
     * Biometric Entry: +20
     * Fire Safety: +5
   - Tier assignment:
     * Gold: 85+ points
     * Silver: 70-84 points
     * Basic: <70 points
   - Real-time updates when owner toggles amenities
   - Animated score transitions
   - Color-coded tier badges

5. ADVANCED FILTERING SYSTEM
   - Budget slider: ₹5,000 - ₹25,000
   - Safety tier filter: All / Basic / Silver / Gold
   - Distance slider: 1-15 km
   - Real-time filtering (instant results)
   - Results counter showing filtered count
   - Empty state with "No Listings Found" message
   - "Reset Filters" button to clear all filters
   - Sidebar stats showing:
     * Total listings count
     * Available beds count

6. REAL-TIME RENT NOTIFICATION SYSTEM
   - Notification panel in top-right corner
   - Triggers when owner marks rent as "Paid"
   - Shows:
     * "Rent Payment Received!" message
     * Tenant name
     * Amount paid
     * Timestamp
   - Green gradient background
   - Dismissible with X button
   - Slide-in animation from right
   - Auto-stacks multiple notifications

7. BOOKMARK SYSTEM
   - Heart icon on each listing card
   - Toggle between filled (❤️) and outline (🤍)
   - Persists across page navigation
   - Visual feedback on click

TECHNICAL REQUIREMENTS:
- React 18 with TypeScript
- Tailwind CSS for all styling
- Context API for global state management
- Custom hooks for reusable logic
- Smooth animations (fade-in, slide-in, scale)
- Responsive design (mobile-first approach)
- Performance optimization (React.memo, useMemo)
- Skeleton loaders for loading states
- No external map libraries (custom SVG-based map)

DATA STRUCTURE:
- Listings with: id, title, images[], address, distance, rent, amenities[], rooms[]
- Amenities with: id, name, icon, enabled, safetyPoints
- Rooms with: id, roomNumber, beds[]
- Beds with: id, bedNumber, isOccupied, tenantName

EXPECTED BEHAVIOR:
- Owner toggles amenity → Student sees updated safety scores within 1 second
- Owner marks rent paid → Student receives notification immediately
- All state changes synchronized via Context API
- No page refresh required for updates
```

---

## Prompt 2: Warden/Owner Management Panel

```
Build a comprehensive Warden/Owner Management Panel with the following features:

CORE REQUIREMENTS:

1. VISUAL OCCUPANCY GRID
   - Display all rooms with bed-by-bed visualization
   - Grid layout: 4 beds per row
   - Color-coded bed indicators:
     * 🟢 Green gradient = Available
     * 🔴 Red gradient = Occupied
   - Each bed shows:
     * Bed number in center
     * Status icon (🟢 or 🔴)
   - Enhanced hover tooltips showing:
     * Tenant name (if occupied)
     * Bed number
     * Status: "Occupied" or "Available"
     * "Ready to Book" or "Not Available"
   - Real-time occupancy percentage at top
   - Smooth hover effects:
     * Scale up on hover
     * Enhanced shadow
     * Brighter colors
   - Legend at bottom showing color meanings

2. COMPREHENSIVE RENT TRACKER
   - Summary cards (3 cards in row):
     * Collected Rent (green gradient) - shows ₹ amount
     * Pending Rent (orange gradient) - shows ₹ amount
     * Collection Rate (blue gradient) - shows percentage
   - Tenant list showing each tenant:
     * Name and room number
     * Rent amount and due date
     * Payment status (Paid/Unpaid)
     * Overdue indicator:
       - Red pulsing background
       - "OVERDUE" badge in red
   - Toggle payment button:
     * "Mark as Paid" (green gradient) for unpaid
     * "Paid ✓" (gray) for paid tenants
   - Click button to toggle status
   - Triggers notification on student view when marked paid
   - Visual feedback:
     * Green card for paid
     * Red pulsing card for overdue
     * Orange card for pending

3. AMENITIES CONTROL PANEL
   - List of 4 amenities with toggle switches:
     * 📹 CCTV (+10 safety points)
     * 💂 24/7 Guard (+15 safety points)
     * 👆 Biometric Entry (+20 safety points)
     * 🧯 Fire Safety (+5 safety points)
   - Each amenity shows:
     * Icon (emoji)
     * Name
     * Safety points contribution
     * Toggle switch (ON/OFF)
   - Animated toggle switches:
     * Green when ON
     * Gray when OFF
     * Smooth slide animation
   - Real-time safety score updates:
     * Toggle ON → All listing scores increase
     * Toggle OFF → All listing scores decrease
   - Toast notification on toggle:
     * "Amenity enabled/disabled"
     * "Safety scores updated across all listings!"
   - Info panel explaining:
     * Impact on safety scores
     * Real-time updates to student view

4. DASHBOARD ANALYTICS
   - 4 summary cards at top (gradient backgrounds):
     * Total Listings (blue) - count
     * Total Beds (green) - count
     * Occupied Beds (purple) - count
     * Pending Rent (orange) - count
   - Quick stats panel showing:
     * Active Amenities: X / 4
     * Rent Collection: X%
     * Occupancy Rate: X%
   - All stats update in real-time
   - Color-coded for quick understanding

5. REAL-TIME SYNC WITH STUDENT VIEW
   - Amenity toggle → Instant safety score update on student dashboard
   - Rent payment → Instant notification on student dashboard
   - Occupancy changes → Instant reflection everywhere
   - No polling or refresh needed
   - Shared state via Context API
   - Toast notifications for all actions

6. TOAST NOTIFICATION SYSTEM
   - 4 types of notifications:
     * Success (green) - for successful actions
     * Info (blue) - for informational messages
     * Warning (orange) - for warnings
     * Error (red) - for errors
   - Features:
     * Slide-in animation from right
     * Auto-dismiss after 3 seconds
     * Manual dismiss with X button
     * Stack multiple notifications
     * Show message and icon
   - Appears in top-right corner
   - Smooth animations

TECHNICAL REQUIREMENTS:
- React 18 with TypeScript
- Tailwind CSS for all styling
- Context API for shared state with student view
- Custom hooks (useToast for notifications)
- Smooth animations and transitions
- Responsive grid layout
- Real-time state synchronization
- Performance optimized
- Type-safe with TypeScript

DATA STRUCTURE:
- Tenants with: id, name, roomNumber, rentAmount, isPaid, dueDate
- Amenities with: id, name, icon, enabled, safetyPoints
- Rooms with: id, roomNumber, beds[]
- Notifications with: id, tenantName, amount, timestamp

EXPECTED BEHAVIOR:
- Toggle amenity → Toast appears + Student scores update within 1 second
- Mark rent paid → Toast appears + Student notification triggers immediately
- Hover bed → Tooltip appears with details
- All changes persist in global state
- Smooth animations on all interactions

INTEGRATION WITH STUDENT VIEW:
- Both views share same Context API state
- Owner changes instantly reflected on student view
- No API calls needed (demo mode)
- Real-time synchronization demonstrated
```

---

## 🎯 Key Integration Points

### Shared State (Context API)
```typescript
- listings[] - Property listings
- amenities[] - Safety amenities with enabled status
- tenants[] - Tenant list with payment status
- rentNotifications[] - Notification queue
- bookmarks[] - Saved listings
```

### Real-Time Updates
1. **Owner toggles amenity** → `toggleAmenity(id)` → Student sees updated scores
2. **Owner marks rent paid** → `toggleRentPaid(id)` → Student receives notification
3. **Student bookmarks listing** → `toggleBookmark(id)` → Persists in state

### Safety Score Logic
```typescript
function calculateSafetyScore(listing, amenities) {
  let score = 50; // Base score
  
  listing.amenities.forEach(amenityId => {
    const amenity = amenities.find(a => a.id === amenityId && a.enabled);
    if (amenity) score += amenity.safetyPoints;
  });
  
  const tier = score >= 85 ? 'Gold' : score >= 70 ? 'Silver' : 'Basic';
  return { score, tier };
}
```

---

## 📊 Success Criteria

### Functionality (40%)
- ✅ Listings display correctly with all data
- ✅ Safety scores calculate accurately (50-100 range)
- ✅ Safety scores update dynamically when amenities change
- ✅ Rent tracker syncs in real-time between views
- ✅ Notifications trigger instantly
- ✅ All interactions work smoothly

### Frontend Engineering (30%)
- ✅ Clean scoring logic in helper functions
- ✅ Smooth swipe interaction with drag support
- ✅ Efficient grid rendering with memoization
- ✅ Proper state management with Context API
- ✅ TypeScript for type safety
- ✅ Performance optimized

### Product Thinking (30%)
- ✅ Real-world practicality (solves actual problems)
- ✅ Intuitive roommate matching flow
- ✅ Clear visual feedback (colors, animations)
- ✅ Safety-first approach
- ✅ Owner convenience features

---

## 🚀 Implementation Complete

Both prompts have been fully implemented in this project. Run `npm run dev` to see all features in action!

See `TESTING_GUIDE.md` for comprehensive testing procedures.
