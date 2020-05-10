import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core';
import { Leaderboard, GameArena, SaveForm, SongsProvider } from '../game';

const useStyles = makeStyles((theme) =>
  createStyles({
    app: {
      maxWidth: 768,
      margin: `${theme.spacing(6)}px auto`,
    },
  })
);

function App() {
  const classes = useStyles();

  return (
    <SongsProvider>
      <Router>
        <div className={classes.app}>
          <Switch>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/play/:songId">
              <GameArena />
            </Route>
            <Route path="/save">
              <SaveForm />
            </Route>
            <Route path="/">
              <Redirect to="/leaderboard" />
            </Route>
          </Switch>
        </div>
      </Router>
    </SongsProvider>
  );
}

export default App;
