import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import OakSection from '../../../oakui/wc/OakSection';
import { isEmptyOrSpaces } from '../../../components/Utils';
import './InfoSection.scss';
import { LIST_ARTICLE_CATEGORIES } from '../../../components/Types/ArticleSchema';

interface Props {
  urlParam: any;
  asset: string;
}

const InfoSection = (props: Props) => {
  const [message, setMessage] = useState('');
  const { loading, error, data, fetchMore, refetch } = useQuery(
    LIST_ARTICLE_CATEGORIES,
    {
      variables: { asset: props.asset },
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    if (!isEmptyOrSpaces(props.urlParam.text)) {
      setMessage(`Showing Articles matching "${props.urlParam.text}"`);
    } else if (!isEmptyOrSpaces(props.urlParam.tag)) {
      setMessage(`Showing Articles for tag "${props.urlParam.tag}"`);
    } else if (
      !isEmptyOrSpaces(props.urlParam.categoryId) &&
      data?.listArticleCategories
    ) {
      setMessage(
        `Showing Articles for category "${
          data?.listArticleCategories.find(
            (item: any) => item.id === props.urlParam.categoryId
          )?.name
        }"`
      );
    } else {
      setMessage('Showing all Articles');
    }
  }, [props.urlParam, data]);

  return (
    <>
      <div className="info-section">
        <OakSection paddingHorizontal={2} paddingVertical={5}>
          <div className="info-section__container">
            <div className="info-section__container__message">{message}</div>
          </div>
        </OakSection>
      </div>
    </>
  );
};

export default InfoSection;
