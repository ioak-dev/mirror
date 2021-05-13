import React, { useEffect, useState } from 'react';
import { isEmptyOrSpaces } from '../../../components/Utils';
import TagSection from './ArticlesByTag/TagSection';
import './style.scss';
import ListView from './ListView';
import SearchSection from './SearchSection';
import Divider from '../../ui/display/Divider';
import InfoSection from './InfoSection';
import CategorySection from './CategorySection';

interface Props {
  match: any;
  location: any;
  history: any;
  asset: string;
  cookies: any;
}

const queryString = require('query-string');

const ArticleHome = (props: Props) => {
  const [urlParam, setUrlParam] = useState({
    text: '',
    tag: '',
    categoryId: '',
  });

  useEffect(() => {
    setUrlParam(queryString.parse(props.location.search));
  }, [props.location.search]);

  const handleTagChange = (tag: any) => {
    updateRoute({ ...urlParam, tag: tag.name, text: '', categoryId: '' });
  };

  const handleCategoryChange = (categoryId: any) => {
    updateRoute({ ...urlParam, tag: '', text: '', categoryId });
  };

  const search = (text: string) => {
    updateRoute({ ...urlParam, text, tag: '', categoryId: '' });
  };

  const updateRoute = (routeParams: {
    tag: string;
    text: string;
    categoryId: string;
  }) => {
    let newRoute = `/${props.asset}/article`;
    if (!isEmptyOrSpaces(routeParams.text)) {
      newRoute += `?text=${routeParams.text}`;
    } else if (!isEmptyOrSpaces(routeParams.tag)) {
      newRoute += `?tag=${routeParams.tag}`;
    } else if (!isEmptyOrSpaces(routeParams.categoryId)) {
      newRoute += `?categoryId=${routeParams.categoryId}`;
    }
    props.history.push(newRoute);
  };

  return (
    <>
      <div className="two-sided-page article-home">
        <div className="article-home__left">
          <InfoSection urlParam={urlParam} asset={props.asset} />
          <ListView
            asset={props.asset}
            history={props.history}
            location={props.location}
            match={props.match}
            urlParam={urlParam}
          />
        </div>
        <div className="two-sided-page__right article-home__right">
          <SearchSection handleSubmit={search} />
          <Divider />
          <TagSection
            asset={props.asset}
            history={props.history}
            handleClick={handleTagChange}
          />
          <Divider />
          <CategorySection
            asset={props.asset}
            history={props.history}
            handleClick={handleCategoryChange}
          />
        </div>
      </div>
    </>
  );
};

export default ArticleHome;
