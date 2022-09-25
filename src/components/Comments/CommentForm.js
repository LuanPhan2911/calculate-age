import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import './CommentForm.scss';
const CommentForm = ({
    post_id,
    parent_id,
    handleAddPostCommentService,
    handleAddPostReplyCommentService,

    setIsReplying,
    fetchData,
}) => {

    let user_id = useSelector((state) => state.user.id);
    const initComment = {
        message: '',
        user_id: user_id,
        parent_id: parent_id,
        post_id: post_id,
    };
    const [comment, setComment] = useState({
        ...initComment,
    });
    useEffect(() => {
        setComment({
            ...initComment,
            post_id: post_id,
            user_id: user_id,
            parent_id: parent_id
        })
    }, []);
    const handleAddComment = async () => {
        let { message, user_id, post_id, parent_id } = comment;
        if (!message) {
            toast.error('Missing comment message!');
            return;
        }
        try {
            if (!parent_id) {
                let res = await handleAddPostCommentService({
                    message,
                    user_id,
                    post_id,
                });
                if (res && res.success) {
                    setComment({
                        ...initComment
                    });
                    toast.success('Add comment success!');
                    fetchData();
                }
            } else {
                let res = await handleAddPostReplyCommentService({
                    message,
                    user_id,
                    post_id,
                    parent_id,
                });
                if (res && res.success) {
                    setComment({
                        ...initComment
                    });
                    toast.success('Add comment success!');
                    setIsReplying(false);

                    fetchData();

                }
            }

        } catch (error) {
            let { status, data } = error.response;
            if (status === 400) {
                let { errors } = data;
                for (const key in errors) {
                    if (Object.hasOwnProperty.call(errors, key)) {
                        errors[key].forEach((item) => {
                            toast.error(item);
                        })

                    }
                }
            }
        }



    }

    return (
        <div div className="comment-form-container" >
            <div className="comment-form-header">
            </div>
            <div className="comment-form-body">
                <div className="form-group">
                    <label>Your comment</label>
                    <textarea
                        className="form-control"
                        value={comment.message}
                        onChange={(e) => setComment({ ...comment, message: e.target.value })}
                    />
                </div>
            </div>
            <div className="comment-form-footer">
                <button
                    className="btn btn-primary"
                    onClick={() => handleAddComment()}
                >Save comment</button>
            </div>
        </div>
    )

}
export default CommentForm;