import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";
import { v4 as uuid } from "uuid";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, SetSearchFilter] = useState("");
  const [addItem, setAddItem] = useState({
    category: "Produce",
    name: "",
  });

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearch(event) {
    SetSearchFilter(event.target.value);
  }

  const searchItems = items.filter(item => {
    if (search === "") return true;

    return item.name.includes(search);
  });

  const itemsToDisplay = searchItems.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function handleAddItem(event) {
    const value = event.target.value;
    const name = event.target.name;
    setAddItem({
      ...addItem, 
      [name]: value
    });
  }

  const handleSubmitItem = (event => {
    event.preventDefault();
    const newItem = {
      id: uuid(),
      name: addItem.name,
      category: addItem.category,
    };
    items.push(newItem);
    console.log(items);
    setAddItem({
      name: "",
      category: "Produce",
    });
});

  return (
    <div className="ShoppingList">
      <ItemForm name={addItem.name} category={addItem.category} onEnterItem={handleAddItem} onItemFormSubmit={handleSubmitItem} />
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearch} search={search}/>
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;