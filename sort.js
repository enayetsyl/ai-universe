// loading api data intially and hiding see more button
document.addEventListener("DOMContentLoaded", () => {
    loadData();
    const seeMoreButton = document.getElementById("see-more-button");
    seeMoreButton.style.display = "none";
  });
  
  // getting data from api and displaying it in the webpage
  const loadData = async (seemoreclicked, sortByDate = false) => {
    // getting data from api
    const response = await fetch(
      `https://openapi.programming-hero.com/api/ai/tools`
    );
    const data = await response.json();
     ais = data.data.tools;

     console.log(ais[0].published_in)
    // getting display container from html file
    const cardContainer = document.getElementById("display-container");
  
    // clearing the previous data before loading new data
    cardContainer.innerHTML = "";
  
    // activating see more logic
    const seeMoreButton = document.getElementById("see-more-button");
  
    if (ais.length > 6 && !seemoreclicked) {
      ais = ais.slice(0, 6);
      seeMoreButton.style.display = "block";
    } else {
      ais = ais;
      seeMoreButton.style.display = "none";
    }

    if(sortByDate){
        sortDataByDate(); // Sort data if sortByDate is true
    }
  
    // getting individual card from api
    ais.forEach((ai) => {
      // adding new div
      const cardDiv = document.createElement("div");
  
      // adding css for new div
      cardDiv.classList =
        "rounded-2xl border-solid border-2 border-gray-200 bg-white";
  
      // setting dynamic html in new div
      cardDiv.innerHTML = `
      <img src="${ai?.image ? ai.image : "https://www.datanami.com/wp-content/uploads/2023/01/chat_gpt_shutterstock_Ebru-Omer.jpg"}" class="p-6 rounded-2xl"/>
          <p class="p-6 text-black text-center text-2xl font-semibold" >Features</p>
          <p class="pl-6 text-[#585858] text-base font-normal">1. ${
            ai.features[0]
          }</p>
          <p class="pl-6 text-[#585858] text-base font-normal">2. ${
            ai.features[1]
          }</p>
          <p class="pl-6 text-[#585858] text-base font-normal">3. ${
            ai.features[2]
          }</p>
          <hr class="m-6"/>
          <h3 class="text-black text-2xl font-semibold pl-6">${ai.name}</h3>
          <img class="text-right pl-96" src="Frame.svg" alt="" onclick="showDetail('${
            ai.id
          }'); my_modal_3.showModal()">
          <p class="pl-6 pt-4 pb-6 text-[#585858] text-base font-normal">
            <i class="fa-solid fa-calendar-days pr-2"></i>${ai.published_in}</p>
      `;
  
      // appending new div
      cardContainer.appendChild(cardDiv);
    });
  };
  
  // activating see more button
  const seeMore = () => {
    loadData(true);
  };
  
  // activating details arrow button
  
  const showDetail = (ai) => {
    loadDetail(ai);
  };
  
  // loading details from api
  
  const loadDetail = async (ai) => {
    // getting details from api
    const response = await fetch(
      `https://openapi.programming-hero.com/api/ai/tool/${ai}`
    );
    const data = await response.json();
    const details = data.data;
    console.log(details);
  
    // getting modal display container in html
    const modalContainer = document.getElementById("modal-container");
    
    // clearing existing modal content before displaying new modal information
    modalContainer.innerHTML = "";
    
    // creating new div for modal
    const modalDiv = document.createElement("div");
  
    // setting inner html of modal div
    modalDiv.innerHTML = `
    <div class="flex justify-center items-center gap-5 m-32">
    
    <div class="rounded-2xl border border-solid border-[#eb5757] bg-pink-300 bg-opacity-10"> 
    <p class="p-7 text-black font-semibold text-2xl">${details.description}</p>
    <br/>
    <div class="px-7 py-6">
    <span class="bg-white rounded-2xl text-[#03a30a] text-center font-bold p-6">${details.pricing[0].price}</span>
    <span class="bg-white rounded-2xl text-[#f28927] text-center font-bold p-6">${details.pricing[1].price}</span>
    <span class="bg-white rounded-2xl text-[#eb5757] text-center font-bold p-6">${details.pricing[2].price}</span>
    </div>
  
    <div class="flex justify-center items-center gap-3 pb-6 ">
      <div class="px-7">
      <h3 class=" text-black font-semibold text-2xl">Feature</h3>
      <ul>
      <li class="text-[#585858] font-normal">${details.features[1].feature_name}</li>
      <li class="text-[#585858] font-normal">${details.features[2].feature_name}</li>
      <li class="text-[#585858] font-normal">${details.features[3].feature_name}</li>
      </ul>
      </div>
  
  
      <div class="px-7">
      <h3 class=" text-black font-semibold text-2xl">Integrations</h3>
      <ul>
      <li class="text-[#585858] font-normal">${details.integrations[0]}</li>
      <li class="text-[#585858] font-normal">${details.integrations[1]}</li>
      <li class="text-[#585858] font-normal">${details.integrations[2]}</li>
      </ul>
      </div>
  
    </div>
  
  
    </div>
    
    <div class="rounded-2xl border border-solid border-[#e7e7e7]"> 
    <img class="p-6 rounded-2xl" src="${details.image_link[0]}"/>
    <h3 class="text-black text-center text-2xl font-semibold">${details.input_output_examples[0].input}</h3>
    <h3 class="pt-3 pb-6 px-6 text-[#585858] text-center font-normal">${details.input_output_examples[0].output ? details.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</h3>
    </div>
    
    </div>
    
    `;
    // appending modal div in the modal container in html file
    modalContainer.appendChild(modalDiv);
  };
  
  // Sort by Date button
const sortByDateButton = document.getElementById("sort-by-date-button");

// Declare the ais array in a higher scope
let ais = [];

// Event listener for the "Sort by Date" button
document.getElementById("sort-by-date-button").addEventListener("click", () => {
  sortDataByDate();
});

// Function to sort data by date
const sortDataByDate = () => {
  ais.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
  loadData();
};


