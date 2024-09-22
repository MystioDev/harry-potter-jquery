const questions = [
  {
    question: "Először is, hány gyerek van a Weasley családban?",
    answers: ["3", "5", "7", "9"],
    correct: "7",
  },
  {
    question: "Hol van a Titkok Kamrájának bejárata?",
    answers: [
      "2. emeleti férfi mosdó",
      "2. emeleti női mosdó",
      "3. emeleti férfi mosdó",
      "3. emeleti női mosdó",
    ],
    correct: "2. emeleti női mosdó",
  },
  {
    question: "Az alábbiak közül melyik NEM a Százfűlé-főzet összetevője?",
    answers: [
      "Szárított bumszalagbőr",
      "Bikornis szarv",
      "Fátyolka",
      "Mandragóra",
    ],
    correct: "Mandragóra",
  },
  {
    question: "Milyen fából készült Draco Malfoy varázspálcája?",
    answers: ["Bodzafa", "Tiszafa", "Galagonyafa", "Eperfa"],
    correct: "Galagonyafa",
  },
  {
    question:
      "Mi az ötszámjegyű kód a Mágiaügyi Minisztérium látogatói bejáratához?",
    answers: ["6-4-2-2-4", "6-2-4-4-2", "2-6-4-2-6", "4-2-6-6-4"],
    correct: "6-2-4-4-2",
  },
];

const answers = [
  {
    question: "Először is, hány gyerek van a Weasley családban?",
    answered: null,
  },
  {
    question: "Hol van a Titkok Kamrájának bejárata?",
    answered: null,
  },
  {
    question: "Az alábbiak közül melyik NEM a Százfűlé-főzet összetevője?",
    answered: null,
  },
  {
    question: "Milyen fából készült Draco Malfoy varázspálcája?",
    answered: null,
  },
  {
    question:
      "Mi az ötszámjegyű kód a Mágiaügyi Minisztérium látogatói bejáratához?",
    answered: null,
  },
];

$(document).ready(function () {
  $(".hero-section").css("height", "100vh");

  $(".load-quiz").click(function () {
    $(".hero-section").css("height", "50vh");

    $("body").append(`<main>
      <section class="questions"></section>

      <section class="final">
        <button id="submit">Kiértékel</button>

        <div class="result"></div>
      </section>
    </main>`);

    questions.forEach((element, idx) => {
      $(".questions").append(
        `
                <div class="question-wrapper">
                    <h3 class="question">${idx + 1}. Kérdés <br> ${
          element["question"]
        }</h3>
                    <div class="answers">
                        <button data-source="${
                          element["question"]
                        }" class="answers-button answer-1">${
          element["answers"][0]
        }</button>
                        <button data-source="${
                          element["question"]
                        }" class="answers-button answer-2">${
          element["answers"][1]
        }</button>
                        <button data-source="${
                          element["question"]
                        }" class="answers-button answer-3">${
          element["answers"][2]
        }</button>
                        <button data-source="${
                          element["question"]
                        }" class="answers-button answer-4">${
          element["answers"][3]
        }</button>
                    </div>
                </div>
                `
      );
    });

    $(".answers-button").click(function (e) {
      let sourceQuestion = $(e.currentTarget).data("source");

      questions.forEach((element) => {
        if (element["question"] === sourceQuestion) {
          if (e.currentTarget.textContent === element["correct"]) {
            answers.forEach((item) => {
              if (item["question"] === sourceQuestion) {
                item["answered"] = "correct";
              }
            });
          } else {
            answers.forEach((item) => {
              if (item["question"] === sourceQuestion) {
                item["answered"] = "incorrect";
              }
            });
          }
        }
      });

      $(".alerts").css("right", "10px");

      $(".alerts").html(
        `
        <div class="alert">
            <div class="alert-content">Válasz elmentve <br> 
            <span class="alert-answer">${$(e.currentTarget).text()}</span>
            </div>
        </div>
        `
      );

      setTimeout(() => {
        $(".alerts").css("right", "-1000px");
      }, 1000);
    });

    $("#submit").click(function (e) {
      let resultHtml = "";

      answers.forEach((element) => {
        switch (element["answered"]) {
          case "correct":
            resultHtml += `
                    <div class="result-item">
                        <h2>${element["question"]}</h2>
                        <h2 class="question-result question-result-correct">Helyes</h2>
                    </div>`;
            break;
          case "incorrect":
            resultHtml += `
                    <div class="result-item">
                        <h2>${element["question"]}</h2>
                        <h2 class="question-result question-result-incorrect">Helytelen</h2>
                    </div>`;
            break;
          default:
            resultHtml += `
                    <div class="result-item">
                        <h2>${element["question"]}</h2>
                        <h2 class="question-result question-result-empty">Nincs kitöltve</h2>
                    </div>`;
            break;
        }
      });

      $(".result").html(resultHtml);
      $(e.currentTarget).text("Újraértékel");
    });
  });
});
