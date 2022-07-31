import "./style/Preferences.css";
import References from "./References/References";
import { useState } from "react";
import { Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import useMediaQuery from "@mui/material/useMediaQuery";

const Preferences = () => {
  const [selected, setSelected] = useState("");
  const mobile = useMediaQuery("(max-width:968px)");

  return (
    <div className="preferences-container">
      <div className="select-container">
        <div className="info">
          <div className="title">
            <h2>Ma liste</h2>
          </div>
          <div className="description">
            {mobile ? <h4 style={{color: "white"}}>Vous retrouverez ici les animés que vous avez aimé ou que vous aimeriez regarder !</h4> : <h2>Vous retrouverez ici les animés que vous avez aimé ou que vous aimeriez regarder !</h2>}
            
          </div>
        </div>
        <div className="select-wrapper">
          <div className="selector-btn">
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setSelected("fav")}
            >
              <BookmarkIcon />
              {mobile ? <h4>Fav</h4> : <h3>Fav</h3>}
              
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setSelected("to_watch_later")}
            >
              <AddToQueueIcon />
              {mobile ? <h4>regarder plus tard</h4> : <h3>regarder plus tard</h3>}
              
            </Button>
          </div>
          {selected === "fav" ? (
            <References selected={selected} />
          ) : (
            selected === "to_watch_later" && <References selected={selected} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
