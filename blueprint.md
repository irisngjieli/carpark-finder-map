# Public Carpark Finder

## Overview

A single-page application to help drivers in Singapore find suitable, available, and economical carpark slots based on their vehicle's height, destination, and walking distance preference.

## Features

*   **Search:** Users can search for carparks by:
    *   Vehicle Height (up to 1 decimal point)
    *   Destination (e.g., "Blk 133 Woodlands")
    *   Walking distance (100m, 300m, 500m)
*   **Results:** The search results will display a list of carparks with the following information:
    *   Address
    *   Carpark Type
    *   Height Limit
    *   Price
    *   Availability
*   **Map View:** Clicking on a search result will show the carpark's location on a map.
*   **Favorites:** Users can save carparks to a "Favorites" list for easy access.
*   **Vehicle Profiles:** Users can create and manage profiles for different vehicles.

## Tech Stack

*   **Frontend:** React, Material-UI
*   **Routing:** React Router
*   **Deployment:** Cloudflare Pages

## Design

*   **Theme:** Soothing colors with a minimalist, clean background.
*   **Layout:** Responsive, mobile-first design using CSS Grid and Flexbox.
*   **Typography:** Google Fonts (Inter).
*   **UI Principles:** Google's Material Design.
*   **Accessibility:** WCAG 2.1 AA compliant.

## Current Plan

1.  **Project Setup:**
    *   Install necessary dependencies: `react-router-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled`.
    *   Create a `blueprint.md` file.
    *   Clean up existing CSS files.
2.  **Basic App Structure:**
    *   Create a custom Material-UI theme.
    *   Set up the main `App.tsx` component with a `ThemeProvider` and basic layout.
    *   Create a `HomePage.tsx` component.
    *   Set up basic routing.
3.  **UI Implementation (In Progress):**
    *   Implement the search input fields.
