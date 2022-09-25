import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { handleGetPostService, handleShowPostService } from "../../services/postServices";
import './PostDetail.scss';
import { FaUserAlt } from 'react-icons/fa';
import CommentList from "../Comments/CommentList";
import { handleGetPostCommentService } from "../../services/commentServices";
import { handleAddPostCommentService, handleAddPostReplyCommentService } from "../../services/commentServices";
const PostDetail = (props) => {
    const params = useParams();
    const [postDetail, setPostDetail] = useState({});
    const [authorPost, setAuthorPost] = useState({});
    let { post_id } = params;
    const fetchData = async (post_id) => {
        try {
            let res = await handleShowPostService({
                post_id: post_id
            });
            if (res && res.success) {
                setPostDetail(res.data);
                setAuthorPost(res.data.user);
            }


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData(post_id);
    }, [post_id]);
    return (
        <div className="post-detail-container">
            <div className="post-detail-header">
                <Link to={'/post'} className={'btn btn-primary'}>Back</Link>
                <h4>Post show</h4>
            </div>
            <div className="post-detail-body">
                <div className="post-detail-title">
                    {postDetail.title}
                </div>
                <div className="detail-author-post">
                    <div className="user-info">
                        <div className="user-name">
                            {authorPost.name}
                        </div>
                        <div className="user-email">
                            {authorPost.email}
                        </div>
                    </div>
                    <div className="created-at">
                        {postDetail.created_at}
                    </div>

                </div>
                <div className="post-detail-content">
                    {postDetail.body}
                </div>
            </div>
            <div className="post-detail-footer">
                <CommentList
                    post_id={post_id}
                    handleGetPostCommentService={handleGetPostCommentService}
                    handleAddPostCommentService={handleAddPostCommentService}
                    handleAddPostReplyCommentService={handleAddPostReplyCommentService}
                />
            </div>
        </div>
    )
}
export default PostDetail;