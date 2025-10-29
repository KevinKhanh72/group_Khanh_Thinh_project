import "./App.css";
<<<<<<< HEAD
import { UsersProvider } from "./UsersContext";
import AddUser from "./AddUser";
import UserList from "./UserList";
=======
import { UsersProvider } from "./UsersContext.jsx";
import AddUser from "./AddUser.jsx";
import UserList from "./UserList.jsx";
>>>>>>> backend-practice

export default function App() {
  return (
    <UsersProvider>
      <div className="container">
<<<<<<< HEAD
  <h1>Quản lý User (Sinh viên 2) — frontend + backend</h1>
=======
  <h1>Quản lý User (Sinh viên 2) — backend version</h1>

>>>>>>> backend-practice
        <div className="grid">
          <AddUser />
          <UserList />
        </div>
      </div>
    </UsersProvider>
  );
}
