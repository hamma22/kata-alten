# kata-alten

# ✅ Work Completed

🔐 Authentication & Authorization

- User registration
- User login
- Auth verification
- Role-based access control (user, admin)
- Private routes for protected pages
- Conditional UI rendering based on roles

👤 User Features

- Product listing as cards
- Infinite scroll pagination (on scroll end)
- Product search
- Add product to cart
- Remove product from cart

🛠️ Admin Features

- Product listing in table view
- Search
- Pagination
- Add new product (via dialog form with validation)

🚀 Getting Started

1. Clone the Repository

- git clone https://github.com/hamma22/kata-alten.git
- cd kata-alten

2. Backend Setup

- cd backend
- npm install
- npm run dev
- The backend will start at http://localhost:5000.

- ✅ MongoDB Atlas is already connected (no local MongoDB needed).
- ✅ JWT_SECRET is also included for testing purposes.

3. Frontend Setup
   In a new terminal tab:

- cd frontend
- yarn
- yarn run dev
- The frontend will run at http://localhost:3000.

# ⚠️ Security Note 🛡 Important:

- The MongoDB connection string and JWT secret are intentionally included in the public code to simplify testing and avoid setup overhead.
  In a real-world production project, these should always be secured using a .env file and excluded from the repository (.gitignore).

👤 Test Accounts

- To simplify the review process, here are two pre-configured accounts:

👤 User

- Email: user@u.u
- Password: User!11

🔑 Admin

- Email: admin@a.a
- Password: Admin!11

# API Documentation

You can explore an example of API documentation with Swagger UI by running the backend server and navigating to:

[http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)

This interface allows you to interact with the API endpoints directly and see request/response details.

# 🧪 Integration Testing

This project uses Jest and Supertest for integration tests.

📁 Test File Structure.

- All integration tests are located in:

- backend/tests/integration/.

- Example test file: backend/tests/integration/products.test.js.

🚀 Running Integration Tests.

- a separate MongoDB test database aready created.

- Then run: npm run test:integration.

🔐 Some routes require authentication. The tests automatically perform login and store the token before making authenticated requests.

# 🧪 Unit Testing

This project also uses Jest for unit testing of services and utility functions.

- 📁 Test File Structure

-All unit tests are located in: backend/tests/unit/

- Example test file:
- backend/tests/unit/productServices.test.js

- 🧪 Running Unit Tests

- Run all unit tests with: npm run test:unit

# 📬 Contact

- Feel free to reach out if you need a technical walkthrough or if you'd like to discuss the implementation.
