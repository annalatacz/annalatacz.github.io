/*
 * =========================================================
 * RANDOM STAR GENERATOR
 * =========================================================
 *
 * Creates randomly positioned stars.
 *
 * The .stars container is 200vw × 200vh and positioned -50vw / -50vh, meaning it extends 50% beyond every
 * edge of the viewport.
 *
 * This gives the animation plenty of spare stars to reveal when the field moves and rotates.
 * =========================================================
 */

(function createStars() {

    const starField = document.querySelector('.stars');

    /*
     * Stop if the .stars element doesn't exist.
     */
    if (!starField) {
        console.warn('Starfield element ".stars" was not found.');
        return;
    }

    /*
     * Number of stars.
     */
    const STAR_COUNT = 700;

    /*
     * Create a document fragment first.
     */
    const fragment = document.createDocumentFragment();

    /*
     * Generate the stars.
     */
    for (let i = 0; i < STAR_COUNT; i++) {

        const star = document.createElement('span');
        star.className = 'star';

        /*
         * POSITIONS - Because the container is 200% of the viewport, positions can range from 0% to 100% of
         * that oversized container.
         */
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        /*
         * SIZE - Most stars will be 1–2px. A few will be larger.
         */
        const size = Math.random() < 0.85
            ? Math.random() * 1 + 1
            : Math.random() * 1 + 2;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        /*
         * STAR BRIGHTNESS (OPACITY) - Most stars are fairly bright, but some are dimmer.
         */
        const opacity = 0.35 + Math.random() * 0.55;
        star.style.opacity = opacity;

        /*
         * Add the star to our fragment.
         */
        fragment.appendChild(star);
    }

    /*
     * Add all stars to the page at once.
     */
    starField.appendChild(fragment);

})();