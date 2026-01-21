# NetflixGPT

A modern, AI-powered movie recommendation platform built with React. NetflixGPT combines the power of Groq AI (LLM) with TMDB API to provide intelligent movie and TV show recommendations, complete with user authentication, personalized watchlists, and a beautiful Netflix-inspired UI.

🌐 **Live Demo**: [https://netflix-gpt-vdpk.vercel.app/](https://netflix-gpt-vdpk.vercel.app/)


<div align="center">

![NetflixGPT Home Page](https://github.com/Rithikakalaimani/netflix_gpt/blob/main/screenshot/Screenshot%202026-01-22%20at%2012.07.10%E2%80%AFAM.png)

![NetflixGPT Movie Details](https://github.com/Rithikakalaimani/netflix_gpt/blob/main/screenshot/Screenshot%202026-01-22%20at%2012.07.55%E2%80%AFAM.png)

![NetflixGPT GPT Search](https://github.com/Rithikakalaimani/netflix_gpt/blob/main/screenshot/Screenshot%202026-01-22%20at%2012.08.11%E2%80%AFAM.png)

![NetflixGPT TV Shows](https://github.com/Rithikakalaimani/netflix_gpt/blob/main/screenshot/Screenshot%202026-01-22%20at%2012.09.10%E2%80%AFAM.png)

![NetflixGPT Search Results](https://github.com/Rithikakalaimani/netflix_gpt/blob/main/screenshot/Screenshot%202026-01-22%20at%2012.09.36%E2%80%AFAM.png)

### My Watchlist
![NetflixGPT Watchlist](https://github.com/Rithikakalaimani/netflix_gpt/blob/main/screenshot/Screenshot%202026-01-22%20at%2012.09.53%E2%80%AFAM.png)

### Mobile Responsive View
![NetflixGPT Mobile View](https://github.com/Rithikakalaimani/netflix_gpt/blob/main/screenshot/Screenshot%202026-01-22%20at%2012.10.15%E2%80%AFAM.png)

</div>

---

##Features

### Authentication & User Management
- **Secure Authentication**: Firebase Authentication with email/password
- **User Profiles**: Customizable user profiles with display names and avatars
- **Form Validation**: Real-time validation with user-friendly error messages
- **Session Management**: Automatic session handling and redirects
- **Protected Routes**: Secure navigation with authentication checks

### Movie & TV Show Browsing
- **Trending Content**: Browse now playing, popular, top-rated, and upcoming movies
- **TV Shows**: Dedicated section for TV shows with airing today, popular, and top-rated
- **Movie Details**: Comprehensive movie information pages with trailers
- **Actor Profiles**: Detailed actor pages with filmography
- **Genre Filtering**: Browse movies and shows by genre
- **Video Trailers**: Auto-playing background trailers for featured content

### AI-Powered Search
- **Intelligent Recommendations**: Get movie and TV show suggestions using Groq AI (LLM)
- **Natural Language Queries**: Ask for recommendations in plain English
- **Multi-language Support**: Search in English, Hindi, Tamil, and Japanese
- **Smart Matching**: AI-powered content matching from TMDB database
- **Real-time Search**: Instant search results as you type

### Advanced Features
- **Search Functionality**: Search movies, TV shows, actors, and genres
- **Genre Navigation**: Browse content by specific genres
- **Video Backgrounds**: Immersive video backgrounds on movie/show pages
- **Redux State Management**: Efficient state management with Redux Toolkit
- **Optimized Performance**: Memoization and code splitting for better performance

---

## Tech Stack

### Frontend
- **React 
- **Tailwind CSS 
- **React Router DOM 

### State Management
- **Redux Toolkit
- **React Redux 

### Authentication & Database
- **Firebase 

### APIs & Services
- **TMDB API** 
- **Groq AI 

---

## Installation & Setup

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

### Step 4: Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

### Step 5: Build for Production
```bash
npm run build
```

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Rithika Kalaimani**

- GitHub: [@Rithikakalaimani](https://github.com/Rithikakalaimani)
- Project Link: [https://github.com/rithikakalaimani/NetflixGPT](https://github.com/rithikakalaimani/NetflixGPT)



---
