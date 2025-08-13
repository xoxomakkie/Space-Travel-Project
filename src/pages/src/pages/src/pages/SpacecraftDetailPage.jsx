import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading/Loading";

export default function SpacecraftDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [spacecraft, setSpacecraft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpacecraft() {
      const res = await SpaceTravelApi.getSpacecraftById({ id });
      if (!res.isError) setSpacecraft(res.data);
      setLoading(false);
    }
    fetchSpacecraft();
  }, [id]);

  if (loading) return <Loading />;
  if (!spacecraft) return <p>Spacecraft not found!</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{spacecraft.name}</h1>
      <p>Capacity: {spacecraft.capacity}</p>
      <p>{spacecraft.description}</p>
      <p>Current Location: Planet ID {spacecraft.currentLocation}</p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <Link to="/spacecrafts" className="link">Back to Spacecrafts</Link>
        <button
          className="link"
          onClick={async () => {
            await SpaceTravelApi.destroySpacecraftById({ id: spacecraft.id });
            navigate("/spacecrafts");
          }}
        >
          Destroy Spacecraft
        </button>
      </div>
    </main>
  );
}
