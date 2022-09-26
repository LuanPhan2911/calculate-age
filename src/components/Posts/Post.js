import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleGetPostService } from "../../services/postServices";
import Category from "./Category/Category";
import "./Post.scss";
import PaginatedItems from "../../containers/Paginate/Paginate";
import PaginatePost from "./PaginatePost";
const Post = (props) => {
  const [posts, setPosts] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [isFilterByCreatedAt, setFilterByCreatedAt] = useState(false);
  const fetchData = async () => {
    try {
      let res = await handleGetPostService();
      if (res && res.success) {
        setPosts(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterCategoryInPost = (posts) => {
    if (categoryId && categoryId.length > 0) {
      let postFilter = posts.filter((item) => {
        let { categories } = item;
        return checkCategory(categories);
      });
      return postFilter;
    }
    return posts;
  };
  const checkCategory = (categories) => {
    let filter = categories.filter((item) => {
      return categoryId.indexOf(item.id) !== -1;
    });
    return filter.length > 0;
  };
  const handleSearchByNamePost = (posts) => {
    if (searchByName && searchByName.length > 0) {
      let filter = posts.filter((item) => {
        return item.title.toLowerCase().includes(searchByName);
      });
      return filter;
    }
    return posts;
  };
  const handleFilterPost = (posts) => {
    console.log(1);
    let data = handleFilterCategoryInPost(posts);
    data = handleSearchByNamePost(data);
    data = handleFilterPostByCreatedAt(data);
    return data;
  };
  const handleFilterPostByCreatedAt = (posts) => {
    let filter = posts.sort((a, b) => {
      return checkSortTime(a.created_at, b.created_at);
    });
    return filter;
  };
  const checkSortTime = (a, b) => {
    let dateA = new Date(a);
    let dateB = new Date(b);
    if (isFilterByCreatedAt) {
      return dateB - dateA;
    }
    return dateA - dateB;
  };
  return (
    <div className="post-container">
      <div className="post-header">
        <h4>Post content</h4>
        <Link to={"/post/store"} className="btn btn-primary">
          Add Post
        </Link>
      </div>
      <div className="post-body">
        <div className="search-by-category">
          <Category setCategoryId={setCategoryId} />
          <div className="search-by-name">
            <label>Search by title</label>
            <input
              className="form-control"
              type={"search"}
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
        </div>
             { posts &&
              posts.length > 0 &&
              <PaginatedItems 
              itemsPerPage={10} 
              PaginateDisplay={PaginatePost}
              paginateData= {handleFilterPost(posts)}
              />
             }
  
      </div>
      <div className="post-footer"></div>
    </div>
  );
};
export default Post;
