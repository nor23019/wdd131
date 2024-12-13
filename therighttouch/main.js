import reviews from './reviews.mjs';

document.addEventListener("DOMContentLoaded", () => {
  // Handle form functionality if a form exists
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = form.elements["name"].value;
      const email = form.elements["email"].value;
      const description = form.elements["description"].value;
      const date = form.elements["date"].value;

      const a = document.createElement("a");
      a.href = `sms:5404700359?body=Name: ${name}%0D%0AEmail: ${email}%0D%0ADescription: ${description}%0D%0ADate: ${date}`;
      a.click();
    });
  }

  // Review rendering functionality
  function getRandomListEntry(list) {
    const listLength = list.length;
    const randomIndex = Math.floor(Math.random() * listLength);
    return list[randomIndex];
  }

  function reviewTemplate(review) {
    return `
      <div class="review-text">
          <h3>${review.user}</h3>
          <p>${review.stars}</p>
          <p>${review.text}</p>
      </div>
      <img src="${review.image}" alt="${review.alt}" />
      <div>`;
  }

  function renderReviews(reviewList) {
    const reviewContainer = document.getElementById('review-container');
    if (!reviewContainer) {
      console.warn('Review container not found! Skipping review rendering.');
      return;
    }
    const reviewHTML = reviewList.map(review => reviewTemplate(review)).join('');
    reviewContainer.innerHTML = reviewHTML;
  }

  // Initialize reviews
  function init() {
    if (reviews && Array.isArray(reviews)) {
      const review = getRandomListEntry(reviews);
      renderReviews([review]);
    } else {
      console.error('Reviews data is not loaded or invalid.');
    }
  }

  init();
});
