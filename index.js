const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const loader = document.getElementById("loader");
const cardContainer = document.getElementById("cardContainer");
const detailButton = document.getElementById("detailButton");
const detailsContainer = document.getElementById("detailsContainer");
const showAllBtn = document.getElementById("showAllBtn");

const toggleElement = (element, state) => {
  element.style.display = state;
};

toggleElement(showAllBtn, "none");
toggleElement(loader, "none");

let searchText;

searchBox.addEventListener("keyup", (event) => {
  searchText = event.target.value;
  //   console.log(searchText);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    detailsContainer.innerHTML = "";
    cardContainer.innerHTML = "";
    searchMobile();
  }
});

// focus the text box
document.addEventListener("keypress", (e) => {
  searchBox.focus();
});

searchButton.addEventListener("click", () => {
  detailsContainer.innerHTML = "";
  cardContainer.innerHTML = "";
  searchMobile();
});

// fatch data
const searchMobile = () => {
  toggleElement(loader, "flex");

  let searchUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(searchUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.data);
      displayData(data.data);
      toggleElement(loader, "none");
    });
};

// show data

const displayData = (data) => {
  if (data.length == 0) {
    console.log("not found");
    cardContainer.innerHTML = "No result found";
  } else {
    if (data.length > 20) {
      toggleElement(showAllBtn, "flex");

      showAllBtn.addEventListener("click", () => {
        showAllProduct(data.slice(20));
      });
    } else toggleElement(showAllBtn, "none");

    data.slice(0, 20).forEach((element) => {
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
          <p class="detailButton"><button onclick="getDetails('${element.slug}')">>Details --></button></p>
        </div>
      
      `;
      card.innerHTML = cardBody;

      cardContainer.appendChild(card);
    });
  }
};

// show all product
const showAllProduct = (data) => {
  console.log("all product");

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
          <p class="detailButton"><button onclick="getDetails('${element.slug}')">>Details --></button></p>
        </div>
      
      `;
    card.innerHTML = cardBody;

    cardContainer.appendChild(card);
    toggleElement(showAllBtn, "none");
  });
};

// detail ui

const getDetails = (slug) => {
  let url = `https://openapi.programming-hero.com/api/phone/${slug}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      showDetails(data.data);
      // console.log(data.data);
    });
};

// show details

const showDetails = (data) => {
  let detailsHTML = `
       <div class="detailImage">
        <img
          src="${data?.image}"
          alt=""
        />
      </div>
      <div class="detailText">
        <p>
      <spam class="textBold">Model : </spam>
      <span class="textUnderline">${data?.name}</span>
    </p>
    <p>
      <spam class="textBold">Brand : </spam>
      <span class="textUnderline">${data?.brand}</span>
    </p>
 
    <p>
      <spam class="textBold">Release Data : </spam>
      <span class="textUnderline">${
        data?.releaseDate ? data?.releaseDate : "No release data announced"
      }</span>
    </p>
    <p>
      <spam class="textBold">Storage : </spam>
      <span class="textUnderline">${data?.mainFeatures?.storage}</span>
    </p>
    <p>
      <spam class="textBold">Display size : </spam>
      <span class="textUnderline">${data?.mainFeatures?.displaySize}</span>
    </p>
    <p>
      <spam class="textBold">ChipSet : </spam>
      <span class="textUnderline">${data?.mainFeatures?.chipSet}</span>
    </p>
    <p>
      <spam class="textBold">Memory : </spam>
      <span class="textUnderline">${data?.mainFeatures?.memory}</span>
    </p>
    <p>
      <spam class="textBold">Sensor : </spam>
      <span class="textUnderline">${data?.mainFeatures?.sensors}</span>
    </p>
    <p>
      <spam class="textBold">WLAN : </spam>
      <span class="textUnderline">${data?.others?.WLAN}</span>
    </p>
    <p>
      <spam class="textBold">Bluetooth : </spam>
      <span class="textUnderline">${data?.others?.Bluetooth}</span>
    </p>

  </div>
   `;
  detailsContainer.innerHTML = detailsHTML;
};
