import './App.css';
import { HashRouter,Route } from 'react-router-dom';
import Navbar from './navbar';
import Login from './login';
import MyData from './mydata';
import Home from './friends';
import Frdrqt from './frdrqst';
import Chat from './chat';
import Emoji from './emoji';
import Editmydata from './mydata-edit';
function App() {
  return (
  <HashRouter>
    <Navbar/>
    <Route exact path="/" component={Login}/>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/mydata" component={MyData}/>
    <Route exact path="/request" component={Frdrqt}/>
    <Route  path="/chat" component={Chat}/>
    <Route  path="/emoji" component={Emoji}/>
    <Route  exact path="/mydata/:editId" component={Editmydata}/>
  </HashRouter>
  );
}

export default App;
