import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import Browse from "./Browse";
import MoviePage from "./MoviePage";
import MyList from "./MyList";
import SearchPage from "./SearchPage";
import ActorPage from "./ActorPage";
import GenrePage from "./GenrePage";
import TVShowsBrowse from "./TVShowsBrowse";
import TVShowPage from "./TVShowPage";
import Toast from "./Toast";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { hideToast } from "../Utils/toastSlice";

const Body = () => {
  const dispatch = useDispatch();
  const toast = useSelector((store) => store.toast);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>

    },
    {
      path:"/browse",
      element :<Browse/>
    },
    {
      path:"/movie/:movieId",
      element :<MoviePage/>
    },
    {
      path:"/mylist",
      element :<MyList/>
    },
    {
      path:"/search",
      element :<SearchPage/>
    },
    {
      path:"/actor/:actorId",
      element :<ActorPage/>
    },
    {
      path:"/genre/:genreId",
      element :<GenrePage/>
    },
    {
      path:"/tvshows",
      element :<TVShowsBrowse/>
    },
    {
      path:"/tv/:tvShowId",
      element :<TVShowPage/>
    }
  ])
  return (
    <div>
      <RouterProvider router={appRouter}/>
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => dispatch(hideToast())}
        />
      )}
    </div>
  )
}

export default Body
