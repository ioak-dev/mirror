import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import './style.scss';
import CreateItem from './CreateItem';
import { ArticlePayload } from '../../../types/graphql';
import OakButton from '../../../oakui/wc/OakButton';

interface Props {
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

const CreateArticle = (props: Props) => {
  const [addArticle, { data: savedArticle }] = useMutation(ADD_ARTICLE);

  const [state, setState] = useState({
    title: [
      {
        type: 'HEADING',
        data: { level: 1, text: '' },
      },
    ],
    description: [],
    categoryId: null,
    tags: [],
    addTags: [],
    removeTags: [],
  });

  const handleChange = (_state: any) => {
    console.log(_state);
    setState({ ...state, ..._state });
  };

  const goBack = () => {
    props.history.goBack();
  };

  const submit = () => {
    const payload: ArticlePayload = {
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
      <CreateItem
        asset={props.asset}
        article={state}
        handleChange={handleChange}
      />
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

export default CreateArticle;
