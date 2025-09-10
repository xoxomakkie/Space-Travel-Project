import { Routes, Route, Navigate } from "react-router-dom";
import { useSpaceTravel } from "./context/SpaceTravelContext.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import SpacecraftsPage from "./pages/SpacecraftsPage/SpacecraftsPage.jsx";
import SpacecraftPage from "./pages/SpacecraftPage/SpacecraftPage.jsx";
import ConstructionPage from "./pages/ConstructionPage/ConstructionPage.jsx";
import PlanetsPage from "./pages/PlanetsPage/PlanetsPage.jsx";
import styles from "./App.module.css";

function App() {
  const { loading } = useSpaceTravel();

  return (
    <div className={styles.app}>
      <Navigation />
      <main className={styles.main}>
        {loading && <LoadingComponent />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spacecrafts" element={<SpacecraftsPage />} />
          <Route path="/spacecraft/:id" element={<SpacecraftPage />} />
          <Route path="/construction" element={<ConstructionPage />} />
          <Route path="/planets" element={<PlanetsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
