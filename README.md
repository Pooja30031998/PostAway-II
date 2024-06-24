# PostAway-II (Social Media Backend REST-API)
This repository contains a robust backend RESTful API for a social media platform developed using Node.js, Express.js, and MongoDB. It provides various functionalities such as user authentication, post management, comment system, like functionality, friendship features, user profile updates, and OTP-based password reset for enhanced security.

# API Structure
The API structure is organized into different routes for handling various functionalities. Here's an overview:
- Authentication Routes: /api/users/signup, /api/users/signin, /api/users/logout, /api/users/logout-all-devices
- User Profile Routes: /api/users/get-details/:userId, /api/users/get-all-details, /api/users/update-details/:userId
- Post Routes: /api/posts/all, /api/posts/:postId, /api/posts/:userId, /api/posts/create, /api/posts/:postId/delete, /api/posts/:postId/update
- Comment Routes: /api/comments/:postId, /api/comments/create/:postId, /api/comments/:commentId/delete, /api/comments/:commentId/update
- Like Routes: /api/likes/:id, /api/likes/toggle/:id
- Friendship Routes: /api/friends/get-friends/:userId, /api/friends/get-pending-requests, /api/friends/toggle-friendship/:friendId, /api/friends/response-to-request/:friendId
- OTP Routes: /api/otp/send, /api/otp/verify, /api/otp/reset-password

# Features
- RESTful Architecture: Developed using Node.js, ExpressJS, and MongoDB for efficient data handling and routing control.
- User Authentication: Implemented user registration, login, logout, and logout from all devices functionality.
- Post Management: CRUD operations for posts with image upload support.
- Comment System: Add, update, and delete comments on posts.
- Like Functionality: Like and unlike posts and comments with like counts.
- Friendship Features: Manage friends, pending friend requests, sending/withdrawing friend requests and accept/reject requests.
- User Profile Updates: Update user profiles with avatar uploads.
- OTP-Based Password Reset: Reset password using OTP for enhanced security.

# Contributing
Contributions are welcome! Please feel free to submit a pull request.



