import { useState, useRef, useEffect } from "react";
import useTVShowTrailer from "../Hooks/useTVShowTrailer";
import { useSelector } from "react-redux";
import { API_OPTIONS, IMG_CDN_URL } from "../Utils/constant";

const TVShowVideoBackground = ({ tvShowId }) => {
  const trailerVideo = useSelector((store) => store.tvShows?.trailerVideo);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [backdropPath, setBackdropPath] = useState(null);
  const iframeRef = useRef(null);

  useTVShowTrailer(tvShowId);

  useEffect(() => {
    setIsPlaying(true);
    setIsMuted(true);
    const fetchBackdrop = async () => {
      if (!tvShowId) return;
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${tvShowId}?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
      setBackdropPath(json.backdrop_path);
    };
    if (!trailerVideo?.key) {
      fetchBackdrop();
    } else {
      setBackdropPath(null);
    }
  }, [tvShowId, trailerVideo?.key]);

  const handlePlayPause = () => {
    if (!iframeRef.current || !trailerVideo?.key) return;
    const iframe = iframeRef.current;
    const newPlayingState = !isPlaying;
    try {
      if (newPlayingState) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "playVideo",
            args: "",
          }),
          "https://www.youtube.com"
        );
      } else {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "pauseVideo",
            args: "",
          }),
          "https://www.youtube.com"
        );
      }
      setIsPlaying(newPlayingState);
    } catch (error) {
      console.error("Error controlling video:", error);
    }
  };

  const handleMuteUnmute = () => {
    if (!iframeRef.current || !trailerVideo?.key) return;
    const iframe = iframeRef.current;
    const newMutedState = !isMuted;
    try {
      if (newMutedState) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "mute",
            args: "",
          }),
          "https://www.youtube.com"
        );
      } else {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: "unMute",
            args: "",
          }),
          "https://www.youtube.com"
        );
      }
      setIsMuted(newMutedState);
    } catch (error) {
      console.error("Error controlling video sound:", error);
    }
  };

  if (!trailerVideo?.key) {
    if (backdropPath) {
      return (
        <div className='w-screen aspect-video relative'>
          <img src={IMG_CDN_URL + backdropPath} alt="TV Show Backdrop" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
      );
    }
    return (
      <div className="w-screen aspect-video bg-black flex items-center justify-center relative">
        <div className="text-white">Loading trailer...</div>
      </div>
    );
  }

  return (
    <div className="relative w-screen aspect-video">
      <iframe
        ref={iframeRef}
        key={trailerVideo.key}
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo.key +
          "?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1&iv_load_policy=3&loop=1&enablejsapi=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex gap-2 z-10">
        <button
          onClick={handlePlayPause}
          className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 md:p-4 transition-all duration-200 flex items-center justify-center cursor-pointer"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          onClick={handleMuteUnmute}
          className="bg-black bg-opacity-70 hover:bg-opacity-90 text-white rounded-full p-3 md:p-4 transition-all duration-200 flex items-center justify-center cursor-pointer"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default TVShowVideoBackground;
