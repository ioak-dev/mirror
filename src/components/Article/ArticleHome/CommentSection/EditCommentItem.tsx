import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import {
  ArticleComment,
  ArticleCommentPayload,
} from '../../../../types/graphql';
import OakEditor from '../../../../oakui/OakEditor';
import { UPDATE_ARTICLE_COMMENT } from '../../../Types/ArticleSchema';
import { isEmptyOrSpaces, isEmptyAttributes } from '../../../Utils';
import OakButton from '../../../../oakui/wc/OakButton';

interface Props {
  articleId: string;
  comment: ArticleComment;
  closeEdit: Function;
}
const EditCommentItem = (props: Props) => {
  const [updateComment] = useMutation(UPDATE_ARTICLE_COMMENT);
  const [state, setState] = useState<any>({ comment: '' });
  const [formErrors, setFormErrors] = useState<any>({
    comment: '',
  });

  useEffect(() => {
    setState({ comment: props.comment?.text });
  }, [props.comment]);

  const handleChange = (detail: any) => {
    setState({
      ...state,
      [detail.name]: detail.value,
    });
  };

  const submit = () => {
    const errorFields: any = { comment: '' };
    if (isEmptyOrSpaces(state.comment)) {
      errorFields.comment = 'Add comment to reply';
    }
    setFormErrors(errorFields);
    if (isEmptyAttributes(errorFields)) {
      const payload: ArticleCommentPayload = {
        id: props.comment.id,
        parentId: props.comment.parentId,
        articleId: props.articleId,
        text: state.comment,
      };
      updateComment({
        variables: {
          payload,
        },
      }).then((response) => {
        if (response.data.updateArticleComment.id) {
          props.closeEdit();
        }
      });
    }
  };

  return (
    <>
      {/* <OakEditor
        data={state}
        errorData={formErrors}
        id="comment"
        handleChange={(e: any) => handleChange(e)}
      /> */}
      <div className="action-footer position-right">
        <OakButton
          handleClick={props.closeEdit}
          theme="default"
          variant="appear"
        >
          <i className="material-icons">close</i>Cancel
        </OakButton>
        <OakButton handleClick={submit} theme="primary" variant="appear">
          <i className="material-icons">double_arrow</i>Save
        </OakButton>
      </div>
    </>
  );
};

export default EditCommentItem;
