const api = "http://localhost:5000/products";

// Logic button open more opotions on HTML

const BtnShowOptions = document.querySelector(".BtnShow");

const ContainerHide = document.querySelector(".HideSpan");

BtnShowOptions.onclick = OpenMoreOptions;

ContainerHide.style.display = "none";

function OpenMoreOptions(e) {
  ContainerHide.style.display =
    ContainerHide.style.display == "none" ? "block" : "none";
}

//Logic for Responsive Menu Filter and SubFilters

const Open = document.getElementById("FilterButton");
const Close = document.getElementById("CloseButton");
const ShowFilter = document.getElementById("FilterOpen");

Close.onclick = OpenFilter;

Open.onclick = OpenFilter;

ShowFilter.style.display = "none";

const Main = document.querySelector(".ProductBox");
const Footer = document.querySelector("Footer");

function OpenFilter(e) {
  ShowFilter.style.display =
    ShowFilter.style.display == "block" ? "none" : "block";

  if (ShowFilter.style.display == "block") {
    Main.style.display = "none";
    Footer.style.display = "none";
  } else {
    Main.style.display = "block";
    Footer.style.display = "block";
  }
}

const DoneButton = document.getElementById("DoneButton");
const CleanButton = document.getElementById("CleanButton");

DoneButton.onclick = OpenFilter;
CleanButton.onclick = () => location.reload();

const CloseColorButton = document.getElementById("CloseColorButton");
const CloseSizesButton = document.getElementById("CloseSizesButton");
const ClosePricesButton = document.getElementById("ClosePricesButton");

CloseColorButton.onclick = CloseSubFilter;
CloseSizesButton.onclick = CloseSubFilter;
ClosePricesButton.onclick = CloseSubFilter;

const CloseColorSubFilter = document.getElementById("CloseColorSubFilter");
const CloseSizesSubFilter = document.getElementById("CloseSizesSubFilter");
const ClosePricesSubFilter = document.getElementById("ClosePricesSubFilter");

CloseColorSubFilter.style.display = "none";
CloseSizesSubFilter.style.display = "none";
ClosePricesSubFilter.style.display = "none";

function CloseSubFilter(e) {
  switch (e.target.getAttribute("data-target")) {
    case "CloseColorSubFilter":
      CloseColorSubFilter.style.display =
        CloseColorSubFilter.style.display == "block" ? "none" : "block";
      break;
    case "CloseSizesSubFilter":
      CloseSizesSubFilter.style.display =
        CloseSizesSubFilter.style.display == "block" ? "none" : "block";
      break;
    case "ClosePricesSubFilter":
      ClosePricesSubFilter.style.display =
        ClosePricesSubFilter.style.display == "block" ? "none" : "block";
      break;
  }
}

//Logic in Responsive to Open an Menu Filter about ORDER

const OpenOrderByBtn = document.getElementById("OrderByButton");
const CloseOrderByBtn = document.getElementById("CloseOrderByButton");
const ShowOrderBy = document.getElementById("OrderOpenBy");

const MoreRecently = document.getElementById("MoreRecently");
const MaxPrice = document.getElementById("MaxPrice");
const MinPrice = document.getElementById("MinPrice");

MoreRecently.onclick = ordenarFilter;
MaxPrice.onclick = ordenarFilter;
MinPrice.onclick = ordenarFilter;

OpenOrderByBtn.onclick = OpenOrderBy;
CloseOrderByBtn.onclick = OpenOrderBy;

ShowOrderBy.style.display = "none";

function OpenOrderBy(e) {
  ShowOrderBy.style.display =
    ShowOrderBy.style.display == "block" ? "none" : "block";

  if (ShowOrderBy.style.display == "block") {
    Main.style.display = "none";
    Footer.style.display = "none";
  } else {
    Main.style.display = "block";
    Footer.style.display = "block";
  }
}

// Filters logic

var allProducts = [];
var limit = 9;

function getProducts() {
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        allProducts.push(item);
      });
      writeProduts(allProducts, limit);
    })
    .catch((error) => console.log(error));
}

getProducts();

function writeProdut(product) {
  return ` 
  <div class="Product" data-target="${product.color}">
  <figure>
  <img
      class="Image"
      src="${product.image}"
      alt="Camiseta Mescla"
  />
  </figure>
  <p class="TituloCamiseta">${product.name}</p>
  <span class="Values">R$ ${parseFloat(product.price).toFixed(2)}</span>
  <span class="HowManyTimes">até ${product.parcelamento[0]}x de R$${parseFloat(
    product.parcelamento[1]
  ).toFixed(2)}</span>
  <button>Comprar</button>
  </div>`;
}

function writeProduts(arr, limit) {
  let String = "";
  if (limit == 0) limit = arr.length;
  for (let i = 0; i < limit && i < arr.length; i++) {
    const item = arr[i];
    String += writeProdut(item);
  }
  document.getElementById("ProductWrapper").innerHTML = String;
}

let arrAllcolors = [];

const CheckBox = document.querySelectorAll(".CheckBoxColor input");

[].forEach.call(CheckBox, function (div) {
  div.onchange = filterProducts;
});

const ButtonsSizes = document.querySelectorAll(".SizeButton");

[].forEach.call(ButtonsSizes, function (div) {
  div.onclick = filterSize;
});

function filterProducts(e) {
  const color = e.target.id;

  if (arrAllcolors.includes(color)) {
    arrAllcolors = arrAllcolors.filter((item) => item !== color);
  } else {
    arrAllcolors.push(color);
  }

  let i = 0;

  if (arrAllcolors.length > 0) {
    writeProduts(allProducts, allProducts.length);

    const allColorProducts = document.querySelectorAll(".Product");

    let html = "";

    [].forEach.call(allColorProducts, function (product) {
      if (
        arrAllcolors.includes(product.getAttribute("data-target")) &&
        i < limit
      ) {
        i++;
        html += product.outerHTML;
      }
    });

    document.getElementById("ProductWrapper").innerHTML = html;
  } else {
    writeProduts(allProducts, limit);
  }
}

var dummySize = "";

function filterSize(e) {
  const size = e.target.getAttribute("data-target");

  dummySize = dummySize == size ? "" : size;

  if (dummySize == "") {
    writeProduts(allProducts, limit);
    return;
  }

  let html = "";
  let count = 0;

  for (let i = 0; i < limit && count < allProducts.length; i++) {
    const item = allProducts[i];
    if (item.size.includes(size)) {
      count++;
      html += writeProdut(item);
    }
  }
  document.getElementById("ProductWrapper").innerHTML = html;
}

const allPricesFilters = document.querySelectorAll(".Price .InputBox input");

[].forEach.call(allPricesFilters, function (div) {
  div.onclick = filterPrice;
});

var dummyPrice = "0";

function filterPrice(e) {
  const minPrice = +e.target.getAttribute("data-target-min");
  const maxPrice =
    +e.target.getAttribute("data-target-max") == -1
      ? Infinity
      : +e.target.getAttribute("data-target-max");

  dummyPrice = dummyPrice == minPrice ? "" : minPrice;
  if (dummyPrice == "") {
    writeProduts(allProducts, limit);
    return;
  }

  let html = "";
  let count = 0;

  for (let i = 0; i < limit && count < allProducts.length; i++) {
    const item = allProducts[i];
    if (item.price >= minPrice && item.price <= maxPrice) {
      count++;
      html += writeProdut(item);
    }
  }

  document.getElementById("ProductWrapper").innerHTML = html;
}

const btnLoadMore = document.getElementById("btnLoadMore");
btnLoadMore.onclick = loadMore;

function loadMore(e) {
  limit = allProducts.length;
  writeProduts(allProducts, limit);
  btnLoadMore.style.display = "none";
}

const selectOrdenar = document.getElementById("ordenarFiltros");
selectOrdenar.onchange = ordenarFilter;

function ordenarFilter(e) {
  const option = e.target.value || e.target.getAttribute("data-target");

  switch (option) {
    case "1":
      allProducts.sort((a, b) => {
        const auxDateA = a.date.split("-");
        const dateA = new Date(+auxDateA[0], +auxDateA[1] - 1, +auxDateA[2]);

        const auxDateB = b.date.split("-");
        const dateB = new Date(+auxDateB[0], +auxDateB[1] - 1, +auxDateB[2]);

        return dateA - dateB;
      });
      writeProduts(allProducts, limit);
      break;
    case "2":
      allProducts.sort((a, b) => a.price - b.price);
      writeProduts(allProducts, limit);
      break;
    case "3":
      allProducts.sort((a, b) => b.price - a.price);
      writeProduts(allProducts, limit);
      break;
  }

  OpenOrderBy.click();
}
