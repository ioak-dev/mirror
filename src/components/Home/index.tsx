import React from 'react';
import {
  BlockService,
  HeadingEditor,
  RichTextControlType,
  RichTextEditor,
} from 'elements';

import './style.scss';
import ListAssets from './ListAssets';
import GettingStarted from './GettingStarted';

interface Props {
  history: any;
}

const Home = (props: Props) => {
  return (
    <div className="home">
      <HeadingEditor
        value={{ data: { text: 'test two', level: 1 } }}
        placeholder="abcd"
        handleChange={() => {
          BlockService.toHtml([]);
        }}
      />
      <RichTextEditor
        value="test two"
        handleChange={() => {}}
        controls={[RichTextControlType.BOLD]}
      />
      <ListAssets history={props.history} />
      <hr />
      <GettingStarted history={props.history} />
    </div>
  );
};

export default Home;
