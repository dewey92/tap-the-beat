import React, { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { makeStyles, createStyles, Box, Chip, Grid, Paper, Typography } from '@material-ui/core';
import { useKeyPressEvent } from 'react-use';
import { Song, Comment } from '../gameModels';
import useGameEngine from './useGameEngine';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: 'auto',
      width: 225,
      height: 225,
      borderRadius: '99em',
      marginTop: theme.spacing(4),
    },
    progressInfo: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
);

const COLORS = ['#EC6060', '#4DB52E', '#31D1B3', '#1D9DCB'];

const isSpace = (e: KeyboardEvent) => e.keyCode === 32;
const secondsToMinutes = (seconds: number) =>
  Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2);

enum PlayState {
  Idle,
  Playing,
  Paused,
  Ended,
}

const isIdle = (ps: PlayState) => ps === PlayState.Idle;
const isPlaying = (ps: PlayState) => ps === PlayState.Playing;
const isPaused = (ps: PlayState) => ps === PlayState.Paused;

interface VisualizerProps {
  song: Song;
}

const Visualizer: React.FC<VisualizerProps> = ({ song }) => {
  const averageBeatInSecond = useRef((60 / song.bpm) * 1000);

  const [playState, setPlayState] = useState(PlayState.Idle);
  const [isBufferReady, setIsBufferReady] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [{ accumulatedScore: score, comment }, dispatch] = useGameEngine();
  const history = useHistory();
  const classes = useStyles();

  const timeLeft = secondsToMinutes(duration - progress);

  useKeyPressEvent(isSpace, () => {
    if (isIdle(playState) || isPaused(playState)) {
      setPlayState(PlayState.Playing);
      return;
    }

    if (isPlaying(playState)) {
      dispatch({ type: 'ON_SPACE_HIT', payload: Date.now() });
    }
  });

  useEffect(() => {
    if (!isPlaying(playState) || !isBufferReady) return;

    const hmm = setInterval(() => {
      dispatch({ type: 'ON_BEAT', payload: Date.now() });
      setColorIdx((prev) => {
        return prev === COLORS.length - 1 ? 0 : prev + 1;
      });
    }, averageBeatInSecond.current);
    return () => clearInterval(hmm);
  }, [playState, isBufferReady, dispatch]);

  return (
    <div>
      <Box marginBottom={4}>
        <ReactPlayer
          url={song.youtubeUrl}
          playing={isPlaying(playState)}
          onPause={() => setPlayState(PlayState.Paused)}
          onEnded={() => {
            setPlayState(PlayState.Ended);
            history.push('/save', { score, songId: song.id });
          }}
          onBufferEnd={() => setIsBufferReady(true)}
          progressInterval={averageBeatInSecond.current}
          onProgress={(p) => setProgress(p.playedSeconds)}
          onDuration={(d) => setDuration(d)}
          width="100%"
          height={240}
        />
      </Box>

      {isIdle(playState) && (
        <Typography variant="h3" align="center" gutterBottom>
          Hit Space to Start Playing
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <div className={classes.root} style={{ background: COLORS[colorIdx] }} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <div>
            <Chip label={`${song.bpm} BPM`} variant="outlined" color="secondary" />
            <Chip label={`- ${timeLeft}`} variant="outlined" />
          </div>
          <Paper variant="outlined" className={classes.progressInfo}>
            <Typography variant="subtitle2">SCORE</Typography>
            <Typography variant="h4">
              <strong>{score}</strong>
            </Typography>
          </Paper>
          <Paper variant="outlined" className={classes.progressInfo}>
            <Typography variant="subtitle2">COMMENTS</Typography>
            {comment === Comment.TooEarly && (
              <Box color="error.main">
                <Typography variant="h5">
                  <strong>Too early!</strong>
                </Typography>
              </Box>
            )}
            {comment === Comment.Excellent && (
              <Box color="success.main">
                <Typography variant="h5">
                  <strong>Excellent!!</strong>
                </Typography>
              </Box>
            )}
            {comment === Comment.Good && (
              <Box color="info.main">
                <Typography variant="h5">
                  <strong>Good!</strong>
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Visualizer;
