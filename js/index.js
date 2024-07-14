/// <reference types="../@types/jquery" />
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
let row =document.getElementById("row");
let icon=document.getElementById("icon");


const widthNav= $(".nav").outerWidth(true)
   console.log(widthNav);

   $(".nav-bar").animate({left:-widthNav})
   let isopen=false
 $(".nav-bar .icon-O-P").on("click",function(){
console.log("hi");

    $(this).parent().parent().animate({left: isopen?-widthNav:0},420)
    isopen=!isopen;

    
 })

 $(".sizee").on("click",function(){
    getCategories()
 })

//start icon-up
$('.up-icon').on( "click",function () {

    $("html, body").animate({scrollTop:0},500)

    
});
// end icon-up

// start navbarOpenOrClose
 $(".nav-bar i.icon-O-P").on("click",function(){
    if ($(".nav-bar").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})



function openNav() {
    $(".nav-bar").animate({ left: 0}, 500)
    $(".icon-O-P").removeClass("fa-align-justify");
    $(".icon-O-P").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".link li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }

}

function closeNav() {
    $(".icon-O-P").addClass("fa-align-justify");
    $(".icon-O-P").removeClass("fa-x");
    $(".link li").animate({top: 300}, 500)
}
$(".link li").on("click",function(){
    $(".nav-bar").animate({left:-widthNav})
})


// end navbarOpenOrClose


$(document).ready(() => {
    searchByName("").then(() => {
    
        $(".inner-loading-screen").hide()

        $("body").css("overflow", "visible")

    })
})



//start//وcategoriesاخد الاسماء من  getCategoryMeals 

async function getCategories() {
    document.querySelector("#row").innerHTML=""
    $(".inner-loading-screen").fadeIn(400)
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
console.log(response.categories);
    displayCategories(response.categories)
    $(".inner-loading-screen").fadeOut(400)
 
}

function displayCategories(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3  col-sm-6">
                <div onclick="getCategoryMeal('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-dark p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    document.querySelector("#row").innerHTML=cartona;
};

// end // getCategoryMeals واخد الاسماء من categories
//Filter by Category
async function getCategoryMeal(CategoryName) {
    document.querySelector("#row").innerHTML=""
    $(".inner-loading-screen").fadeIn(400)

    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategoryName}`)
    res = await res.json()
console.log(res.meals);

    displayMeals(res.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(400)

}

function displayMeals(arr) {
    let cartona = "";

    for (let i = 0; i < arr.length; i++) {
        cartona += `
        <div class="col-md-3  col-sm-6">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 text-dark  cursor-pointer">
                    <img class="w-100 " src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-dark p-2 cursor-pointer">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    row.innerHTML = cartona
}



// List all Categories, Area, Ingredients قايمة بجميع الفئات الى اقدر استخدمها
// وهنادى عليها وبعدين واقفلها
async function getArea() {
    document.querySelector("#row").innerHTML=""
    $(".inner-loading-screen").fadeIn(400)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(400)

}


function displayArea(area) {
    let cartoona = "";

    for (let i = 0; i < area.length; i++) {
        cartoona += `
        <div class="col-md-3  col-sm-6 cursor-pointer">
                <div onclick="getAreaMeals('${area[i].strArea}')" class="rounded-2 text-center text-white cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${area[i].strArea}</h3>
                </div>
        </div>
        `
    }

    row.innerHTML = cartoona
}
async function getAreaMeals(area) {
    document.querySelector("#row").innerHTML=""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

// 
// start
// List all Categories, Area, Ingredients  (i=list)
async function getIngredients() {
    document.querySelector("#row").innerHTML=""

    $(".inner-loading-screen").fadeIn(400)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 15))
    $(".inner-loading-screen").fadeOut(400)

}


function displayIngredients(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3  col-sm-6">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center text-white cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,15).join(" ")}</p>
                </div>
        </div>
        `
    }

    row.innerHTML = cartoona
}
// Filter by multi-ingredient (only available to Paypal supporters)
async function getIngredientsMeals(ingredients) {
    document.querySelector("#row").innerHTML=""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 15))
    $(".inner-loading-screen").fadeOut(400)

}
/////////////////////////////////////////////////////////////////////////////


async function getMealDetails(mealID) {
    closeNav()
    document.querySelector("#row").innerHTML=""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";
    let carto = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            carto += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
   
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${carto}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

            row.innerHTML =cartona
        }


// Search meal by name
function SearchInputs() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search meal by name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search meals by first letter">
        </div>
    </div>`

       document.querySelector("#row").innerHTML=""

}

async function searchByName(search) {
    closeNav()
       document.querySelector("#row").innerHTML=""

    $(".inner-loading-screen").fadeIn(400)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    response = await response.json()
    if (response.meals){
        displayMeals(response.meals)
    }else{
        displayMeals([])
    }
  
    $(".inner-loading-screen").fadeOut(400)

}
// List all meals by first letter
async function searchByFLetter(search) {
    closeNav()
       document.querySelector("#row").innerHTML=""

    $(".inner-loading-screen").fadeIn(400)
    if (search == ""){
     search = "a"
    }
     else{
    ""
    }

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(400)

}

 
// input,alert.Validation//////////////////////////////////////////////////////////////////

let nameinput = false;
let emailName = false;
let phoneinp = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;



function Validation() {
    if (nameinput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailName) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneinp) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&emailValidation() &&phoneValidation() && ageValidation() &&passwordValidation() &&repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-z0-9_-]{3,15}$/.test(document.querySelector("#nameInput").value))
}

function emailValidation() {
    return (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(document.querySelector("#emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.querySelector("#phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.querySelector("#ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(document.querySelector("#passwordInput").value))
}

function repasswordValidation() {
    return document.querySelector("#repasswordInput").value == document.querySelector("#passwordInput").value
}

function Contacts() {
    row.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
           
                <input id="nameInput" onkeyup="Validation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger d-none w-100 mt-2">
                The requested name is incorrect
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="Validation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger d-none w-100 mt-2">
                The requested email is incorrect
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="Validation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger d-none w-100 mt-2">
                The requested Phone Number is incorrectPhone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="Validation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger d-none w-100 mt-2">
                For an invalid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="Validation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger d-none w-100 mt-2">
                The password is incorrect
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="Validation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger d-none w-100 mt-2">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `

    submitBtn = document.getElementById("submitBtn")
    document.getElementById("nameInput").addEventListener("focus",function(){nameinput = true})
    document.getElementById("emailInput").addEventListener("focus",function(){ emailName = true })
    document.getElementById("phoneInput").addEventListener("focus",function(){ phoneinp = true})
    document.getElementById("ageInput").addEventListener("focus",function(){ ageInputTouched = true})
    document.getElementById("passwordInput").addEventListener("focus",function(){ passwordInputTouched = true})
    document.getElementById("repasswordInput").addEventListener("focus",function(){ repasswordInputTouched = true})
}
