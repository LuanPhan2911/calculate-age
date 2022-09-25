import { toast } from "react-toastify";
import moment from 'moment';
import { TIME_FORMAT } from "./constant";
export const checkPropertiesIsEmpty = (obj, except) => {
    if (except && except.length > 0) {
        for (let key in obj) {
            if (except.includes(key)) {
                continue;
            }
            if (obj[key] === null || obj[key] === "" || obj[key] === undefined) {
                return true;
            }

        }
    } else {
        for (let key in obj) {
            if (obj[key] === null || obj[key] === "" || obj[key] === undefined) {
                return true;
            }

        }
    }
    return false;
}
export const handleErrorApiResponse = (error) => {
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
export const getDataRequest=async(handleGetDataFn,handleSetData, dataQuery={})=>{
    try {
        let res = await handleGetDataFn(dataQuery);
        if(res && res.success){
            handleSetData(res.data);
        }
    } catch (error) {
        handleErrorApiResponse(error);
    }
}
export const formatTime =(date)=>{
    return moment(date).format(TIME_FORMAT.VI);
}