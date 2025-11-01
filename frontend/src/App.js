import AddUser from "./components/AddUser";
import UserList from "./components/UserList";

export default function App() {
  return (
    <div style={{ padding: 20 }}>
      <h1>React User App ✅</h1>
      <AddUser />
      <hr />
      <UserList />
    </div>
  );
}
