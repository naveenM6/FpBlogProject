import {BrowserRouter, Switch} from 'react-router-dom'

import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Upload from './components/Upload';
import Posts from './components/Posts';
import NotFind from './components/NotFind';

import './App.css'

const App = () => ( 
  <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/" component={Upload} />
      <ProtectedRoute exact path="/login" component={Login} />
      <ProtectedRoute exact path="/posts" component={Posts}/>
      <ProtectedRoute component={NotFind}/>
    </Switch>
  </BrowserRouter>
)

export default App;