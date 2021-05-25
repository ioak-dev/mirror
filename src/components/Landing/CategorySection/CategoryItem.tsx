import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  faChevronCircleRight,
  faChevronRight,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';
import { compose as linkCompose } from '@oakui/core-stage/style-composer/OakLinkComposer';

import './CategoryItem.scss';
import { GET_ARTICLES } from '../../Types/ArticleSchema';
import { toText, toHtml } from '../../../elements/core/EditorService';

interface Props {
  history: any;
  assetId: string;
  category: any;
  section: any;
}

const CategoryItem = (props: Props) => {
  const [state, setState] = useState<any[]>([]);
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_ARTICLES, {
    variables: {
      text: null,
      categoryId: props.category.id,
      pageSize: 10,
      pageNo: 0,
    },
    // fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.getArticles?.results) {
      console.log(data?.getArticles?.results);
      setState(data.getArticles.results);
    }
  }, [data]);

  return (
    <div
      className={`landing-category-item__root oak-bs-elevation4 ${
        props.section.rounded ? 'landing-category-item__root--rounded' : ''
      } landing-category-item__root--color-${props.section.color}`}
    >
      <div className="landing-category-item">
        <a
          href={`/#/${props.assetId}/article?categoryId=${props.category.id}`}
          className={typographyCompose({
            baseClass: linkCompose({
              baseClass: `landing-category-item__name two-liner landing-category-item__name--color-${props.section.color}`,
              underlineStyle: 'none',
            }),
            variant: 'h3',
          })}
        >
          {props.category.name}
        </a>
        <div className="landing-category-item__article">
          {state.slice(0, props.section.articleCount).map((item) => (
            <div className="landing-category-item__article__link__root">
              <FontAwesomeIcon icon={faChevronRight} />
              <a
                href={`/#/${props.assetId}/article/view?id=${item.id}`}
                className={typographyCompose({
                  baseClass: linkCompose({
                    baseClass: `landing-category-item__article__link two-liner landing-category-item__article__link--color-${props.section.color}`,
                    underlineStyle: 'none',
                  }),
                  variant: 'body1',
                })}
              >
                {toText(item.title)}
              </a>
            </div>
          ))}
        </div>
        {state.length > 3 && (
          <a
            href={`/#/${props.assetId}/article?categoryId=${props.category.id}`}
            className={typographyCompose({
              baseClass: linkCompose({
                baseClass: `landing-category-item__more landing-category-item__more--color-${props.section.color}`,
                underlineStyle: 'none',
              }),
              variant: 'subtitle1',
            })}
          >
            More...
          </a>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
