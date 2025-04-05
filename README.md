# Demo E-commerce Website

## Overview
This is a fully functional e-commerce website built with MERN (MongoDB, Express.js, React.js, and Node.js) stack. It allows users to browse products, manage their profiles, place orders, and make payments securely.

## Features
- User authentication (signup, login, logout)
- Admin panel to manage products and users
- Product listing with category filtering
- Shopping cart functionality
- Secure payment processing
- Order history and management
- Responsive design for all screen sizes

## Tech Stack
- **Frontend:** React.js, Chakra UI, Redux
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **State Management:** Redux Toolkit
- **Styling:** Chakra UI

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Steps to Run the Project

#### 1. Clone the repository
```sh
git clone https://github.com/rayyanAly/x-store.git
cd demo-ecommerce
```

#### 2. Install dependencies
```sh
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 3. Set up environment variables
Create a `.env` file in the `backend` folder and add:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
```

#### 4. Start the application
```sh
# Start backend server
cd backend
npm run dev

# Start frontend
cd ../frontend
npm start
```

The application will be available at `http://localhost:3000`.

## Usage
- Register or log in as a user
- Browse products and add them to the cart
- Checkout and place an order
- Admins can manage products and user accounts

## Contributing
Feel free to fork this repository and submit pull requests for improvements.

## License
This project is licensed under the MIT License.

