import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleAddPostService } from "../../services/postServices";
import { checkPropertiesIsEmpty, handleErrorApiResponse } from "../../utils/helper";
import Category from "./Category/Category";
import './PostForm.scss';
const PostForm = (props) => {
    const user_id = useSelector(state => state.user.id);
    const [categoryId, setCategoryId]= useState([]);
    const initPost = {
        title: '',
        body: '',
        user_id: user_id,
    }
    
    const navigate = useNavigate();
    const [post, setPost] = useState(initPost);
    const handleAddPost = async () => {
        let isEmpty = checkPropertiesIsEmpty(post);
        if (!isEmpty && categoryId.length>0) {
            try {
                let res = await handleAddPostService({
                    ...post,
                    category_id:categoryId,
                });
                if (res && res.success) {
                    toast.success('Add post success!')
                    navigate('/post');
                }
            } catch (error) {
                handleErrorApiResponse(error);
            }
        } else {
            toast.error('Missing parameter!')
        }
    }
    return (
        <div className="post-form-container">
            <div className="post-form-header">
                Create Post
            </div>
            <div className="post-form-body">
                <Category
                setCategoryId ={setCategoryId}
                />
                <div className="form-group">
                    <label>Title</label>
                    <input
                        className="form-control"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}

                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        value={post.body}
                        onChange={(e) => setPost({ ...post, body: e.target.value })}
                        rows={'10'}

                    />
                </div>
            </div>
            <div className="post-form-footer">
                <button
                    className="btn btn-warning"
                    onClick={() => handleAddPost()}
                >Add Post</button>
            </div>
        </div>
    )
}
export default PostForm;