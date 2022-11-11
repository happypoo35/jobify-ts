import { Link } from "react-router-dom";
import { ReactComponent as HeroImg } from "@/assets/main-alternative.svg";
import { Button, Logo } from "../shared";

import s from "./landing.module.scss";

const Landing = () => {
  return (
    <>
      <header className={s.header} data-container="fixed">
        <Logo />
      </header>
      <main className={s.main} data-container="fixed">
        <section aria-label="Welcome to jobify">
          <article>
            <h1 data-h1>
              Job <em>Tracking</em> App
            </h1>
            <p>
              I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
              bottle single-origin coffee chia. Aesthetic post-ironic venmo,
              quinoa lo-fi tote bag adaptogen everyday carry meggings brunch
              narwhal.
            </p>
            <Button>
              <Link to="/login">Get started</Link>
            </Button>
          </article>
          <HeroImg />
        </section>
      </main>
    </>
  );
};

export default Landing;
