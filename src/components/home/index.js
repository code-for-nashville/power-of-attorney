import React from 'react';
import { Link } from "react-router-dom";

import './styles.css';

export default () => {
  return (
    <div>
      <header className="HeroImage jumbotron container-fluid">
        <h1>Power of Attorney for Care of a Minor Child</h1>
      </header>
      <main className="container-fluid">
        <section className="lead">
          <p className="lead">
            Immigrant parents may face detainment or deportation with little warning. Since parents may work in the same location or be in the same location when picked up by ICE/immigration, their children can be left without any legal guardian. When picked up by ICE/Immigration, parents are often unavailable or inaccessible for days or weeks (and can even be deported before ever having access to their children or family). Parents can sign a power of attorney for the minor children to give guardianship of their child to someone they trust, which takes effect only if they are detained or deported.
          </p>
          <Link className="btn btn-lg btn-success" role="button" to="/form">
            Start Filling Out Your Power of Attorney
          </Link>
        </section>
        <section>
        </section>
      </main>
    </div>
  )
}
