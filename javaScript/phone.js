const loadPhone = async (searchData = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchData}`
  );
  const data = await res.json();
  const phones = data.data;

  displayUsers(phones, isShowAll);
};

const displayUsers = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `
         <figure>
    <img
      src="${phone.image}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-center">
      <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });
  console.log(phones.length);
  if (phones.length === 0) {
    document.getElementById("unavailable-phone").classList.remove("hidden");
    my_modal_7.showModal();
  } else {
    document.getElementById("unavailable-phone").classList.add("hidden");
  }
  // Hide Loading Spinner
  toggleLoadingSpinner(false);
};

const handleShowDetail = async (id) => {
  toggleLoadingSpinner(true);

  //Load Data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phones = data.data;
  phoneShowDetails(phones);
};

const phoneShowDetails = (phone) => {
  console.log(phone);

  const phoneName = document.getElementById("phone-name");
  phoneName.innerText = `${phone.name}`;

  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
    <img src = "${phone.image}">
    <p><span>Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span>Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span>GPS: </span>${phone?.others?.GPS || "N/A"}</p>
    `;
  toggleLoadingSpinner(false);

  // Show The Detail
  show_details_modal.showModal();
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingContainer = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingContainer.classList.remove("hidden");
  } else {
    loadingContainer.classList.add("hidden");
  }
};
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchValue = document.getElementById("search-field").value;
  loadPhone(searchValue, isShowAll);
};

const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
