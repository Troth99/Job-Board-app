import { Trans } from "@lingui/react/macro";
import "./Hero.css";
import "./Responsive.css";
import Search from "../Search/Search";

export default function Hero() {
  return (
    <section className="custom-hero">
      <div className="custom-hero__grid" aria-hidden="true" />
      <div className="custom-hero__content">
        <p className="custom-hero__eyebrow">
          <span className="custom-hero__eyebrow-mark" />
          <Trans>Find work that fits your life</Trans>
        </p>
        <h1>
          <Trans>Make your next move</Trans>
          <span className="custom-hero__title-accent">
            <Trans> on your terms.</Trans>
          </span>
        </h1>
        <p className="custom-hero-subtitle">
          <Trans>
            Explore roles from teams that are ready for what you bring.
          </Trans>
        </p>
        <div className="custom-hero-search">
          <Search onSearch={() => undefined} />
        </div>
        <div className="custom-hero__signals" aria-label="Job search benefits">
          <span><Trans>Curated opportunities</Trans></span>
          <span><Trans>Direct applications</Trans></span>
          <span><Trans>Built for your next step</Trans></span>
        </div>
      </div>
    </section>
  );
}
