# 📧 Email Queue Service

An asynchronous Email Queue Service built using **Node.js, Express.js, RabbitMQ, MongoDB Atlas, Nodemailer, and React**. Instead of sending emails directly, requests are placed into a RabbitMQ queue and processed by a background worker. Failed emails are retried automatically, and permanently failed emails are moved to a Dead Letter Queue (DLQ).

---

## 🚀 Features

- Queue-based email processing using RabbitMQ
- React frontend to send email requests
- REST API built with Express.js
- MongoDB Atlas for storing email data
- Background worker for asynchronous email delivery
- Automatic retry mechanism (3 retries)
- Dead Letter Queue (DLQ) for failed emails
- Nodemailer integration for sending emails
- Clean and simple user interface

---

## 🛠 Tech Stack

### Frontend
- React.js
- Axios
- CSS

### Backend
- Node.js
- Express.js
- RabbitMQ
- MongoDB Atlas
- Mongoose
- Nodemailer
- dotenv

---

## 📁 Project Structure

```
Email Queue Service
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── queues/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env
│   ├── app.js
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <https://github.com/KarthikSiripurapu/Email-Queue-Service.git>
```

```bash
cd Email-Queue-Service
```

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

RABBITMQ_URL=amqp://localhost

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_gmail_app_password
```

Start the backend server.

```bash
npm run dev
```

---

### Frontend Setup

Open another terminal.

```bash
cd client
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

Backend runs on

```
http://localhost:5000
```

RabbitMQ Management

```
http://localhost:15672
```

---

## 📮 API Endpoint

### Send Email

**POST**

```
http://localhost:5000/api/email/send
```

### Request Body

```json
{
  "to": "example@gmail.com",
  "subject": "Test Email",
  "body": "Hello from Email Queue Service"
}
```

---

## 🔄 Workflow

1. User submits an email from the React frontend.
2. Backend stores the email request in MongoDB.
3. Email request is pushed to RabbitMQ.
4. Worker consumes the message.
5. Nodemailer attempts to send the email.
6. If successful, the email is delivered.
7. If sending fails, it retries up to **3 times**.
8. After 3 failed attempts, the email is moved to the **Dead Letter Queue (DLQ)**.

---

## 🎯 Future Improvements

- Email Status Dashboard
- User Authentication
- Scheduled Email Sending
- Email Templates
- Redis Caching
- Docker Support
- Deployment on Render and Vercel
- Admin Dashboard
- Pagination and Search

---
