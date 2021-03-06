import React, { useEffect, useState } from 'react';
import './style.scss';
import TagSection from './TagSection';
import ArticleSection from './ArticleSection';
import OakPage from '../../../../oakui/OakPage';

interface Props {
  setProfile: Function;
  profile: any;
  match: any;
  location: any;
  history: any;
  asset: string;
}

const queryString = require('query-string');

const ArticlesByTag = (props: Props) => {
  const [urlParam, setUrlParam] = useState({
    name: '',
  });

  useEffect(() => {
    setUrlParam(queryString.parse(props.location.search));
  }, [props.location.search]);

  const handleChange = name => {
    props.history.push(`/${props.asset}/article/tag?name=${name}`);
  };

  return (
    <OakPage>
      {/* <div className="typography-4 align-horizontal">
            Find your questions answered, from the knowledge base. If you
            don&apos;t get your desired answers, you can post your question for
            response from our customer support team or a community member
          </div> */}
      {!urlParam.name && (
        <TagSection
          handleChange={handleChange}
          asset={props.asset}
          history={props.history}
        />
      )}
      {urlParam.name && (
        <ArticleSection
          tag={urlParam.name}
          asset={props.asset}
          history={props.history}
        />
      )}
    </OakPage>
  );
};

export default ArticlesByTag;
