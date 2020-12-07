import Header from './components/Header/Header';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
          <Header />
      </div>
    </Router>
  );
}

export default App;
