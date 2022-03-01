const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
let searchText;

searchBox.addEventListener("keyup", (event) => {
  searchText = event.target.value;
  //   console.log(searchText);
});
searchButton.addEventListener("click", () => {
  console.log(searchText);
  searchMobile();
});

// fatch data
const searchMobile = () => {
  console.log("loading ..");
  fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      displayData(data.data);

      console.log("done ..");
    });
};

// show data

const displayData = (data) => {
  const cardContainer = document.getElementById("cardContainer");

  if (data.length != 0) {
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
