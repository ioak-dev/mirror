import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';

import './style.scss';
import CategoryItem from './CategoryItem';
import { LIST_ARTICLE_CATEGORIES } from '../../Types/ArticleSchema';

interface Props {
  history: any;
  section: any;
  cookies: any;
  assetId: string;
}

const CategorySection = (props: Props) => {
  const [state, setState] = useState<any[]>([]);

  const { loading, error, data, fetchMore, refetch } = useQuery(
    LIST_ARTICLE_CATEGORIES,
    {
      variables: { asset: props.assetId },
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    if (data?.articleCategories) {
      setState(data.articleCategories);
    }
  }, [data]);

  return (
    <div className="landing-category-section">
      {props.section.heading && (
        <h2
          className={`landing-category-section__title landing-category-section__title--size-${props.section.fontSize}`}
        >
          {props.section.heading}
        </h2>
      )}
      <div className="landing-category-section__container">
        {state.slice(0, props.section.categoryCount).map((item) => (
          <CategoryItem
            assetId={props.assetId}
            history={props.history}
            category={item}
            section={props.section}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
