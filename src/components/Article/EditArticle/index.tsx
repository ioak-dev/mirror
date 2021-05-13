import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import './style.scss';
import { ArticlePayload } from '../../../types/graphql';
import OakButton from '../../../oakui/wc/OakButton';
import CreateItem from '../CreateArticle/CreateItem';
import { GET_ARTICLE } from '../../../components/Types/ArticleSchema';

interface Props {
  location: any;
  asset: string;
  article?: any;
  history: any;
  cookies: any;
}

const ADD_ARTICLE = gql`
  mutation AddArticle($payload: ArticlePayload!) {
    addArticle(payload: $payload) {
      id
    }
  }
`;

const queryString = require('query-string');

const EditArticle = (props: Props) => {
  const [state, setState] = useState<any>(null);
  const [addArticle, { data: savedArticle }] = useMutation(ADD_ARTICLE);
  const [urlParam, setUrlParam] = useState({
    id: '',
  });
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: { id: urlParam.id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.article) {
      const tags: string[] = [];
      data.article.tags?.forEach((tag: any) => {
        tags.push(tag.name);
      });
      setState({
        ...data.article,
        categoryId: data.article.category?.id,
        addTags: [],
        removeTags: [],
        tags,
      });
    }
  }, [data]);

  useEffect(() => {
    setUrlParam(queryString.parse(props.location.search));
  }, [props.location.search]);

  const handleChange = (_state: any) => {
    setState({ ...state, ..._state });
  };

  const goBack = () => {
    props.history.goBack();
  };

  const submit = () => {
    const payload: ArticlePayload = {
      id: state.id,
      title: state.title,
      categoryId: state.categoryId,
      description: state.description,
      addTags: state.addTags,
      removeTags: state.removeTags,
    };
    addArticle({
      variables: {
        payload,
      },
      // update: (cache, { data: { addArticle } }) => {
      //   const data: any = cache.readQuery({ query: LIST_ARTICLE_CATEGORIES });
      //   console.log('********');
      //   console.log(data);
      //   // data.items = [...data.items, addArticle];
      //   // cache.writeQuery({ query: GET_ITEMS }, data);
      // },
    }).then((response) => {
      props.history.goBack();
    });
  };

  return (
    <>
      {state && (
        <CreateItem
          asset={props.asset}
          article={state}
          handleChange={handleChange}
        />
      )}
      <div className="view-article__footer oak-bg-global">
        <div className="view-article__footer__left">Creating new article</div>
        <div className="view-article__footer__right">
          <OakButton
            shape="sharp"
            theme="default"
            variant="outline"
            handleClick={goBack}
          >
            Cancel
          </OakButton>
          <OakButton shape="sharp" theme="default" handleClick={submit}>
            Save
          </OakButton>
        </div>
      </div>
    </>
  );
};

export default EditArticle;
