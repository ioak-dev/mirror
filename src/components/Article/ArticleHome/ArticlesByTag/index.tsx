import React from 'react';
import { useQuery } from '@apollo/client';
import './style.scss';
import { ARTICLES_BY_TAG } from '../../../Types/ArticleSchema';
import ArticleLink from '../../ArticleLink';
import { ArticleTag } from '../../../../types/graphql';
import OakInfiniteScroll from '../../../../oakui/wc/OakInfiniteScroll';
import OakButton from '../../../../oakui/wc/OakButton';

interface Props {
  tag: string;
  asset: string;
  history: any;
}

const ArticlesByTag = (props: Props) => {
  const { loading, error, data, fetchMore, refetch } = useQuery(
    ARTICLES_BY_TAG,
    {
      variables: { tag: props.tag, pageSize: 10, pageNo: 0 },
      fetchPolicy: 'cache-and-network',
    }
  );

  const fetchMoreArticles = () => {
    if (data?.articlesByTag?.hasMore) {
      fetchMore({
        variables: {
          pageNo: data?.articlesByTag?.pageNo,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          return {
            articlesByTag: {
              ...prev.articlesByTag,
              results: [
                ...prev.articlesByTag.results,
                ...fetchMoreResult.articlesByTag.results,
              ],
              pageNo: fetchMoreResult.articlesByTag.pageNo,
              hasMore: fetchMoreResult.articlesByTag.hasMore,
            },
          };
        },
      });
    }
  };
  const goBack = () => {
    props.history.goBack();
  };

  const viewByTags = () => {
    props.history.push(`/${props.asset}/article/tag`);
  };

  const getHeadingLinks = () => {
    return [
      {
        label: 'Go back',
        icon: 'reply',
        action: () => goBack(),
      },
      {
        label: 'See other tags',
        icon: 'local_offer',
        action: () => viewByTags(),
      },
    ];
  };

  return (
    <div className="tag-article-section">
      {/* <OakInfiniteScroll handleChange={fetchMoreArticles}> */}
      <div className="search-results-section">
        <div className="search-results-container">
          {data?.articlesByTag?.results?.map(
            (item: ArticleTag, index: number) => (
              <div key={item?.article?.id || index}>
                {item?.article && (
                  <ArticleLink
                    article={item.article}
                    asset={props.asset}
                    history={props.history}
                  />
                )}
              </div>
            )
          )}
        </div>
        {/* <div>{loading ? <OakSpinner /> : ''}</div> */}
      </div>
      {data?.articlesByTag?.hasMore && (
        <div className="tag-article-section__more">
          <OakButton
            handleClick={fetchMoreArticles}
            theme="default"
            size="medium"
            shape="sharp"
          >
            Load more
          </OakButton>
        </div>
      )}
      {/* </OakInfiniteScroll> */}
    </div>
  );
};

export default ArticlesByTag;
