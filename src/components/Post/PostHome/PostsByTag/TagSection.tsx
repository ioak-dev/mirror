import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import './style.scss';
import { POST_TAG_CLOUD } from '../../../Types/PostSchema';
import TagLink from './TagLink';
import OakHeading from '../../../../oakui/OakHeading';

interface Props {
  handleChange: Function;
  history: any;
  asset: string;
}

const TagSection = (props: Props) => {
  const { data } = useQuery(POST_TAG_CLOUD, {
    fetchPolicy: 'cache-and-network',
  });

  const searchPost = () => {
    props.history.push(`/${props.asset}/post/search`);
  };

  return (
    <div className="app-content">
      <div className="app-text">
        <OakHeading
          title="Posts by tag"
          links={[{ label: 'Or Search instead', action: () => searchPost() }]}
        />
        <div className="tag-section">
          {data?.postTagCloud?.map(item => (
            <TagLink
              key={item.name}
              tag={item}
              handleClick={() => props.handleChange(item.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagSection;
