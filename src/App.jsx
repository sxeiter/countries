import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Switch, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { Details } from './pages/Details';
import { useState } from 'react';

function App() {
  const [countries, setCountries] = useState([]);


  return (
    <>
      <Header />
        <Main>
          <Switch>
            <Route exact path='/'>
              <HomePage countries={countries} setCountries={setCountries}/>
            </Route>
            <Route path='/country/:name' component={Details}/>
            <Route component={NotFound}/>
          </Switch>
        </Main>
    </>
  )
}

export default App;
