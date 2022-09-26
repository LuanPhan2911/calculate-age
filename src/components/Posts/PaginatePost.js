
import { Link } from "react-router-dom";
import { formatTime } from "../../utils/helper";
// import "./PaginatePost.scss";
const PaginatePost = ({ paginateData }) => {
  return (
    <table className="table table-dark table-hover table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>
          Created at
        </th>
        <th>Show</th>
      </tr>
    </thead>
    <tbody>
      {
    paginateData &&
    paginateData.length > 0 &&
    paginateData.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{formatTime(item.created_at)}</td>
          <td>
            <Link to={`/post/${item.id}`} className={"btn btn-primary"}>
              Show
            </Link>
          </td>
        </tr>
      );
    })
  }
    </tbody>
    </table>
  );
};
export default PaginatePost;
