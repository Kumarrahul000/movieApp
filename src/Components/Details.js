import React,{useEffect,useState} from 'react';
import{useParams} from "react-router-dom";

import { Link } from 'react-router-dom';

function Details() {
    const [state, setstate] = useState([])
    const {id} = useParams();
    console.log(id)

  
    useEffect(() => {
        fetch(`http://localhost:3001/posts/${id}`)
        .then(response => response.json())
        .then(data =>   setstate(data))
      
    
          
       }, []);
  


    return (
        <div>
        {
            <div className="container my-5">
            <div className="row">
                <div className="col-md-6 sm-12 lg-3">
                    <img src ={state.medium }alt ="imageitem" width="100%" height="450px"></img>
                    </div>
                    <div className="col-md-6 sm-12 lg-3">
                    <h3 style={{color:"orange " ,font:"bold"}}>{state.name}</h3>
                    <p className="justify-content-center">{state.summary}</p>
            <a href= {state.officialSite} className="watch"> <i class="fa fa-play-circle"></i>Watch Trailor</a>
                    </div>

                </div>
            </div>
        }
        </div>

       
    )
}

export default Details
