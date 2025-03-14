const loadPhone = async (searchData = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchData ? searchData : ""
    }`
  );
  const data = await res.json();
  displayUsers(data.data, isShowAll);
};

const handleShowAll = () => {
  handleSearch(true);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingContainer = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingContainer.classList.remove("hidden");
  } else {
    loadingContainer.classList.add("hidden");
  }
};

toggleLoadingSpinner(true);
setTimeout(() => {
  loadPhone();
}, 2000);

const handleShowDetail = async (slug_id) => {
  toggleLoadingSpinner(true);
  // Show The Modal
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug_id}`
  );
  const data = await res.json();
  const phones = data.data;
  setTimeout(() => {
    phoneShowDetails(phones);
  }, 1000);
};
const phoneShowDetails = (phone) => {
  console.log(phone);
  show_details_modal.showModal();

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
};
