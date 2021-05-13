import React from 'react';
import './ArticleMeta.scss';
import { Article } from '../../types/graphql';
import { formatDateText } from '../Lib/DateUtils';
import TagContainer from '../ui/tag/TagContainer';

interface Props {
  article: Article;
  show: string[];
}

const ArticleMeta = (props: Props) => {
  return (
    <div className="article-meta">
      {props.show.includes('date') && props.article?.createdAt && (
        <div className="article-meta__date">
          {formatDateText(props.article?.createdAt)}
        </div>
      )}
      {props.show.includes('tags') && props.article.tags && (
        <TagContainer tags={props.article.tags || []} />
      )}
      {props.show.includes('views') && props.article?.views > 0 && (
        <div className="article-meta__view">
          {`${props.article?.views} ${
            props.article?.views === 1 ? 'view' : 'views'
          }`}
        </div>
      )}
      {props.show.includes('feedback') && props.article?.helpful > 0 && (
        <div className="article-meta__helpful">
          {props.article?.helpful}
          <i className="material-icons">thumb_up</i>
        </div>
      )}
      {props.show.includes('feedback') && props.article?.notHelpful > 0 && (
        <div className="article-meta__not-helpful">
          {props.article?.notHelpful}
          <i className="material-icons">thumb_down</i>
        </div>
      )}
    </div>
  );
};

export default ArticleMeta;
