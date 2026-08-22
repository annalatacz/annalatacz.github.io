document.addEventListener("DOMContentLoaded", function () {
    /* ============================================================
       CURRENT YEAR
       ============================================================ */
    const currentYear = document.getElementById("currentYear");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    /* ============================================================
       ACTIVE NAVIGATION / SCROLL SPY
       ============================================================ */
    const mainScroller = document.querySelector("main");
    if (!mainScroller) {
        return;
    }
    /* ------------------------------------------------------------
       MAIN NAVIGATION SECTIONS
       These correspond to the links in the header.
       ------------------------------------------------------------ */
    const mainNavLinks = Array.from(
        document.querySelectorAll(".site-header nav a[href^='#']")
    );
    const mainSections = mainNavLinks
        .map(function (link) {
            const id = link.getAttribute("href");
            return document.querySelector(id);
        })
        .filter(Boolean);
    /* ------------------------------------------------------------
       EXPERIENCE SUBSECTIONS
       These correspond to:
       #Programming
       #Testing
       #Support
       ------------------------------------------------------------ */
    const experienceNavLinks = Array.from(
        document.querySelectorAll(".experience-nav a[href^='#']")
    );
    const experienceSections = experienceNavLinks
        .map(function (link) {
            const id = link.getAttribute("href");
            return document.querySelector(id);
        })
        .filter(Boolean);
    /* ============================================================
       HELPER - REMOVE ACTIVE CLASS
       ============================================================ */
    function clearActive(links) {
        links.forEach(function (link) {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        });
    }
    /* ============================================================
       HELPER - ACTIVATE LINK
       ============================================================ */
    function activateLink(links, sectionId) {
        clearActive(links);
        const activeLink = links.find(function (link) {
            return link.getAttribute("href") === "#" + sectionId;
        });
        if (activeLink) {
            activeLink.classList.add("active");
            activeLink.setAttribute("aria-current", "location");
        }
    }
    /* ============================================================
       MAIN NAVIGATION OBSERVER
       ============================================================ */
    const mainObserver = new IntersectionObserver(
        function (entries) {
            const visibleSections = entries
                .filter(function (entry) {
                    return entry.isIntersecting;
                })
                .sort(function (a, b) {
                    return b.intersectionRatio - a.intersectionRatio;
                });
            if (visibleSections.length > 0) {
                const section = visibleSections[0].target;
                activateLink(
                    mainNavLinks,
                    section.id
                );
            }
        },
        {
            root: mainScroller,
            /*
             * The section is considered active when it enters
             * the central area of the scrolling window.
             */
            rootMargin: "-25% 0px -55% 0px",
            threshold: [0, 0.1, 0.25, 0.5, 0.75]
        }
    );
    mainSections.forEach(function (section) {
        mainObserver.observe(section);
    });
    /* ============================================================
       EXPERIENCE NAVIGATION OBSERVER
       ============================================================ */
    const experienceObserver = new IntersectionObserver(
        function (entries) {
            const visibleSections = entries
                .filter(function (entry) {
                    return entry.isIntersecting;
                })
                .sort(function (a, b) {
                    return b.intersectionRatio - a.intersectionRatio;
                });
            if (visibleSections.length > 0) {
                const section = visibleSections[0].target;
                activateLink(
                    experienceNavLinks,
                    section.id
                );
            }
        },
        {
            root: mainScroller,
            /*
             * Same central-area detection as the main navigation.
             */
            rootMargin: "-25% 0px -55% 0px",
            threshold: [0, 0.1, 0.25, 0.5, 0.75]
        }
    );
    experienceSections.forEach(function (section) {
        experienceObserver.observe(section);
    });
    /* ============================================================
       EXPERIENCE LINK CLICK
       Give the clicked link immediate active styling.
       IntersectionObserver will then take over as the user
       continues scrolling.
       ============================================================ */
    experienceNavLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            clearActive(experienceNavLinks);
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
        });
    });
    /* ============================================================
       MAIN NAVIGATION LINK CLICK
       ============================================================ */
    mainNavLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            clearActive(mainNavLinks);
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
        });
    });
    /* ============================================================
       INITIAL STATE
       ============================================================ */
    function setInitialActiveState() {
        const currentHash = window.location.hash;
        if (currentHash) {
            const matchingMainLink = mainNavLinks.find(function (link) {
                return link.getAttribute("href") === currentHash;
            });
            if (matchingMainLink) {
                clearActive(mainNavLinks);
                matchingMainLink.classList.add("active");
                matchingMainLink.setAttribute("aria-current", "location");
            }
            const matchingExperienceLink = experienceNavLinks.find(function (link) {
                return link.getAttribute("href") === currentHash;
            });
            if (matchingExperienceLink) {
                clearActive(experienceNavLinks);
                matchingExperienceLink.classList.add("active");
                matchingExperienceLink.setAttribute("aria-current", "location");
            }
        } else {
            /*
             * Home is active when the page first loads.
             */
            const homeLink = mainNavLinks.find(function (link) {
                return link.getAttribute("href") === "#introduction";
            });
            if (homeLink) {
                clearActive(mainNavLinks);
                homeLink.classList.add("active");
                homeLink.setAttribute("aria-current", "location");
            }
        }
    }
    setInitialActiveState();
});