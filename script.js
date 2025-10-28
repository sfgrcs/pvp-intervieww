fetch('config.json')
  .then(response => response.json())
  .then(data => {
    const welcome = document.getElementById("welcome");
    const categoriesDiv = document.getElementById("categories");
    const startBtn = document.getElementById("startBtn");

    startBtn.addEventListener("click", () => {
      welcome.style.display = "none";
      categoriesDiv.style.display = "block";
      loadCategories(data.categories);
    });

    function loadCategories(categories) {
      categories.forEach(cat => {
        const catDiv = document.createElement("div");
        catDiv.className = "category";

        const header = document.createElement("div");
        header.className = "category-header";
        header.textContent = cat.title;
        catDiv.appendChild(header);

        const questionsDiv = document.createElement("div");
        questionsDiv.className = "questions";

        cat.questions.forEach((q, i) => {
          const qDiv = document.createElement("div");
          qDiv.className = "question";
          qDiv.textContent = `${i + 1}. ${q}`;
          questionsDiv.appendChild(qDiv);
        });

        header.addEventListener("click", () => {
          questionsDiv.style.display = 
            questionsDiv.style.display === "block" ? "none" : "block";
        });

        catDiv.appendChild(questionsDiv);
        categoriesDiv.appendChild(catDiv);
      });
    }
  })
  .catch(err => console.error("خطأ في تحميل config.json:", err));