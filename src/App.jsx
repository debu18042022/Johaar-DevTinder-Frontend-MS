import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/feed" element={<Feed />}></Route>
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
      <Footer />
    </div>
  );
}

export default App;
