import "./App.css";
import { UsersProvider } from "./UsersContext";
import AddUser from "./AddUser";
import UserList from "./UserList";

export default function App() {
  return (
    <UsersProvider>
      <div className="container">
        <h1>Quản lý User (Sinh viên 2)</h1>
        <div className="grid">
          <AddUser />
          <UserList />
        </div>
      </div>
    </UsersProvider>
  );
}
