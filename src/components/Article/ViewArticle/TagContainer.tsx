import React from 'react';
import Maybe from 'graphql/tsutils/Maybe';
import { ArticleTag } from '../../../types/graphql';
import TagItem from './TagItem';

interface Props {
  tags: Array<Maybe<ArticleTag>>;
  history: any;
  asset: string;
}

const TagContainer = (props: Props) => {
  return (
    <div className="tag-container">
      {props.tags.map((item: Maybe<ArticleTag>) => (
        <div key={item?.id}>
          {item && (
            <TagItem
              name={item.name || ''}
              history={props.history}
              asset={props.asset}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TagContainer;
