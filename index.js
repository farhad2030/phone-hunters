const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const loader = document.getElementById("loader");
const cardContainer = document.getElementById("cardContainer");
loader.style.display = "none";

let searchText;

searchBox.addEventListener("keyup", (event) => {
  searchText = event.target.value;
  //   console.log(searchText);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    cardContainer.innerHTML = "";
    searchMobile();
  }
});
searchButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  searchMobile();
});

// fatch data
const searchMobile = () => {
  displayLoader("flex");

  let searchUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      displayData(data.data);
      displayLoader("none");
    });
};

// show data

const displayData = (data) => {
  if (data.length == 0) {
    console.log("not found");
    cardContainer.innerHTML = "No result found";
  } else {
    data.forEach((element) => {
      const card = document.createElement("div");

      card.classList.add("card");
      const cardBody = `
       <img
          src=${element.image}
          alt=""
        />
        <div class="cardText">
          <p class="modelName">Model :${element.phone_name}</p>
          <p class="brandName">Brand : ${element.brand}</p>
          <p class="detailButton"><button>Details --></button></p>
        </div>
      
      `;
      card.innerHTML = cardBody;
      cardContainer.appendChild(card);
    });
  }
};

const displayLoader = (state) => {
  loader.style.display = state;
};
