import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ViewerPage from "./pages/ViewerPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ViewerPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
