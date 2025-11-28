 /* EXPAND SECTION */
    function toggleExpand(id) {
        let section = document.getElementById(id);
        section.style.display = section.style.display === "block" ? "none" : "block";
    }

    /* PROJECT FILTER */
    const tabs = document.querySelectorAll(".tab");
    const cards = document.querySelectorAll(".card");

    function showCategory(cat) {
        cards.forEach(card => {
            card.style.display = card.dataset.category === cat ? "block" : "none";
        });
    }
    showCategory("fiction");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            showCategory(tab.dataset.filter);
        });
    });