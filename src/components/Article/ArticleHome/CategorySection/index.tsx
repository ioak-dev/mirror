import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';
import { LIST_ARTICLE_CATEGORIES } from '../../../Types/ArticleSchema';
import './style.scss';
import OakClickArea from '../../../../oakui/wc/OakClickArea';
import CategoryItem from './CategoryItem';
import CategoryItemEdit from './CategoryItemEdit';

interface Props {
  history: any;
  asset: string;
  handleClick: any;
}

const CategorySection = (props: Props) => {
  const [showNewCategory, setShowNewCategory] = useState(false);

  const { loading, error, data, fetchMore, refetch } = useQuery(
    LIST_ARTICLE_CATEGORIES,
    {
      variables: { asset: props.asset },
      fetchPolicy: 'cache-and-network',
    }
  );

  return (
    <div className="category-section">
      <h4
        className={`sidepane-section-title category-section__header ${typographyCompose(
          {
            variant: 'h4',
          }
        )}`}
      >
        <div className="category-section__header__container">
          <div>Categories</div>
          {!showNewCategory && (
            <div className="category-section__header__container__action">
              <OakClickArea handleClick={() => setShowNewCategory(true)}>
                <div className="category-section__header__container__action__icon">
                  <FontAwesomeIcon icon={faPlus} />
                </div>
              </OakClickArea>
            </div>
          )}
        </div>
      </h4>
      <div className="category-section__content">
        {showNewCategory && (
          <CategoryItemEdit
            asset={props.asset}
            handleClose={() => setShowNewCategory(false)}
          />
        )}
        <ul className="category-section__content__list">
          {data?.articleCategories?.map((item: any) => (
            <li className="category-section__content__list__item" key={item.id}>
              <CategoryItem
                item={item}
                history={props.history}
                asset={props.history}
                handleClick={props.handleClick}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySection;
