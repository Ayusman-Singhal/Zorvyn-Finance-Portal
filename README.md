# Finance Dashboard

A clean, intuitive, and interactive Finance Dashboard built with React, TypeScript, Tailwind CSS v4, and Zustand.

## Features

### Dashboard Overview
- **Summary Cards**: Total Balance, Income, and Expenses with color-coded indicators and slide-in animations
- **Balance Trend Chart**: Line chart showing balance over the last 30 days
- **Spending Category Chart**: Pie chart breaking down expenses by category with a diverse color palette

### Transactions Section
- Full transaction list with sorting and filtering capabilities
- Search by description or category
- Filter by type (Income/Expense) and categories
- Sort by date, description, category, type, or amount
- Add, edit, and delete transactions (role-based)
- **Export functionality** — download transactions as CSV or JSON

### Role-Based UI
- **Viewer**: Can only view data (no edit capabilities)
- **Admin**: Can add, edit, and delete transactions
- Role switcher in the header for demonstration

### Insights Panel
- Highest spending category
- Month-over-month spending comparison
- Average daily spending
- Savings rate calculation

### Additional Features
- 🌙 **Dark mode** with smooth transitions (persisted via localStorage)
- 💾 **Data persistence** via localStorage for transactions, auth, and theme
- ✨ **Smooth animations** — fade-in, slide-up, and scale effects on cards, charts, and modals
- 📤 **Export** — download transaction data as CSV or JSON

### State Management
- Zustand for global state management with four stores:
  - `transactionStore` — CRUD operations with localStorage persistence
  - `authStore` — role-based access control
  - `filterStore` — search, category, type, and sort state
  - `themeStore` — dark/light mode with persistence
- Real-time updates across components

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand 5 (with persistence)
- **Charts**: Chart.js + react-chartjs-2
- **Date Handling**: date-fns

## Design Decisions

### Why Zustand over Context API?
Zustand provides a simpler, boilerplate-free API compared to React Context + useReducer. It also offers built-in middleware for localStorage persistence (`persist`), which was crucial for keeping user data across sessions. The store pattern scales well — each domain (transactions, auth, filters, theme) gets its own independent store without provider nesting.

### Why Chart.js over Recharts?
Chart.js offers a smaller bundle size and more granular control over tooltips, animations, and interactions. The `react-chartjs-2` wrapper provides clean React integration while maintaining access to Chart.js's full configuration API.

### Why Tailwind CSS v4?
Tailwind v4's CSS-first configuration (`@theme` directive) eliminates the need for a separate JavaScript config file, keeping the design system co-located with styles. The new `@import "tailwindcss"` syntax is cleaner and integrates better with PostCSS.

### Component Architecture
The project follows a feature-based structure where components are grouped by domain (dashboard, transactions, insights) rather than by type. Shared UI primitives (Card, Button, Badge) live in a `common/` directory. Custom hooks (`useAuth`, `useFilters`, `useTransactions`) abstract store interactions and provide computed values, keeping components focused on rendering.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd finance-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components (Card, Button, Badge, etc.)
│   ├── dashboard/       # Dashboard-specific components (SummaryCards, Charts)
│   ├── transactions/    # Transaction components (Table, Filters, Form, Modals)
│   ├── insights/        # Insights panel components
│   ├── layout/          # Layout components (Header, Layout)
│   └── Dashboard.tsx    # Main dashboard page
├── hooks/               # Custom React hooks
├── store/               # Zustand stores (transaction, auth, filter, theme)
├── types/               # TypeScript type definitions
├── utils/               # Utility functions (calculations, formatters, mock data, export)
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## Architecture Overview

### Data Flow
1. Mock data is loaded on app initialization (if no data in localStorage)
2. User interactions update Zustand stores
3. Components subscribe to store changes and re-render automatically
4. LocalStorage persists transactions, auth state, and theme preference

### Empty States
When no transactions match the current filters, a friendly empty state component is shown with guidance to adjust filters or add data.

### Responsiveness
The layout uses Tailwind's responsive grid system:
- **Desktop (lg)**: 3-column grid for charts + insights side panel
- **Tablet (md)**: 3-column grid for summary cards
- **Mobile**: Everything stacks into single column

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT
