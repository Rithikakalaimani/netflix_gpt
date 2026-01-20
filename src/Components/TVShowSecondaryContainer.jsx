import { useSelector } from "react-redux";
import TVShowList from "./TVShowList";

const TVShowSecondaryContainer = () => {
  const tvShows = useSelector((store) => store.tvShows);
  return (
    <div className='bg-stone-900'>
      <div className='relative -mt-5 md:-mt-28 lg:-mt-32 z-20'>
        <TVShowList title={"Airing Today"} tvShows={tvShows.airingTodayTV} />
        <TVShowList title={"Popular TV Shows"} tvShows={tvShows.popularTV} />
        <TVShowList title={"Top-Rated TV Shows"} tvShows={tvShows.topRatedTV} />
        <TVShowList title={"On The Air"} tvShows={tvShows.onTheAirTV} />
      </div>
    </div>
  );
};

export default TVShowSecondaryContainer;
