import { useMediaQuery } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../Component/Context/AuthContext";
import ParallaxHover from "../../../Component/Home/List/Card/Card";
import "../style/Preferences.css";

const References = ({ selected }) => {
  const { currentUser } = useAuth();
  const [animesPref, setAnimesPref] = useState([]);
  const refCard = useRef();
  const mobile = useMediaQuery("(max-width:968px)");

  const getPreferencesReferences = async (tab) => {
    let tempPref = [];

    let ids = tab
      .filter((pref, i) =>
        selected === "fav"
          ? pref.favorite
          : selected === "to_watch_later" && pref.to_watch_later
      )
      .map((pref) => pref.animeId);
    if (ids.length > 0) {
      await fetch(
        `https://chakranimes.herokuapp.com/VOD/list/animes?animeId=${ids}`
      )
        .then((res) => res.json())
        .then((data) => tempPref.push(data));
    }

    return tempPref;
  };

  useEffect(() => {
    if (currentUser) {
      if (currentUser.Preferences) {
        if (currentUser.Preferences.length > 0) {
          getPreferencesReferences(currentUser.Preferences).then((res) =>
            setAnimesPref(res)
          );
        }
      }
    }
  }, [currentUser, selected]);

  const handleToggle = () => {};

  return (
    <div className="list-anime-container">
      <div className="list-anime">
        {animesPref[0]
          ? animesPref[0].map((anime, i) => (
              <div
                key={anime._id + i}
                className="card-item-container"
                style={{ cursor: "pointer" }}
                onClick={() => handleToggle(anime)}
                ref={refCard}
              >
                {anime.newAnime && (
                  <div
                    className="new-anime-mobile"
                    style={{ display: mobile ? "" : "none" }}
                  >
                    <h2>Nouveauté</h2>
                  </div>
                )}
                {anime.nouveau_Episode && (
                  <div
                    className="new-ep-mobile"
                    style={{ display: mobile ? "" : "none" }}
                  >
                    <h2>Nouveaux episodes</h2>
                  </div>
                )}
                <ParallaxHover width={"700"} height={"700"} yRotate={500}>
                  <div
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {anime.newAnime && (
                      <div
                        className="new-anime"
                        style={{ display: mobile ? "none" : "" }}
                      >
                        <h2>Nouveauté</h2>
                      </div>
                    )}
                    {anime.nouveau_Episode && (
                      <div
                        className="new-ep"
                        style={{ display: mobile ? "none" : "" }}
                      >
                        <h2>Nouveaux episodes</h2>
                      </div>
                    )}
                    <img
                      alt={"carde-anime: " + anime.name}
                      className="posters"
                      style={{ height: "100%", width: "100%" }}
                      src={anime.image && anime.image}
                    />
                  </div>
                </ParallaxHover>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default References;
