import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { compose as linkCompose } from '@oakui/core-stage/style-composer/OakLinkComposer';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';
import { BlockService } from 'elements';
import './ArticleLink.scss';
import { Article } from '../../types/graphql';
import { formatDateText } from '../Lib/DateUtils';
import { htmlToText } from '../Utils';
import ArticleMeta from './ArticleMeta';

interface Props {
  article: Article;
  history: any;
  asset: string;
}

const ArticleLink = (props: Props) => {
  const [imageUrl, setImageUrl] = useState<any>(null);

  useEffect(() => {
    setImageUrl(BlockService.getFirstImage(props.article.description));
  }, [props.article]);

  return (
    <div className="article-link__root">
      {imageUrl && (
        <div className="article-link__image">
          <img
            src={imageUrl.data.raw.urls.regular}
            alt={imageUrl.data.raw.alt_description}
          />
        </div>
      )}
      <div className="article-link">
        {props.article.category && (
          <div
            className={typographyCompose({
              baseClass: 'article-link__category',
              variant: 'subtitle1',
              color: 'secondary',
              transform: 'uppercase',
            })}
          >
            {props.article.category.name}
          </div>
        )}
        <h3 className="article-link__title">
          <a
            href={`/#/${props.asset}/article/view?id=${props.article.id}`}
            className={typographyCompose({
              baseClass: linkCompose({
                baseClass: 'article-link__title__a',
                color: 'primary',
                underlineStyle: 'none',
              }),
              variant: 'h3',
            })}
          >
            {BlockService.toText(props.article?.title)}
          </a>
        </h3>

        <div>
          <ArticleMeta
            article={props.article}
            show={['date', 'views', 'feedback']}
          />
        </div>

        <p
          className={`article-link__description five-liner ${typographyCompose({
            variant: 'body2',
            color: 'inherit',
          })}`}
        >
          {BlockService.toText(props.article.description)}
        </p>

        <div className="article-link__more">
          <a
            href={`/#/${props.asset}/article/view?id=${props.article.id}`}
            className={`${linkCompose({
              color: 'primary',
              underlineStyle: 'none',
            })} ${typographyCompose({
              variant: 'body2',
              color: 'inherit',
            })} article-link__more__a`}
          >
            Read More <FontAwesomeIcon icon={faLongArrowAltRight} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleLink;
