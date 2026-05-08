import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/models")
      .then((res) => setCars(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: "30px", color: "white" }}>
      
      <h1 style={{ textAlign: "center", fontSize: "40px", marginBottom: "30px" }}>
        🚗 Regulus Cars
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
        
        {cars.map((car) => (
          <div
            key={car._id}
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.3)",
              transition: "0.3s",
            }}
          >
            <img
              src={car.images?.[0]?.url}
              alt={car.name}
              style={{ width: "100%", borderRadius: "10px", marginBottom: "15px" }}
            />

            <h2>{car.name}</h2>
            <p style={{ color: "#94a3b8" }}>{car.tagline}</p>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              ₹ {car.price?.base}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default App;