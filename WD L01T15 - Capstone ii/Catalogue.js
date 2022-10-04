// JavaScript source code

let arrayOfCartItems = [];

let total = 0;

// Step 1: shopItem Object constructor:
function shopItem(itemPic, pagelink, itemName, itemDetails, itemCost, sideEffects) {
    this.imageSrc = itemPic;
    this.pagelink = pagelink,
    this.itemName = itemName
    this.itemDetails = itemDetails;
    this.itemCost = itemCost;
    this.sideEffects = sideEffects
    this.addToCart = function() {
        arrayOfCartItems.push(this);
        sessionStorage.setItem("cartItems", JSON.stringify(arrayOfCartItems));
        total = total + Number(this.itemCost);
	    sessionStorage.setItem("total",total);
        alert("Added to Cart. Your current total is R" + total);
        
    };
}

// Step 2: create 5 Objects: 
let shopItem1 = new shopItem(
    "images/TheOneRing.jpg",
    "oneRing.html", 
    "One Ring to Rule Them All",
    "grants invisibility to wearer", 
    "10",
    "Hairloss, homicidal tendencies, obsessiveness, aphasia and/or other speech disorders, split personality(ies), sensitivity to light, among others...",   
);              

let shopItem2 = new shopItem(
    "images/SandersonSpellbook.jpg",
    "Spellbook.html", 
    "Sanderson Spellbook",
    "collection of useful spells and potions for the enterprising witch.", 
    "10",
    "Exacerbation of obsessive tendencies, vanity, unhealthy obsession with adolescent and preadolescent humans..."
);  

let shopItem3 = new shopItem(
    "images/SubtleKnife.jpg",
    "Subtle.html", 
    "The Subtle Knife",
    "cuts all materials as well as pathways to other universes.", 
    "0.99",
    "Hopefully you're the adventurous type..."
);  

let shopItem4 = new shopItem(
    "images/InfinityGauntlet.jpg",
    "InfinityG.html", 
    "Infinity Gauntlet",
    "chic method to keep Infinity Stones (not included) close at hand (see what I did there?)", 
    "10",
    "Exacerbation of obsessive tendencies; also, EEE makes no claim as to recipient's ability to use the Gauntlet."
);  

let shopItem5 = new shopItem(
    "images/LamentConfiguration.jpg",
    "HappyFunTimes.html", 
    "Lament Configuration",
    "puzzle box with an interesting reward upon completion. Great for brats who've not yet learned not to keep their sticky fingers to themselves.", //:
    "10",
    "Be prepared a new world of physical sensation."
);  

let shopItem6 = new shopItem(
    "images/Jumanji.jpg",
    "Jumanji.html",
    "Jumanji Board Game",
    "fun for the whole family!!", 
    "10",
    "Cheaters be warned!"
);  


//Step 3: array of created Items:
let arrayOfShopItems = [shopItem1, shopItem2, shopItem3, shopItem4, shopItem5, shopItem6];


// Catalogue page JS:
let cataLoaded = {};
//Below we create a function that will be used to add the information stored in the car objects to our HTML page.
cataLoaded.addItems = function() {
    arrayOfShopItems.forEach(function(shopItem) { //Loop through each object stored in the array using the forEach method.
        let tablebody = document.getElementsByTagName("tbody")[0]; //Get table
        //Create table row:
        let tablerow = document.createElement("tr");
        tablerow.className = "tablerow";
        // Create tabledata:
        // 1st column
        let shopItemPicCell = document.createElement("td");
        let picLink = document.createElement("a");
        picLink.href = shopItem.pagelink;
        let shopItemPic = document.createElement("img"); // create img
        shopItemPic.src = shopItem.imageSrc;
        shopItemPic.className = "img-thumbnail"; // class for css/bootstrap
        
        picLink.appendChild(shopItemPic);
        shopItemPicCell.appendChild(picLink);

        // 2nd column
        let shopItemDetails = document.createElement("td");
        shopItemDetails.innerHTML = shopItem.itemName + ": " + shopItem.itemDetails;
        let lineBreak = document.createElement("br");
        shopItemDetails.appendChild(lineBreak);
        let addToCartButton = document.createElement("button");
        addToCartButton.className = "quickAddToCartButton";
        addToCartButton.innerHTML = "Add to Cart";
        shopItemDetails.appendChild(addToCartButton);
        
        //Add event listener to detect when button is clicked.
        addToCartButton.addEventListener("click", function(e) {
            shopItem.addToCart();
        });
        
        // 3rd column
        let shopItemCost = document.createElement("td");
        shopItemCost.innerHTML = shopItem.itemCost;
        
        // 4th column
        let shopItemSE = document.createElement("td");
        shopItemSE.innerHTML = shopItem.sideEffects;
        
        // console.log(shopItemSE);
        
        //And append. 
        tablerow.appendChild(shopItemPicCell);
        tablerow.appendChild(shopItemDetails);
        tablerow.appendChild(shopItemCost);
        tablerow.appendChild(shopItemSE);
        tablebody.appendChild(tablerow);//
    }); //End forEach
}; //End addItems()

cataLoaded.addItems();
