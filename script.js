// Elements for steps navigation
let stepOne = document.querySelector(".go-one");
let stepTwo = document.querySelectorAll(".go-two");
let stepThree = document.querySelectorAll(".go-three");
let stepFour = document.querySelector(".go-four");

// Elements for forms
let formOne = document.querySelector(".form-1");
let formTwo = document.querySelector(".form-2");
let formThree = document.querySelector(".form-3");
let formFour = document.querySelector(".form-4");

// Elements for step indicators
let numOne = document.querySelector(".step-one");
let numTwo = document.querySelector(".step-two");
let numThree = document.querySelector(".step-three");
let numFour = document.querySelector(".step-four");

// Elements for submission and thank you message
let submit = document.querySelector(".submit");
let thanks = document.querySelector(".thanks");

// Step navigation handlers
stepOne.addEventListener("click", () => {
    showForm(1);
});
stepTwo.forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        showForm(2);
    });
});
stepThree.forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault();
        showForm(3);
    });
});
stepFour.addEventListener("click", e => {
    e.preventDefault();
    showForm(4);
});

// Step indicator handlers
numOne.addEventListener("click", e => {
    e.preventDefault();
    showForm(1);
});
numTwo.addEventListener("click", e => {
    e.preventDefault();
    showForm(2);
});
numThree.addEventListener("click", e => {
    e.preventDefault();
    showForm(3);
});
numFour.addEventListener("click", e => {
    e.preventDefault();
    showForm(4);
});

// Submit handler
submit.addEventListener("click", e => {
    e.preventDefault();
    formFour.style.display = "none";
    thanks.style.display = "flex";
});

// Function to show form based on step
function showForm(step) {
    formOne.style.display = step === 1 ? "flex" : "none";
    formTwo.style.display = step === 2 ? "flex" : "none";
    formThree.style.display = step === 3 ? "flex" : "none";
    formFour.style.display = step === 4 ? "flex" : "none";

    numOne.classList.toggle("current", step === 1);
    numTwo.classList.toggle("current", step === 2);
    numThree.classList.toggle("current", step === 3);
    numFour.classList.toggle("current", step === 4);
}

// Function to get plan price
function getPlan(plan, isYearly) {
    const monthlyPlans = {
        "Arcade": 9,
        "Advanced": 12,
        "Pro": 15
    };

    const yearlyPlans = {
        "Arcade": 90,
        "Advanced": 120,
        "Pro": 150
    };

    return isYearly ? yearlyPlans[plan] : monthlyPlans[plan];
}

// Plan selection handlers
let planChosen = document.querySelector(".myfinal");
let radio = document.querySelectorAll(".radio");
let change = document.querySelector(".change");
let planPrice = document.querySelector(".plan-price");

radio.forEach(radios => {
    radios.addEventListener("click", () => {
        updatePlanPrice();
        updateTotal();
    });
});

change.addEventListener("click", e => {
    e.preventDefault();
    showForm(2);
});

// Function to get add-on price
function getAddOnPrice(ons) {
    const addOns = {
        "Online service": 1,
        "Larger storage": 2,
        "Customizable Profile": 2
    };
    return addOns[ons] || 0;
}

// Checkbox handlers
const checkboxes = document.querySelectorAll('.mycheck');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        addCheckedItems();
        updateTotal();
    });
});

function addCheckedItems() {
    const checkedItems = [];
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkedItems.push(checkbox.name);
        }
    });

    const checkedItemsList = document.querySelector('.mylist');
    checkedItemsList.innerHTML = ''; // Clear the current list

    checkedItems.forEach(item => {
        const p = document.createElement('p');
        p.innerHTML = item;
        p.classList.add("service");
        checkedItemsList.appendChild(p);

        const pTwo = document.createElement('p');
        pTwo.innerHTML = getAddOnPrice(item);
        pTwo.classList.add("price");
        checkedItemsList.appendChild(pTwo);
    });
}

// Function to update the plan price
function updatePlanPrice() {
    const selectedPlan = document.querySelector(".radio:checked").value;
    const isYearly = toggle.checked;
    const price = getPlan(selectedPlan, isYearly);
    planPrice.innerHTML = price;
    planChosen.innerHTML = selectedPlan;
}

// Function to update the total price
function updateTotal() {
    const planPriceValue = parseInt(planPrice.innerHTML) || 0;
    let total = planPriceValue;

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            total += getAddOnPrice(checkbox.name);
        }
    });

    document.querySelector(".total").textContent = total.toFixed(2);
}

// Toggle between monthly and annual prices
let toggle = document.querySelector(".check");
toggle.addEventListener("change", e => {
    e.preventDefault();
    let monthPrice = document.querySelectorAll(".monthly");
    let annualPrice = document.querySelectorAll(".annual");
    let monthlyPrice = document.querySelectorAll(".formonth");
    let annuallyPrice = document.querySelectorAll(".foryear");
    let discount = document.querySelectorAll(".free");
    let month = document.getElementById("month");
    let year = document.getElementById("year");

    if (toggle.checked) {
        month.classList.remove("be-bold");
        year.classList.add("be-bold");
        annualPrice.forEach(item => item.classList.remove("hidden"));
        discount.forEach(item => item.classList.remove("hidden"));
        monthPrice.forEach(item => item.classList.add("hidden"));
        annuallyPrice.forEach(item => item.classList.remove("hidden"));
        monthlyPrice.forEach(item => item.classList.add("hidden"));
    } else {
        month.classList.add("be-bold");
        year.classList.remove("be-bold");
        annualPrice.forEach(item => item.classList.add("hidden"));
        discount.forEach(item => item.classList.add("hidden"));
        monthPrice.forEach(item => item.classList.remove("hidden"));
        monthlyPrice.forEach(item => item.classList.remove("hidden"));
        annuallyPrice.forEach(item => item.classList.add("hidden"));
    }

    updatePlanPrice(); // Update the plan price based on the toggle state
    updateTotal(); // Recalculate total when switching between monthly and annual
});

document.addEventListener('DOMContentLoaded', () => {
    updatePlanPrice();
    updateTotal();
});
