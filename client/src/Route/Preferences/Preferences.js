import "./style/Preferences.css";
import References from "./References/References";
import { useState } from "react";
import { Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import AddToQueueTwoTone from "@mui/icons-material/AddToQueueTwoTone";
import useMediaQuery from "@mui/material/useMediaQuery";

const Preferences = ({setNotAtHome}) => {

  const [selected, setSelected] = useState(false);
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
              {selected === "fav" ? <BookmarkIcon /> : <BookmarkBorder/>}
              {mobile ? <h4>Fav</h4> : <h3>Fav</h3>}
              
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setSelected("to_watch_later")}
            >
              {selected === "to_watch_later" ? <AddToQueueTwoTone /> : <AddToQueueIcon/>}
              {mobile ? <h4>regarder plus tard</h4> : <h3>regarder plus tard</h3>}
              
            </Button>
          </div>
            {selected ? <References  selected={selected} setNotAtHome={setNotAtHome} /> : null}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
