import Avatar from "./components/Avatar";

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div style={{ padding: "40px" }}>
      <h2>User Profile</h2>

      <Avatar name="Madhu Kolur" size={120} />

    </div>
  );
}

export default App;
