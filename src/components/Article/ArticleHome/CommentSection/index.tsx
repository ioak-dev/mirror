import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { compose as sectionCompose } from '@oakui/core-stage/style-composer/OakSectionComposer';
import NewCommentItem from './NewCommentItem';
import CommentList from './CommentList';
import { ARTICLE_COMMENTS } from '../../../Types/ArticleSchema';
import './style.scss';
import OakButton from '../../../../oakui/wc/OakButton';
import OakSection from '../../../../oakui/wc/OakSection';

interface Props {
  articleId: string;
}

const CommentSection = (props: Props) => {
  const { loading, data, fetchMore } = useQuery(ARTICLE_COMMENTS, {
    variables: {
      articleId: props.articleId,
    },
    fetchPolicy: 'network-only',
  });
  const [newComment, setNewComment] = useState(false);
  const [viewComments, setViewComments] = useState(true);

  const getSectionLinks = () => {
    return [
      {
        label: 'New comment',
        icon: 'add_comment',
        action: () => setNewComment(!newComment),
      },
      {
        label: viewComments ? 'Hide' : 'Show',
        icon: viewComments ? 'expand_less' : 'expand_more',
        action: () => setViewComments(!viewComments),
      },
    ];
  };

  return (
    <div className="comment-section">
      <div
        className={sectionCompose({
          baseClass: 'comment-section__header__container',
          paddingHorizontal: 2,
          paddingVertical: 5,
          marginVertical: 4,
        })}
      >
        Comments
      </div>
      {!newComment && (
        <div className="comment-section__new">
          <OakButton
            shape="sharp"
            theme="default"
            handleClick={() => setNewComment(true)}
          >
            New Comment
          </OakButton>
        </div>
      )}

      {newComment && (
        <NewCommentItem
          articleId={props.articleId}
          closeEdit={() => setNewComment(false)}
        />
      )}
      <div className={viewComments ? 'comment-list show' : 'comment-list hide'}>
        <CommentList articleId={props.articleId} />
      </div>
    </div>
  );
};

export default CommentSection;
