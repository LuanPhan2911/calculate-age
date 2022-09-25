import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import './CommentList.scss';
const CommentList = ({
    post_id,
    handleGetCommentService,
    handleAddCommentService,
    handleAddReplyCommentService,
}) => {
    const [commentList, setCommentList] = useState([]);
    const fetchData = async () => {
        try {
            let res = await handleGetCommentService({
                post_id: post_id,
            });
            if (res && res.success) {
                setCommentList(res.data);
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
    useEffect(() => {
        fetchData();
    }, [post_id]);
    return (
        <div className="comment-list-container">
            <div className="comment-list-header">
                <h3>Comment</h3>
            </div>
            <div className="comment-list-body">
                <CommentForm
                    post_id={post_id}
                    handleAddCommentService={handleAddCommentService}
                    handleAddReplyCommentService={handleAddReplyCommentService}
                    //not do that fetch all data
                    fetchData={fetchData}
                />
                {
                    commentList && commentList.length > 0
                    && commentList.map((item) => {
                        return (<Comment
                            comment={item}
                            key={item.id}
                            post_id={post_id}
                            handleAddCommentService={handleAddCommentService}
                            handleAddReplyCommentService={handleAddReplyCommentService}

                            fetchData={fetchData}
                        />)
                    })
                }

            </div>
            <div className="comment-list-footer">

            </div>
        </div>
    )
}
export default CommentList;