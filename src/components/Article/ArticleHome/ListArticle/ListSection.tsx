import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import './style.scss';
import { Article } from '../../../../types/graphql';
import OakInfiniteScroll from '../../../../oakui/OakInfiniteScroll';
import ArticleLink from '../../ArticleLink';
import {
  GET_ARTICLES,
  LIST_ARTICLE_CATEGORIES,
  SEARCH_ARTICLES,
} from '../../../Types/ArticleSchema';

interface Props {
  asset: string;
  history: any;
  text: string;
  categoryId: string;
}

const ListSection = (props: Props) => {
  const { loading, error, data, fetchMore, refetch } = useQuery(GET_ARTICLES, {
    variables: {
      text: props.text,
      categoryId: props.categoryId,
      pageSize: 10,
      pageNo: 0,
    },
    // fetchPolicy: 'cache-and-network',
  });

  const handleSubmit = () => {
    refetch();
  };

  const fetchMoreArticles = () => {
    if (data?.getArticles?.hasMore) {
      fetchMore({
        variables: {
          pageNo: data?.getArticles?.pageNo,
        },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          return {
            getArticles: {
              ...prev.getArticles,
              results: [
                ...prev.getArticles.results,
                ...fetchMoreResult.getArticles.results,
              ],
              pageNo: fetchMoreResult.getArticles.pageNo,
              hasMore: fetchMoreResult.getArticles.hasMore,
            },
          };
        },
      });
    }
  };

  return (
    <div className="list-section">
      {/* <OakInfiniteScroll handleChange={fetchMoreArticles} selector=".oak-page"> */}
      <div className="search-results-section">
        <div className="search-results-container">
          {data?.getArticles?.results?.map((item: Article) => (
            <ArticleLink
              key={item.id}
              article={item}
              asset={props.asset}
              history={props.history}
            />
          ))}
        </div>
        {/* <div>{loading ? <OakSpinner /> : ''}</div> */}
      </div>
      {/* </OakInfiniteScroll> */}
    </div>
  );
};

export default ListSection;
