# Alpha Blogging Application

## Table of Contents
- Overview
- Features
- Technologies Used
- Backend Functionality
- Installation
- Usage

## Overview
Alpha Blogging is a web application that allows users to create, read, and comment on blog posts. Users can sign up, log in, and manage their profiles while engaging with the content through comments. The app provides an intuitive interface for users to share their thoughts and insights.

## Features
- User Authentication: Users can sign up and log in to their accounts.
- Create Blog Posts: Authenticated users can add new blog posts with cover images, titles, and content.
- View Blog Posts: All users can view a list of blog posts on the homepage.
- Comment System: Users can leave comments on blog posts to engage in discussions.
- User Profiles: Each user has a profile with their name and profile image displayed alongside their blog posts and comments.

## Technologies Used
- Frontend: HTML, CSS, Bootstrap, EJS (Embedded JavaScript Templates)
- Backend: Node.js, Express.js, MongoDB (for database)
- File Uploads: Multer (for handling file uploads)

## Backend Functionality
The backend of the application includes the following functionalities:

### User Management
- **Sign Up**: 
  - Allows users to create a new account by providing their full name, email, and password.
  - Validates the input and securely stores user information in the database.

- **Sign In**: 
  - Authenticates users by verifying their email and password.
  - Creates a session for the user upon successful login.

- **Logout**: 
  - Logs the user out by destroying the session, ensuring that they are no longer authenticated.

### Blog Management
- **Create Blog**: 
  - Enables authenticated users to create new blog posts by submitting a title, body content, and an optional cover image.
  - Validates and stores the blog post in the database.

- **Read Blogs**: 
  - Fetches and displays a list of all blog posts, allowing users to view individual posts in detail.
  - Supports pagination for better user experience with larger datasets.

- **Comment on Blogs**: 
  - Allows users to leave comments on blog posts.
  - Associates comments with the user who made them, displaying their profile image and name alongside the comment.

### Profile Management
- **User Profiles**: 
  - Displays user profiles that include the user's name and profile image.
  - Allows users to view their own profile and others' profiles, enhancing community engagement.

Each user has a profile with their name and profile picture displayed alongside their posts and comments.

## Installation

To run the application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/alpha-blogging.git
   cd alpha-blogging

2. **Install Dependencies** 
   Ensure you have [Node.js](https://nodejs.org/) installed. Then run the following command in your terminal:
   ```bash
    npm install

3. **Run the application** 
   Start the server with::
   ```bash
    npm start

## Usage

To use the application, follow these steps:

1. **Navigate to the homepage**: Register a new account or log in if you already have one.
2. **Create a new blog post**: Click on the "Add Blog" link in the navigation bar.
3. **Fill in the details**: Enter the title, body, and upload a cover image (if applicable).
4. **Submit to publish your blog**: Click the submit button to publish your blog post.
5. **Engage with content**: View existing blog posts, leave comments, and interact with other users' content.

