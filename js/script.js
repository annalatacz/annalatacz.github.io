document.addEventListener("DOMContentLoaded", function () {

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    function getYearsSince(startYear, startMonth) {
        const startDate = new Date(startYear, startMonth);
        const now = new Date();

        let years = now.getFullYear() - startDate.getFullYear();

        if (now.getMonth() < startDate.getMonth()) {
            years--;
        }

        return years;
    }

    const softwareYears = document.getElementById("softwareYears");

    if (softwareYears) {
        softwareYears.textContent = getYearsSince(2015, 9);
    }

    const developerYears = document.getElementById("developerYears");

    if (developerYears) {
        developerYears.textContent = getYearsSince(2019, 9);
    }

});