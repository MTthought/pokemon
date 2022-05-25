import { Routes, Route } from "react-router-dom";
import "./App.css";
import ListPage from "./components/list/ListPage";
import DetailsPage from "./components/details/DetailsPage";
import Footer from "./components/common/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path=":name" element={<DetailsPage />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
