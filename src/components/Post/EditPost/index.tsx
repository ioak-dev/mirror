import React, { useEffect, useState } from 'react';
import './style.scss';
import { useQuery } from '@apollo/react-hooks';
import EditItem from './EditItem';
import OakSpinner from '../../../oakui/OakSpinner';
import { GET_POST } from '../../Types/PostSchema';
import OakPage from '../../../oakui/OakPage';
import OakSection from '../../../oakui/OakSection';

interface Props {
  asset: string;
  location: any;
  history?: any;
}

const queryString = require('query-string');

const EditPost = (props: Props) => {
  const [urlParam, setUrlParam] = useState({
    id: '',
  });

  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: urlParam.id },
  });

  useEffect(() => {
    setUrlParam(queryString.parse(props.location.search));
  }, [props.location.search]);

  return (
    <OakPage>
      <OakSection>
        {!loading && !error && (
          <EditItem
            history={props.history}
            id={urlParam.id}
            asset={props.asset}
            post={data.post}
          />
        )}
        {loading && <OakSpinner />}
      </OakSection>
    </OakPage>
  );
};

export default EditPost;
