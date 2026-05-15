# SGCarparkFinder Blueprint

## Overview

SGCarparkFinder is a web application designed to help drivers in Singapore find suitable public carparks. It allows users to filter carparks based on their vehicle's height and destination, ensuring they can find a parking spot that meets their needs.

## Project Outline

### Core Features

- **Carpark Search:** Users can search for carparks based on:
    - **Vehicle Height:** Filter out carparks with gantries that are too low for their vehicle.
    - **Destination:** Find carparks near a specific address or location.
    - **Walking Distance:** Select a preferred maximum walking distance to the carpark.
- **Interactive Map:** Users can click on a carpark in the search results to view its location on Google Maps.
- **Real-time Filtering:** Search results are updated instantly as the user types and changes filters.

### Styling and Design

- **Component Library:** The application uses **Material-UI (MUI)** for a clean, modern, and responsive user interface.
- **Layout:** The application features a centered, single-column layout that is easy to navigate on both desktop and mobile devices.
- **Visual Elements:**
    - The main search form is enclosed in a card-like container with a subtle box shadow.
    - Search results are displayed in a grid of cards, with each card representing a carpark.

### Technical Details

- **Framework:** The application is built with **React** and **Vite**.
- **Language:** The codebase is written in **TypeScript**.
- **Data:** Carpark data, including gantry height and location, is sourced from a local **CSV file**.

## Current Change: Bug Fix and Build Process

### Plan and Steps

1.  **Problem:** The application was unable to load the `Carpark_gantryheight.csv` file, and the build process was failing due to issues with handling CSV file imports in a TypeScript and Vite project.
2.  **Solution:**
    - Moved the `Carpark_gantryheight.csv` file to the `src/assets` directory.
    - Updated the `HomePage.tsx` component to import the CSV file as a module.
    - Created a TypeScript declaration file (`src/vite-env.d.ts`) to define the `*.csv` module type.
    - Updated `tsconfig.app.json` to include the new declaration file.
    - Configured `vite.config.ts` to include `**/*.csv` in the `assetsInclude` array.
3.  **Result:** The application now successfully loads the carpark data, and the production build completes without errors.
