import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './style.scss';
import ArticleItem from './ArticleItem';
import { GET_ARTICLE } from '../../Types/ArticleSchema';
import OakButton from '../../../oakui/OakButton';
import FeedbackView from './FeedbackView';
import OakSpinner from '../../../oakui/OakSpinner';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';
import CommentSection from '../ArticleHome/CommentSection';

interface Props {
  location: any;
  history: any;
  asset: string;
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
    <OakPage>
      <OakSection>
        {loading && <OakSpinner />}
        {!loading && !error && (
          <>
            <ArticleItem
              history={props.history}
              id={urlParam.id}
              asset={props.asset}
              article={data.article}
            />
            <FeedbackView article={data.article} />
          </>
        )}
        {error && <div className="typography-6">Article does not exist</div>}
      </OakSection>
      <OakSection>
        <div className="comment-section-wrapper">
          <CommentSection postId={urlParam.id} />
        </div>
      </OakSection>
    </OakPage>
  );
};

export default ViewArticle;
