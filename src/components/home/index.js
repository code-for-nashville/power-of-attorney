import React from 'react';
import { Link } from "react-router-dom";

import './styles.css';

export default () => {
  return (
    <div>
      <header className="HeroImage jumbotron container-fluid">
        <h1>Power of Attorney for Care of a Minor Child</h1>
      </header>
      <main className="container-fluid lead">
        <section>
          <p>
            Immigrant parents may face detainment or deportation with little warning. Since parents may work in the same location or be in the same location when picked up by ICE/immigration, their children can be left without any legal guardian. When picked up by ICE/Immigration, parents are often unavailable or inaccessible for days or weeks (and can even be deported before ever having access to their children or family). Parents can sign a power of attorney for the minor children to give guardianship of their child to someone they trust, which takes effect only if they are detained or deported.
          </p>
        </section>
        <br/>
        <section className="ActionSection row">
          <div className="col-xs-1 col-md-4"></div>
          <Link className="col-xs-10 col-md-4 btn btn-lg btn-success" role="button" to="/form">
            Fill Out Your Power of Attorney Form Now
          </Link>
          <div className="col-xs-1 col-md-4"></div>
        </section>

        <section>
          <h2 id="faq" className="faq">FAQ</h2>
          <h3>What is this document for?</h3>
          <p>
            This document was created to help parents in Tennessee who may be in danger of being detained and/or deported. This form gives a caregiver temporary guardianship of your child. This power of attorney only goes into effect if you are detained or deported. This form is temporary only – permanent guardianship would need to be given by a court.
          </p>
          <h3>Who should I choose as my caregiver?</h3>
          <p>
            Your caregiver should be someone you trust. This document will give them the power to make decisions for your child as if they were you and in the best interests of the child. You can end this power of attorney at any time by putting in writing that you no longer want this person to have power of attorney over your child.
          </p>
          <h3>Where can I learn more about power of attorney for a minor child?</h3>
          <p>
            The law itself can be found <a href="https://law.justia.com/codes/tennessee/2010/title-34/chapter-6/part-3/">here</a>
          </p>
        </section>
      </main>
      <footer className="footer">
      <h2>   About | Contact Us</h2>
      </footer>
    </div>
  )
}
