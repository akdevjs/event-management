# Event Management Tool

An event management tool built with Next.js, TypeScript, PredictHQ API, TailwindCSS, Jotai, Heroicons, and Firebase.

## Technologies Used

- **Next.js**: React framework for building server-side rendered applications.
- **TypeScript**: Typed superset of JavaScript for type-safe code.
- **PredictHQ API**: API for accessing event data.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Jotai**: State management library.
- **Heroicons**: Icon set for UI components.
- **Firebase**: Backend-as-a-Service (BaaS) for database and authentication.

## Overview

The UI for the event management tool is complete and all functionalities are working as expected. The tool utilizes the PredictHQ API to fetch event data and display it to users. Users can mark events as favorites, and these favorite event IDs are stored in Firebase for persistence.

## Features

- **Event Listing**: Display a list of events fetched from the PredictHQ API.
- **Favorite Events**: Allow users to mark events as favorites, with favorite IDs stored in Firebase.
- **UI Components**: Utilize Heroicons and TailwindCSS for UI components.
- **State Management**: Manage application state using Jotai.

## Live Demo

Check out the live demo of the Event Management Tool [here](https://event-management-nine-peach.vercel.app/).

## Issues and Workarounds

- **PredictHQ API Limitations**: There was no way to modify PredictHQ objects or add any favorite key directly through the API. As a workaround, favorite event IDs are stored in Firebase to display favorite events.

## Future Improvements

- **Category Filtering**: Implement category filtering for events if a complete list of categories becomes available.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/event-management-tool.git
   ```

2. Navigate to the project directory:

   ```bash
   cd event-management-tool
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
