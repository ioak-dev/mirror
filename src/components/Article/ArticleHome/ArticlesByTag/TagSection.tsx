import React from 'react';
import { useQuery } from '@apollo/client';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';
import './TagSection.scss';
import { ARTICLE_TAG_CLOUD } from '../../../Types/ArticleSchema';
import Tag from '../../../ui/tag/Tag';

interface Props {
  history: any;
  asset: string;
  handleClick: any;
}

const TagSection = (props: Props) => {
  const { data } = useQuery(ARTICLE_TAG_CLOUD, {
    fetchPolicy: 'cache-and-network',
  });

  return (
    <>
      <h4
        className={`sidepane-section-title ${typographyCompose({
          variant: 'h4',
        })}`}
      >
        Labels
      </h4>
      <div className="tag-section">
        {data?.articleTagCloud?.map((item: any) => (
          <Tag
            key={item.name}
            tag={item.name}
            handleClick={() => props.handleClick(item)}
          />
        ))}
      </div>
    </>
  );
};

export default TagSection;
