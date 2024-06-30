import AllRoutes from './components/AllRoutes/allRoutes';
import "./App.css"
import { Helmet } from 'react-helmet';
function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Book Ecom</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <AllRoutes />

    </>
  );
}

export default App;
