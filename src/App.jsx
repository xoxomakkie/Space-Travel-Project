import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Spacecrafts from "./pages/Spacecrafts.jsx";
import SpacecraftDetail from "./pages/SpacecraftDetail.jsx";
import BuildSpacecraft from "./pages/BuildSpacecraft.jsx";
import Planets from "./pages/Planets.jsx";
import styles from "./App.module.css";

function App() {
  return (
    <BrowserRouter>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link className={styles.brand} to="/">Space Travel</Link>
          <div className={styles.links}>
            <Link to="/spacecrafts" className={styles.link}>Spacecrafts</Link>
            <Link to="/planets" className={styles.link}>Planets</Link>
            <Link to="/spacecrafts/build" className={styles.cta}>Build</Link>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spacecrafts" element={<Spacecrafts />} />
          <Route path="/spacecrafts/build" element={<BuildSpacecraft />} />
          <Route path="/spacecrafts/:id" element={<SpacecraftDetail />} />
          <Route path="/planets" element={<Planets />} />
          {/* Redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Space Travel Command</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
