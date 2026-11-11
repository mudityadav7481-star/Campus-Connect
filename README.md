# 🎓 CampusConnect — College Event Management Platform

A modern, centralized web portal designed for college campuses to eliminate fragmented event announcements and streamline student discovery, registration, and administration.

![CampusConnect Preview](https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 🎓 For Students
* **Unified Event Discovery:** Browse upcoming campus hackathons, cultural festivals, sports tournaments, and workshops in one central hub.
* **Real-Time Search & Category Filters:** Debounced instant search across titles, venues, and tags, with category chips (`Technical`, `Cultural`, `Sports`, `Workshop`, `Seminar`, `Hackathon`, `Social`).
* **One-Click Event Registration:** Fast seat reservation with automatic student profile pre-fill and duplicate registration prevention.
* **Digital Admission Pass with QR Code:** Automatically generates an official ticket ID and a scannable QR pass upon registration confirmation.
* **My Events Portal:** Tabbed dashboard to manage active tickets (with option to cancel and release seats) and review saved bookmarks.
* **Persistent Bookmarking:** Save favorite events with live navbar badge tracking.

### 🛡️ For Campus Administrators
* **Live Event Inventory Console:** Table view of all university events with sorting, filtering, and instant search.
* **Real-Time Seat Utilization Analytics:** Track total registered attendees, available capacity, and sold-out events.
* **Event Publishing & Editing:** Modal form with live validation for start/end timestamps, seat limits, and venue logistics.
* **Cascading Event Deletion:** Safely remove events with automated cleanup of associated student registrations and bookmarks.
* **Role Switcher:** Instant toggle between Student and Admin personas directly from the navigation bar.

---

## 🎨 Design System
* **Atmospheric Dark Theme:** Deep obsidian slate background (`#0b0c13`) with rich crimson/rose accents inspired by modern event celebration platforms.
* **Responsive Layout:** Mobile-first architecture with custom hamburger drawer and glassmorphism headers.
* **Accessible & Intuitive:** WCAG-compliant color contrasts, real-time toast notifications, and interactive capacity indicators.

---

## 🛠️ Technology Stack

* **Frontend Library:** [React 19](https://react.dev/)
* **Build Tool:** [Vite 8](https://vitejs.dev/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Routing:** [React Router v7](https://reactrouter.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **State Management:** React Context API (`EventContext`, `RegistrationContext`, `BookmarkContext`, `UserContext`, `ToastContext`)
* **Persistence & Architecture:** Repository pattern (`storageService.js`) with browser `localStorage` and multi-tab synchronization; architected for seamless future migration to **Supabase**.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` or `yarn`

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mudityadav7481-star/<repo-name>.git
   cd <repo-name>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── common/         # Button, Modal, Badge, Input, Select, Toast
│   ├── layout/         # Navbar, Footer, RoleSwitcher, ProtectedRoute
│   ├── events/         # EventCard, EventGrid, SearchBar, CategoryPills, CapacityBar
│   └── admin/          # AdminTable, EventFormModal, DeleteDialog
├── context/            # React Contexts (Event, Registration, Bookmark, User, Toast)
├── hooks/              # Custom hooks (useDebounce, useLocalStorage)
├── pages/              # HomePage, EventsPage, EventDetailPage, MyEventsPage, AdminDashboard
├── routes/             # AppRoutes with ProtectedRoute wrappers
├── services/           # storageService (Repository pattern) & seedData
└── utils/              # constants, dateUtils, validators
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
