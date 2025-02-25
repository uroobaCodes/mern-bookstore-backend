# MERN Bookstore - Backend  
This is the backend for the MERN Bookstore, built with **Node.js**, **Express**, and **MongoDB**. It provides secure authentication, CRUD functionality, and API endpoints for managing books and user accounts.  

##  Features  
- JWT authentication & authorization  
- CRUD operations for books  
- User roles (Admin & Customers)  
- RESTful API with Express.js  
- MongoDB database integration
- 
## 🛠️ Tech Stack  

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  
![Mongoose](https://img.shields.io/badge/Mongoose-AA2929?style=for-the-badge&logo=mongoose&logoColor=white)  
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)  


## 🔧 Installation & Setup  

1️⃣**Clone this repo:**
```sh
git clone https://github.com/uroobaCodes/mern-bookstore-backend.git
cd mern-bookstore-backend
npm install
```
2️⃣ **Create .env file**

- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_secret_key
- PORT=5000

3️⃣ **Start the server**
```sh
npm run dev
```
The backend should now be running on http://localhost:5000. I did use npm run dev for Backend as well because of using nodemon. 

#### Front-End Repo
This backend connects to a React + Zustand frontend. Follow the setup guide in the frontend repository:
[Front-end repo](https://github.com/uroobaCodes/mern-bookstore)

### API Endpoints

| Method | Endpoint           | Description                           | Auth Required |
|--------|--------------------|---------------------------------------|--------------|
| GET    | `/api/books`       | Fetch all books                      | ❌ No        |
| GET    | `/api/books/:id`   | Fetch a single book by ID            | ❌ No        |
| GET    | `/api/books/weekly-book`| Fetch a weekly book             | ❌ No        |
| POST   | `/api/books/create-book' | Add a new book                  | ✅ Yes       |
| PUT    | `/api/books/edit/:id`   | Update book details             | ✅ Yes       |
| DELETE | `/api/books/:id`   | Delete a book                        | ✅ Yes       |
| POST   | `/api/auth/admin` | Admin Sign-in                 | ✅ Yes        |
| GET   | `/api/auth/admin`  | Dashboard statistics using get request         | ❌ No        |
| POST    | `/api/orders/create-order`        | Post an order           | ❌ No       |
| GET   | `/api/orders/email/:email`  | Get orders by user's email        | ❌ No        |



