# Dynamic Event Calendar Application

A modern, intuitive event management system built with React and TypeScript. This application provides a comprehensive calendar interface for creating, managing, and organizing events with a clean, professional design.

![Calendar Screenshot]

![Screenshot 2025-01-10 204752](https://github.com/user-attachments/assets/0ad34507-ece1-426a-abad-e633f26c4bc7)

![Screenshot 2025-01-10 204742](https://github.com/user-attachments/assets/f4b36b68-d937-45d7-b49a-e8e17fe4affe)



## Features

### Calendar Interface
- 📅 Dynamic monthly calendar grid with proper day alignment
- 🎯 Intelligent date handling and month transitions
- 🔍 Clear visual distinction between:
  - Current day highlighting
  - Weekend/weekday differentiation
  - Previous/next month dates
  - Selected date indication
- ⚡️ Smooth month-to-month navigation
- 📱 Responsive layout adapting to all screen sizes

### Event Management
- ✨ Create events with essential details:
  - Title
  - Start time with date selection
  - End time with date selection
  - Optional description
  - Category selection (Work/Personal/Other)
- 🎨 Color-coded event categories for visual organization:
  - Work events (Blue)
  - Personal events (Green)
  - Other events (Purple)
- 📝 Full event editing capabilities:
  - Modify any event detail
  - Update event categories
  - Delete events
- 🔄 Real-time updates and immediate visual feedback
- 💾 Automatic data persistence using localStorage

### User Experience
- 🎯 One-click event creation from any date
- 🖱️ Intuitive drag interactions and hover states
- 🎨 Clean, modern interface using shadcn/ui components
- ⚡️ Fast and responsive interactions
- 📱 Mobile-first design approach

## Technical Stack

### Frontend
- **Framework**: React 18.3.1
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: React Hooks (useState, useEffect)
- **Styling**:
  - Tailwind CSS for utility-first styling
  - CSS Variables for theming
  - CSS Modules for component-specific styles

### UI Components
- **Component Library**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Tailwind CSS animations
- **Modal System**: Radix UI Dialog
- **Form Controls**: 
  - Radix UI components
  - Custom form handling

### Data Management
- **Storage**: Browser localStorage
- **State Management**: Custom hooks
  - `useCalendar` for calendar logic
  - `useToast` for notifications
- **Data Persistence**: Automatic saving of events



### Performance Optimizations
- **Code Splitting**: Dynamic imports for modals
- **Memoization**: React.memo for heavy components
- **Efficient Rendering**: Optimized state updates
- **Bundle Size**: Tree-shaking with Vite
