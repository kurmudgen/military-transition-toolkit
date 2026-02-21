# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a military transition application designed to help service members transition from military to civilian life. The application provides resources, career planning tools, education benefit information, and healthcare guidance for transitioning service members.

## Tech Stack

- React 18.3.1
- Vite 5.4.1 (build tool)
- React Router DOM 6.26.2 (client-side routing)
- Tailwind CSS 3.4.10 (styling)
- ESLint 9.9.0 (linting)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Project Structure

```
src/
├── components/      # Reusable components
│   └── Layout.jsx   # Main layout with navigation
├── pages/           # Route components
│   ├── Home.jsx
│   ├── Resources.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
├── App.jsx          # Root component with routing
├── main.jsx         # Application entry point
└── index.css        # Global styles with Tailwind directives
```

## Architecture

### Routing Structure

The app uses React Router with a nested layout pattern:
- `/` - Home page with overview of career planning, education, and healthcare
- `/resources` - Transition resources and external links
- `/profile` - User profile (placeholder for future implementation)
- `*` - 404 Not Found page

All routes are wrapped in a shared Layout component (src/components/Layout.jsx:1) that provides consistent navigation.

### Styling

- Tailwind CSS is configured via tailwind.config.js
- Global styles in src/index.css include Tailwind directives
- Components use Tailwind utility classes for styling
- Color scheme uses blue for primary actions, with green and purple accents

### Component Patterns

- Functional components with JSX
- React Router's `<Link>` for navigation
- `<Outlet>` in Layout for nested route rendering
- Responsive design with Tailwind breakpoints (sm, md, lg)

## Agent Rules
- Read ~/knowledge/LESSONS_LEARNED.md for accumulated patterns and fixes if it exists
- Git commit every 5-10 completed items
- Never modify .env or .env.local files without asking
- Never run destructive database commands (DROP, DELETE, ALTER) without approval
- Run `npm run build` before finishing to catch errors
- Write clear PR descriptions explaining what changed and why
