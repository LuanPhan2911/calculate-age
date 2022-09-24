import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleGetPostService } from "../../services/postServices";
import './Post.scss';
const Post = (props) => {
    const [posts, setPosts] = useState([]);
    const fetchData = async () => {
        try {
            let res = await handleGetPostService();
            if (res && res.success) {
                setPosts(res.data);
            }
        } catch (error) {

        }

    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className="post-container">
            <div className="post-header">
                <h4>Post content</h4>
            </div>
            <div className="post-body">
                <table className="table table-dark table-hover table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Created at</th>
                            <th>Show</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts && posts.length > 0 &&
                            posts.map((item, index) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.title}</td>
                                        <td>{item.created_at}</td>
                                        <td>
                                            <Link
                                                to={`/post/${item.id}`}
                                                className={'btn btn-primary'}
                                            >Show</Link>
                                        </td>
                                    </tr>

                                )
                            })
                        }
                    </tbody>
                </table>

            </div>
            <div className="post-footer">

            </div>
        </div>
    )
}
export default Post;