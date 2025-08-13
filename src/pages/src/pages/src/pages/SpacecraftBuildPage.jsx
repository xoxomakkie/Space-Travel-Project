import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi";
import { SpaceTravelContext } from "../context/SpaceTravelContext";

export default function SpacecraftBuildPage() {
  const { fetchSpacecrafts } = useContext(SpaceTravelContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !capacity || !description) {
      setError("Name, capacity, and description are required!");
      return;
    }

    const res = await SpaceTravelApi.buildSpacecraft({
      name,
      capacity: parseInt(capacity),
      description,
      pictureUrl: pictureUrl || undefined
    });

    if (!res.isError) {
      await fetchSpacecrafts();
      navigate("/spacecrafts");
    } else {
      setError("Failed to build spacecraft. Try again.");
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Build New Spacecraft</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Picture URL (optional)" value={pictureUrl} onChange={(e) => setPictureUrl(e.target.value)} />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" className="cta">Build Spacecraft</button>
          <button type="button" className="link" onClick={() => navigate("/spacecrafts")}>Cancel</button>
        </div>
      </form>
    </main>
  );
}
