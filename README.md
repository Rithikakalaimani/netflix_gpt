# NetflixGPT

NetflixGPT is a React-based web application that integrates OpenAI's GPT with TMDB to provide intelligent movie recommendations. The project includes user authentication, movie browsing, and an AI-powered search feature to enhance the streaming experience.


## 🚀 Features

### 🔐 Authentication

- Login / Sign Up
- Form validation using `useRef` Hook
- Firebase authentication setup
- Redirect to browse page after authentication
- Sign out functionality
- Profile update feature
- BugFix: Redirect users to login page if not authenticated
- Unsubscribe from the `onAuthStateChange` callback

### 🎥 Movie Browsing

- Fetch movies from TMDB API
- Store movie data and trailer videos in Redux
- Browse page includes:
  - Header
  - Main Movie Display (Background Trailer, Movie Name, Description)
  - Movie Suggestions
  - Movie List
  - Movie Cards

### 🤖 GPT Movie Search

- Search bar for intelligent movie suggestions
- Multi-language support
- Fetch GPT movie recommendations from TMDB
- Secure API keys using `.env` file
- Created `GPTSlice` to manage GPT movie data
- Memoization for optimized performance

## 🛠 Tech Stack

- **Frontend**: React, Tailwind CSS
- **State Management**: Redux
- **Authentication**: Firebase
- **API & Data Fetching**: TMDB API, OpenAI API
- **Deployment**: Firebase Hosting

## 📌 Setup and Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/rithikakalaimani/NetflixGPT.git
   ```
2. Navigate to the project folder:
   ```sh
   cd NetflixGPT
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add the following keys:
     ```sh
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_TMDB_API_KEY=your_tmdb_api_key
     REACT_APP_OPENAI_API_KEY=your_openai_api_key
     ```
5. Start the development server:
   ```sh
   npm start
   ```
6. Build for production:
   ```sh
   npm run build
   ```

## 📂 Project Structure

```
NetflixGPT/
├── public/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   ├── .env
├── package.json
├── tailwind.config.js
├── README.md
```

## 🚀 Deployment

- The app is deployed on Firebase Hosting.
- Run the following command to deploy:
  ```sh
  npm run deploy
  ```

## 🤝 Contributing

Feel free to fork the repository and submit pull requests for improvements.


