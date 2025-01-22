const albumGrid = document.querySelector(".albumGrid");
const shoppingCartSidebar = document.getElementById("shoppingCartSidebar");
const shoppingCartHeader = document.getElementById("shoppingCartHeader");
const shoppingCartItemsList = document.getElementById("shoppingCartItems");
const shoppingCartTotal = document.getElementById("shoppingCartTotal");
const clearShoppingCartButton = document.getElementById("clearShoppingCart");

let shoppingCart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

function updateShoppingCartUI() {
    shoppingCartItemsList.innerHTML = ""; 

    let total = 0;
    shoppingCart.forEach((item, index) => {
        total += item.price;

        const li = document.createElement("li");
        li.innerHTML = `${item.artist} - ${item.title} ($${item.price.toFixed(2)}) 
                        <button class="removeFromShoppingCart" data-index="${index}">Remove</button>`;
        shoppingCartItemsList.appendChild(li);
    });

    shoppingCartTotal.textContent = `Total: $${total.toFixed(2)}`;

    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

shoppingCartHeader.addEventListener("click", () => {
    shoppingCartSidebar.classList.toggle("expanded");
});

shoppingCartItemsList.addEventListener("click", event => {
    if (event.target.classList.contains("removeFromShoppingCart")) {
        const index = event.target.getAttribute("data-index");
        shoppingCart.splice(index, 1);
        updateShoppingCartUI();
    }
});

clearShoppingCartButton.addEventListener("click", () => {
    shoppingCart = []; 
    updateShoppingCartUI();
});

fetch("albums.json")
    .then(response => response.json())
    .then(albums => {
        albums.forEach(album => {

            const albumItem = document.createElement("div");
            albumItem.classList.add("albumItem");

            albumItem.innerHTML = `
                <img src="${album.image}" alt="${album.title}">
                <h3>${album.artist} - ${album.title} (${album.year})</h3>
                <p>$${album.price.toFixed(2)}</p>
                <button class="addToShoppingCartButton">Add to cart</button>
            `;

            albumGrid.appendChild(albumItem);
            albumItem.querySelector(".addToShoppingCartButton").addEventListener("click", () => {
                shoppingCart.push(album); 
                updateShoppingCartUI(); 
            });
        });
    })
    .catch(error => console.error("Error loading albums:", error));

updateShoppingCartUI();





