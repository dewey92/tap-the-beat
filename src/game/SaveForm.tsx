import React, { useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  makeStyles,
  createStyles,
  Button,
  Box,
  Grid,
  Link,
  TextField,
  Typography,
} from '@material-ui/core';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';
import { Alert } from '@material-ui/lab';
import { useRemoteData } from '../shared';
import { LeaderboardList } from './Leaderboard';
import { submitLeaderboard } from './gameApis';

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      marginTop: theme.spacing(4),
    },
    playBtn: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

const SaveForm: React.FC = (props) => {
  const [name, setName] = useState('');
  const { status, loading, success } = useRemoteData<null, never>();
  const classes = useStyles();
  const {
    location: { state: historyState },
  } = useHistory<{ score: number; songId: string }>();

  if (!('score' in historyState && 'songId' in historyState)) {
    return <Alert severity="error">Invalid parameter</Alert>;
  }

  return (
    <main>
      <header>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Save to Leaderboard
        </Typography>
      </header>
      {status.type !== 'Success' && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            loading();
            await submitLeaderboard({
              id: Date.now().toString(),
              name,
              score: historyState.score,
              songId: historyState.songId,
            });
            success(null);
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                id="name"
                label="Your name"
                variant="outlined"
                onChange={(e) => setName(e.target.value)}
                disabled={status.type === 'Loading'}
                fullWidth
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={status.type === 'Loading'}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {status.type === 'Success' && (
        <div className={classes.playBtn}>
          <Button variant="contained" color="primary" size="large" startIcon={<PlayIcon />}>
            <Link component={RouterLink} to="/" color="inherit" underline="none">
              Play another song
            </Link>
          </Button>
        </div>
      )}
      <Box textAlign="center" marginTop={4}>
        <Typography variant="body1">Your Score</Typography>
        <Typography variant="h2">
          <strong>{historyState.score}</strong>
        </Typography>
      </Box>
      <div className={classes.list}>
        <LeaderboardList />
      </div>
    </main>
  );
};

export default SaveForm;
