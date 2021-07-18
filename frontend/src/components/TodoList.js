import React, { useState, useEffect } from "react";

function TodoList(props) {
  const [list, setList] = useState([]);
  const [get, setGet] = useState(false);
  const [item, setItem] = useState({
    id: "",
    title: "",
    status: "",
    id_folder: "",
  });

  const [edit, setEdit] = useState(false);
  const [itemEdit, setItemEdit] = useState({
    id: "",
    title: "",
    status: "",
    id_folder: "",
  });

  useEffect(() => {
    getItems();
  }, [get]);

  const getItems = async () => {

    console.log(props.list.length)
    if(props.list.length){
      setList(props.list);
      setGet(false);

    }else{
      const url = `http://localhost:5000/item`;

      const res = await fetch(url);
      const result = await res.json();
  
      setList(result);
      setGet(false);
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(item);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(item),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/item",
        requestOptions
      );
      console.log("Ok");
      setGet(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(itemEdit.title);
    const url = `http://localhost:5000/item/${itemEdit.id}`;


    const requestOptions = {
      method: "PUT",
      body: JSON.stringify(itemEdit),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    try {
      const response = await fetch(
        url,
        requestOptions
      );
      console.log("Ok");
      setGet(true);
      if(props.setGet)
        props.setGet(false)
      setEdit(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCheck = async (id, status) => {
    console.log(id)
    const url = `http://localhost:5000/item/${id}`;


    const data = status == 'completed' ? '': 'completed'
    const requestOptions = {
      method: "PUT",
      body: JSON.stringify({status: data}),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    try {
      const response = await fetch(
        url,
        requestOptions
      );
      console.log("Ok");
      setGet(true);
      setEdit(false);
    } catch (e) {
      console.log(e);
    }
  };


  const handleChange = (e) => {
    const value = e.target.value;
    setItem({
      title: value,
      status: "",
    });
  };

  const handleCancel = (e) => {
    console.log("Cancel");
    setEdit(false);
  };

  const handleChangeEdit = (e) => {
    const value = e.target.value;
    setItemEdit({
      ...itemEdit,
      title: value,
    });

    console.log(itemEdit);
  };

  const handleDelete = async (id) => {
    console.log(id);
    const url = `http://localhost:5000/item/${id}`;

    const requestOptions = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      console.log("Ok");
      setGet(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
          {console.log(props.setGet)}

      {edit ? (
        <>
          <div className="row">
            <div className="col-sm-12">
              <h2
                style={{
                  textAlign: "left",
                  marginBottom: "30px",
                }}
              >
                {`Editing Task "${itemEdit.title}"`}
              </h2>
            </div>
          </div>

          <div className="row">
            <div style={{ textAlign: "right" }} className="col-sm-12">
              <div className="row mt-5">
                <div className="col-sm-8 d-flex justify-content-start">
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="col-sm-12"
                    onChange={handleChangeEdit}
                    value={itemEdit.title}
                  />
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-sm-4 d-flex justify-content-start">
                  <div className="col-sm-6">
                    <button onClick={handleUpdate}>Save</button>
                  </div>
                  <div className="col-sm-6">
                    <button className="ml-5" onClick={handleCancel}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="col-sm-12">
              <h2
                style={{
                  textAlign: "left",
                  marginBottom: "30px",
                }}
              >
               {props.title? props.title: "To-Do List"}
              </h2>
            </div>
          </div>

          <div className="row">
            {list.map((item) => (
              <div
                key={item.id}
                style={{ textAlign: "left" }}
                className="col-sm-12"
              >
                <input
                  type="checkbox"
                  id={item.id}
                  name={item.id}
                  value={item.title}
                  checked={item.status == 'completed'?true:false}
                  onClick={() => handleCheck(item.id, item.status)}
                />
                <label
                  htmlFor={item.id}
                  style={{ marginLeft: "10px", minWidth: "250px" }}
                >
                  {item.title.length > 24
                    ? item.title.substring(1, 24) + "..."
                    : item.title}
                </label>{" "}
                <button
                  className="button col-sm-2"
                  onClick={() => {
                    setItemEdit({
                      id: item.id,
                      title: item.title,
                      status: item.status,
                      id_folder: item.id_folder,
                    });
                    setEdit(true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="button col-sm-2"
                  style={{ marginLeft: "-10px" }}
                >
                  Delete
                </button>
                <br></br>
              </div>
            ))}{" "}
          </div>

          <form className="row mt-5" onSubmit={handleSubmit}>
            <div className="col-sm-8 d-flex justify-content-start">
              <input
                type="text"
                id="title"
                name="title"
                className="col-sm-12"
                onChange={handleChange}
                value={item.title}
              />
            </div>
            <div className="col-sm-4 d-flex justify-content-start">
              <button type="submit">Add</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default TodoList;
