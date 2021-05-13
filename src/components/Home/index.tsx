import React from 'react';
import './style.scss';
import ListAssets from './ListAssets';
import GettingStarted from './GettingStarted';

interface Props {
  history: any;
}

const Home = (props: Props) => {
  return (
    <div className="home">
      <ListAssets history={props.history} />
      <hr />
      <GettingStarted history={props.history} />
    </div>
  );
};

export default Home;
