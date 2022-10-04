// JavaScript source code

// Shopcart page JS
// 1st, the JS to create the elements needed to display items and their prices:
let cartLoaded = {};

let div = document.getElementById("shoppingCartItems"); 
div.innerHTML = "";
div.style.color = 'blue';
div.style.backgroundColor = 'silver';

cartLoaded.addCartItems = function() {
    let arrayOfCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    if(arrayOfCartItems === null || arrayOfCartItems === undefined) {
        return;
    }
    // For each loop to display each item from sessionStorage, creating the necessary html elements in the process:
    arrayOfCartItems.forEach(function(item) {
        // create table for display:
        let itemTable = document.createElement("table");
        let tableRow = document.createElement("tr");
        let itemNameCell = document.createElement("td");
        let itemPriceCell = document.createElement("td");
        
        // create heading for item name
        let cartItemName = document.createElement("h5"); 
        cartItemName.style.fontFamily = 'Papyrus';
        cartItemName.innerHTML = item.itemName;
        itemNameCell.appendChild(cartItemName);

        // create img
        let cartItemPic = document.createElement("img"); 
        cartItemPic.className = "img-thumbnail";
        cartItemPic.style.width = "248px";
        cartItemPic.src = item.imageSrc;
        itemNameCell.appendChild(cartItemPic);

        // create paragraph for price
        let itemCost = document.createElement("p"); 
        itemCost.style.fontFamily = 'Papyrus';
        itemCost.innerHTML = item.itemCost;
        itemPriceCell.appendChild(itemCost);

        // Aaand append!
        tableRow.appendChild(itemNameCell);
        tableRow.appendChild(itemPriceCell);
        itemTable.appendChild(tableRow)
        div.append(itemTable);

    }); 
};
document.onload = cartLoaded.addCartItems();

// 2nd, the JS to display total and options.
let cartTotal = {}

let totalDiv = document.getElementById("totalDiv");
totalDiv.innerHTML = "";
totalDiv.style.color = 'green';
totalDiv.style.backgroundColor = 'maroon';
totalDiv.style.textAlign = "center";

cartTotal.addTotal = function() {
    arrayOfCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    // if no items, this stays empty:
    if(arrayOfCartItems === null || arrayOfCartItems === undefined) {
        return;
    }
    // create elements and assign values:
    let totalHeading = document.createElement("h5");
    totalHeading.innerHTML = "Cart Total before sundries (all prices inclusive of VAT)";

    let br = document.createElement("br");
    
    let cartItemCost = document.createElement("h6");
    cartItemCost.style.color = "orange";
    cartItemCost.innerHTML = sessionStorage.getItem("total");

    // Coupon:
    let couponForm = document.createElement("form");
    couponForm.style.backgroundColor = "pink";
    couponForm.style.color = "black";
    
    let couponLabel = document.createElement("label");
    couponLabel.innerHTML = "Enter coupon amount:";
    
    let couponAmount = document.createElement("input");
    couponAmount.type = "number";
    couponAmount.id= "couponAmount";
    
    let couponSubmit = document.createElement("input");
    couponSubmit.type = "submit";
    
    couponForm.appendChild(couponLabel);
    couponForm.appendChild(couponAmount);
    couponForm.appendChild(couponSubmit);
    couponForm.appendChild(br);
    
    let totalAfterThings = 0;
    //Add event listener to detect when button is clicked.
    couponSubmit.addEventListener("click", function(e) {
        let couponAmount = document.getElementById("couponAmount").value;
        totalAfterThings = sessionStorage.getItem("total") - couponAmount;
        alert("Your balance is now R" + totalAfterThings);
        console.log(totalAfterThings);
        sessionStorage.setItem("totalAfterThings", totalAfterThings);
    });

    // delivery options
    let deliveryForm = document.createElement("form");
    let deliveryLabel = document.createElement("label");
    deliveryLabel.innerHTML = "Select delivery type: ";
    deliveryForm.appendChild(deliveryLabel);
    
    // delivery options:
    let deliveryOptions = document.createElement("select");
    deliveryOptions.id = "mySelect";
    deliveryOptions.onchange = () => {postage();};

    let blankSelect = document.createElement("option");
    blankSelect.innerHTML = "Select postage";

    let collectCart = document.createElement("option");
    collectCart.value = 0;
    collectCart.innerHTML = "Collect";
    
    let mailCart = document.createElement("option");
    mailCart.value = 10;
    mailCart.innerHTML = "Mail";
    
    let teleportCart = document.createElement("option");
    teleportCart.value = 100;
    teleportCart.innerHTML = "Teleport";

    deliveryOptions.appendChild(blankSelect);
    deliveryOptions.appendChild(collectCart);
    deliveryOptions.appendChild(mailCart);
    deliveryOptions.appendChild(teleportCart);
    deliveryForm.appendChild(deliveryLabel);
    deliveryForm.appendChild(deliveryOptions);
    
    function postage(){
        let postage = document.getElementById("mySelect").value;
        //console.log(postage);
        let totalBFPost = Number(sessionStorage.getItem("totalAfterThings"));
        //console.log(totalBFPost);
        let newTotal = totalBFPost + Number(postage);
        //console.log(newTotal);
        sessionStorage.setItem("totalAfterThings", newTotal)
        alert("R" + postage + " added to your total.");        
    }
    
    // orderbutton - alert w/ number generated:
    let orderButton = document.createElement("button");
    orderButton.innerHTML = "Click to confirm order.";
    
    //Add event listener to detect when button is clicked.
    orderButton.addEventListener("click", function(e) {
        let totalTotal = sessionStorage.getItem("totalAfterThings");
        //generate number: 
        let refNum = generateRefNUm(); 
        alert("Order successful.\nYour total is R" + totalTotal + "\nYour reference number is " + refNum);
    });

    totalDiv.appendChild(totalHeading);
    totalDiv.appendChild(br);
    totalDiv.appendChild(cartItemCost);
    totalDiv.appendChild(br);
    totalDiv.appendChild(couponForm);
    totalDiv.appendChild(br);
    totalDiv.appendChild(deliveryForm);
    totalDiv.appendChild(orderButton);
}; //End addCartItems()


// add Items from sessionStorage at load:
document.onload = cartTotal.addTotal();


/* function to generate order ref number:*/
let refNumber = 0; 
function generateRefNUm(){
     refNumber = refNumber + 1;
     return refNumber;
}
