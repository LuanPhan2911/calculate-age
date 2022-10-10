import { useState, useEffect } from "react";
import Filter from "../../containers/Filter/Filter";
import PaginatedItems from "../../containers/Paginate/Paginate";
import { handleGetStudentService } from "../../services/studentServices";
import { getDataRequest } from "../../utils/helper";
import './Student.scss';
import StudentPaginate from "./StudentPaginate";
const Student = (props) => {
    const [students, setStudents]= useState([]);
    const [dataFilter, setDataFilter]= useState([]);
    useEffect(()=>{
        try {
            getDataRequest(handleGetStudentService, setStudents);
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <div className="student-container">
            <div className="student-header">

            </div>
            <div className="student-body">
                {
                    students && students.length>0
                    &&
                    <Filter 
                    data={students}
                    setData={setDataFilter}
                    filterField={
                        [
                            'first_name',
                            'last_name',
                            'id',
                            'email',
                            'grade.name'
                        ]
                    }
                    />
                }
              
                {
                    dataFilter && dataFilter.length>0
                    && <PaginatedItems 
                    itemsPerPage={10}
                    PaginateDisplay= {StudentPaginate}
                    paginateData={dataFilter}
                    />
                }
               
            </div>
            <div className="student-footer">

            </div>
        </div>
    )
}
export default Student;