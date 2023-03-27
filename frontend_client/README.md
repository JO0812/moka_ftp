# React + TypeScript Frontend Client for Moka FTP

This directory contains the React/TypeScript frontend application.

## Getting Started

1.  **Install Dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

2.  **Run the Development Server:**
    ```bash
    npm start
    # or
    # yarn start
    ```
    This will typically open the app in your browser at `http://localhost:3000`.

## Project Structure

-   `public/`: Static assets and `index.html`.
-   `src/`: Main application source code.
    -   `App.tsx`: Main application component with routing.
    -   `index.tsx`: Entry point, renders the `App` component and sets up Material UI theme.
    -   `index.css`: Basic global styles.
    -   `components/`: (Create this for shared UI components)
    -   `features/`: (Create this for feature-specific modules like auth, file browsing)
    -   `services/`: (Create this for API communication logic)
    -   `store/`: (Create this for state management if using Redux, Zustand, etc.)
    -   `theme/`: (Create this for more detailed Material UI theme customizations)
    -   `types/`: (Create this for shared TypeScript type definitions)
-   `package.json`: Project dependencies and scripts.
-   `tsconfig.json`: TypeScript compiler configuration.
