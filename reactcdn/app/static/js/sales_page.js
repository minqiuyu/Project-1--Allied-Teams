'use strict';
const e = React.createElement;

function App() {
  const [list, setList] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [pages, setPages] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [showModal, setShowModal] = React.useState(false);
  const [modalDescription, setModalDescription] = React.useState("");
  const [itemId, setItemId] = React.useState(null);
  const [error, setError] = React.useState("");
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const success = (data) => {
    setList(data.data);
    setCount(data.count);
    const newPages = [];
    if (data.count > 10) {
      for (let i=0; i<Math.ceil(data.count / 10); i++) {
        newPages.push({
          name: (i+1).toString(),
          page: i,
        });
        console.log("page",i);
      }
      if (page > newPages.length-1) {
        setPage(page-1);
      }
    } else {
      setPage(0);
    }
    setPages(newPages);
  };

  const logout = async (e)=>{
    await localStorage.setItem("salesToken",null);
    window.location = "/login";
  };

  const getData = ()=>{
    get_orders_api(page, success, (text)=>{console.log("Error: ", text)});
  };

  const newOrder = ()=>{
    setModalDescription("New listing");
    setItemId(null);
    setName("");
    setDesc("");
    setError("");
    setShowModal(true);
    const nameInput = document.getElementById("nameInput");
    setTimeout(()=>{nameInput && nameInput.focus()}, 1);
    const descInput = document.getElementById("descInput");
    setTimeout(()=>{descInput && descInput.focus()}, 1);
  };

  const editOrder = (data)=>{
    setModalDescription("New order");
    setItemId(data.id);
    setName(data.name);
    setDesc(data.desc);
    setError("");
    setShowModal(true);
    const nameInput = document.getElementById("nameInput");
    setTimeout(()=>{nameInput && nameInput.focus()}, 1);
    const descInput = document.getElementById("descInput");
    setTimeout(()=>{descInput && descInput.focus()}, 1);
  };

  const saveOrder = (e)=>{
    e.preventDefault();
    setError("");
    console.log("saving new", name, desc);
    if (name.desc === "" || name.name === "")
      setError("Please enter a valid entry into the name and description fields.");
    else {
      if (itemId === null)
        post_order_api({name, desc}, ()=>{getData();});
      else
        put_order_api(itemId, {name, desc}, ()=>{getData();});
      setShowModal(false);
    }
  };

  const deleteOrder = (orderId)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        delete_order_api(orderId, ()=>{
          Swal.fire({
              title: 'Deleted!',
              text: "Your order has been deleted!",
              icon: 'success',
              timer: 1000,
          });
          getData();
        });
      }
    });
  };

  const keyDownHandler = (e)=>{
    if (e.which === 27)
      setShowModal(false);
  };

  React.useEffect(()=>{
    getData();
  }, [page]);

  return (
    <div onKeyDown={keyDownHandler}>
      <div style={{background: "#00000060"}}
          className={"modal " + (showModal?" show d-block":" d-none")} tabIndex="-1" role="dialog">
        <div className="modal-dialog shadow">
          <form method="post">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalDescription}</h5>
              <button type="button" className="btn-close" onClick={()=>{setShowModal(false)}} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label>Listing name</label>
                <div className="form-group">
                  <input type="text" className="form-control" name="name" id="nameInput"
                         value={name} onChange={(e)=>{setName(e.target.value)}}
                         placeholder="Listing name"/>
                </div>
              <label style={{marginTop: "1em"}}>Description</label>
              <div className="form-group">
                  <input type="text" className="form-control" name="desc" id="descInput"
                         value={desc} onChange={(e)=>{setDesc(e.target.value)}}
                         placeholder="Description"/>
                </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={()=>{setShowModal(false)}} data-bs-dismiss="modal">Close</button>
              <button type="submit" className="btn btn-primary" onClick={saveOrder}>Save changes</button>
            </div>
          </div>
          </form>
        </div>
      </div>

      <div style={{maxWidth: "800px", margin: "auto", marginTop: "1em", marginBottom: "1em",
                    padding: "1em"}} className="shadow">
        <div style={{display: "flex", flexDirection: "row"}}>
          <span>Super Jobs App!</span>
          <a className="btn btn-light" style={{marginLeft: "auto"}} onClick={logout}>Logout</a>
        </div>
      </div>
      <div style={{maxWidth: "800px", margin: "auto", marginTop: "1em", marginBottom: "1em",
                    padding: "1em"}} className="shadow">
        <div style={{display: "flex", flexDirection: "row", marginBottom: "5px"}}>
          {pages.length > 0 && <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
            <ul className="pagination">
              <li className={"page-item " + (page === 0?"disabled":"")} onClick={(e)=>{
                    e.preventDefault();
                    setPage(Math.max(page-1,0));
              }}><a className="page-link" href="#" aria-label="Previous"><span
                  aria-hidden="true">«</span></a></li>
              {pages.map((el)=><li key={"page" + el.page} onClick={(e)=>{
                  setPage(el.page);
                }} className={"page-item "+(page===el.page?"active":"")}>
                <a className="page-link" href="#">
                  {el.name}
                </a></li>)}
              <li className={"page-item " + (page === pages.length-1?"disabled":"")} onClick={(e)=>{
                    setPage(Math.min(page+1,pages.length-1));
              }}><a className="page-link" href="#" aria-label="Next"><span
                  aria-hidden="true">»</span></a></li>
            </ul>
          </nav>}
          <a className="btn btn-light" style={{marginLeft: "auto"}}
             onClick={newOrder}
          >New Job Listing</a>
        </div>
        <table className="table table-hover caption-top">
          <thead className="table-light">
          <tr>
            
            <th>Date</th>
            <th>Listing</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          { list.map((row)=>
            <tr key={row.id}>
              
              <td>{row.date}</td>
              <td>{row.name}</td>
              <td>{row.desc}</td>
              <td>
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={(e)=>{editOrder(row)}}>Edit</a>{" "}
                <a className="btn btn-light" style={{marginLeft: "auto"}}
                  onClick={(e)=>{deleteOrder(row.id)}}>Delete</a>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const domContainer = document.querySelector('#reactAppContainer');
ReactDOM.render(
  e(App),
  domContainer
);
