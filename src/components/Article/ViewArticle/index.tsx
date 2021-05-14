import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import './style.scss';
import ArticleItem from './ArticleItem';
import { GET_ARTICLE } from '../../Types/ArticleSchema';
import FeedbackView from './FeedbackView';
import CommentSection from '../ArticleHome/CommentSection';
import ArticleMeta from '../ArticleMeta';

interface Props {
  location: any;
  history: any;
  asset: string;
  cookies: any;
}

const queryString = require('query-string');

const ViewArticle = (props: Props) => {
  const [urlParam, setUrlParam] = useState({
    id: '',
  });
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: urlParam.id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    setUrlParam(queryString.parse(props.location.search));
  }, [props.location.search]);

  return (
    <>
      <div className="view-article one-sided-page">
        <div className="view-article__container one-sided-page__container">
          {/* {loading && <OakSpinner />} */}
          {!loading && !error && (
            <>
              <ArticleItem
                history={props.history}
                id={urlParam.id}
                asset={props.asset}
                article={data.article}
              />
              {data.article.tags && data.article.tags.length > 0 && (
                <div className="view-article__container__tags">
                  <ArticleMeta article={data.article} show={['tags']} />
                </div>
              )}
              <FeedbackView article={data.article} />
            </>
          )}
          {error && <div>Article does not exist</div>}
          <div className="comment-section-wrapper">
            <CommentSection articleId={urlParam.id} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewArticle;
