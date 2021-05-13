import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { compose as linkCompose } from '@oakui/core-stage/style-composer/OakLinkComposer';
import { compose as typographyCompose } from '@oakui/core-stage/style-composer/OakTypographyComposer';
import './ArticleLink.scss';
import { Article } from '../../types/graphql';
import { formatDateText } from '../Lib/DateUtils';
import { htmlToText } from '../Utils';
import ArticleMeta from './ArticleMeta';
import { toHtml, toText } from '../../oakui/OakEditor/OakEditorService';

interface Props {
  article: Article;
  history: any;
  asset: string;
}

const ArticleLink = (props: Props) => {
  return (
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
      <h2 className="article-link__title">
        <a
          href={`/#/${props.asset}/article/view?id=${props.article.id}`}
          className={typographyCompose({
            baseClass: linkCompose({
              baseClass: 'article-link__title__a',
              color: 'primary',
              underline: 'none',
              block: false,
            }),
            variant: 'h2',
          })}
        >
          {toText(props.article?.title)}
        </a>
      </h2>

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
        {toText(props.article.description)}
      </p>

      <div className="article-link__more">
        <a
          href={`/#/${props.asset}/article/view?id=${props.article.id}`}
          className={`${linkCompose({
            color: 'primary',
            underline: 'none',
            block: false,
          })} ${typographyCompose({
            variant: 'body2',
            color: 'inherit',
          })} article-link__more__a`}
        >
          Read More <FontAwesomeIcon icon={faLongArrowAltRight} />
        </a>
      </div>
    </div>
  );
};

export default ArticleLink;
