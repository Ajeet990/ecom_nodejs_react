import logo from './logo.svg';
import Header from './components/Header';
import './App.css';
import MyRouter from './router/index';

function App() {
  return (
    <div className="App">
      <Header />
      <MyRouter />
    </div>
  );
}

export default App;
