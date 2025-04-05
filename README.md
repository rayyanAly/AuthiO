# 🔐 MERN Stack User Authentication System

A complete user authentication system built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) featuring:

- ✅ Email login
- ✅ OTP verification via **SendGrid**
- ✅ Forgot & Reset Password
- ✅ JWT authentication
- ✅ Admin Dashboard to manage users
- ✅ Fully styled with **Chakra UI**
- ✅ Secure and scalable backend with role-based access

---

## ⚙️ Tech Stack

- **Frontend**: ReactJS + Chakra UI  
- **Backend**: Node.js + Express.js  
- **Database**: MongoDB (Mongoose)  
- **Auth**: JWT (JSON Web Tokens)  
- **Email Service**: SendGrid (SMTP API)  
- **State Management**: Redux Toolkit  
- **Routing**: React Router v6

---

## ✨ Features

- 🔐 User Sign Up with Email  
- 🔑 Login with email  
- 📩 OTP verification for account activation (via SendGrid)  
- 🔁 Forgot Password and Reset Password via email  
- 🧑‍💼 Admin Dashboard for viewing and deleting users  
- ✅ JWT stored in HTTP-only cookies for secure session handling  
- 💅 Responsive Chakra UI components  
- 🛡️ Role-based access control for admin & user

---

## 📁 Project Structure

├── backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── data/
│   ├── routes/
│   ├── utils/
│   └── server.js
│   └── seeder.js
├── frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── screens/
│       ├── actions/
│       ├── reducers/
│       └── constants/
│       └── App.js
│       └── index.js
│       └── store.js



yaml
Copy
Edit

---

## 🔧 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/mern-user-auth.git
cd mern-user-auth
2️⃣ Install Backend Dependencies
bash
Copy
Edit
cd backend
npm install (in the root not in the backend folder)
3️⃣ Set Environment Variables
Create a .env file inside root folder not in the backend or frontend:

env
Copy
Edit
NODE_ENV = production or development    #depends on your env but write only one of the following
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

SMTP_HOST=smtp.sendgrid.net       #Dont change it will remain the same
SMTP_PORT=465                     #Dont change it will remain the same
SMTP_USER=apikey                  #Dont change it will remain the same
SENDGRID_API_KEY=your API key 
EMAIL_FROM=your_verified_sendgrid_email 
SMTP_SECURE=true                  #Dont change it will remain the same

4️⃣ Run Backend

npm run server

5️⃣ Install Frontend Dependencies

cd ../frontend
npm install
npm run start

🧪 Sample Admin Credentials
You can hardcode an admin in your DB during initial setup. The admin will have access to the dashboard for managing users.

📬 Email with SendGrid
Signup at https://sendgrid.com for a trial account

Create an API key under Settings > API Keys

Use this API key as SENDGRID_PASSWORD in your .env file

Whitelist and verify your sender email in SendGrid dashboard

🚀 Build Frontend for Production
To generate the production-ready frontend build:

cd frontend
npm run build
This will create a build folder inside the frontend directory.

✅ Note: The build folder is already being served automatically from the backend using express.static in your server.js file. So no extra configuration is needed to serve the frontend—just run the npm run start script in the root not in the backend or frontend and your React app will be live on http://localhost:5000!



🛠 Future Enhancements

🌐 Social login (Google / Facebook)

✅ Email template branding

🔒 Rate-limiting + brute-force protection

🙋‍♂️ Author
RayyanAly
🔗 LinkedIn


🔖 Tags
#MERN #JWT #SendGrid #SMTP #ReactJS #NodeJS #MongoDB #UserAuthentication
#WebSecurity #AdminDashboard #ResetPassword #ChakraUI #FullStack #WebDev

📌 Note
Don't forget to create a .env file and add your sensitive credentials.
DO NOT commit your .env file to GitHub — it's meant to stay private.

⭐ Give it a Star!
If you like this project, consider starring ⭐ the repo — it helps others discover it too!
