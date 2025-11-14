📨 MERN Real-Time Chat Application

A modern, secure, and fully-featured real-time chat application built using the MERN Stack (MongoDB, Express, React, Node.js) with Socket.IO for instant messaging.
This chat app includes authentication, typing indicators, online status, image sharing, conversation list, and a clean WhatsApp-like UI—ideal for portfolios and real-world use.

 || [LOGIN PAGE ] ||
 ![Login](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhuSXrCsUC7UqiJjLG6uOVPxUKaWici13s-_T0WLMzjTbyMt_V-MKBwqKM_tu5XYQvdJ-F6uzNCuXqKX3l9DcuAswoMhjSP9pNBsVzuqkYVTq8v2IsyLANgxhdEEtBJIqGmoXD2XOe6U3zy98S9bl_uXB931Ju1Yy-CNFz-Lgw9GCmD5A8dM7ZdOwHbkbrQ/s1887/Screenshot%202025-11-14%20153708.png)

  || [Sign Up PAGE ] ||
 ![SignUp](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvRpvtHmkwttIidMvvE9v9yzk9OxfHi9b87QsW65MKXMUJbzwCyJ4usvyXVil5qPf4UwsSgUfVudyLKpsZmREqANtRHGW14kfLG6WAy6R6htiqt8cc0DqAj2RTQLLlv-SvU1W6K4ehAqsrjus8O_3_USY80b_FitGFUMoexmpAn7fiaMJllws7GipMtRKC/s1842/Screenshot%202025-11-14%20153719.png)


  || [Home PAGE ] ||
 ![Home](https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_vJdlGKvgAZjgHH3x8hvx5NRstfTmNr426hfD-2IRPO7_wpuT8pDc1mcap0Vg9Y0wiYU9B6_GGqDM-cFgXXiLhVSkpgrVp0T-rVRSkOr3DWZF25wi0zcAYCBBq44eLqgcccDALqwY9kLa2zc19PqCW67f2HhwJ1OknYcRycofZWDcbRjWGf8izV3O3zcq/s1873/Screenshot%202025-11-14%20153655.png)
🚀 Features
🔐 User Authentication

Register / Login using JWT

Secure password hashing (bcrypt)

Protected API routes

💬 Real-Time Messaging

1-to-1 real-time chat

No page refresh

Auto-scroll to New Message

Readable message timestamps

✍️ Typing Indicator

Real-time typing status

Sender → receiver live updates

🟢 Online / Offline Tracking

Shows which users are currently active

Realtime socket-based user status

📸 Image Sharing

Upload and send images in chat

Preview images before sending

Cloud upload (ImageKit / Multer supported)

🎨 Clean UI (Responsive)

Modern, WhatsApp-like chat UI

Light animations

Mobile-friendly layout

Separate Sender / Receiver message components

🗃️ Chat System

Conversation list

Last message preview

Built-in timestamp formatting

🧑‍💻 Tech Stack
Frontend

React.js

Tailwind CSS

Context API

Axios

Socket.IO Client

Backend

Node.js

Express.js

MongoDB + Mongoose

JSON Web Token (JWT)

Multer / ImageKit

Socket.IO

📡 Socket.IO Events Used
Event	Purpose
connection	When a user connects
disconnect	When a user goes offline
typing	User is typing
stoptyping	User stopped typing
sendMessage	Send a new message
newMessage	Receive a new message
online-users	Track online users
