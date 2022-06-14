import {Outlet} from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';


function Layout(): JSX.Element {

  return (
    <div className="wrapper" data-testid="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
