# Frontend Application

This is the frontend of the application, built with React. It includes features such as user authentication, product management, and an intuitive sidebar interface.

## Features

- User authentication with token-based validation.
- Responsive sidebar with a profile section and logout functionality.
- Cloudinary integration for image uploads.

---

## Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v16 or later) - [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) or **yarn** (optional)

---

## Setup Instructions

Follow the steps below to set up the project locally:

### 1. Clone the Repository

```bash
git clone <repository-url>

### 2. Navigate to the Project Directory

cd <project-directory>

### 3. Install Dependencies
# Install the required Node.js packages using:

npm install
Or, if you prefer yarn:

bash
Copy code
yarn install
4. Configure Environment Variables
Create a .env file in the root of the project and add the following environment variables:

env
Copy code
REACT_APP_API_BASE_URL=http://localhost:3000
REACT_APP_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload
Replace <your-cloud-name> with your Cloudinary cloud name.

5. Run the Application
Start the development server:

bash
Copy code
npm start
Or, if using yarn:

bash
Copy code
yarn start
The application will be accessible at http://localhost:3000.
