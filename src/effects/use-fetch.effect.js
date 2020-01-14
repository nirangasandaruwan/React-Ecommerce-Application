import {useState,useEffect} from 'react';
import { async } from 'q';

const  useFetch = (url) => {

    const [data,setData] = useState(null);

    useEffect(() => {

        const fetchData = async() => {
            const response= await fetch(url);
            const dataArray = await response.json();
            setData(dataArray[0]);
        }

        fetchData();

    }); 


    return data;


    

};


export default useFetch;