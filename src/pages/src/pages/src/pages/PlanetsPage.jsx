import { useContext, useState } from "react";
import { SpaceTravelContext } from "../context/SpaceTravelContext";
import SpaceTravelApi from "../services/SpaceTravelApi";
import Loading from "../components/Loading/Loading";

export default function PlanetsPage() {
  const { planets, spacecrafts, loading, fetchSpacecrafts, fetchPlanets } = useContext(SpaceTravelContext);
  const [selectedSpacecraft, setSelectedSpacecraft] = useState("");
  const [selectedPlanet, setSelectedPlanet] = useState("");
  const [error, setError] = useState("");

  const handleDispatch = async () => {
    if (!selectedSpacecraft || !selectedPlanet) {
      setError("Select both spacecraft and target planet!");
      return;
    }

    const spacecraft = spacecrafts.find(sc => sc.id === selectedSpacecraft);
    if (spacecraft.currentLocation === parseInt(selectedPlanet)) {
      setError("Spacecraft is already on this planet!");
      return;
    }

    const res = await SpaceTravelApi.sendSpacecraftToPlanet({
      spacecraftId: selectedSpacecraft,
      targetPlanetId: parseInt(selectedPlanet)
    });

    if (!res.isError) {
      await fetchSpacecrafts();
      await fetchPlanets();
      setSelectedSpacecraft("");
      setSelectedPlanet("");
      setError("");
    } else {
      setError(res.data.message || "Failed to dispatch spacecraft.");
    }
  };

  if (loading) return <Loading />;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Planets</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
        {planets.map(planet => (
          <div key={planet.id} style={{ border: "1px solid var(--panel)", borderRadius: "0.5rem", padding: "1rem", flex: "1 1 250px" }}>
            <h2>{planet.name}</h2>
            <p>Population: {planet.currentPopulation}</p>
            {planet.pictureUrl && <img src={planet.pictureUrl} alt={planet.name} style={{ marginTop: "0.5rem", borderRadius: "0.5rem" }} />}
            <h3>Spacecrafts on this planet:</h3>
            <ul>
              {spacecrafts.filter(sc => sc.currentLocation === planet.id).map(sc => (
                <li key={sc.id}>{sc.name} (Capacity: {sc.capacity})</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <h2>Dispatch Spacecraft</h2>
        <select value={selectedSpacecraft} onChange={(e) => setSelectedSpacecraft(e.target.value)}>
          <option value="">Select Spacecraft</option>
          {spacecrafts.map(sc => (
            <option key={sc.id} value={sc.id}>{sc.name}</option>
          ))}
        </select>

        <select value={selectedPlanet} onChange={(e) => setSelectedPlanet(e.target.value)}>
          <option value="">Select Target Planet</option>
          {planets.map(planet => (
            <option key={planet.id} value={planet.id}>{planet.name}</option>
          ))}
        </select>

        <button onClick={handleDispatch} className="cta">Send Spacecraft</button>
      </div>
    </main>
  );
}
