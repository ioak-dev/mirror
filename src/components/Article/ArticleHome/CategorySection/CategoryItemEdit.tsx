import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEdit,
  faPencilAlt,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';
import {
  LIST_ARTICLE_CATEGORIES,
  UPDATE_ARTICLE_CATEGORY,
} from '../../../Types/ArticleSchema';
import './CategoryItemEdit.scss';
import OakClickArea from '../../../../oakui/wc/OakClickArea';
import OakInput from '../../../../oakui/wc/OakInput';
import CategoryItem from './CategoryItem';

interface Props {
  asset: string;
  item?: any;
  handleClose: any;
}

const CategoryItemEdit = (props: Props) => {
  const [addArticleCategory] = useMutation(UPDATE_ARTICLE_CATEGORY);

  const [state, setState] = useState({
    name: '',
    id: null,
  });

  useEffect(() => {
    if (props.item) {
      setState({ ...props.item });
    }
  }, [props.item]);

  const handleChange = (detail: any) => {
    setState({
      ...state,
      [detail.name]: detail.value,
    });
  };

  const save = () => {
    addArticleCategory({
      variables: {
        payload: {
          id: state.id,
          name: state.name,
        },
      },
      update: (cache: any, { data: { addArticleCategory } }: any) => {
        const data: any = cache.readQuery({ query: LIST_ARTICLE_CATEGORIES });
        let _data = [...data.articleCategories];
        const index = _data.findIndex(
          (item) => item.id === addArticleCategory.id
        );
        if (index >= 0) {
          _data[index] = addArticleCategory;
        } else {
          _data = [..._data, addArticleCategory];
        }
        cache.writeQuery({
          query: LIST_ARTICLE_CATEGORIES,
          data: {
            articleCategories: _data,
          },
        });
        props.handleClose();
      },
    });
  };

  return (
    <div className="category-item-edit">
      <div className="category-item-edit__form">
        <OakInput
          name="name"
          value={state.name}
          shape="sharp"
          handleInput={handleChange}
        />
        <div className="category-item-edit__form__action__container">
          <OakClickArea handleClick={save}>
            <div className="category-item-edit__form__action">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </OakClickArea>
          <OakClickArea handleClick={props.handleClose}>
            <div className="category-item-edit__form__action">
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </OakClickArea>
        </div>
      </div>
    </div>
  );
};

export default CategoryItemEdit;
