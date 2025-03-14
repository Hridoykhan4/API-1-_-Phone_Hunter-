const displayUsers = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  const showAllContainer = document.getElementById("show-all-container");
  if (isShowAll) {
    phones = phones;
  }

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  if (phones.length <= 0) {
    document.getElementById("unavailable-phone").classList.remove("hidden");
    my_modal_7.showModal();
  } else {
    document.getElementById("unavailable-phone").classList.add("hidden");
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
  toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchedData = document.getElementById("search-field").value;
  setTimeout(() => {
    loadPhone(searchedData, isShowAll);
  }, 1000);
};
