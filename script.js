var WORD = "Egg";
var INFO = [];
const mealList = document.querySelector(".meals");
const showMeal = document.querySelector(".showMeal");



mealList.style.display = "none";

document.getElementById("mainForm").addEventListener("submit", (e)=>{
    e.preventDefault()
    WORD = document.getElementById("searchInput").value;
    showMeal.style.display = "none";
    fetchData();
})


function fetchData(){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${WORD}`)
    .then((response) => response.json())
    .then((data) => {
    INFO = data;
    start();
})
.catch(()=>{
    alert("Geen resultaten voor " + WORD)
})
}



function start(){
    mealList.innerHTML = "";
    mealList.style.display = null;
    var meals = INFO.meals;
    console.log(meals);
    for(var i = 0; i < meals.length; i++){
        const thumbnail = meals[i].strMealThumb;
        const meal = document.createElement("div");
        const mealPic = document.createElement("div");
        const mealTitle = document.createElement("div");
        meal.classList.add("meal");
        meal.id = `meal-${i}`;
        mealPic.classList.add("meal-pic");
        mealTitle.classList.add("meal-title");
        mealPic.style.setProperty("background", `url(${thumbnail}/preview)`)
        mealPic.style.backgroundSize = "cover";
        mealPic.style.backgroundPosition = "center";
        mealTitle.innerText = meals[i].strMeal;
        meal.append(mealPic);
        meal.append(mealTitle);
        mealList.append(meal);
        meal.addEventListener("click", () => {
            document.getElementById("back-button").style.display = "block";
            window.scrollTo(0,0);
           var mealID = meal.id.split("-")[1];
           mealList.style.display = "none";
           showMeal.innerHTML = "";
           showMeal.style.display = "flex";
            const title = document.createElement("div");
            const picture = document.createElement("div");
            const ingredients = document.createElement("div");
            const instructions = document.createElement("div");
            const ingredientsTopTitle = document.createElement("div");
            const instructionsTopTitle = document.createElement("div");
            const youtubeVideoLink = document.createElement("a");

            title.classList.add("showMeal-title");
            picture.classList.add("showMeal-picture")
            ingredients.classList.add("showMeal-ingredients");
            instructions.classList.add("showMeal-instructions");
            ingredientsTopTitle.classList.add("ingredient-top-title");
            instructionsTopTitle.classList.add("instructions-top-title");
            youtubeVideoLink.classList.add("youtube-video-link");

            title.innerText = meals[mealID].strMeal;

            picture.style.setProperty("background", `url(${meals[mealID].strMealThumb})`);
            picture.style.backgroundSize = "cover";
            picture.style.backgroundPosition = "center";

            const ingredientsList = [];
            const ingredientsMeasure = [];
            for(var x = 1; x < 21; x++){
                const ingredient = `strIngredient${x}`;
                const measure = `strMeasure${x}`;
                if(meals[mealID][ingredient] != ""){
                    ingredientsList.push(meals[mealID][ingredient]);
                    ingredientsMeasure.push(meals[mealID][measure])
                }
                
            }
            ingredientsTopTitle.innerText = "Ingredients";
            instructionsTopTitle.innerText = "Instructions";
            
            for(var x = 0; x < ingredientsList.length; x++){
                const ingredient = document.createElement("div")
                const ingredientPicture = document.createElement("div");
                const ingredientTitle = document.createElement("div");

                ingredient.classList.add("ingredient");
                ingredientPicture.classList.add("ingredient-picture");
                ingredientTitle.classList.add("ingredient-title");

                ingredientPicture.style.setProperty("background",
                 `url(https://www.themealdb.com/images/ingredients/${ingredientsList[x].replace(new RegExp(' ', 'g'), "%20")}-Small.png)`);

                ingredientPicture.style.backgroundSize = "cover";
                ingredientPicture.style.backgroundPosition = "center";

                ingredientTitle.innerText = ingredientsMeasure[x] + " " + ingredientsList[x];

                ingredient.append(ingredientPicture);
                ingredient.append(ingredientTitle);
                ingredients.append(ingredient);
            }
            youtubeVideoLink.innerHTML = "Click here to watch a video on youtube"
            youtubeVideoLink.setAttribute("href", meals[mealID].strYoutube);
            instructions.innerHTML = meals[mealID].strInstructions;

            showMeal.append(title);
            showMeal.append(picture);
            showMeal.append(ingredientsTopTitle)
            showMeal.append(ingredients);
            showMeal.appendChild(instructionsTopTitle)
            showMeal.append(instructions);
            showMeal.append(youtubeVideoLink);

        })
    }
}

document.getElementById("back-button").addEventListener("click", ()=>{
    showMeal.style.display = null;
    mealList.style.display = null;
    showMeal.innerHTML = "";
    document.getElementById("back-button").style.display = "none";
})