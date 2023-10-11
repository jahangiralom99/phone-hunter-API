function loadPhone(searchText, isShowAll) {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data, isShowAll));
}

function displayPhone(phones, isShowAll) {
  const divContainer = document.getElementById("phone-container");
  divContainer.innerText = "";
  // 12 phone besi hole button dekheabo
  const btnShowAll = document.getElementById("btn-show-all");
  if (phones.length > 12 && !isShowAll) {
    btnShowAll.classList.remove("hidden");
  } else {
    btnShowAll.classList.add("hidden");
  }

  // array slice for show 12 array /
  // display only first 12 phones if not show all
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // loop for array
  for (const item of phones) {
    //   console.log(item);
    const div = document.createElement("div");
    div.classList = "card bg-base-100 shadow-xl border-2";
    div.innerHTML = `
    <figure class="p-4">
       <img src=${item.image} alt="Shoes" class="rounded-xl" />
   </figure>
    <div class="card-body items-center text-center">
        <h2 class="card-title font-bold">${item.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered</p>
        <div class="card-actions">
            <button onclick="handleShowDetails('${item.slug}')" class="btn text-white bg-[#267bfa] hover:bg-[#1c57ae]">Show Details</button>
        </div>
    </div>
     `;
    divContainer.appendChild(div);
  }
  loadingSpinner(false);
}

// handle button click
const handleSearch = (isShowAll) => {
  loadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const field = searchField.value;
  // top function load data
  loadPhone(field, isShowAll);
};

// loader Spinner
const loadingSpinner = (isLoader) => {
  const loadingSpinner = document.getElementById("loader-spinner");
  if (isLoader) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// show All element when you click on the show All button.
const handleShowAll = () => {
  handleSearch(true);
};

// handleShowDetails btn
const handleShowDetails = async (id) => {
    loadingSpinner(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    displayModalShow(data.data)
};

// show Modal data display 
const displayModalShow = (phone) => {
    my_modal_5.showModal();
    console.log(phone);
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
            <div class="flex justify-center items-center">
                <img src="${phone.image}" alt="">
            </div>
            <h4 class="text-2xl font-bold mt-4">${phone.name}</h4>
            <p><span class = "font-bold">Storage:</span> <span class="text-[#706F6F]">${phone.mainFeatures.storage}</span> </p>
            <p><span class = "font-bold">Display Size:</span> <span class="text-[#706F6F]">${phone.mainFeatures.displaySize}</span> </p>
            <p><span class = "font-bold">ChipSet:</span> <span class="text-[#706F6F]">${phone.mainFeatures.chipSet}</span> </p>
            <p><span class = "font-bold">Memory:</span> <span class="text-[#706F6F]">${phone.mainFeatures.memory}</span> </p>
            <p><span class = "font-bold">Slug:</span> <span class="text-[#706F6F]">${phone.slug}</span> </p>
            <p><span class = "font-bold">Release data:</span> <span class="text-[#706F6F]">${phone.releaseDate}</span> </p>
            <p><span class = "font-bold">GPS:</span> <span class="text-[#706F6F]">${phone.mainFeatures.sensors}</span> </p>

    `;
    loadingSpinner(false)
}