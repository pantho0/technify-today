# 💡 Technify Today: Modern Tech Blog Platform

A dynamic and feature-rich blogging platform dedicated to sharing tech tips, tricks, and tutorials. It offers robust community engagement features like commenting, upvoting/downvoting, and an endless content feed, all built on a powerful, type-safe full-stack architecture.

[](https://www.google.com/search?q=YOUR_LIVE_DEMO_LINK)
[](https://www.google.com/search?q=YOUR_BACKEND_REPO_LINK)

---

## 💻 Tech Stack ✨

This project leverages the modern JavaScript ecosystem (MERN adjacent) for performance, type safety, and scalability.

### Core Technologies

| Component         | Technologies Used                                    |
| :---------------- | :--------------------------------------------------- |
| **Frontend**      | **Next.js** (React Framework)                        |
| **Backend**       | **Node.js** with **Express.js** (Modular Pattern)    |
| **Language**      | **TypeScript** (Full-Stack Type Safety)              |
| **Database**      | **MongoDB** with **Mongoose** (ODM)                  |
| **Cloud Storage** | **Cloudinary** (Image Asset Management)              |
| **Rich Text**     | **Tiptap** (Modern Rich Text Editor)                 |

### Tools & Libraries

|                            |                                     |                             |
| :------------------------: | :---------------------------------: | :-------------------------: |
|  [](https://nextjs.org/)   | [](https://www.typescriptlang.org/) |   [](https://nodejs.org/)   |
| [](https://expressjs.com/) |    [](https://www.mongodb.com/)     | [](https://mongoosejs.com/) |
|  [](https://tiptap.dev/)   |     [](https://cloudinary.com/)     | [](https://nodemailer.com/) |

---

## 🚀 Key Features

### 📝 **Content Creation & Management**

- **Rich Text Editing:** Utilizes **Tiptap** as a WYSIWYG editor, allowing users to create beautifully formatted posts with ease (e.g., headings, lists, bolding, code blocks).
- **Post Publishing:** Seamless user interface for drafting and publishing new tech blogs.
- **Image Upload:** Integrated with **Multer** and **Cloudinary** for secure, scalable image hosting and asset management.

### 👥 **Community & Engagement**

- **Upvote/Downvote System:** Allows users to express approval or disapproval of posts, influencing post visibility and ranking.
- **Commenting Features:** Supports threaded comments on each post, fostering community discussion.
- **User Authentication:** Secure user registration and login functionality.

### 🔎 **Discovery & Performance**

- **Search & Filtering:** Robust capabilities for quickly finding specific articles based on keywords, tags, or categories.
- **Infinite Scrolling:** The main post feed uses an **infinity loader** pattern, providing a smooth, continuous browsing experience while optimizing page load performance.

### 🛡️ **Security & Backend Reliability**

- **Type Safety:** **TypeScript** is employed across the entire stack to guarantee data integrity and reduce runtime bugs, improving maintainability.
- **Modular Backend:** Backend structure uses a **modular pattern** for clean separation of concerns and simplified future feature development.
- **Password Security:** Passwords are encrypted using **bcrypt** before being stored in the **MongoDB** database.
- **Password Reset:** Secure password recovery feature implemented using **Nodemailer** for sending transactional emails.

---

\<p align="center"\>
  \<img src="[https://img.shields.io/badge/ACTION%20REQUIRED-Configure%20Environment%20Variables-red?style=for-the-badge\&labelColor=black](https://www.google.com/search?q=https://img.shields.io/badge/ACTION%2520REQUIRED-Configure%2520Environment%2520Variables-red%3Fstyle%3Dfor-the-badge%26labelColor%3Dblack)"/\>
\</p\>

### 🔑 Required Environment Variables

To run the project locally, you must set up your environment files (`.env` or similar) with the following variables.

| Variable Name                            | Description                                                                                                                                               |
| :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MONGO_URI`                              | Connection string for your **MongoDB** database.                                                                                                          |
| `JWT_SECRET`                             | Secret key used to sign and verify **JSON Web Tokens** for authentication.                                                                                |
| `CLOUDINARY_CLOUD_NAME`                  | Your Cloudinary account name.                                                                                                                             |
| `CLOUDINARY_API_KEY`                     | Your Cloudinary API Key.                                                                                                                                  |
| `CLOUDINARY_API_SECRET`                  | Your Cloudinary API Secret.                                                                                                                               |
| `EMAIL_USER` / `EMAIL_PASS` (Nodemailer) | Credentials for the SMTP server used for password reset emails (e.g., Gmail, SendGrid). Must see the env.example file.                                    |

---

## 📥 Clone and Run Locally

To set up the project locally, you will need to clone both the frontend and backend repositories and run them simultaneously.

### 1\. **Clone the Repository (If Monorepo)**

Assuming your front-end and back-end are in separate directories within a single repo, or you clone two separate repos:

```bash
git clone https://github.com/pantho0/technify-today.git
cd technify-today
```

### 2\. **Backend Setup**

1.  Navigate to your backend directory (e.g., `cd technify-today`).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Compile TypeScript and start the server:
    ```bash
    npm run build # if using separate build step
    npm run start:dev # or 'for development'
    npm run start:prod # or 'for production'
    ```

### 3\. **Frontend Setup**

```bash
git clone https://github.com/pantho0/technify-today-client.git
cd technify-today
```

1.  Navigate to your frontend directory (e.g., `cd technify-today-client`).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the Next.js development server:
    ```bash
    npm run dev
    ```

The **frontend** application will be accessible at `http://localhost:3000` (or the port specified by Next.js).
