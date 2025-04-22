# Weather Oasis

A sleek, modern weather application built with React, TypeScript, Vite, and Tailwind CSS. This project leverages Radix UI components for accessible and customizable UI elements, and integrates with Supabase for backend services. It provides detailed weather forecasts and explanations with a clean and responsive design.

## Features

- Current weather conditions and detailed forecasts
- Responsive UI with Radix UI components
- TypeScript for type safety and developer experience
- Built with Vite for fast development and optimized builds
- Tailwind CSS for utility-first styling
- Integration with Supabase backend
- Weather explanations and insights

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm (comes with Node.js) or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone <https://github.com/TristanBrian/weather-oasis.git>
   cd weather-oasis
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL shown in the terminal) to view the app.

## Building for Production

Build the optimized production bundle:

```bash
npm run build
```

## Previewing the Production Build

Preview the production build locally:

```bash
npm run preview
```

## Linting

Run ESLint to check for code quality and style issues:

```bash
npm run lint
```

## Project Structure

- `src/` - Source code including components, hooks, pages, and utilities
- `public/` - Static assets like images and icons
- `components/ui/` - Reusable UI components built with Radix UI
- `src/lib/` - Library code such as Supabase client and utility functions
- `src/hooks/` - Custom React hooks
- `src/pages/` - Page components for routing
- Configuration files for Vite, Tailwind CSS, TypeScript, ESLint, and PostCSS

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- Supabase
- React Router DOM
- React Query
- ESLint
- PostCSS

## Environment Variables

This project requires an OpenWeather API key to function properly. To securely provide your API key, follow these steps:

1. Rename the `.env.example` file to `.env` in the root of the project.

2. Replace the placeholder value with your actual OpenWeather API key:

   ```
   VITE_OPENWEATHER_API_KEY=your_actual_api_key_here
   ```

3. Restart the development server if it is running to apply the environment variable.

## License

This project is private and not licensed for public use.
