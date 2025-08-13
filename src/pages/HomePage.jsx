import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Welcome to Space Travel 🚀</h1>
      <p>Evacuate humanity from Earth and explore the solar system.</p>
      <div style={{ marginTop: "2rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Link to="/spacecrafts" className="cta">View Spacecrafts</Link>
        <Link to="/planets" className="cta">View Planets</Link>
      </div>
    </main>
  );
}
