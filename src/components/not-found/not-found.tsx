import {Link} from 'react-router-dom';
import {AppRoute} from '../../settings/app-routes';

function NotFound(): JSX.Element {
  return (
    <div className="page404_container">
      <div className="page404_title">
        <h1>
          404
          <br />
          <br />
          <small>Page not found</small>
        </h1>
      </div>
      <Link className="page404_back_link" to={AppRoute.Catalog}>Go to main page</Link>
      <br />
      <br />
      <img className="page404_img"  src="img/404notFound.png" alt="stop the bus" />
      <div className="page404_reasons">
        <p><b>Why could this happen?</b></p>
        <ul>
          <li>
            the physical laws of our universe have been changed.
          </li>
          <li>
            reptilians and masons interfered with the work of the site.
          </li>
          <li>
            you are hallucinating, but the page actually exists in reality.
          </li>
          <li>
            kittens need to be stroked before you can continue.
          </li>
          <li>
            your computer has been taken over by a global AI, prepare for annihilation just in case.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NotFound;
