import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";

function FolderList(props) {
  const [folders, setFolders] = useState([]);
  const [get, setGet] = useState(false);
  const [folder, setFolder] = useState({
    id: "",
    title: "",
  });

  const [items, setItems] = useState([{
    id: "",
    title: "",
    status:"",
    id_folder: ""
  }]);

  const [edit, setEdit] = useState(false);

  const [viewItems, setViewItems] = useState(false);


  useEffect(() => {
    getFolders();
  }, [get]);

  const getFolders = async () => {
    const url = `http://localhost:5000/folder`;
    const url2 = `http://localhost:5000/item/folder/2`;


    try{
      const res = await fetch(url);
      const result = await res.json();

      const res2 = await fetch(url2);
      const result2 = await res2.json();
  
      setItems(result2);
      setFolders(result);
      setGet(false);

      console.log(result2)
    }catch(e){
      console.log(e)
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(folder);

    const requestOptions = {
      method: "POST",
      body: JSON.stringify(folder),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/folder",
        requestOptions
      );
      console.log("Ok");
      setGet(true);
    } catch (e) {
      console.log(e);
    }
  };

  /*const handleUpdate = async (e) => {
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
      setEdit(false);
    } catch (e) {
      console.log(e);
    }
  };*/


  const handleChange = (e) => {
    const value = e.target.value;
    setFolder({
      title: value,
    });
  };

  const handleCancel = (e) => {
    /*console.log("Cancel");
    setEdit(false);*/
  };

  const handleChangeEdit = (e) => {
    /*const value = e.target.value;
    setItemEdit({
      ...itemEdit,
      title: value,
    });

    console.log(itemEdit);*/
  };

  const handleRemove = async (id) => {
    console.log(id);
    const url = `http://localhost:5000/folder/${id}`;

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
      {true ? (
        <>
          <div className="row">
            <div className="col-sm-12">
                <TodoList list={items} />
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
                {`Folders`}
              </h2>
            </div>
          </div>

          <div className="row">
            {folders.map((folder) => (
              <div
                key={folder.id}
                style={{ textAlign: "left" }}
                className="col-sm-12"
              >
                <label
                  style={{ marginLeft: "10px", minWidth: "250px" }}
                >
                  - {folder.title.length > 24
                    ? folder.title.substring(1, 24) + "..."
                    : folder.title}
                </label>{" "}
                <button
                  className="button col-sm-3"
                >
                  View Items
                </button>
                <button
                  onClick={() => handleRemove(folder.id)}
                  className="button col-sm-2"
                  style={{ marginLeft: "-10px" }}
                >
                  Remove
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
                value={folder.title}
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

export default FolderList;
