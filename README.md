# 🎬 NetflixGPT

A modern, AI-powered movie recommendation platform built with React. NetflixGPT combines the power of Groq AI (LLM) with TMDB API to provide intelligent movie and TV show recommendations, complete with user authentication, personalized watchlists, and a beautiful Netflix-inspired UI.

🌐 **Live Demo**: [https://netflix-gpt-vdpk.vercel.app/](https://netflix-gpt-vdpk.vercel.app/)

![NetflixGPT Screenshot](https://github.com/Rithikakalaimani/netflix_gpt/blob/e1bb5a756952cba035ee923d2a4d9293e75df386/screenshot/Screenshot%202025-01-25%20at%2012.00.48%E2%80%AFAM.png)

![NetflixGPT Screenshot](https://github.com/Rithikakalaimani/netflix_gpt/blob/1dff7f1672e5ceb4d68dbe0d2a55815aa3cf8b8e/screenshot/Screenshot%202025-01-25%20at%2012.01.14%E2%80%AFAM.png)

![NetflixGPT Screenshot](https://github.com/Rithikakalaimani/netflix_gpt/blob/d8e2cae8dfb7c51fffd9361a2392debcfeadcd02/screenshot/Screenshot%202025-01-26%E2%80%AFAM.png)

---

## ✨ Features

### 🔐 Authentication & User Management
- **Secure Authentication**: Firebase Authentication with email/password
- **User Profiles**: Customizable user profiles with display names and avatars
- **Form Validation**: Real-time validation with user-friendly error messages
- **Session Management**: Automatic session handling and redirects
- **Protected Routes**: Secure navigation with authentication checks

### 🎥 Movie & TV Show Browsing
- **Trending Content**: Browse now playing, popular, top-rated, and upcoming movies
- **TV Shows**: Dedicated section for TV shows with airing today, popular, and top-rated
- **Movie Details**: Comprehensive movie information pages with trailers
- **Actor Profiles**: Detailed actor pages with filmography
- **Genre Filtering**: Browse movies and shows by genre
- **Video Trailers**: Auto-playing background trailers for featured content

### 🤖 AI-Powered Search
- **Intelligent Recommendations**: Get movie and TV show suggestions using Groq AI (LLM)
- **Natural Language Queries**: Ask for recommendations in plain English
- **Multi-language Support**: Search in English, Hindi, Tamil, and Japanese
- **Smart Matching**: AI-powered content matching from TMDB database
- **Real-time Search**: Instant search results as you type

### 📱 User Experience
- **Personal Watchlist**: Save movies and TV shows to your personal list
- **Responsive Design**: Fully responsive design for mobile, tablet, and desktop
- **Modern UI**: Beautiful Netflix-inspired interface with smooth animations
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Smooth loading indicators and skeleton screens

### 🔍 Advanced Features
- **Search Functionality**: Search movies, TV shows, actors, and genres
- **Genre Navigation**: Browse content by specific genres
- **Video Backgrounds**: Immersive video backgrounds on movie/show pages
- **Redux State Management**: Efficient state management with Redux Toolkit
- **Optimized Performance**: Memoization and code splitting for better performance

---

## 🛠 Tech Stack

### Frontend
- **React 18.3** - Modern React with hooks
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router DOM 7.1** - Client-side routing

### State Management
- **Redux Toolkit 2.5** - Modern Redux with simplified API
- **React Redux 9.2** - React bindings for Redux

### Authentication & Database
- **Firebase 11.10** - Authentication and Firestore database
  - Firebase Authentication
  - Cloud Firestore (for watchlists)

### APIs & Services
- **TMDB API** - The Movie Database API for movie/TV data
- **Groq AI SDK** - LLM-powered recommendations
- **OpenAI SDK 4.79** - Alternative AI integration (optional)

### Deployment
- **Vercel** - Production deployment platform
- **Firebase Hosting** - Alternative deployment option

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- TMDB API key
- Groq API key

### Step 1: Clone the Repository
```bash
git clone https://github.com/rithikakalaimani/NetflixGPT.git
cd NetflixGPT
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Groq AI API Key (Required for GPT search)
REACT_APP_GROQ_API_KEY=your_groq_api_key_here

# TMDB Bearer Token (Required for movie data)
REACT_APP_TMDB_BEARER_TOKEN=your_tmdb_bearer_token_here

# Firebase Configuration (Optional - fallback values in code)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Step 4: Get API Keys

#### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in
3. Create a new API key
4. Copy the key to your `.env` file

#### TMDB API Key
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings → API
4. Request an API key
5. Generate a Bearer Token
6. Copy the token to your `.env` file

#### Firebase Setup
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Create a Firestore database
5. Copy configuration to your `.env` file

### Step 5: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 6: Build for Production
```bash
npm run build
```

---

## 📂 Project Structure

```
netflix_gpt/
├── public/                 # Static assets
├── src/
│   ├── Components/         # React components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Browse.jsx      # Main browse page
│   │   ├── Login.jsx       # Authentication page
│   │   ├── MovieCard.jsx   # Movie card component
│   │   ├── GPTSearch.jsx   # AI search interface
│   │   └── ...
│   ├── Hooks/              # Custom React hooks
│   │   ├── useNowPlayingMovies.js
│   │   ├── useMovieTrailer.js
│   │   └── ...
│   ├── Utils/              # Utility files
│   │   ├── firebase.js     # Firebase configuration
│   │   ├── constant.js     # API constants
│   │   ├── appStore.js     # Redux store
│   │   └── ...
│   ├── App.js              # Main app component
│   └── index.js            # Entry point
├── .env                    # Environment variables (not in git)
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── vercel.json             # Vercel deployment config
└── README.md               # This file
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

The project is currently deployed on Vercel: [https://netflix-gpt-vdpk.vercel.app/](https://netflix-gpt-vdpk.vercel.app/)

#### Quick Deploy Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel auto-detects Create React App

3. **Add Environment Variables**
   - Go to Settings → Environment Variables
   - Add all variables from your `.env` file:
     - `REACT_APP_GROQ_API_KEY`
     - `REACT_APP_TMDB_BEARER_TOKEN`
     - Firebase variables (optional)

4. **Deploy**
   - Click "Deploy"
   - Your app will be live automatically

📖 **Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init
npm run build
firebase deploy
```

---

## 🎯 Key Features Explained

### AI-Powered Recommendations
Ask the AI for movie recommendations in natural language:
- "Show me action movies from the 90s"
- "Find romantic comedies with good ratings"
- "What are the best sci-fi TV shows?"

The AI uses Groq's LLM to understand your query and returns relevant movie/TV show suggestions from TMDB.

### Watchlist Management
- Add movies and TV shows to your personal watchlist
- Access your list from the user menu
- Watchlist syncs with Firebase Firestore
- Persistent across sessions

### Responsive Design
- **Mobile**: Optimized layout with mobile-friendly navigation
- **Tablet**: Adaptive design for medium screens
- **Desktop**: Full-featured experience with all features

---

## 🐛 Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check that API keys are valid
- Verify Node.js version (v14+)

### Authentication Issues
- Verify Firebase configuration
- Check Firebase Authentication is enabled
- Ensure authorized domains include your deployment URL

### API Errors
- Verify TMDB Bearer token is valid
- Check Groq API key is correct
- Ensure API rate limits aren't exceeded

### Deployment Issues
- Make sure all environment variables are added in Vercel
- Redeploy after adding new environment variables
- Check build logs in Vercel dashboard

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Rithika Kalaimani**

- GitHub: [@Rithikakalaimani](https://github.com/Rithikakalaimani)
- Project Link: [https://github.com/rithikakalaimani/NetflixGPT](https://github.com/rithikakalaimani/NetflixGPT)

---

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the comprehensive movie database API
- [Groq](https://groq.com/) for the powerful LLM API
- [Firebase](https://firebase.google.com/) for authentication and database services
- [Vercel](https://vercel.com/) for seamless deployment
- Netflix for UI/UX inspiration

---

## 📊 Project Status

✅ **Production Ready** - Fully deployed and functional

- ✅ Authentication system
- ✅ Movie browsing and details
- ✅ AI-powered recommendations
- ✅ Watchlist functionality
- ✅ Responsive design
- ✅ Error handling
- ✅ Production deployment

---

**⭐ If you find this project helpful, please consider giving it a star!**
