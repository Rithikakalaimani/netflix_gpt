export const LOGO_URL =
  "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const PHOTO_URL =
  "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg";
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

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_API_KEY;
