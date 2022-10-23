import { useState , useEffect} from "react";

const useFetch= (handleSetDataService, dataQuery={})=>{
        const [data, setData]= useState('');
        const [isLoading, setLoading]= useState(false);
        const [error, setError]= useState('');
        useEffect(() => {
             async function handleFetchData(){
               
                    try {
                        setLoading(true);
                        let res = await handleSetDataService(dataQuery);
                        if(res && res.data){
                            setData(res.data);
                            setLoading(false);
                        }
                    } catch (error) {
                        setError(error);
                    } finally{
                        setLoading(false);
                    }
                
            }
             handleFetchData();
        }, []);
        return {data, isLoading, error};
       
        
   
}

export default useFetch;