import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [count, setCount] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000")
      .then((response) => response.json())
      .then((data) => {
        setCount(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  async function deleteById(id) {
    await fetch("http://localhost:3000/" + id, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setCount((precount) => precount.filter((x) => x._id !== id));
        } else console.error("Failed to delete item");
      })
      .catch(console.error("Error occurred while deleting"));
  }

  return (
    <div className="admin-panel">
      <h1>Featured Robotics Products to Show</h1>
      <p>Who are in extremely love with eco-friendly system.</p>
      <div className="robot-cards">
        {count.map((x) => (
          <div className="robot-card" key={x._id}>
            <img src={x.img} alt={x.name} />
            <h2>{x.name}</h2>
            <p>{x.desc}</p>
            <button className="view-details">View Details</button>

          </div>
        ))}
      </div>
    </div>
  );
}

export default App;