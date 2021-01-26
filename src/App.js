import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from './pages/Home.js'
import { Login } from './pages/Login.js'
import { Register } from './pages/Register.js'
import { ForgotPassword } from './pages/ForgotPassword.js'
import { ResetPasswordClient } from './pages/ResetPasswordClient.js'
import { ResetPasswordArtist } from './pages/ResetPasswordArtist.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigation } from './components/Navigation'
import { ArtistForm }  from './pages/ArtistForm'
import { ArtistProfile }  from './pages/ArtistProfile'
import { ClientForm }  from './pages/ClientForm'
import { Payment } from './components/Payment'
import { Response } from './components/Response'
import { CustomizeProfile } from './pages/CustomizeProfile'
import { Transactions } from './pages/Transactions'

function PrivateRoute(props){
  const token = sessionStorage.getItem('token');
  if(!token) return <Redirect to="/login" />
  return <Route {...props } />
}

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exaxt path="/forgot-password" component={ForgotPassword}/>
          <Route exaxt path="/clients/reset/:token" component={ResetPasswordClient}/>
          <Route exaxt path="/artists/reset/:token" component={ResetPasswordArtist}/>
          <PrivateRoute exact path="/artist-form" component={ArtistForm} />
          <PrivateRoute exact path="/artists/:artistId" component={ArtistProfile} />
          <PrivateRoute exact path="/client-form" component={ClientForm} />
          <PrivateRoute exact path="/pay" component={Payment} />
          <PrivateRoute exact path="/response" component={Response} />
          <PrivateRoute exact path="/customize-profile" component={CustomizeProfile} />
          <PrivateRoute exact path="/transactions" component={Transactions} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
