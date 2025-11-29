# 📊 Dashboard Design Plan

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│ Header: Logo + User Info + Logout                      │
├─────────────┬───────────────────────────────────────────┤
│             │                                           │
│  Sidebar    │           Main Content Area               │
│             │                                           │
│ • Dashboard │  ┌─────────────────────────────────────┐  │
│ • Rooms     │  │                                     │  │
│ • Apply     │  │        Page Content                 │  │
│ • Status    │  │                                     │  │
│ • Profile   │  │                                     │  │
│             │  └─────────────────────────────────────┘  │
│             │                                           │
└─────────────┴───────────────────────────────────────────┘
```

## 🎨 Design Specifications

### **Color Scheme (Black & White)**
- **Sidebar:** Black background (#000)
- **Main Area:** White background (#fff)
- **Borders:** Light gray (#ddd)
- **Text:** Black on white, white on black
- **Hover:** Dark gray (#333)

### **Sidebar Navigation**
```
Dashboard
├── Overview (default)
├── Available Rooms
├── Apply for Room
├── My Application Status
└── Profile Settings
```

### **Responsive Behavior**
- **Desktop:** Fixed sidebar (250px width)
- **Mobile:** Collapsible hamburger menu
- **Tablet:** Narrow sidebar with icons only

## 📱 Page Components

### **1. Dashboard Overview**
```
┌─────────────────────────────────────────┐
│ Welcome Back, [Student Name]            │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ Total   │ │ Applied │ │ Status  │    │
│ │ Rooms   │ │ Rooms   │ │         │    │
│ │   25    │ │    1    │ │Pending  │    │
│ └─────────┘ └─────────┘ └─────────┘    │
│                                         │
│ Recent Activity:                        │
│ • Applied for Room R101                 │
│ • Profile updated                       │
└─────────────────────────────────────────┘
```

### **2. Available Rooms**
```
┌─────────────────────────────────────────┐
│ Available Rooms                         │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Room R101 | Capacity: 2 | Year: 2  │ │
│ │ [Apply Now]                         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Room R102 | Capacity: 3 | Year: 2  │ │
│ │ [Apply Now]                         │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### **3. Application Status**
```
┌─────────────────────────────────────────┐
│ My Application Status                   │
├─────────────────────────────────────────┤
│                                         │
│ Room: R101                              │
│ Status: Pending                         │
│ Applied: 2024-01-15                     │
│ Expected Response: 2024-01-20           │
│                                         │
│ [Cancel Application]                    │
└─────────────────────────────────────────┘
```

## 🔧 Implementation Structure

### **Component Hierarchy**
```
Dashboard/
├── DashboardLayout.js      # Main layout with sidebar
├── Sidebar.js              # Navigation sidebar
├── Header.js               # Top header bar
├── pages/
│   ├── Overview.js         # Dashboard home
│   ├── RoomList.js         # Available rooms
│   ├── ApplicationStatus.js # My applications
│   └── Profile.js          # User profile
└── components/
    ├── RoomCard.js         # Individual room display
    ├── StatusCard.js       # Status indicators
    └── ActivityFeed.js     # Recent activities
```

### **CSS Classes Structure**
```css
.dashboard-layout          # Main container
.dashboard-sidebar         # Left navigation
.dashboard-main           # Right content area
.sidebar-nav              # Navigation list
.sidebar-item             # Individual nav items
.content-header           # Page titles
.content-body             # Main content
.room-card                # Room display cards
.status-badge             # Status indicators
.activity-item            # Activity list items
```

## 🎯 Navigation Flow

### **Student Journey**
1. **Login** → Dashboard Overview
2. **Browse Rooms** → Room List Page
3. **Apply** → Application Form → Confirmation
4. **Check Status** → Application Status Page
5. **Update Profile** → Profile Settings

### **URL Structure**
```
/dashboard              # Overview
/dashboard/rooms        # Available rooms
/dashboard/apply/:id    # Apply for specific room
/dashboard/status       # Application status
/dashboard/profile      # Profile settings
```

## 📐 Measurements

### **Sidebar Dimensions**
- **Width:** 250px (desktop)
- **Mobile:** Full width overlay
- **Item Height:** 48px
- **Padding:** 16px

### **Content Area**
- **Max Width:** 1200px
- **Padding:** 24px
- **Card Spacing:** 16px gap
- **Border Radius:** 4px (minimal)

## 🎨 Visual Elements

### **Typography**
- **Headers:** 24px, 500 weight
- **Body:** 14px, 400 weight
- **Nav Items:** 14px, 500 weight
- **Font:** Segoe UI (consistent)

### **Interactive States**
- **Default:** Black text on white
- **Hover:** White text on dark gray
- **Active:** White text on black
- **Disabled:** Gray text

### **Cards & Components**
- **Border:** 1px solid #ddd
- **Background:** #fafafa for cards
- **Shadow:** None (flat design)
- **Spacing:** 16px internal padding

## 🔄 Responsive Breakpoints

### **Desktop (>1024px)**
- Full sidebar visible
- Multi-column layouts
- Larger cards

### **Tablet (768px-1024px)**
- Narrow sidebar with icons
- Single column layout
- Compact cards

### **Mobile (<768px)**
- Hidden sidebar (hamburger menu)
- Stack all elements
- Touch-friendly buttons

**This design maintains the clean, professional aesthetic while providing intuitive navigation and functionality.**