# Identity Management System (Frontend)

## Introduction

The Identity Management System (IMS) provides functionalities to manage user identity information, authenticate users, and control access to resources within the application. This system enhances security and access control for organizations.

## Description

- **User Authentication**: Sign-up, login, and logout functionality.
- **Role-Based Access Control (RBAC)**: Assign and manage user roles.
- **Secure API Routes**: Protect sensitive endpoints with authentication middleware.
- **Session Management**: Persistent sessions with token-based authentication.




---

## Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (>= 20.x)
- npm or Yarn

---




## Getting Started

### 1. **Clone Repository**:

```bash
$ git clone https://github.com/duchv90/next-demo-ims.git
$ cd next-demo-ims
```

### 2. **Install Dependencies**:

```bash
$ npm install
# or
$ yarn install
```

### 3. **Configuration**:

Create a .env file and configure the necessary environment variables.
Example: .env.sample

### 4. **Run the development server**:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```plaintext
├── app/             # App Router
│   ├── api/         # API routes
├── components/      # Reusable UI components
├── lib/             # Utility functions or libraries
├── public/          # Static assets
├── styles/          # Global styles
├── hooks/           # Custom React hooks
├── services/        # API service calls
├── types/           # TypeScript definitions
├── locales/         # Localization
├── utils/           # Utility functions
├── next.config.js   # Next.js configuration
├── package.json     # Project dependencies and scripts
├── tsconfig.json    # TypeScript configuration
├── .gitignore       # Git ignore file
└── .env             # Environment variables
```

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm start`**: Start the production server.
- **`npm run lint`**: Lint the code for errors.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Deployment

### 1. **Build the application**:

```bash
npm run build
```

### 2. **Start the production server**:

```bash
npm start
```

### 3. Deployment

Deploy to a hosting provider (e.g., [Vercel](https://vercel.com/)).

## Stay in touch

- Author - [Hoàng Việt Đức](https://hvduc.com)

## License

This project is licensed under the [MIT License](LICENSE).
