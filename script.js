
const photos = [
  {
    title: "Mountain Escape",
    category: "nature",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "City Architecture",
    category: "city",
    url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Into the Wild",
    category: "wildlife",
    url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Ocean Waves",
    category: "nature",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Urban Dreams",
    category: "city",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Forest Trails",
    category: "nature",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Wild Beauty",
    category: "wildlife",
    url: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Modern Lines",
    category: "city",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80"
  },
  {
    title: "Golden Sunrise",
    category: "nature",
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=80"
  }
];

const gallery = document.getElementById("gallery");
const empty = document.getElementById("empty");
const lightbox = document.getElementById("lightbox");
const fullImage = document.getElementById("fullImage");
const imageTitle = document.getElementById("imageTitle");
const imageCount = document.getElementById("imageCount");

let currentPhotos = [...photos];
let currentIndex = 0;
let lastFocused = null;

function renderGallery() {
  gallery.innerHTML = "";

  empty.hidden = currentPhotos.length > 0;

  currentPhotos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "photo";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${photo.title}`);

    const img = document.createElement("img");
    img.src = photo.url;
    img.alt = photo.title;
    img.loading = "lazy";

    const info = document.createElement("div");
    info.className = "photo-info";

    const title = document.createElement("h3");
    title.textContent = photo.title;

    const category = document.createElement("p");
    category.textContent = photo.category;

    info.append(title, category);
    card.append(img, info);

    card.addEventListener("click", () => openLightbox(index));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });

    gallery.appendChild(card);
  });
}

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")
      ?.classList.remove("active");

    button.classList.add("active");

    const category = button.dataset.category;

    currentPhotos = category === "all"
      ? [...photos]
      : photos.filter(photo => photo.category === category);

    renderGallery();
  });
});

function openLightbox(index) {
  currentIndex = index;
  lastFocused = document.activeElement;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  showImage();
  document.getElementById("close").focus();
}

function showImage() {
  const photo = currentPhotos[currentIndex];

  fullImage.src = photo.url;
  fullImage.alt = photo.title;
  imageTitle.textContent = photo.title;
  imageCount.textContent =
    `${currentIndex + 1} / ${currentPhotos.length}`;
}

function moveImage(direction) {
  currentIndex =
    (currentIndex + direction + currentPhotos.length)
    % currentPhotos.length;

  showImage();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  fullImage.src = "";
  lastFocused?.focus();
}

document.getElementById("prev").addEventListener("click", () => {
  moveImage(-1);
});

document.getElementById("next").addEventListener("click", () => {
  moveImage(1);
});

document.getElementById("close").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveImage(-1);
  if (event.key === "ArrowRight") moveImage(1);
});

renderGallery();
