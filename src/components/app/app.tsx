import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history/browser-history';
import Cart from '../cart/cart';
import Layout from '../layout/layout';
import MainCatalog from '../main-catalog/main-catalog';
import Product from '../product/product';
import NotFound from '../not-found/not-found';
import { getIsDataLoaded } from '../../store/selectors';
import { useAppSelector } from '../../hooks/redux-hooks';
import LoadingScreen from '../loading-screen/loading-screen';


function App(): JSX.Element {
  const isDataLoaded = useAppSelector(getIsDataLoaded);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }


  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Layout />}
        >
          <Route
            path={AppRoute.Catalog}
            element={<MainCatalog/>}
          />
          <Route
            path={AppRoute.CatalogPage}
            element={<MainCatalog/>}
          />
          <Route
            path={AppRoute.Cart}
            element={<Cart />}
          />
          <Route
            path={AppRoute.Product}
            element={<Product />}
          />
        </Route>
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </HistoryRouter>
  );

}

export default App;
