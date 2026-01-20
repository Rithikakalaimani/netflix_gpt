import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/constant";
import { setActorDetails, setLoading } from "../Utils/actorSlice";

const useActorDetails = (actorId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!actorId) return;

    const fetchActorDetails = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
          API_OPTIONS
        );
        const data = await response.json();
        dispatch(setActorDetails(data));
      } catch (error) {
        console.error("Error fetching actor details:", error);
        dispatch(setActorDetails(null));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchActorDetails();
  }, [actorId, dispatch]);
};

export default useActorDetails;
