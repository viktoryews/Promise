let productNameInput = document.querySelector(".productName-input");
let reviewInput = document.querySelector(".review-input");
let addingReview = document.querySelector(".adding-review");
let itemList = document.querySelector("#item-list");

const addProduct = () => {
  let review = {
    product: productNameInput.value,
    review: reviewInput.value,
  };

  let reviewList = JSON.parse(localStorage.getItem("reviewList")) || [];

  reviewList.push(review);

  localStorage.setItem("reviewList", JSON.stringify(reviewList));

  document.querySelector(".productName-input").value = "";
  document.querySelector(".review-input").value = "";

  updateReviewList();
};

addingReview.addEventListener("click", addProduct);

const updateReviewList = () => {

  itemList.innerHTML = "";

  let reviewList = JSON.parse(localStorage.getItem("reviewList")) || [];
  let products = [...new Set(reviewList.map((review) => review.product))];

  products.forEach((product) => {
    let li = document.createElement("li");
    li.textContent = product;
    itemList.appendChild(li);

    const reviewsContainer = document.createElement("div");

    li.addEventListener("click", () => {
      displayReviews(product, reviewsContainer);
    });

    li.appendChild(reviewsContainer);
  });

  function displayReviews(product, container) {

    container.innerHTML = "";

    let reviewList = JSON.parse(localStorage.getItem("reviewList")) || [];

    let filteredReviews = reviewList.filter(
      (review) => review.product === product
    );

    filteredReviews.forEach((review) => {
      const reviewElement = document.createElement("div");
      reviewElement.classList.add("review");

      const productName = document.createElement("h3");
      productName.textContent = review.review;
      reviewElement.appendChild(productName);

      const reviewText = document.createElement("p");
      reviewText.textContent = review.text;
      reviewElement.appendChild(reviewText);

      const deleteButton = document.createElement("span");
      deleteButton.classList.add("delete-button");
      deleteButton.textContent = "Удалить";
      reviewElement.appendChild(deleteButton);

      deleteButton.addEventListener("click", function () {
        deleteReview(review);

        displayReviews(product, container);
      });

      container.appendChild(reviewElement);
    });
  }

  function deleteReview(review) {

    let reviewList = JSON.parse(localStorage.getItem("reviewList")) || [];

    const index = reviewList.findIndex(
      (r) => r.product === review.product && r.text === review.text
    );
    if (index !== -1) {
      reviewList.splice(index, 1);
    }

    localStorage.setItem("reviewList", JSON.stringify(reviewList));
  }
};

updateReviewList();
