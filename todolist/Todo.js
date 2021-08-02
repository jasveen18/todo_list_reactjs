import React, {useState, useEffect} from 'react';
import './style.css';

// get local storage data back
const getLocalStorage = () => {
    const lists = localStorage.getItem('todolist');
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
};

const Todo = () => {
    const [data, setData] = useState("");
    const [item, setItem] = useState(getLocalStorage());
    const [editItem, setEditItem] = useState("");
    const [toggle, setToggle] = useState(false);

    // add item function 
    const addItem = ()=>{
        if(!data){
            alert("please add item");
        }
        else if(data && toggle){
            setItem(item.map((curElem)=>{
                if(curElem.id === editItem){
                    return {...curElem, name: data};
                }
                return curElem;
            })
          );

          setData("");
          setEditItem(null);
          setToggle(false);
        }
        else{
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: data,
            }
            setItem([...item, myNewInputData]);
            setData("");
        }
    };
    
    // edit the items
    const edit = (index) =>{
        const item_edit = item.find((curElem)=>{
            return curElem.id === index;
        });
        setData(item_edit.name);
        setEditItem(index);
        setToggle(true);
    };
    
    // delete item
    const deleteItem= (index)=>{
        const updateItem = item.filter((curElem)=>{
            return curElem.id !== index;
        });
        setItem(updateItem);
    };
    
    // remove all items
    const removeAll = ()=> {
        setItem([]);
    };
    
    // add local storage
    useEffect(()=>{
        localStorage.setItem('todolist', JSON.stringify(item));
    }, [item]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <h2>Add Your List Here ✌</h2>
                    <div className="addItems">
                        <input type="text" placeholder="✍ Add Items" className="form-control" 
                            value={data} onChange={(event) => setData(event.target.value)}
                        />
                        {toggle ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>

                       {/* show item */}
                    <div className="showItems">
                        {item.map((curElem)=>{
                            return (
                            <div className="eachItem" key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={()=>edit(curElem.id)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={()=> deleteItem(curElem.id)}></i>
                                </div>
                            </div>
                          );
                        })}
                    </div>

                       {/* remove all */}
                    <div className="showitems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}>
                            <span>Check List</span>
                        </button> 
                      
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;
