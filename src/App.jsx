import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import MovieList from "./pages/MovieList";
import Login from "./pages/Login";


function App() {
  return (
    <Switch>
          <Route exact path="/browse" component={ MovieList } />
          <Route exact path="/" component={ Login } />
        </Switch>
  );
}

export default App;
