import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './style.scss';
import PostItem from './PostItem';
import { GET_POST } from '../../Types/PostSchema';
import OakButton from '../../../oakui/OakButton';
import FeedbackView from './FeedbackView';
import OakSpinner from '../../../oakui/OakSpinner';
import CommentSection from './CommentSection';

interface Props {
  location: any;
  history: any;
  asset: string;
}

const queryString = require('query-string');

const ViewPost = (props: Props) => {
  const [urlParam, setUrlParam] = useState({
    id: '',
  });
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: urlParam.id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    setUrlParam(queryString.parse(props.location.search));
  }, [props.location.search]);

  return (
    <>
      <div className="app-page">
        <div className="app-content">
          <div className="app-text">
            {loading && <OakSpinner />}
            {!loading && !error && (
              <>
                <PostItem
                  history={props.history}
                  id={urlParam.id}
                  asset={props.asset}
                  post={data.post}
                />
                <FeedbackView post={data.post} />
              </>
            )}
            {error && <div className="typography-6">Post does not exist</div>}
          </div>
        </div>

        <div className="app-content comment-section-wrapper">
          <div className="app-text">
            <CommentSection postId={urlParam.id} />
          </div>
        </div>
      </div>
      {/* <div className="app-page">
      </div> */}
    </>
  );
};

export default ViewPost;
