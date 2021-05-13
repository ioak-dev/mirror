import React, { useEffect, useState } from 'react';
import './style.scss';
import ListSection from './ListSection';

interface Props {
  match: any;
  location: any;
  history: any;
  asset: string;
  text: string;
  categoryId: string;
}

const ListArticle = (props: Props) => {
  return (
    <div className="browse-article">
      <ListSection
        asset={props.asset}
        history={props.history}
        text={props.text}
        categoryId={props.categoryId}
      />
    </div>
  );
};

export default ListArticle;
