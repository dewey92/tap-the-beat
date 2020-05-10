import React, { useState, createContext, useCallback, useContext } from 'react';
import { Song } from './gameModels';

type SongsMap = Record<string, Song>;
type Ctx = { songs: SongsMap; cacheSongs: (songs: Song[]) => void };

export const SongsContext = createContext<Ctx | null>(null);

export const useCacheSongs = () => {
  const inCache = useContext(SongsContext);
  if (inCache === null) {
    throw new Error('Please make sure `useCacheSongs` is called inside `SongsProvider`');
  }

  return inCache;
};

/**
 * Caches fetched songs for easy searching. Acts as a "redux" replacement
 */
export const SongsProvider: React.FC = ({ children }) => {
  const [cachedSongs, setCachedSongs] = useState<SongsMap>({});

  const cacheSongs = useCallback(
    (songs: Song[]) => {
      // Don't recache the songs, as it only supports 4 songs for now
      if (Object.keys(cachedSongs).length > 0) return;

      const songsMap = songs.reduce<SongsMap>((acc, curr) => {
        return { ...acc, [curr.id]: curr };
      }, {});
      setCachedSongs(songsMap);
    },
    [cachedSongs]
  );

  return (
    <SongsContext.Provider value={{ songs: cachedSongs, cacheSongs }}>
      {children}
    </SongsContext.Provider>
  );
};
