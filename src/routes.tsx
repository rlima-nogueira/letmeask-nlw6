import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

export default function Routes() {
  return (
    <Router>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />

        </Switch>
    </Router>
  );
}


