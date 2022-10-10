import { useState, useEffect } from "react";
import { handleFilterField, unsigned } from "../../utils/helper";
const Filter = ({setData, data, filterField}) => {
    const [query, setQuery]=useState("");
    useEffect(()=>{
        handleFilterData();
    },[query]);
    const handleFilterData =()=>{
       
       if(query && query.length>0){
            let filter = data.filter((item)=>{
                return (
                    handleFilterField(item, filterField, query)
                );
            })
            setData(filter)
       }else{
        setData(data);
       }
     
    }
    return (
      <div className="filter-container">
           <div className=" form-group">
                <label>Search</label>
                <input 
                className="form-control"
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                />
           </div>
      </div>
    )
}
export default Filter;