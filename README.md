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
git clone https://github.com/hamma22/kata-alten.git
cd kata-alten
2. Backend Setup
- cd backend
- npm install
- npm run dev
The backend will start at http://localhost:5000.

- ✅ MongoDB Atlas is already connected (no local MongoDB needed).
- ✅ JWT_SECRET is also included for testing purposes.

3. Frontend Setup
In a new terminal tab:

- cd frontend
- yarn
- yarn run dev
The frontend will run at http://localhost:3000.

⚠️ Security Note 🛡 Important:
- The MongoDB connection string and JWT secret are intentionally included in the public code to simplify testing and avoid setup overhead.
In a real-world production project, these should always be secured using a .env file and excluded from the repository (.gitignore).

👤 Test Accounts
- To simplify the review process, here are two pre-configured accounts:

🔑 Admin
- Email: admin@a.a
- Password: Admin!11

👤 User
- Email: user@u.u
- Password: User!11

📬 Contact
- Feel free to reach out if you need a technical walkthrough or if you'd like to discuss the implementation.
