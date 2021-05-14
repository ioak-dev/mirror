import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { compose as linkCompose } from '@oakui/core-stage/style-composer/OakLinkComposer';
import { Article } from '../../../types/graphql';
import OakViewer from '../../../oakui/OakViewer';
import { DELETE_ARTICLE } from '../../Types/ArticleSchema';

import './ArticleItem.scss';
import ArticleMeta from '../ArticleMeta';
import { toHtml, toText } from '../../../oakui/OakEditor/OakEditorService';
import OakClickArea from '../../../oakui/wc/OakClickArea';

interface Props {
  id: string;
  history: any;
  article: Article;
  asset: string;
}

const ArticleItem = (props: Props) => {
  const [deleteArticle] = useMutation(DELETE_ARTICLE, {
    variables: { id: props.article.id },
  });
  const [confirmDelete, setConfirmDelete] = useState(false);

  const editArticle = () => {
    props.history.push(`/${props.asset}/article/edit?id=${props.id}`);
  };

  const goBack = () => {
    props.history.goBack();
  };

  const searchArticle = () => {
    props.history.push(`/${props.asset}/article/search`);
  };

  const deleteArticlePrompt = () => {
    setConfirmDelete(true);
  };

  const deleteArticledata = async () => {
    deleteArticle().then(() => {
      if (props.history.length > 2) {
        goBack();
      } else {
        searchArticle();
      }
    });
  };

  return (
    <>
      <div className="view-article-item">
        <OakViewer>{toHtml(props.article.title)}</OakViewer>
        <div className="view-article-item__meta">
          <ArticleMeta article={props.article} show={['date', 'views']} />
          <OakClickArea handleClick={editArticle}>
            <div
              className={linkCompose({
                baseClass: 'view-article-item__meta__edit',
                color: 'primary',
                underlineStyle: 'hover',
              })}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
              Edit
            </div>
          </OakClickArea>
        </div>
        <OakViewer>{toHtml(props.article.description)}</OakViewer>
      </div>
    </>
  );
};

export default ArticleItem;
