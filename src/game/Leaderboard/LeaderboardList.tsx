import React from 'react';
import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useFetchRemoteData } from '../../shared';
import { getLeaderboard } from '../gameApis';
import { useCacheSongs } from '../SongsProvider';

const LeaderboardItem: React.FC = () => {
  const { status } = useFetchRemoteData('/leaderboard', getLeaderboard);
  const { songs } = useCacheSongs();

  if (status.type === 'NotAsked') return null;
  if (status.type === 'Loading')
    return (
      <Box display="flex" justifyContent="center" marginTop={4}>
        <CircularProgress />
      </Box>
    );
  if (status.type === 'Failure') return <Alert severity="error">{status.error}</Alert>;

  return (
    <List>
      {status.value
        .sort((a, b) => b.score - a.score)
        .map((record, i) => (
          <React.Fragment key={i}>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={record.name} src="broken-image.jpg" />
              </ListItemAvatar>
              <ListItemText>
                <Box display="flex" justifyContent="space-between">
                  <div>
                    <Typography variant={'body1'} component="span" display="block">
                      {record.name}
                    </Typography>
                    <Typography variant="body2" color="primary" display="block">
                      {songs[record.songId]?.title} | {songs[record.songId]?.bpm} BPM
                    </Typography>
                  </div>
                  <Box color="secondary.main" padding={1} border="1px solid #eee">
                    <Typography variant={'h6'} component="span" display="block">
                      <strong>{record.score}</strong>
                    </Typography>
                  </Box>
                </Box>
              </ListItemText>
            </ListItem>
            <Divider variant="inset" />
          </React.Fragment>
        ))}
    </List>
  );
};

export default LeaderboardItem;
