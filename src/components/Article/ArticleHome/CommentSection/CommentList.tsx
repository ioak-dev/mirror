import React from 'react';
import { useQuery } from '@apollo/client';
import OakInfiniteScroll from '../../../../oakui/OakInfiniteScroll';
import { ARTICLE_COMMENTS } from '../../../Types/ArticleSchema';
import OakSpinner from '../../../../oakui/OakSpinner';
import { ArticleComment } from '../../../../types/graphql';
import ViewComment from './ViewComment';
import { USERS } from '../../../Types/schema';

interface Props {
  articleId: string;
}

const CommentList = (props: Props) => {
  const { loading, data, fetchMore } = useQuery(ARTICLE_COMMENTS, {
    variables: {
      articleId: props.articleId,
      pageSize: 10,
      pageNo: 0,
    },
    fetchPolicy: 'cache-and-network',
  });
  const { loading: usersLoading, data: usersData } = useQuery(USERS);

  const fetchMoreComments = () => {
    if (data?.articleComments?.hasMore) {
      fetchMore({
        variables: {
          pageNo: data?.articleComments?.pageNo,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          return {
            articleComments: {
              ...prev.articleComments,
              results: [
                ...prev.articleComments.results,
                ...fetchMoreResult.articleComments.results,
              ],
              pageNo: fetchMoreResult.articleComments.pageNo,
              hasMore: fetchMoreResult.articleComments.hasMore,
            },
          };
        },
      });
    }
  };

  return (
    <OakInfiniteScroll handleChange={fetchMoreComments} selector=".oak-page">
      <div className="comment-list">
        {data?.articleComments?.results?.map((item: ArticleComment) => (
          <ViewComment
            articleId={props.articleId}
            comment={item}
            comments={data.articleComments?.results}
            users={usersData?.users}
            key={item.id}
          />
        ))}

        {data?.articleComments?.results?.length === 0 && (
          <div className="typography-6">No comments</div>
        )}
      </div>
      {/* <div>{loading ? <OakSpinner /> : ''}</div> */}
    </OakInfiniteScroll>
  );
};

export default CommentList;
