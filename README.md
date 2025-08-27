# ArtExplore 🎨

ArtExplore is a modern full-stack web application that allows users to search, explore, and save artwork using The Metropolitan Museum of Art Collection API. It includes user authentication, search history tracking, and persistent favourites, all backed by a MongoDB database.

---

## 🌐 Live Demo
- Link: [https://art-explore.vercel.app](https://art-explore.vercel.app)
---

## 🛠 Tech Stack

### Frontend
- Next.js 15 (Pages Router)
- React 19
- SWR for data fetching
- Jotai for state management
- Bootstrap (React-Bootstrap) for UI

### Backend (User API)
- Node.js with Express
- MongoDB (Atlas)
- Mongoose for ORM
- bcryptjs for password hashing
- JSON Web Token (JWT) for authentication

---

## 📁 Project Structure

```
.
├── pages/                  # Next.js routes (login, register, artwork, etc.)
├── components/             # Reusable React components (ArtworkCard, MainNav, etc.)
├── lib/                    # Utility functions (authenticate.js, userData.js)
├── store.js                # Jotai atoms (favourites and search history)
├── styles/                 # Custom CSS modules
├── user-api/               # Express server for user registration/authentication
└── public/                 # Static assets
```



---

## 🚀 Features

- 🔐 User registration & login with hashed passwords (JWT-based)
- 🖼 Browse thousands of artworks from The Met Museum API
- ⭐ Add and remove favourites (stored in MongoDB)
- 🕓 View and manage search history
- 🔒 Route protection via custom RouteGuard
- 📄 Clean UI with Bootstrap styling

---

## 🧪 Local Setup

1. Clone the repo:

```bash
git clone https://github.com/avinav456/artExplore.git
cd artExplore
```

2. Install dependencies (frontend):

```bash
npm install
```

3. Start frontend (Next.js app):

```bash
npm run dev
```


---


## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch (`git checkout -b feature/amazing-feature`)  
3. Commit your changes (`git commit -m 'Add amazing feature'`)  
4. Push to the branch (`git push origin feature/amazing-feature`)  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.