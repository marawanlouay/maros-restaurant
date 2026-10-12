
/* Maro's Restaurant JavaScript */

/* Get HTML Elements */

const languageButton = document.getElementById("language-toggle");
const searchInput = document.getElementById("menu-search");
const menuCards = document.querySelectorAll(".menu-card");
const categoryButtons = document.querySelectorAll(".category-btn");

const menuTitle = document.getElementById("menu-title");
const heroTitle = document.getElementById("hero-title");
const heroTagline = document.getElementById("hero-tagline");
const heroDescription = document.getElementById("hero-description");
const searchLabel = document.getElementById("search-label");

const footerTagline = document.getElementById("footer-tagline");
const footerLocation = document.getElementById("footer-location");
const footerHours = document.getElementById("footer-hours");
const footerCopyright = document.getElementById("footer-copyright");

const backToTopButton = document.getElementById("back-to-top");

let currentLanguage = "en";


/* Translations */

const translations = {
    en: {
        menuTitle: "Our Menu",
        heroTitle: "Welcome to Maro's Restaurant",
        heroTagline: "Fresh Food, Great Moments",
        heroDescription: "Discover delicious meals made with fresh ingredients.",
        searchLabel: "Search Menu",
        searchPlaceholder: "Search for your favorite dish...",
        footerTagline: "Fresh Food, Great Moments",
        footerLocation: "Nasr City, Cairo, Egypt",
        footerHours: "Open Daily: 12 PM - 12 AM",
        footerCopyright: "© 2026 Maro's Restaurant. All rights reserved.",
        categories: {
            all: "All",
            appetizers: "Appetizers",
            "main-courses": "Main Courses",
            "pizza-burgers": "Pizza & Burgers",
            pasta: "Pasta",
            desserts: "Desserts",
            beverages: "Beverages"
        }
    },

    ar: {
        menuTitle: "قائمة الطعام",
        heroTitle: "أهلاً بيك في مطعم مارو",
        heroTagline: "أكل طازة، ولحظات حلوة",
        heroDescription: "استمتع بأشهى الأكلات المحضرة بمكونات طازجة.",
        searchLabel: "ابحث في المنيو",
        searchPlaceholder: "دور على أكلتك المفضلة...",
        footerTagline: "أكل طازة، ولحظات حلوة",
        footerLocation: "مدينة نصر، القاهرة، مصر",
        footerHours: "مفتوح يوميًا: 12 ظهرًا - 12 منتصف الليل",
        footerCopyright: "© 2026 مطعم مارو. جميع الحقوق محفوظة.",
        categories: {
            all: "الكل",
            appetizers: "المقبلات",
            "main-courses": "الأطباق الرئيسية",
            "pizza-burgers": "البيتزا والبرجر",
            pasta: "المكرونة",
            desserts: "الحلويات",
            beverages: "المشروبات"
        }
    }
};


/* Save English Dish Information */

menuCards.forEach(function (card) {
    const dishName = card.querySelector("h3");
    const dishDescription = card.querySelector(".menu-card-info p");

    card.dataset.nameEn = dishName.textContent.trim();
    card.dataset.descriptionEn = dishDescription.textContent.trim();
});


/* Create Category Headings Automatically */

const menuItems = document.querySelector(".menu-items");

const categoryOrder = [
    "appetizers",
    "main-courses",
    "pizza-burgers",
    "pasta",
    "desserts",
    "beverages"
];

categoryOrder.forEach(function (category) {

    const section = document.createElement("section");
    section.className = "menu-section";
    section.id = "category-" + category;
    section.dataset.category = category;

    const title = document.createElement("h3");
    title.className = "section-title";
    title.textContent = translations.en.categories[category];

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "section-items";

    menuCards.forEach(function (card) {
        if (card.dataset.category === category) {
            itemsContainer.appendChild(card);
        }
    });

    section.appendChild(title);
    section.appendChild(itemsContainer);
    menuItems.appendChild(section);

});


/* Search Functionality */

function filterMenu() {

    const searchText = searchInput.value.toLowerCase().trim();

    menuCards.forEach(function (card) {

        const englishName = (card.dataset.nameEn || "").toLowerCase();
        const arabicName = (card.dataset.nameAr || "").toLowerCase();

        const matchesSearch =
            englishName.includes(searchText) ||
            arabicName.includes(searchText);

        card.style.display = matchesSearch ? "flex" : "none";
    });

    document.querySelectorAll(".menu-section").forEach(function (section) {

        const cards = section.querySelectorAll(".menu-card");

        const hasVisibleCards = Array.from(cards).some(function (card) {
            return card.style.display !== "none";
        });

        section.hidden = !hasVisibleCards;
    });
}

searchInput.addEventListener("input", filterMenu);


/* Category Buttons - Scroll Instead of Filter */

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const category = button.dataset.category;

        /* Clear search and show all dishes */

        searchInput.value = "";
        filterMenu();

        /* Change active button */

        categoryButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        /* Find selected section */

        let target;

        if (category === "all") {
            target = document.getElementById("menu");
        } else {
            target = document.getElementById("category-" + category);
        }

        /* Smooth scroll */

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});


/* Change Website Language */

function changeLanguage() {

    const text = translations[currentLanguage];

    document.documentElement.lang = currentLanguage;

    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";


    /* Main Titles */

    menuTitle.textContent = text.menuTitle;
    heroTitle.textContent = text.heroTitle;
    heroTagline.textContent = text.heroTagline;
    heroDescription.textContent = text.heroDescription;


    /* Search */

    searchLabel.textContent = text.searchLabel;
    searchInput.placeholder = text.searchPlaceholder;


    /* Category Buttons */

    categoryButtons.forEach(function (button) {
        const category = button.dataset.category;
        button.textContent = text.categories[category];
    });


    /* Category Headings */

    document.querySelectorAll(".menu-section").forEach(function (section) {

        const category = section.dataset.category;
        const title = section.querySelector(".section-title");

        title.textContent = text.categories[category];
    });


    /* Menu Cards */

    menuCards.forEach(function (card) {

        const dishName = card.querySelector("h3");
        const dishDescription = card.querySelector(".menu-card-info p");
        const dishImage = card.querySelector("img");

        if (currentLanguage === "ar") {

            dishName.textContent = card.dataset.nameAr;
            dishDescription.textContent = card.dataset.descriptionAr;

        } else {

            dishName.textContent = card.dataset.nameEn;
            dishDescription.textContent = card.dataset.descriptionEn;
        }

        dishImage.alt = dishName.textContent;
    });


    /* Footer */

    footerTagline.textContent = text.footerTagline;
    footerLocation.textContent = text.footerLocation;
    footerHours.textContent = text.footerHours;
    footerCopyright.textContent = text.footerCopyright;


    /* Update Search */

    filterMenu();
}


/* Language Button */

languageButton.addEventListener("click", function () {

    if (currentLanguage === "en") {
        currentLanguage = "ar";
    } else {
        currentLanguage = "en";
    }

    changeLanguage();
});


/* Back to Top Button */

backToTopButton.addEventListener("click", function (event) {

    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* Show / Hide Back to Top */

function toggleBackToTop() {

    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
}

window.addEventListener("scroll", toggleBackToTop);

toggleBackToTop();

/* Initial Search State */

filterMenu();
