
import './App.css';
import Home from './Components/Home ';
import Details from "./Components/Details"
import {Route,BrowserRouter,Switch} from "react-router-dom"
import Navbar from './Components/Navbar';
function App() {
  return (
    <div>
      <Navbar/>
     <BrowserRouter>
     <Switch>
   <Route exact path = "/" component={Home}/>
      
           <Route exact path="/details/:id" render={props=>(
                <Details {...props}/>)} />
     
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
