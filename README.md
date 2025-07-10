# WonderLust

WonderLust is a full-stack Node.js web application for listing, reviewing, and managing travel destinations or properties. Built with Express, MongoDB, EJS, and Passport.js, it supports user authentication, CRUD operations for listings, and user reviews.

---

## Features

- User authentication (signup, login, logout) with Passport.js
- Create, read, update, and delete listings
- Add and delete reviews for listings
- Flash messages for user feedback
- Authorization: Only owners can edit/delete their listings or reviews
- Responsive UI with Bootstrap
- MongoDB for data storage

---

## Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap, HTML, CSS
- **Authentication:** Passport.js, passport-local-mongoose
- **Session & Flash:** express-session, connect-flash

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/ChaitanyaMardane/WonderLust.git
   cd WonderLust
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up MongoDB:**
   - Make sure MongoDB is running locally on `mongodb://localhost:27017/wonderlust`
   - Or update the `MONGO_URL` in `app.js` to your MongoDB Atlas URI

4. **Start the application:**
   ```sh
   node app.js
   ```
   The app will be running at [http://localhost:8080/listing/](http://localhost:8080/listing/)

---

## Folder Structure

```
WonderLust/
├── ExpressErrors/
├── init/
├── middleware.js
├── models/
├── public/
├── routes/
├── schema.js
├── utils/
├── views/
├── app.js
├── package.json
└── .gitignore
```

---

## Usage

- Visit `/signup` to create a new account.
- Browse all listings at `/listing`.
- Add, edit, or delete your own listings.
- Leave reviews on listings.
- Only the owner can edit or delete their listings/reviews.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

This project is licensed under the MIT License.

---

## Author

- [Chaitanya Mardane](https://github.com/ChaitanyaMardane)

---

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bootstrap](https://getbootstrap.com/)
- [Passport.js](http://www.passportjs.org/)