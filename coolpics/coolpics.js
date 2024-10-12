const menuButton = document.querySelector(".menu-button");

function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("show-menu");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize(){
    const menu = document.querySelector(".navbar");
    if(window.innerWidth > 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}

handleResize();
window.addEventListener("resize", handleResize);

function viewerTemplate(pic, alt) {
    return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${pic}" alt="${alt}">
      </div>`;
  }

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    if (viewer) {
        viewer.remove(); // Remove the viewer from the DOM
    }
}

function viewHandler(event) {
	// create a variable to hold the element that was clicked on from event.target
    const clickedElement = event.target;
	// get the src attribute from that element and 'split' it on the "-"
    const source = clickedElement.getAttribute('src');
    const sourceParts = source.split('-');
	// construct the new image file name by adding "-full.jpeg" to the first part of the array from the previous step
    const fullImageSrc = sourceParts[0] + '-full.jpeg';
	// insert the viewerTemplate into the top of the body element
	// (element.insertAdjacentHTML("afterbegin", htmltoinsert))
    document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullImageSrc, clickedElement.getAttribute('alt')));
	// add a listener to the close button (X) that calls a function called closeViewer when clicked
    const closeButton = document.querySelector('.close-viewer');
    closeButton.addEventListener('click', closeViewer);
}

const galleryImages = document.querySelectorAll('.gallery img');
galleryImages.forEach(img => img.addEventListener('click', viewHandler));
