
export const LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png";
// Default profile photo URL - using a reliable Netflix-style avatar
export const PHOTO_URL =
  "https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABStlS0MPUGcy6Ovyeia-3ddnnXNb2Lri4P4H4QCFuR_yaGs0umyqHUDOZcOBKF8MFUGHX07txAW70z7wq_S9AKGQ_MixrLQ.png?r=a4b";
// export const MOVIEBG_URL = "https://api.themoviedb.org/3/movie/939243/videos?language=en-US";
// export const MOVIELIST_URL = "https://api.themoviedb.org/3/movie/now_playing?page=1";
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDA4MDUzNmE5MDA1YWQ2YTJjYjViMWRmZmJjNzJlNCIsIm5iZiI6MTYyMDE3NzQ1OC40OTYsInN1YiI6IjYwOTFmMjMyZThkMGI0MDA3Njg5YjFjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7qDvDIUsWv11Z7B60RoLSJpgwCcw6o_ywAT7K-FCcqI",
  },
};
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";
export const BG_IMG_URL =
  "https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg";
export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "tamil", name: "Tamil" },
  { identifier: "japanese", name: "Japanese" },
];

export const GROQ_KEY = process.env.REACT_APP_GROQ_API_KEY;
