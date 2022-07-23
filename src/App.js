import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page1, Page2, Page3, LandingPage, EndingPage } from './screens';
import { useEffect } from 'react';
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/page1" element={<Page1 />} />
      <Route exact path="/page2" element={<Page2 />} />
      <Route exact path="/page3" element={<Page3 />} />
      <Route exact path="/end" element={<EndingPage />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
