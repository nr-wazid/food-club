const foodsContainer = document.getElementById("food-section");
const recipeDiv = document.getElementById("recipe");

const searchFood = () => {
	const searchInput = document.getElementById("searchInput").value.trim();
	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`)
		.then((res) => res.json())
		.then((data) => showFood(data.meals))
		.catch((err) => showError());
	recipeDiv.innerHTML = null;
	foodsContainer.innerHTML = null;
};

//Display Matched Food
const showFood = (foods) => {
	//Search Food Found
	if (foods != null) {
		foods.forEach((food) => {
			const foodDiv = document.createElement("div");
			const foodCard = `
            <div onclick = "foodDetails('${food.strMeal}')">
                <img src="${food.strMealThumb}">
                <h4 class = "py-4">${food.strMeal}</h4>
            </div>
            `;
			foodDiv.className = "food-card";
			foodDiv.innerHTML = foodCard;

			foodsContainer.appendChild(foodDiv);
			console.log(food);
		});
	} else {
		showError();
	}
};
//Error Display
const showError = () => {
	const foodDiv = document.createElement("div");
	const foundZero = `
            <div id="error" class = "m-5 p-5">
                <h2 class = "display-1">\"Nothing found in our Collection\"</h2>
            <div>
        `;
	foodDiv.innerHTML = foundZero;
	foodsContainer.appendChild(foodDiv);
};

const foodDetails = (foodName) => {
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
	fetch(url)
		.then((res) => res.json())
		.then((data) => foodRecipe(data.meals[0]));
};

//Food Ingredients Display
const foodRecipe = (recipe) => {
	recipeDiv.innerHTML = `
        <img src="${recipe.strMealThumb}" class = "img-fluid pt-1">
        <h4 class = "fs-2 py-2">${recipe.strMeal}</h4>
        <p class = "fs-5 fw-bold">Ingredients</p>
        <ul class="list-group p-2">         
            <li class="list-group-item">${recipe.strIngredient1}</li>
            <li class="list-group-item">${recipe.strIngredient2}</li>
            <li class="list-group-item">${recipe.strIngredient3}</li>
            <li class="list-group-item">${recipe.strIngredient4}</li>
            <li class="list-group-item">${recipe.strIngredient5}</li>
            <li class="list-group-item">${recipe.strIngredient6}</li>
        </ul>
    `;
};
