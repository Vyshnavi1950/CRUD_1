import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://crud-2-gwzu.onrender.com/items/')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error fetching items:', err));
  };

  const addItem = () => {
    fetch('https://crud-2-gwzu.onrender.com/items/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem })
    })
      .then(() => {
        setNewItem('');
        fetchItems();
      })
      .catch(err => console.error('Error adding item:', err));
  };

  const deleteItem = (id) => {
    fetch(`https://crud-2-gwzu.onrender.com/items/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchItems())
      .catch(err => console.error('Error deleting item:', err));
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
  };

  const updateItem = () => {
    fetch(`https://crud-2-gwzu.onrender.com/items/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editName })
    })
      .then(() => {
        setEditId(null);
        setEditName('');
        fetchItems();
      })
      .catch(err => console.error('Error updating item:', err));
  };

  return (
    <div>
      <h1>List of Items From Node Backend</h1>
      {items.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => deleteItem(item.id)}>Delete</button>
          <button onClick={() => startEdit(item)}>Edit</button>
        </div>
      ))}

      <hr />

      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Enter a Name"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem} disabled={!newItem.trim()}>Add Item</button>

      {editId && (
        <>
          <hr />
          <h2>Edit Item</h2>
          <input
            type="text"
            placeholder="Edit name"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <button onClick={updateItem} disabled={!editName.trim()}>Update</button>
          <button onClick={() => setEditId(null)}>Cancel</button>
        </>
      )}
    </div>
  );
}

export default App;
