import React, { useEffect, useState } from 'react';
import { isEmptyOrSpaces } from '../../../components/Utils';
import ArticlesByTag from './ArticlesByTag';
import ListArticle from './ListArticle';
import './style.scss';

interface Props {
  match: any;
  location: any;
  history: any;
  asset: string;
  urlParam: any;
}

const ListView = (props: Props) => {
  return (
    <div className="article-list-view">
      {isEmptyOrSpaces(props.urlParam.tag) && (
        <ListArticle
          match={props.match}
          asset={props.asset}
          history={props.history}
          location={props.location}
          text={props.urlParam.text}
          categoryId={props.urlParam.categoryId}
        />
      )}
      {!isEmptyOrSpaces(props.urlParam.tag) && (
        <ArticlesByTag
          asset={props.asset}
          history={props.history}
          tag={props.urlParam.tag}
        />
      )}
    </div>
  );
};

export default ListView;
