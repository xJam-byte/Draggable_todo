import "./App.scss";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const onClickAddItem = () => {
    if (item.trim() !== "") {
      const newItem = {
        id: uuidv4(),
        item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: {
          x: 500,
          y: -500,
        },
      };
      setItems((items) => [...items, newItem]);
      setItem("");
    } else {
      setItem("");
    }
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const onDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePos = (data, i) => {
    let array = [...items];
    array[i].defaultPos = { x: data.x, y: data.y };
    setItems(array);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          type="text"
          onChange={(e) => {
            setItem(e.target.value);
          }}
          value={item}
          placeholder="Enter something"
        />
        <button onClick={onClickAddItem} className="enter">
          ENTER
        </button>
      </div>
      {items.map((item, i) => (
        <Draggable
          onStop={(_, data) => updatePos(data, i)}
          key={i}
          defaultPosition={item.defaultPos}
        >
          <div className="todo-item" style={{ backgroundColor: item.color }}>
            {item.item}
            <button onClick={() => onDelete(item.id)} className="delete">
              X
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default App;
