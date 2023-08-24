import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";
import FilteredJob from "./pages/FilteredJob";
import Home from "./pages/Home";

function App() {
  const Layout = ({ children }) => (
    <>
      <Sidebar>
        {children}
        <Outlet />
      </Sidebar>
    </>
  );
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs/add" element={<AddJob />} />
          <Route path="/jobs/edit/:id" element={<EditJob />} />
          <Route path="/jobs/:type" element={<FilteredJob />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
