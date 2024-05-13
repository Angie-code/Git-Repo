import './App.css';
import Home from "./component/Home";
import Repositories from "./component/Repositories";
import NotFound from "./component/NotFound";
import { Routes, Route } from 'react-router-dom';
import Navigation from "./component/Navigation";
import RepoDetails from './component/RepoDetails';
import ErrorBoundary from './component/ErrorBoundary';

function App() {
  return (
    <>
      <div>
        <ErrorBoundary>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/repositories' element={<Repositories />} />
            <Route path="repositories/repodetails/:id" element={<RepoDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </>
  );
}

export default App;
