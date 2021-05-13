import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './CategoryItem.scss';
import OakClickArea from '../../../../oakui/wc/OakClickArea';
import CategoryItemEdit from './CategoryItemEdit';

interface Props {
  history: any;
  asset: string;
  item: any;
  handleClick: any;
}

const CategoryItem = (props: Props) => {
  const [showEditCategory, setShowEditCategory] = useState(false);

  const handleCategoryClick = () => {
    props.handleClick(props.item?.id);
  };

  return (
    <>
      {showEditCategory && (
        <CategoryItemEdit
          asset={props.asset}
          handleClose={() => setShowEditCategory(false)}
          item={props.item}
        />
      )}
      {!showEditCategory && (
        <div className="category-item">
          <div className="category-item__left">
            <OakClickArea handleClick={handleCategoryClick}>
              <div className="category-item__left__name">{props.item.name}</div>
            </OakClickArea>
            <OakClickArea handleClick={() => setShowEditCategory(true)}>
              <div className="category-item__left__edit">
                <FontAwesomeIcon icon={faPencilAlt} />
              </div>
            </OakClickArea>
          </div>
          <div>
            <OakClickArea handleClick={handleCategoryClick}>
              <div className="category-item__count">{props.item.articles}</div>
            </OakClickArea>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryItem;
