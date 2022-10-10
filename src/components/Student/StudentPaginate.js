import { Link } from "react-router-dom";
import { formatTime } from "../../utils/helper";
// import "./PaginatePost.scss";
const StudentPaginate = ({ paginateData }) => {
  return (
    <table className="table table-dark table-hover table-striped">
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Birth Date</th>
        <th>Grade</th>
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
          <td>{`${item.last_name} ${item.first_name}`}</td>
          <td>{item.email}</td>
          <td>{item.phone_number}</td>
          <td>{item.birth_date}</td>
          <td>{item.grade.name}</td>
        
        </tr>
      );
    })
  }
    </tbody>
    </table>
  );
};
export default StudentPaginate;
