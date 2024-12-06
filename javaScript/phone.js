const loadPhone = async(searchData) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchData}`);
    const data = await res.json();
    const phones = data.data
    displayUsers(phones)
}

const displayUsers = phones => {
    console.log(phones.length)
    
    const showAll = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAll.classList.remove('hidden')
        phones = phones.slice(0,12)
    }else{
        showAll.classList.add('hidden')

    }

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
         <figure>
    <img
      src="${phone.image}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
        `
        phoneContainer.appendChild(phoneCard)
    })
}

const handleSearch2 = () => {
    const searchField = document.getElementById('search-field2');
    const searchValue = searchField.value;
    loadPhone(searchValue)
}
  
const handleSearch = () => {
    const searchField = document.getElementById('search-field');
    const searchValue = searchField.value;
    loadPhone(searchValue)
}