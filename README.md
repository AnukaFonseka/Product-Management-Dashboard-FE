# Product-Management-Dashboard - Frontend

This is the frontend of the application, built with Vite. It includes features such as user authentication, product management, and an intuitive sidebar interface.

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
git clone https://github.com/AnukaFonseka/Product-Management-Dashboard-FE.git
```

### 2. Navigate to the Project Directory

```bash
cd <project-directory>
```

### 3. Install Dependencies
Install the required Node.js packages using:

```bash
npm install
```

Or, if you prefer yarn:

```bash
yarn install
```

### 4. Run the Application
Start the development server:

```bash
npm run dev
```

Or, if using yarn:

```bash
yarn start
```
The application will be accessible at http://localhost:5173.

## Login Credentials

To make it easy for supervisors to evaluate the application, predefined login credentials are included in the login page. <br/>

Email: supervisor@example.com <br/>
Password: Supervisor123 <br/>

You can use these credentials to log in directly from the login screen. 

## Creating New Users

Once logged in, you can create new users. After registration, you will be able to log in using the new user's credentials. 

### Follow these steps:

 - Navigate to the Create User page.
 - Fill out the registration form with the desired email and password.
 - Submit the form to create the user.
 - Log out from the current session and log in again with the newly created user's credentials.

## Troubleshooting

### Common Issues

1. Failed to start server
    - Ensure all dependencies are installed (npm install).
    - Check if the port 3000 is already in use.

2. Asset loading errors
    - Ensure all asset paths are correct and case-sensitive.

## License

This project is licensed under the MIT License.

## Author
Anuka Fonseka <br/>
[GitHub Profile](https://github.com/AnukaFonseka)