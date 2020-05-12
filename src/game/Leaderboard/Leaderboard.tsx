import React from 'react';
import { makeStyles, createStyles, CircularProgress, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFetchRemoteData } from '../../shared';
import LeaderboardList from './LeaderboardList';
import { getSongs } from '../gameApis';
import SongList from '../SongList';
import { useCacheSongs } from '../SongsProvider';

const useStyles = makeStyles((theme) =>
  createStyles({
    list: {
      marginTop: theme.spacing(4),
    },
  })
);

const Leaderboard: React.FC = () => {
  const { cacheSongs } = useCacheSongs();
  const { status } = useFetchRemoteData('/songs', getSongs, {
    onSuccess: cacheSongs,
  });
  const classes = useStyles();

  return (
    <main>
      <header>
        <Typography variant="h2" align="center" gutterBottom>
          Tap The Beat
        </Typography>
      </header>
      <div>
        <Typography variant="h4" align="center" gutterBottom>
          Tap a song to play
        </Typography>
        {status.type === 'Loading' && <CircularProgress />}
        {status.type === 'Failure' && <Alert severity="error">{status.error}</Alert>}
        {status.type === 'Success' && <SongList songs={status.value} />}
      </div>

      <div className={classes.list}>
        <Typography variant="h4" align="center" gutterBottom>
          Leaderboard
        </Typography>
        <LeaderboardList />
      </div>
    </main>
  );
};

export default Leaderboard;
