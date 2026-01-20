import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Header from "./Header";
import MovieList from "./MovieList";
import useActorDetails from "../Hooks/useActorDetails";
import useActorMovies from "../Hooks/useActorMovies";
import { clearActorData } from "../Utils/actorSlice";
import { IMG_CDN_URL } from "../Utils/constant";

const ActorPage = () => {
  const { actorId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actorDetails, actorMovies, isLoading } = useSelector(
    (store) => store.actor
  );

  useActorDetails(actorId);
  useActorMovies(actorId);

  useEffect(() => {
    return () => {
      // Clean up when component unmounts
      dispatch(clearActorData());
    };
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading actor information...</div>
        </div>
      </div>
    );
  }

  if (!actorDetails) {
    return (
      <div className="bg-black min-h-screen">
        <Header />
        <div className="pt-20 flex flex-col items-center justify-center min-h-screen">
          <div className="text-white text-xl mb-4">Actor not found</div>
          <button
            onClick={() => navigate("/browse")}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
          >
            Go Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const {
    name,
    profile_path,
    biography,
    birthday,
    place_of_birth,
    known_for_department,
    popularity,
    deathday,
  } = actorDetails;

  return (
    <div className="bg-black min-h-screen">
      <Header />
      <div className="md:pt-0 pt-20">
        {/* Hero Section with Actor Image */}
        <div className="relative w-screen h-[60vh] md:h-[70vh] overflow-hidden">
          {profile_path ? (
            <img
              src={IMG_CDN_URL + profile_path}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
              <div className="text-white text-6xl font-bold">
                {name.charAt(0)}
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>

        {/* Actor Details Section */}
        <div className="bg-stone-900 px-4 md:px-10 py-8">
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Profile Picture (Mobile) */}
            {profile_path && (
              <div className="md:hidden flex justify-center">
                <img
                  src={IMG_CDN_URL + profile_path}
                  alt={name}
                  className="w-32 h-48 object-cover rounded-md"
                />
              </div>
            )}

            {/* Actor Info */}
            <div className="flex-1 text-white">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {name}
              </h1>

              {/* Basic Info */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm md:text-base text-gray-300">
                {known_for_department && (
                  <span>
                    <span className="font-semibold">Known for:</span>{" "}
                    {known_for_department}
                  </span>
                )}
                {birthday && (
                  <span>
                    <span className="font-semibold">Born:</span>{" "}
                    {new Date(birthday).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {deathday &&
                      ` - Died: ${new Date(deathday).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}`}
                  </span>
                )}
                {place_of_birth && (
                  <span>
                    <span className="font-semibold">Place of Birth:</span>{" "}
                    {place_of_birth}
                  </span>
                )}
                {popularity && (
                  <span>
                    <span className="font-semibold">Popularity:</span>{" "}
                    {popularity.toFixed(1)} ⭐
                  </span>
                )}
              </div>

              {/* Biography */}
              {biography && (
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                    Biography
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-4xl">
                    {biography}
                  </p>
                </div>
              )}
            </div>

            {/* Profile Picture (Desktop) */}
            {profile_path && (
              <div className="hidden md:block">
                <img
                  src={IMG_CDN_URL + profile_path}
                  alt={name}
                  className="w-48 h-72 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          {/* Actor's Movies */}
          {actorMovies && actorMovies.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Filmography ({actorMovies.length} movies)
              </h2>
              <MovieList title="" movies={actorMovies} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActorPage;
