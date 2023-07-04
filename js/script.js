// select html elements
const overlayClose = document.querySelector(".overlay-close-icon");
const overlayContainer = document.querySelector(".overlay-container");

// toggle nav menu
const navToggle = document.querySelector(".nav-toggle");
const navSection = document.querySelector(".nav-section");

navToggle.addEventListener("click", () => {
  navSection.classList.toggle("show");
});

// calculate range slide background value
// range track bacground
const totalBacking = document
  .querySelector(".total-backing")
  .textContent.split(",")
  .join("");
const currentBacking = document
  .querySelector(".current-backed")
  .textContent.split(",")
  .join("");

const backedPercent = (currentBacking / totalBacking) * 100;
const rangeSlide = document.querySelector(".range-slide");

rangeSlide.style.background = `linear-gradient(to right,
                            hsl(176, 50%, 47%) 0%,
                            hsl(176, 50%, 47%) ${backedPercent}%,
                            hsl(224, 65%, 95%) 0%,
                            hsl(224, 65%, 95%) 100%)`;

// display modal pledges
// open and close overlay/modal
const backupBtn = document.querySelector(".backup-btn");
const contents = document.querySelector(".contents");
const blurBackground = document.querySelector(".content-blur");
const overlayArticles = document.querySelectorAll(".overlay-articles ");

backupBtn.addEventListener("click", () => {
  contents.classList.add("show");
});

function closeOverlay() {
  overlayArticles.forEach(function (article) {
    article.classList.remove("show-custom-pledge");
  });
  contents.classList.remove("show");
}

overlayClose.addEventListener("click", closeOverlay);
blurBackground.addEventListener("click", closeOverlay);

// select and show custom pledge option
// allow user to input desired pledge amount
overlayArticles.forEach(function (btns) {
  const btn = btns.querySelector(".pledges");
  btn.addEventListener("click", () => {
    overlayArticles.forEach(function (customBtn) {
      if (customBtn !== btns) {
        customBtn.classList.remove("show-custom-pledge");
      }
    });

    btns.classList.add("show-custom-pledge");
  });
});

// show success page upon pledge submition
// show success section
// const overlayArticles2 = document.querySelectorAll(
//   ".overlay-articles.bamboo-stand, .overlay-articles.black-edition, .overlay-articles.mahogany-edition "
// );

// validateCustomInput();
// if statement to validate user-inputs
function validateCustomInput(customForm, pledgeAmount) {
  const errorMsg = customForm.nextElementSibling;
  const amount = customForm.querySelector(".custom-amount");

  if (amount.value == "") {
    errorMsg.textContent = "";
  } else if (!Number(amount.value)) {
    errorMsg.textContent = "Invalid input. Numbers only.";
  } else if (Number(amount.value) > totalBacking) {
    errorMsg.textContent = `Please contact us for donations higher than $${totalBacking}`;
  } else {
    contents.classList.remove("show");
    contents.classList.add("show-success");
  }
  if (Number(amount.value) < pledgeAmount.textContent) {
    errorMsg.textContent = `Minimum pledge is $${pledgeAmount.textContent}`;
  }
}

overlayArticles.forEach(function (customPledge) {
  const customForm = customPledge.querySelector(".custom-pledge-form");
  //   console.log(customForm);
  const pledgeAmount = customPledge.querySelector(".pledge-amount");
  customForm.addEventListener("submit", (e) => {
    e.preventDefault();
    validateCustomInput(customForm, pledgeAmount);
  });
});

//
// bookmark section
const bookmarkContainer = document.querySelector(".bookmark-container");
const bookmarkBtn = document.querySelector(".bookmark-btn");

bookmarkContainer.addEventListener("click", () => {
  bookmarkContainer.classList.toggle("bookmarked");
  if (bookmarkContainer.classList.contains("bookmarked")) {
    bookmarkBtn.textContent = "Bookmarked";
  } else {
    bookmarkBtn.textContent = "Bookmark";
  }
});

//
// zero pledges left
// disable selection when there is no pledge left
const allArticles = document.querySelectorAll(".articles");
allArticles.forEach(function (article) {
  const pledgesLeft = article.querySelector(".pledges-left h1");
  if (pledgesLeft.textContent == 0) {
    article.classList.add("no-pledge-left");
  }
});

//
// select pledges with btn from homepage
const articlesHome = document.querySelectorAll(
  ".about-project .black-edition, .about-project .mahogany-edition, .about-project .bamboo-stand "
);

function selectionBtn(articlesHome, articleName) {
  articlesHome.forEach(function (articleHome) {
    const btn = articleHome.querySelector(".btn");
    btn.addEventListener("click", function () {
      for (i = 1; i < 5; i++) {
        if (articleHome.classList.contains(articleName[i - 1])) {
          overlayArticles[i].classList.add("show-custom-pledge");
        }
      }
      contents.classList.add("show");
    });
  });
}

selectionBtn(articlesHome, [
  "bamboo-stand",
  "black-edition",
  "mahogany-edition",
]);

// return to home
const returnBtn = document.querySelector(".got-it-btn");

returnBtn.addEventListener("click", () => {
  contents.classList.remove("show");
  contents.classList.remove("show-success");
});
