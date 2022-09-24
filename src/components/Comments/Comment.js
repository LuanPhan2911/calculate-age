import { useState, useEffect } from "react";
import './Comment.scss';
import CommentForm from "./CommentForm";
const Comment = ({ comment, post_id }) => {
    let { replies, user } = comment;
    const [isReplying, setIsReplying] = useState(false);

    const handleReplyComment = (commentId) => {
        setIsReplying(true);
    }
    return (
        <>
            <div className="comment-container">
                <div className="comment-header">
                    <div className="user-comment">
                        <img
                            className="avatar"
                            src="https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black-thumbnail.png"
                            alt="USer"
                        />
                        <div className="user-name">
                            {
                                user && user.name
                            }
                        </div>
                    </div>
                </div>
                <div className="comment-body">
                    <div className="comment-content">
                        <div className="comment-message">
                            {comment.message}
                        </div>
                        <div className="comment-config">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleReplyComment(comment.id)}
                            >Reply</button>
                        </div>
                        {
                            isReplying && <CommentForm
                                post_id={post_id}
                                parent_id={comment.id}
                            />
                        }
                    </div>

                    <div className="comment-replies">
                        {

                            replies && replies.length > 0 &&
                            replies.map((item) => {
                                return (
                                    <Comment
                                        comment={item}
                                        key={item.id}
                                        post_id={post_id}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div className="comment-footer">
                </div>
            </div>

        </>
    )
}
export default Comment;