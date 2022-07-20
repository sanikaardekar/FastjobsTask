import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Page1, Page2, Page3 } from './screens';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
      <Route exact path="/page1" element={<Page1 />} />
      <Route exact path="/page2" element={<Page2 />} />
      <Route exact path="/page3" element={<Page3 />} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
