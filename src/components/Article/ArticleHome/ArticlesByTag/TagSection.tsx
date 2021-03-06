import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import './style.scss';
import { ARTICLE_TAG_CLOUD } from '../../../Types/ArticleSchema';
import TagLink from './TagLink';
import OakHeading from '../../../../oakui/OakHeading';
import OakSection from '../../../../oakui/OakSection';

interface Props {
  handleChange: Function;
  history: any;
  asset: string;
}

const TagSection = (props: Props) => {
  const { data } = useQuery(ARTICLE_TAG_CLOUD, {
    fetchPolicy: 'cache-and-network',
  });

  const searchArticle = () => {
    props.history.push(`/${props.asset}/article/search`);
  };

  return (
    <OakSection>
      <OakHeading
        title="Articles by tag"
        links={[{ label: 'Or Search instead', action: () => searchArticle() }]}
      />
      <div className="tag-section">
        {data?.articleTagCloud?.map(item => (
          <TagLink
            key={item.name}
            tag={item}
            handleClick={() => props.handleChange(item.name)}
          />
        ))}
      </div>
    </OakSection>
  );
};

export default TagSection;
