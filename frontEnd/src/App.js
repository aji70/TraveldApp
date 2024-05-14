import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Shorts", quantity: 5, packed: true },
];
export default function App() {
  return (
    <div className="app">
      <Logo />

      <Form />

      <PackingList />

      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far away</h1>;
}

function Form() {
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return; //Guard clause that does not allow submission if the description is not filled
    const newItem = { description, quantity, packed: false, oid: Date.now() };
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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {/* We enter JavaScript mode by using the { }, we the map the elements in the array to an item component so each of them will be represented as a component and pass the whole element as a prop to the component*/}
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>

      <button>❌</button>
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
