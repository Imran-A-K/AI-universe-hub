function loadData(){
  toggleSpinner(true);
    const url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then((response) => response.json())
    .then((fullData) => {
        
        showAllData(fullData.data.tools.slice(0,6))
    })    
}
loadData();
const showAllButton = document.getElementById('showAllButton');
const showAllButtonByDate = document.getElementById('showAllButton-byDate')
showAllButton.addEventListener('click', function(){
  toggleSpinner(true);
  const url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then((response) => response.json())
    .then((fullData) => {
        
        showAllData(fullData.data.tools)
    });
    showAllButton.classList.add('d-none');
    
})
showAllButtonByDate.addEventListener('click', function(){
  toggleSpinner(true);
  const url = 'https://openapi.programming-hero.com/api/ai/tools'
    fetch(url)
    .then((response) => response.json())
    .then((fullData) => {
      const fullDataStorage = [...fullData.data.tools]
      const sortDataByDate = fullDataStorage.sort(sortByDate)
        showAllData(sortDataByDate)
    });
  showAllButtonByDate.classList.add('d-none');
  
})

function showAllData(data){
const cardContainer = document.getElementById('card-container');
cardContainer.innerHTML = ``;
data.forEach(element => {
    const featuresList = document.createElement('ol');
    featuresList.innerHTML = ``
    element.features.forEach((feature) => {
        featuresList.innerHTML += `<li style = "list-style-type:number;">${feature}</li>`
    })
    cardContainer.innerHTML += `
    <div class="col">
    <div class="card h-100">
      <img src="${element.image}" class="card-img-top container rounded-5 px-3 py-4" alt="...">
      <div class="card-body border-bottom">
        <h5 class="card-title fw-bolder">Features</h5>
        ${featuresList.innerHTML}
      </div>
      <div class="card-footer d-flex justify-content-between">
        <div>
        <h3>${element.name}</h3>
        <div class="d-flex align-items-center gx-3">
        <i class="fa-regular fa-calendar-days px-1"></i>
        <p class="m-0 px-1">${element.published_in}</p>
        </div>
        </div>
        <div class="d-flex align-items-center">
        <i onclick="fetchIdData('${element.id}')" class="fa-solid fa-arrow-right btn btn-danger " data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
        </div>
      </div>
    </div>
  </div>
    `;  
    toggleSpinner(false);
});

}

async function fetchIdData(id){
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  const response = await fetch(url)
  const idFullData = await response.json()
  displayIdData(idFullData.data);
  
}
function displayIdData(data){
  const modalImageDiv = document.getElementById('modal-image');
  
  
  if(data.accuracy.score == null){
    modalImageDiv.innerHTML = `
    <img src="${data.image_link[0]}" class="img-fluid rounded-4" alt="...">
    `
  }
  else{
    const accuracy = (Number(data.accuracy.score) * 100).toFixed(0)
    
    modalImageDiv.innerHTML = `
    <img src="${data.image_link[0]}" class="img-fluid rounded-4" alt="...">
    <div class="position-absolute top-10 end-10 bg-danger text-white p-2 rounded-2 ">${accuracy + "% accuracy " }</div>
    `
  }
  const inputDiv = document.getElementById('input-output');
  const featuresList = document.createElement('ul');
  const integrationsList = document.createElement('ul');
  featuresList.innerHTML = ``;
  integrationsList.innerHTML = ``;
  inputDiv.innerHTML = ``;
  
if(data.features == null){
  featuresList.innerHTML = `No features to display`;
}
else{
  for(const feature in data.features){
    featuresList.innerHTML += `<li>${data.features[feature].feature_name}</li>`
  }
}
if(data.integrations == null){
integrationsList.innerHTML = `No data found`
}
else{
  data.integrations.forEach(integration =>{
    integrationsList.innerHTML += `<li>${integration}</li>`
  })
}

  inputDiv.innerHTML = `
  <h5  class="card-title text-center">${data.input_output_examples != null ? data.input_output_examples[0].input : 'Can you give any example?'}</h5>
                
  <p  class="text-center">${data.input_output_examples != null ? data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</p>
  `
  const aiDescriptionDiv = document.getElementById('ai-description');

  aiDescriptionDiv.innerHTML = ``
  
  aiDescriptionDiv.innerHTML = `
  <h5 class="text-start pt-2 pb-3">${data.description}</h5>
                <div class="row row-cols-1 row-cols-md-3 g-4 justify-content-around pb-4 pt-2">
                  <div class="col d-flex align-items-center bg-light-subtle mx-1 w-25 py-3 rounded-2 justify-content-center pricing-width">
                    <h5 class="text-success fw-bolder text-center m-0">${data.pricing != null ? data.pricing[0].price != 0 ? data.pricing[0].price + '<br>' + data.pricing[0].plan : 'Free of cost/' + '<br>' + 'Basic' : 'Free of cost/' + '<br>' + 'Basic'}</h5>
                  </div>
                  <div class="col d-flex align-items-center bg-light-subtle mx-1 w-auto py-3 px-2 justify-content-center rounded-2 pricing-width">
                    <h5 class="text-warning fw-bolder text-center m-0">${data.pricing != null ? data.pricing[1].price ? data.pricing[1].price + '<br>' + data.pricing[1].plan : 'Free of cost/' + '<br>' + 'Pro' : 'Free of cost/' + '<br>' + 'Pro'}</h5>
                  </div>
                  <div class="col d-flex align-items-center bg-light-subtle mx-1 w-25  py-3 rounded-2 justify-content-center pricing-width">
                    <h5 class="text-danger fw-bolder text-center m-0">${data.pricing != null ? data.pricing[2].price ? data.pricing[2].price + '<br>' + data.pricing[2].plan : 'Free of cost/' + '<br>' + 'Enterprise' : 'Free of cost/' + '<br>' + 'Enterprise'}</h5>
                  </div>
                </div>
                <div class="row row-cols-1 row-cols-md-2 g-4 ">
                  <div class="col">
                     <h5>Features</h5>
                     <ul>
                     ${featuresList.innerHTML}
                     </ul>
                  </div>
                  <div class="col">
                     <h5>Integrations</h5>
                     <ul>
                     ${integrationsList.innerHTML}
                     </ul>
                  </div>
                </div>
  `
}

const sortByDateButton = document.getElementById('sortByDateButton');
sortByDateButton.addEventListener('click',function(){

  const url = 'https://openapi.programming-hero.com/api/ai/tools'
  fetch(url)
  .then((response) => response.json())
  .then((fullData) => {
      const fullDataStorage = [...fullData.data.tools]
      const sortDataByDate = fullDataStorage.sort(sortByDate)
      
      showAllData(sortDataByDate.slice(0,6));
  }) 
  showAllButton.classList.add('d-none');
  showAllButtonByDate.classList.remove('d-none');
  sortByDateButton.classList.add('d-none')
})
function sortByDate(a, b) {
  
  return new Date(a.published_in).valueOf() - new Date(b.published_in).valueOf(); 
}

function toggleSpinner(loading){
  const spinner = document.getElementById('spinner');

  if(loading){
    spinner.classList.remove('d-none')
  }
  else{
    spinner.classList.add('d-none')
  }
}