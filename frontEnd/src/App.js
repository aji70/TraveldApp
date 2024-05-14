import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    // we do not push because we cannot manually mutate an array so we have to create a new array and add or remove items
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  return (
    <div className="app">
      <Logo />

      <Form onAddItems={handleAddItems} />

      <PackingList items={items} onDeleteItem={handleDeleteItems} />

      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far away</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(1);
  // the items state variable is an array thus the default state is an empty array

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; //Guard clause that does not allow submission if the description is not filled
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);
    console.log(newItem);

    setDescription(" ");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/*
        e.target.value is always a string
        <option value="1">1</option>
        <option value="2">2</option> 
        this is done more simply below
        an array of 20 elements
        we then loop over the array and use the elements 
        as the value of the select
        num is the value of every element in the array from 0 - 20
        */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem }) {
  return (
    <div className="list">
      <ul>
        {/* We enter JavaScript mode by using the { }, we the map the elements in the array to an item component so each of them will be represented as a component and pass the whole element as a prop to the component*/}
        {items.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items and you have already packed X(X%)</em>
    </footer>
  );
}
