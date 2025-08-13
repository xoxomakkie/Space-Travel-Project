import { useContext } from "react";
import { Link } from "react-router-dom";
import { SpaceTravelContext } from "../context/SpaceTravelContext";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading/Loading";

export default function SpacecraftsPage() {
  const { spacecrafts, loading, fetchSpacecrafts } = useContext(SpaceTravelContext);

  if (loading) return <Loading />;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>All Spacecrafts</h1>
      <Link to="/build-spacecraft" className="cta">Build New Spacecraft</Link>
      <ul style={{ marginTop: "2rem", listStyle: "none", padding: 0 }}>
        {spacecrafts.map(sc => (
          <li key={sc.id} style={{ marginBottom: "1rem", border: "1px solid var(--panel)", padding: "1rem", borderRadius: "0.5rem" }}>
            <h2>{sc.name}</h2>
            <p>Capacity: {sc.capacity}</p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <Link to={`/spacecrafts/${sc.id}`} className="link">View Details</Link>
              <button
                className="link"
                style={{ marginLeft: "1rem" }}
                onClick={async () => {
                  await SpaceTravelApi.destroySpacecraftById({ id: sc.id });
                  fetchSpacecrafts();
                }}
              >
                Destroy
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
