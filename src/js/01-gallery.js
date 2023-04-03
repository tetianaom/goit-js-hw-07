import { galleryItems } from "./gallery-items.js";

const listItems = document.querySelector(".gallery");

const createGalleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
    </a>
    </li>`
  )
  .join("");

listItems.insertAdjacentHTML("beforeend", createGalleryMarkup);
listItems.addEventListener("click", onClick);

function onClick(evt) {
  evt.preventDefault();
  const { target } = evt;

  if (!target.classList.contains("gallery__image")) {
    return;
  }

  const instance = basicLightbox.create(
    `
      <div class="modal">
          <img src="${target.dataset.source}" alt="${target.alt}">
          <a>Close</a>
      </div>
  `,

    {
      onShow: () => {
        document.addEventListener("keydown", closeOnEsc);
      },

      onClose: () => {
        document.removeEventListener("keydown", closeOnEsc);
      },
    }
  );

  instance.show();

  function closeOnEsc(e) {
    if (e.code === "Escape" && instance.visible()) {
      instance.close();
    }
  }
}
