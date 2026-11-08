const perfumes = [
  {
    id: 1,
    name: "Amber Midnight",
    type: "Eau de Parfum",
    price: 49.0,
    image: "media/pr1.png",
    description:
      "An intoxicating warm amber base layered with midnight blooming jasmine.",
  },
  {
    id: 2,
    name: "Citrus Breeze",
    type: "Eau de Toilette",
    price: 39.0,
    image: "media/pr2.png",
    description:
      "A fresh citrus blend featuring top notes of Calabrian bergamot.",
  },
  {
    id: 3,
    name: "Ocean Mist",
    type: "Eau de Parfum",
    price: 45.0,
    image: "media/pr3.png",
    description:
      "Deep ocean mineral mist combined with crushed sea salt and cedarwood.",
  },
  {
    id: 4,
    name: "Velvet Bloom",
    type: "Parfum",
    price: 55.0,
    image: "media/pr4.png",
    description:
      "Subtle floral violet and Bulgarian rose petals wrapped in soft white musk.",
  },
  {
    id: 5,
    name: "Golden Vanilla",
    type: "Eau de Parfum",
    price: 52.0,
    image: "media/pr5.png",
    description:
      "Rich Madagascar vanilla infused with warm sandalwood and golden amber.",
  },
  {
    id: 6,
    name: "Wild Iris",
    type: "Eau de Toilette",
    price: 42.0,
    image: "media/pr6.png",
    description:
      "Delicate wild iris blossoms paired with crisp green tea and soft cedar.",
  },
  {
    id: 7,
    name: "Midnight Oud",
    type: "Parfum",
    price: 68.0,
    image: "media/pr7.png",
    description:
      "Exotic smoky oud wood blended with deep patchouli and dark spices.",
  },
  {
    id: 8,
    name: "Solar Blossom",
    type: "Eau de Parfum",
    price: 47.0,
    image: "media/pr8.png",
    description:
      "Bright solar neroli and orange flower with a hint of warm coconut musk.",
  },
];

$(document).ready(function () {
  function renderPerfumes(items) {
    const grid = $("#perfumeGrid");
    grid.empty();

    if (items.length === 0) {
      $("#emptyResult").removeClass("d-none");
      return;
    } else {
      $("#emptyResult").addClass("d-none");
    }

    items.forEach((p) => {
      const cardHtml = `
        <div class="col-md-3 col-sm-6 perfume-item">
          <article class="custom-card p-3 h-100 d-flex flex-column">
            <img src="${p.image}" alt="${p.name}" />
            <h3 class="h5 mt-3">${p.name}</h3>
            <p class="text-muted small mb-2">${p.type}</p>
            <p class="small flex-grow-1">${p.description}</p>
            <span class="price mb-3">$${p.price.toFixed(2)}</span>
            <button class="btn btn-primary btn-sm mt-auto order-btn" data-name="${p.name}">Order Now</button>
          </article>
        </div>
      `;
      grid.append(cardHtml);
    });
  }

  if ($("#perfumeGrid").length) {
    renderPerfumes(perfumes);
  }

  $("#searchInput").on("input", function () {
    const query = $(this).val().toLowerCase();
    const filtered = perfumes.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query),
    );

    $("#perfumeGrid").fadeOut(150, function () {
      renderPerfumes(filtered);
      $(this).fadeIn(150);
    });
  });

  $("#consultationForm").on("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    $(".error-msg").addClass("d-none");
    $(".form-control, .form-select").removeClass("is-invalid");

    const nameVal = $("#fullName").val().trim();
    if (nameVal === "") {
      showError("#fullName", "Please enter your full name.");
      isValid = false;
    }

    const emailVal = $("#email").val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      showError("#email", "Please enter a valid email address.");
      isValid = false;
    }

    const phoneVal = $("#phone").val().trim();
    const phoneRegex = /^\d{10,12}$/;
    if (!phoneRegex.test(phoneVal)) {
      showError("#phone", "Please enter a valid phone number (10-12 digits).");
      isValid = false;
    }

    const dateVal = $("#consultDate").val();
    const selectedDate = new Date(dateVal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (!dateVal || selectedDate < today) {
      showError("#consultDate", "Please select a valid future date.");
      isValid = false;
    }

    const scentVal = $("#scent").val();
    if (scentVal === "") {
      showError("#scent", "Please select a preferred scent.");
      isValid = false;
    }

    if (isValid) {
      $("#successAlert").hide().removeClass("d-none").fadeIn(300);
      $("#consultationForm")[0].reset();

      setTimeout(() => {
        $("#successAlert").fadeOut(300);
      }, 5000);
    }
  });

  function selectorError(selector, message) {
    const el = $(selector);
    el.addClass("is-invalid");
    el.siblings(".error-msg").text(message).removeClass("d-none");
  }

  function showError(selector, message) {
    selectorError(selector, message);
  }
});

let currentSlide = 0;
const slides = $(".banner-slider .banner");

function showSlide(index) {
  slides.eq(currentSlide).fadeOut(300, function () {
    $(this).removeClass("active");

    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }

    slides.eq(currentSlide).addClass("active").fadeIn(300);
  });
}

$("#nextBtn").click(function () {
  showSlide(currentSlide + 1);
});

$("#prevBtn").click(function () {
  showSlide(currentSlide - 1);
});

$(".banner").click(function () {
  const targetUrl = $(this).attr("data-link");
  if (targetUrl) {
    window.location.href = targetUrl;
  }
});
