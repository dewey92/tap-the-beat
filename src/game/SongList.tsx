import React from 'react';
import { useHistory } from 'react-router';
import {
  makeStyles,
  createStyles,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { Song } from './gameModels';

const useStyles = makeStyles((theme) =>
  createStyles({
    item: {
      display: 'flex',
    },
    songCard: {
      display: 'flex',
      marginBottom: theme.spacing(2),
      width: '100%',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 100,
    },
  })
);

interface SongListProps {
  songs: Song[];
}

const SongList: React.FC<SongListProps> = ({ songs }) => {
  const classes = useStyles();
  const history = useHistory();

  const onSongClick = (songId: string) => {
    history.push(`/play/${songId}`);
  };

  return (
    <Grid container spacing={2}>
      {songs.map((song, i) => (
        <Grid item xs={6} className={classes.item} key={i}>
          <Card className={classes.songCard} onClick={() => onSongClick(song.id)}>
            <CardMedia className={classes.cover} image={song.artworkUrl} title={song.title} />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {song.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {song.publisher}
                </Typography>
              </CardContent>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SongList;
