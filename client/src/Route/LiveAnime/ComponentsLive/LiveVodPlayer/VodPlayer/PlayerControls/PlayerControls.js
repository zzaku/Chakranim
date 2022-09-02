import { forwardRef, useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import FastRewindRoundedIcon from "@mui/icons-material/FastRewindRounded";
import FastForwardRoundedIcon from "@mui/icons-material/FastForwardRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Popover from "@mui/material/Popover";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import FullScreen from "@mui/icons-material/Fullscreen";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Slider from "@mui/material/Slider";
import styled from "@emotion/styled";
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import "./style/PlayerControls.css";

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.string.isRequired,
};

export default forwardRef(({ onPlayPause, playing, onRewind, onFastForward, muted, onMute, onVolumeSeekUp, onVolumeSeekDown, volume, onPlaybackRateChange, playbackRate, onToggleFullScreen, played, onSeek, onSeekMouseUp, onSeekMouseDown, elapsedTime, totalDuration, onChangeDisplayFormat, screenFull }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopover = (event) => {

    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "playbackrate-popover" : undefined;

  const PrettoSlider = styled(Slider)({
    height: 8,
    color: "#2c2c80",
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#2c2c80",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  return (
    <div className="wrapper-controls" ref={ref}>
      {/* Top controls */}

      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <Grid item>
          <Typography variant="h5" style={{ color: "white" }}>
            Video Title
          </Typography>
        </Grid>
      </Grid>

      {/* middle controls */}

      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton onClick={onRewind} sx={{color: "#c0c1c0"}} className="control-icons" aria-label="required">
          <FastRewindRoundedIcon sx={{ fontSize: 80 }} />
        </IconButton>

        <IconButton onClick={onPlayPause} sx={{color: "#c0c1c0"}} className="control-icons" aria-label="required">
          {playing ? <PauseRoundedIcon sx={{ fontSize: 80 }} /> : <PlayArrowRoundedIcon sx={{ fontSize: 80 }} />}
        </IconButton>

        <IconButton onClick={onFastForward} sx={{color: "#c0c1c0"}} className="control-icons" aria-label="required">
          <FastForwardRoundedIcon sx={{ fontSize: 80 }} />
        </IconButton>
      </Grid>

      {/* middle controls */}

      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <Grid item xs={12}>
          <PrettoSlider
            min={0}
            max={100}
            value={played * 100}
            valueLabelDisplay="auto"
            components={{
              ValueLabel: (e) => <ValueLabelComponent {...e} value={elapsedTime} />
            }}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
          />
        </Grid>

        <Grid item>
          <Grid container alignItems="center" direction="row">
            <IconButton onClick={onPlayPause} sx={{color: "#c0c1c0"}} className="play-btn">
              {playing ? <PauseRoundedIcon sx={{ fontSize: 30 }} /> : <PlayArrowRoundedIcon sx={{ fontSize: 30 }} />}
            </IconButton>

            <IconButton onClick={onMute} sx={{color: "#c0c1c0"}} className="play-btn">
              {muted ? <VolumeOffIcon sx={{ fontSize: 30 }} /> : <VolumeUpIcon sx={{ fontSize: 30 }} />}
            </IconButton>

            <Slider
              min={0}
              max={50}
              value={volume * 100}
              sx={{ width: 100, height: 2, color: "#2c2c80" }}
              onChange={onVolumeSeekUp}
              onChangeCommitted={onVolumeSeekDown}
            />

            <Button onClick={onChangeDisplayFormat} variant="text" style={{ color: "#c0c1c0", marginLeft: 16 }}>
              <Typography>{elapsedTime} / {totalDuration}</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid item sx={{ display: "flex", flexDirection: "row"}}>
         {
            !screenFull ? 
            <>
          <Button
            onClick={handlePopover}
            variant="text"
            className="control-icons"
            style={{ color: "#c0c1c0" }}
          >
            <Typography>{playbackRate}X</Typography>
          </Button>

          
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Grid container direction="column-reverse" sx={{ background: "#2c2c80"}}>
                {[0.5, 1, 1.5, 2].map((rate, i) => {
                  return (
                    <Button onClick={() => onPlaybackRateChange(rate)} variant="text" key={i}>
                      <Typography color={rate === playbackRate? "primary" : "#c0c1c0"}>{rate}</Typography>
                    </Button>
                  );
                })}
              </Grid>
            </Popover>
            </>
            :
            <Grid container direction="row" sx={{ background: "#2c2c80", opacity: "0.8", borderRadius: "8px"}}>
                {[0.5, 1, 1.5, 2].map((rate, i) => {
                  return (
                    <Button onClick={() => onPlaybackRateChange(rate)} variant="text" key={i}>
                      <Typography color={rate === playbackRate? "primary" : "#c0c1c0"}>{rate}</Typography>
                    </Button>
                  );
                })}
              </Grid>
          }

          <IconButton onClick={onToggleFullScreen} className="control-icons" style={{ color: "#c0c1c0" }}>
            <FullScreen fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
});
