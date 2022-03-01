//creating parent div to search a name

let div = document.createElement('div')
div.setAttribute('id','parentDiv')
div.classList.add('container-fluid','row')
document.body.appendChild(div)

let div1 = document.createElement('div')
div1.setAttribute('id','parentDiv1')
div1.classList.add('col-sm-12','col-md-6','col-lg-6','col-xl-6','col-xxl-6','pb-2','mt-2')
document.getElementById('parentDiv').appendChild(div1)


let searchDiv = document.createElement('div')
searchDiv.setAttribute('id','searchDiv')
searchDiv.classList.add('container','border','bordercolor','border-4')
document.getElementById('parentDiv1').appendChild(searchDiv)

//Heading for the project

let title = document.createElement('h1')
title.innerHTML = "<u>Nationalize API</u>"
title.classList.add('text-center','text-warning')
document.getElementById('searchDiv').appendChild(title)



let title1 = document.createElement('h4')
title1.innerHTML = "Search for the Nationality based on the Name"
document.getElementById('searchDiv').appendChild(title1)

//creating inputbox

let form = document.createElement('form')
form.setAttribute('id','form')
form.innerHTML = `<label for="exampleDataList" class="form-label">Datalist example</label>
<input class="form-control" list="datalistOptions" id="searchBox" onkeyup="nationalityApi()" placeholder="Type to search...">
<datalist id="datalistOptions">
  <option value="Jane">
  <option value="Matthew">
  <option value="Michael">
  <option value="Peter">
  <option value="Christ">
  <option value="Pal">
  <option value="Walter">
  <option value="Wass">
  <option value="Ranavad">
  <option value="Andrew">
</datalist>`
document.getElementById('searchDiv').appendChild(form)

let searchBox = document.getElementById('searchBox')
searchBox.classList.add('t-box','textsize')
document.getElementById('form').appendChild(searchBox)



//lable for typing name

let lable1 = document.createElement('label')
lable1.setAttribute('id','info')
lable1.innerHTML = "Related Data will be Displayed Below"
lable1.setAttribute('class','row')
lable1.classList.add('labletext','text-primary')
document.getElementById('searchDiv').appendChild(lable1)

//lable for wrongly typing name

let lable2 = document.createElement('label')
lable2.setAttribute('id','noCountry')
lable2.setAttribute('hidden', 'hidden')
lable2.innerHTML = "This Name is not There!!!"
lable2.setAttribute('class','row')
lable2.classList.add('labletext','text-danger')
document.getElementById('searchDiv').appendChild(lable2)

//creating new div to display fetched data
let div3 = document.createElement('div')
div3.setAttribute('id','parentDiv2')
div3.classList.add('col-sm-12','col-md-6','col-lg-6','col-xl-6','col-xxl-6','mt-2')
document.getElementById('parentDiv').appendChild(div3)


let displayDiv = document.createElement('div')
displayDiv.setAttribute('id','result')
displayDiv.setAttribute("hidden", "hidden")
displayDiv.classList.add('border','border-4','bordercolor')
document.getElementById('parentDiv2').appendChild(displayDiv)

let title2 = document.createElement('h3')
title2.setAttribute('id','resultHeader')
title2.setAttribute("hidden", "hidden")
title2.innerHTML = "Top Two Countries with name"
document.getElementById('result').appendChild(title2)


let searchedData = document.createElement('div')
searchedData.setAttribute('id','searchResults')
document.getElementById('result').appendChild(searchedData)


//to reset after fetch

document.addEventListener("DOMContentLoaded",function() {
    searchBox.value = "";  
})


//function for fetch needed data for the searched name
 
function nationalityApi(){

    //search value when null

    if(searchBox.value.length<1 || searchBox.value===""){
        displayDiv.setAttribute('hidden','hidden')
        lable1.removeAttribute('hidden')
        lable2.setAttribute('hidden','hidden')
    }

    //search value when empty space

    if( searchBox.value.includes(" ")){
        displayDiv.setAttribute('hidden','hidden')
        lable1.removeAttribute('hidden')
        lable2.setAttribute('hidden','hidden')
        alert('Please Type Correct Name');
    }

    //search value when more than one data

    else if(searchBox.value.includes(",")){
     let names = [];
      names = searchBox.value.split(",");
    
      let moreThanOneName = "";
      for(let i of names){
          moreThanOneName += `name[]=${i}&`;
      }
        
     let url = "https://api.nationalize.io/?"+moreThanOneName;
   
        
     function countryList(country){
        let data = document.createElement("div");
            data.className = "countries";
            data.innerHTML =`<p><b>Name - "${searchName}"</b></br>
            Citizenship - ${country.country_id}<br>
            Probability - ${(country.probability)}</p>
            `;
         searchedData.appendChild(data);
   }

   //to display more than one searched name data
       
    let searchName = '';
        function dataAll(array){
            searchedData.innerHTML = "";
            for(let countries of array){
                searchName = countries.name;
                for(let i=0;i<2;i++){
                    if(countries.country.length<1){
                        lable1.setAttribute('hidden','hidden');
                        continue;
                    }
                    else{
                    lable1.setAttribute('hidden','hidden');
                    lable2.setAttribute('hidden','hidden');
                    displayDiv.removeAttribute('hidden');
                    title2.removeAttribute('hidden')
                    title2.textContent = `Top Two Countries with names '${searchBox.value}' are`
                    countryList(countries.country[i]);  
                    }
                }
            }
        }
            
            let name = async function(url){
                try{
                    const response = await fetch(url);
                    const array = await response.json();
                    dataAll(array);
                    console.log(array);
                }
                catch(error){
                    console.log(error.message);
                }
            }
            
            name(url);

        }

    // to display searched name data

    else{
        let url = "https://api.nationalize.io/?name[]="+`${searchBox.value}`;

        
    function countryList(country){
        let count = document.createElement("div");
        count.className = "countries";
        count.innerHTML =`
        <p>Citizenship - ${country.country_id}</p>
        <p>Probability - ${(country.probability)}</p>
        `;
        searchedData.appendChild(count);
    }
            
        
    function dataAll(countries){
        searchedData.innerHTML = "";
        for(let i=0;i<2;i++){
            if(countries.country.length<1){
                lable1.setAttribute('hidden','hidden');
                displayDiv.setAttribute('hidden','hidden');
                lable2.removeAttribute('hidden');
                break;
            }
            else{
            lable1.setAttribute('hidden','hidden');
            lable2.setAttribute('hidden','hidden');
            displayDiv.removeAttribute('hidden');
            title2.removeAttribute('hidden')
            title2.textContent = `Top Two Countries with name '${searchBox.value}' are`
            countryList(countries.country[i]);
            }
        }
    }

        
        let name = async function(url){
            try{
                const response = await fetch(url);
                const array = await response.json();
                dataAll(array[0]);
            }
            catch(error){
                console.log(error.message);
            }
        }
        
        name(url);
    }
    };

