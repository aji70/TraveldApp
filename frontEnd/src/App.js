import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]); //This state manipulates the array of items added to the array
  function handleAddItems(item) {
    // we are not allowed to mutate state directly in react so we create a new array by,
    // spreading the former array and adding the new item to it all in a new array
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      {/* passing a function as a props so it can be used in a component */}
      <Form onAddItems={handleAddItems} />
      {/*Passing the items as a props to the PackingList component*/}
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onToggleItems={handleToggleItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>Far away</h1>;
}
function Form({ onAddItems }) {
  //Accepting the function that was passed in as a prop
  const [description, setDescription] = useState(" ");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    // Guard Clause to prevent submission with empty field
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem); //Finally adding the element to the new array

    // set everything back to it's normal state
    setDescription("");
    setQuantity(1);
    // console.log(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/* An array of numbers 1 - 20  and mapping the numbers to form the options including their value and 
        the option*/}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item...."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
function PackingList({ items, onDeleteItems, onToggleItems }) {
  //Accepting the item array in the packing list component
  return (
    <div className="list">
      <ul>
        {items.map(
          (
            item // items is the array defined up in the app component
          ) => (
            <Item
              onDeleteItems={onDeleteItems}
              item={item}
              key={item.id}
              onToggleItems={onToggleItems}
            /> //Passing the function that hhelps deletes items from the array as a prop
          )
        )}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItems, onToggleItems }) {
  //Accepting the function that hhelps deletes items from the array as a prop
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
      {/* getting the id of the particular item we want to delete */}
    </li>
  );
}
function Stats() {
  return (
    <footer className="stats">
      <em>
        you have X items on your list, and you have already packed X(X%) items
      </em>
    </footer>
  );
}
