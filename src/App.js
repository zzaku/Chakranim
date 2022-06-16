import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Component/Nav/Navbar'
import Home from './Component/Home/Home'
import Footer from './Component/Footer/Footer';
import './App.css';


function App() {


  return (
    <div className="App">
      <Router>
        <Navbar />
        <Home />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
