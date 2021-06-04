import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { RichTextControlType, RichTextEditor } from 'elements';
import { UPDATE_ARTICLE_COMMENT } from '../../../Types/ArticleSchema';
import { isEmptyOrSpaces, isEmptyAttributes } from '../../../Utils';
import { ArticleCommentPayload } from '../../../../types/graphql';
import OakButton from '../../../../oakui/wc/OakButton';

import './NewCommentItem.scss';

interface Props {
  articleId: string;
  parentid?: string;
  closeEdit: any;
}

const NewCommentItem = (props: Props) => {
  const [createComment] = useMutation(UPDATE_ARTICLE_COMMENT);
  const [state, setState] = useState({ comment: '' });

  const handleChange = (value: any) => {
    setState({
      ...state,
      comment: value,
    });
  };

  const submit = () => {
    const payload: ArticleCommentPayload = {
      parentId: props.parentid,
      articleId: props.articleId,
      text: state.comment,
    };
    createComment({
      variables: {
        payload,
      },
    }).then((response) => {
      if (response.data.updateArticleComment.id) {
        props.closeEdit();
      }
    });
  };

  return (
    <div className="new-comment-item">
      <div className="new-comment-item__action">
        <OakButton
          handleClick={props.closeEdit}
          theme="default"
          variant="outline"
          shape="sharp"
        >
          Cancel
        </OakButton>
        <OakButton handleClick={submit} theme="default" shape="sharp">
          Save
        </OakButton>
      </div>
      <div className="new-comment-item__editor">
        <RichTextEditor
          value={state.comment}
          handleChange={handleChange}
          controls={[
            RichTextControlType.BOLD,
            RichTextControlType.ITALIC,
            RichTextControlType.UNDERLINE,
            RichTextControlType.BULLET_LIST,
            RichTextControlType.ORDERED_LIST,
          ]}
        />
      </div>
    </div>
  );
};

export default NewCommentItem;
