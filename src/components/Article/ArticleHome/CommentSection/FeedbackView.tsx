import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ArticleComment } from '../../../../types/graphql';
import {
  ADD_ARTICLE_COMMENT_FEEDBACK,
  REMOVE_ARTICLE_COMMENT_FEEDBACK,
} from '../../../Types/ArticleSchema';
import { sendMessage } from '../../../../events/MessageService';

interface Props {
  comment: ArticleComment;
}

const FeedbackView = (props: Props) => {
  const [
    addArticleCommentFeedback,
    { data: addedCommentFeedback },
  ] = useMutation(ADD_ARTICLE_COMMENT_FEEDBACK);
  const [
    removeArticleCommentFeedback,
    { data: removedCommentFeedback },
  ] = useMutation(REMOVE_ARTICLE_COMMENT_FEEDBACK);
  const [providedFeedbacks, setProvidedFeedbacks] = useState<any[]>([]);

  useEffect(() => {
    if (props.comment?.feedback) {
      setProvidedFeedbacks(
        props.comment.feedback.map((item: any) => item.type)
      );
    } else {
      setProvidedFeedbacks([]);
    }
  }, [props.comment.feedback]);

  const feedback = (type: any) => {
    if (providedFeedbacks.includes(type)) {
      removeArticleCommentFeedback({
        variables: {
          commentId: props.comment.id,
          type,
        },
      }).then(() => {
        sendMessage('notification', true, {
          type: 'success',
          message: 'You have withdrawn your feedback',
        });
      });
    } else {
      addArticleCommentFeedback({
        variables: {
          commentId: props.comment.id,
          type,
        },
      }).then(() => {
        sendMessage('notification', true, {
          type: 'success',
          message: 'Thank you for sharing your feedback',
        });
      });
    }
  };

  // useEffect(() => {
  //   if (props.comment?.feedback) {
  //     setProvidedFeedbacks(
  //       props.comment.feedback.map((item: any) => item.type)
  //     );
  //   } else {
  //     setProvidedFeedbacks([]);
  //   }
  // }, [props.comment.feedback]);

  return (
    <div className="action-footer position-left comment-feedback align-horizontal">
      <div className="align-horizontal">
        <i
          className={`material-icons helpful ${
            providedFeedbacks.includes('helpful') ? ' active' : ''
          }`}
          onClick={() => feedback('helpful')}
        >
          thumb_up
        </i>
        <div className="typography-5">{props.comment.helpful}</div>
      </div>
      <div className="align-horizontal">
        <i
          className={`material-icons not-helpful ${
            providedFeedbacks.includes('notHelpful') ? ' active' : ''
          }`}
          onClick={() => feedback('notHelpful')}
        >
          thumb_down
        </i>
        <div className="typography-5">{props.comment.notHelpful}</div>
      </div>
    </div>
  );
};

export default FeedbackView;
