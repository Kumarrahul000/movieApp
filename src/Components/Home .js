

import ReactPaginate from "react-paginate";
import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);
  const [load,setLoad] = useState(false)

  const [search, setsearch] = useState("")
  const [pageCount, setpageCount] = useState(0);

  let limit = 16;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://localhost:3001/posts?_page=1&_limit=${limit}`

       
      );
      const data = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / limit));
  
      setItems(data);
      setLoad(true)
      console.log(data)
    };

    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://localhost:3001/posts?_page=${currentPage}&_limit=${limit}`
    
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
   
  };

  if(!load){
  return <div>loading...</div>
}else {
  
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-7"></div>
        <div className="col-md-4 " width="100%">
          <input width="100%" type="text" onChange={e=>setsearch(e.target.value)} placeholder="search" className="form-control" />
        </div>
      </div>
      <div className="row m-2">


        
        {items.filter((items)=>{
if(search===""){
  return items
}else if (items.name.toLowerCase().includes(search.toLowerCase()))
{
  return items
}
        })
          
          .map((item) => {
          return (
            <div className="col-md-3 sm-12 lg-3 xs-12 my-3" key={item.id}>
            <div className="card" style={{width: "100%"}}>
  <img src={item.medium} className="card-img-top" alt="imagesitam"  width="100%" height="300px"/>
  <div className="card-body">
    <h6 className="card-title">{item.name.slice(0,20)}</h6>
    <li className="card-text">{item.premiered}</li>
    <li className="card-text" style={{marginLeft:"50px"}}>{item.type}</li>
    <br />
    <Link  className="clr" to={`/details/${item.id}` } >details</Link>
  </div>
</div>
</div>
          );
        })}

        
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={10}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
      }
}

export default Home;