/* oxlint-disable next/no-img-element -- These previews use original portfolio images. */
/* oxlint-disable next/no-html-link-for-pages -- Study previews intentionally open full documents to avoid stale client navigation between publications. */
import { Darkroom } from '../reseda-darkroom/darkroom';
import { DarkroomMagazine } from './magazine/magazine';
import { DarkroomFeatured } from './darkroom-featured/featured';
import { Overprint } from './overprint/overprint';
import { Chromatic } from './overprint-chromatic/chromatic';
import { Sequence } from './overprint-sequence/sequence';
import { ScreenFit } from './overprint-screen-fit/screen-fit';
import './selection.css';
export default function ResedaStudies() {
  return (
    <main className="catalog reseda-selection">
      <header className="catalog-header">
        <span>PHILIP DI FIORE</span>
        <span>EIGHT DIRECTIONS</span>
      </header>
      <section className="catalog-intro">
        <div>
          <span className="catalog-overline">THE RESEDA STUDIES</span>
          <h1>
            Eight
            <br />
            <em>directions.</em>
          </h1>
        </div>
        <p>
          Reseda, Darkroom, Darkroom/Magazine, Darkroom / Featured, Overprint,
          Overprint / Chromatic, Overprint / Sequence, and Overprint / Screen
          Fit.
          <br />
          Choose a direction to open it.
        </p>
      </section>
      <section
        className="catalog-grid selection-grid"
        aria-label="Eight selected website designs"
      >
        <article className="catalog-plate">
          <div className="catalog-preview">
            <div className="catalog-preview-inner" aria-hidden="true" inert>
              <div className="reseda-study">
                <header className="reseda-nav">
                  <span>Philip Di Fiore</span>
                  <span>Images</span>
                </header>
                <p className="reseda-wordmark">DI FIORE</p>
                <div className="reseda-lead">
                  <div className="reseda-image">
                    <img src="/images/strangernew.jpg" alt="" />
                  </div>
                  <div className="reseda-lead-copy">
                    <h2>
                      FILM
                      <br />& IMAGES
                    </h2>
                    <div>
                      <p>
                        A selection of moving pictures.
                        <br />
                        Philip Di Fiore.
                      </p>
                      <span className="reseda-outline">View film ↗</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a href="/reseda-studies/original">
            <div className="catalog-caption">
              <span>01</span>
              <h2>Reseda</h2>
              <span>↗</span>
            </div>
            <p className="catalog-material">
              Wide lettering. Tall images. Open space.
            </p>
          </a>
        </article>
        <article className="catalog-plate">
          <div className="catalog-preview">
            <div className="catalog-preview-inner" aria-hidden="true" inert>
              <Darkroom preview focused />
            </div>
          </div>
          <a href="/reseda-studies/darkroom">
            <div className="catalog-caption">
              <span>02</span>
              <h2>Reseda / Darkroom</h2>
              <span>↗</span>
            </div>
            <p className="catalog-material">
              Red safelight. Photographic prints. Deep shadow.
            </p>
          </a>
        </article>
        <article className="catalog-plate">
          <div className="catalog-preview">
            <div className="catalog-preview-inner" aria-hidden="true" inert>
              <DarkroomMagazine preview />
            </div>
          </div>
          <a href="/reseda-studies/magazine">
            <div className="catalog-caption">
              <span>03</span>
              <h2>Darkroom/Magazine</h2>
              <span>↗</span>
            </div>
            <p className="catalog-material">
              The darkroom becomes a magazine. Images become articles.
            </p>
          </a>
        </article>
        <article className="catalog-plate">
          <div className="catalog-preview">
            <div className="catalog-preview-inner" aria-hidden="true" inert>
              <DarkroomFeatured preview />
            </div>
          </div>
          <a href="/reseda-studies/darkroom-featured">
            <div className="catalog-caption">
              <span>04</span>
              <h2>Darkroom / Featured</h2>
              <span>↗</span>
            </div>
            <p className="catalog-material">
              One image at a time. Featured, About, Archive.
            </p>
          </a>
        </article>
        <article className="catalog-plate">
          <div className="catalog-preview">
            <div className="catalog-preview-inner" aria-hidden="true" inert>
              <Overprint preview />
            </div>
          </div>
          <a href="/reseda-studies/overprint">
            <div className="catalog-caption">
              <span>05</span>
              <h2>Overprint</h2>
              <span>↗</span>
            </div>
            <p className="catalog-material">
              Massive lettering. Printed fragments. Vermilion and cobalt.
            </p>
          </a>
        </article>
        <article className="catalog-plate">
          <div className="catalog-preview">
            <div className="catalog-preview-inner" aria-hidden="true" inert>
              <Chromatic preview />
            </div>
          </div>
          <a href="/reseda-studies/overprint-chromatic">
            <div className="catalog-caption">
              <span>06</span>
              <h2>Overprint / Chromatic</h2>
              <span>↗</span>
            </div>
            <p className="catalog-material">
              Twelve artworks. Twelve distinct palettes.
            </p>
          </a>
        </article>
        <article className="catalog-plate">
          <div className="catalog-preview">
            <div className="catalog-preview-inner" aria-hidden="true" inert>
              <Sequence preview />
            </div>
          </div>
          <a href="/reseda-studies/overprint-sequence">
            <div className="catalog-caption">
              <span>07</span>
              <h2>Overprint / Sequence</h2>
              <span>↗</span>
            </div>
            <p className="catalog-material">
              Film. Video. Live. Music. A fast-moving sequence.
            </p>
          </a>
        </article>
        <article className="catalog-plate">
          <div className="catalog-preview">
            <div className="catalog-preview-inner" aria-hidden="true" inert>
              <ScreenFit preview />
            </div>
          </div>
          <a href="/reseda-studies/overprint-screen-fit">
            <div className="catalog-caption">
              <span>08</span>
              <h2>Overprint / Screen Fit</h2>
              <span>↗</span>
            </div>
            <p className="catalog-material">
              The complete composition. One screen, at any size.
            </p>
          </a>
        </article>
      </section>
      <footer className="catalog-footer">
        <span>Philip Di Fiore / Reseda studies</span>
        <span>
          Original / Darkroom / Magazine / Featured / Overprint / Chromatic /
          Sequence / Screen Fit
        </span>
      </footer>
    </main>
  );
}
