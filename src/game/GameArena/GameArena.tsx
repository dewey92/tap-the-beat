import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useFetchRemoteData } from '../../shared';
import { getChord } from '../gameApis';
import Visualizer from './Visualizer';
import { useParams } from 'react-router';

const GameArena: React.FC = () => {
  const { songId } = useParams<{ songId: string }>();
  const { status } = useFetchRemoteData('/song', () => getChord(songId));

  if (status.type === 'NotAsked') return null;
  if (status.type === 'Loading') return <CircularProgress />;
  if (status.type === 'Failure') return null;

  return (
    <div>
      <Visualizer song={status.value} />
    </div>
  );
};

export default GameArena;
