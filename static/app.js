const Controller = {
  search: async (ev, page = 1) => {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch(`/search?q=${data.query}&page=${page}`);
    const results = await response.json();
    Controller.updateTable(results);
  },

  updateTable: (results) => {
    const table = document.getElementById("table-body");
    const rows = [];
    for (let result of results.data) {
      const formattedResult = result.replace(/(\r\n|\n|\r)/gm, "<br>").replace(/\s\s+/g, " ");
      rows.push(`<tr><td>${formattedResult}</td></tr>`);
    }
    table.innerHTML = rows.join("");

    // Update pagination
    const pagination = document.getElementById("pagination");
    let pages = '';
    for (let i = 1; i <= results.totalPages; i++) {
      pages += `<button onclick="Controller.search(event, ${i})">${i}</button>`;
    }
    pagination.innerHTML = pages;
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", (event) => Controller.search(event));