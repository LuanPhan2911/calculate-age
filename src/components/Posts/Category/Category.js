import { useState, useEffect } from "react";
import { handleGetCategoryService } from "../../../services/categoryService";
import { getDataRequest } from "../../../utils/helper";
import './Category.scss';
import Select from 'react-select';
const Category = ({setCategoryId}) => {
    const [categories, setCategories]=useState([]);
    const [selectedCategory, setSelectedCategory]= useState([]);
    const [options, setOptions]=useState([]);
    useEffect(()=>{
       getDataRequest(handleGetCategoryService, setCategories);
    }, []);
    
    const handleChangeSelectOption =(selectedOption)=>{
        if(selectedOption.length>0){
            let arr =[];
            selectedOption.map((item)=>{
                let id = item.value;
                arr.push(id);
                return item;
            });
            setCategoryId(arr);
        }else{
            setCategoryId([]);
        }
    }
    useEffect(()=>{
        if(categories&& categories.length>0){
            let arr =[];
            categories.map((item)=>{
                let obj ={};
                obj.label= item.name;
                obj.value= item.id;
                arr.push(obj);
                return item;
            })
            setOptions(arr);
        }
    }, [categories])
    return (
        <div className="category-container">
            <div className="category-header">
                Select category
            </div>
            <div className="category-body">
                <Select
                options={options}
                isMulti={true}
                onChange={handleChangeSelectOption}
                
                />
            </div>
            <div className="category-footer">

            </div>
        </div>
    )
}
export default Category;