import React from 'react';
import './style.scss';
import { NavLink } from 'react-router-dom';
import OakSubMenu from '../Ux/OakSubMenu';
import OakButton from '../Ux/OakButton';

interface Props {
}

interface State {
  data: any
}
export default class Landing extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        "abcd", "pqrs", "lorem ip-sum dipsum lipsum"
      ]
    }
  }
  render() {
    return (
      <div className="landing">
        <div className="space-bottom-4">
          <h3>Mirror rorriM</h3>
          <p><em><b>Queen</b></em> Magic Mirror on the wall, who now is the fairest one of all?</p>
          <p><em><b>Magic Mirror</b></em> Over the seven jewelled hills, beyond the seventh fall, in the cottage of the seven dwarfs, dwells Snow White, fairest one of all.</p>
          <p><em><b>Queen</b></em> Snow White lies dead in the forest.  The huntsman has brought me proof. [holds up her opened box] Behold, her heart.</p>
          <p><em><b>Magic Mirror</b></em> Snow White still lives, the fairest in the land. 'Tis the heart of a pig you hold in your hand.</p>
          <p><em><b>Queen</b></em> [repulsed] The heart of a pig?! Then I've been tricked!</p>
        </div>
        <div className="action">
          <NavLink to="/tenant" className="navitem" activeClassName="active"><OakButton theme="primary" variant="animate out">Create Tenant</OakButton></NavLink>
        </div>
        {/* <OakSubMenu data = {this.state.data} variant="secondary"/>
        <div>
          <OakButton align="left" theme="primary" variant="animate out" icon="open_in_new" action="">animate out</OakButton>
          <OakButton align="right" theme="default" variant="animate in" icon="open_in_new" action="">animate in</OakButton>
          <OakButton align="right" theme="secondary" variant="animate none" icon="open_in_new" action="">animate none</OakButton>
          <OakButton align="right" theme="secondary" variant="block" icon="open_in_new" action="">block</OakButton>
          <OakButton align="right" theme="secondary" variant="outline" icon="open_in_new" action="">outline</OakButton>
          <OakButton align="right" theme="secondary" variant="block" icon="open_in_new" action=""></OakButton>
        </div> */}
      </div>
    );
  }
}