import logo from './logo.svg';
import Header from './components/Header';
import './App.css';
import MyRouter from './router/index';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className="App">
      <Header />
      <MyRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
