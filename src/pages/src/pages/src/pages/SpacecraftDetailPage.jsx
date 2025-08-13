import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading/Loading";

export default function SpacecraftDetailPage() {
  const { id } = useParams();
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
      <Link to="/spacecrafts" className="link">Back to Spacecrafts</Link>
    </main>
  );
}
