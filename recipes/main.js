import recipes from './recipes.mjs';

function getRandomListEntry(list) {
    const listLength = list.length;
    const randomIndex = Math.floor(Math.random() * listLength);
    return list[randomIndex];
}

function recipeTemplate(recipe) {
    return `
    <img class="recipe-image" src="${recipe.image}" alt="image of ${recipe.name}"/>
    <div>
        <h3 class="tag">${recipe.tags[0] || 'Recipe'}</h3>
        <h2 class="recipe-name">${recipe.name}</h2>
        <span
            class="rating"
            role="img"
            aria-label="Rating: ${recipe.rating} out of 5 stars"
        >
            ${'⭐'.repeat(Math.floor(recipe.rating))}${'☆'.repeat(5 - Math.floor(recipe.rating))}
        </span>
        <p class="recipe-description">${recipe.description}</p>
    </div>`;
}

function renderRecipes(recipeList) {
    const recipeContainer = document.getElementById('recipe-container');
    if (!recipeContainer) {
        console.error('Container element with id="recipe-container" not found!');
        return;
    }
    const recipeHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    recipeContainer.innerHTML = recipeHTML;
}

function filterRecipes(query) {
    return recipes
        .filter(recipe => {
            return (
                recipe.name.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.tags.find(tag => tag.toLowerCase().includes(query)) ||
                recipe.recipeIngredient.find(ingredient => ingredient.toLowerCase().includes(query))
            );
        })
        .sort((a, b) => a.name.localeCompare(b.name)); 
}

function searchHandler(e) {
    e.preventDefault(); 
    const searchInput = document.getElementById('search-bar').value.toLowerCase();
    const filteredRecipes = filterRecipes(searchInput);
    renderRecipes(filteredRecipes);
}

const searchButton = document.getElementById('search');
searchButton.addEventListener('click', searchHandler);

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
}

init();
