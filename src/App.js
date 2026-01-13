import { useState } from 'react';
import './App.css';
import AddUser from './AddUser';
import UserList from './UserList';

function App() {
  const [reloadKey, setReloadKey] = useState(0);

  const handleUserAdded = () => {
    setReloadKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <h1>Quản lý Người dùng</h1>
      <AddUser onUserAdded={handleUserAdded} />
      <UserList reloadKey={reloadKey} />
    </div>
  );
}

export default App;
