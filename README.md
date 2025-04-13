**Project Title: Study Buddy**
# Project Description:
This is a React-based web application that allows users to track their study sessions and goals. Users can add, edit, delete, and view sessions and goals. The application has a responsive layout for both mobile and desktop, and clean, modular components to ensure a smooth user experience.

# Technologies Used:
React

Next.js

CSS Modules

JavaScript (ES6+)

# File Structure:

/components
  - Navbar.js
  - Footer.js
  - SessionCard.js
  - GoalCard.js
  - GoalCard.module.css
  - SessionCard.module.css
  - SessionForm.js
  - GoalForm.js
/pages
  - index.js
  - sessions/[id].js
  - goals/[id].js
  - sessions/index.js
  - goals/index.js
  - goals/GoalDetail.module.css
  - sessions/SessionDetail.module.css
/lib
  - api.js
/styles
  - globals.css

# Component Overview:
Navbar: Displays navigation links for homepage, sessions and goals pages. Has a hover effect color change (matched with the titles of the pages) and underline when hovered over.

Footer: A simple footer component displayed at the bottom of the page with black text (for readability) with ownership text.

## SessionCard
Displays the details of an individual session, including:
- **Subject**
- **Duration**
- **Notes**

### Features:
- A **"Select"** button that toggles the card’s highlight color. When selected, the label changes to **"Deselect"**.
- Below the card are three buttons:
  - **"View Session"**: Navigates to the dynamic route page to view the full session.
  - **"Edit"**: Enables editing the session in the form above.
  - **"Delete"**: Deletes the session from the list.

## GoalCard
Displays the details of an individual goal, including:
- **Target Date**
- **Goal Title**
- **Goal Description**

### Features:
- A **"Select"** button that toggles the card’s highlight color. When selected, the label changes to **"Deselect"**.
- Below the card are three buttons:
  - **"View Goal"**: Navigates to the dynamic route page to view the full goal.
  - **"Edit"**: Enables editing the goal using the form above.
  - **"Delete"**: Deletes the goal from the list.


# Routing Overview:
/sessions: Displays all study sessions.

/sessions/[id]: Displays details of a specific session (dynamic route).

/goals: Displays all study goals.

/goals/[id]: Displays details of a specific goal (dynamic route).

# State Management:
Sessions and Goals are stored in local state using React's useState.

# CRUD Operations (placeholder for API or database):

**Create:** New sessions and goals are added to the state via the `createSession` and `createGoal` functions.

**Read:** Sessions and goals are fetched from the state and displayed dynamically.

**Update:** Existing sessions and goals can be edited, updating the state with the `updateSessionById` and `updateGoalById` functions.

**Delete:** Sessions and goals can be deleted, removing them from the state using `deleteSessionById` and `deleteGoalById`.


# Styling:
CSS Modules are used for scoped styling to avoid conflicts.

Each page and component has dedicated styles to maintain separation and clear places.

The app is responsive, with media queries to support various screen sizes.


# How to Run the Application
You can either clone the repository **OR** run it locally from the unzipped folder:

## Option 1: Clone from GitHub

Clone the repository:

1. git clone https://github.com/konakhoroz/CPAN144-GroupProject.git

2. Navigate to the project folder: cd cpan144-groupproject

3. Install dependencies: npm install

4. Run the development server: npm run dev

5. Open your browser and go to: http://localhost:3000

## Option 2: From the ZIP file (manual download)

1. Unzip the project folder.

2. Open a terminal and navigate to the folder: cd path/to/unzipped-folder (whatever name you gave it and its path)

3. Install dependencies: npm install

4. Run the development server: npm run dev

5. Open your browser and go to: http://localhost:3000