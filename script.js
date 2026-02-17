const calendar = document.getElementById("calendar");
const expenseBox = document.getElementById("expenseBox");
const selectedDateText = document.getElementById("selectedDate");

const amountInput = document.getElementById("amount");
const reasonInput = document.getElementById("reason");
const list = document.getElementById("list");
const totalText = document.getElementById("total");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const monthText = document.getElementById("month");
const addBtn = document.getElementById("addBtn");

let today = new Date();
let selectedKey = null;

function drawCalendar() {
    calendar.innerHTML = "";

    let year = today.getFullYear();
    let month = today.getMonth();

    monthText.innerText =
        today.toLocaleString("default", { month: "long" }) +
        " " + year;

    let days = new Date(year, month + 1, 0).getDate();

    for (let d = 1; d <= days; d++) {
        let div = document.createElement("div");
        div.className = "day";
        div.innerText = d;

        div.onclick = () => openDay(d);

        calendar.appendChild(div);
    }
}

function openDay(day) {
    let y = today.getFullYear();
    let m = today.getMonth() + 1;

    selectedKey = y + "-" + m + "-" + day;

    expenseBox.style.display = "block";
    selectedDateText.innerText =
        "Expenses for " + day + "/" + m + "/" + y;

    showExpenses();
}

addBtn.onclick = function () {
    let amt = amountInput.value;
    let reason = reasonInput.value;

    if (!amt || !reason) return;

    let data = JSON.parse(localStorage.getItem("expenses")) || {};

    if (!data[selectedKey]) {
        data[selectedKey] = [];
    }

    data[selectedKey].push({
        amount: Number(amt),
        text: reason
    });

    localStorage.setItem("expenses", JSON.stringify(data));

    amountInput.value = "";
    reasonInput.value = "";

    showExpenses();
};

function showExpenses() {
    let data = JSON.parse(localStorage.getItem("expenses")) || {};
    list.innerHTML = "";

    let sum = 0;

    if (data[selectedKey]) {
        data[selectedKey].forEach(e => {
            let li = document.createElement("li");
            li.innerText = "₹" + e.amount + " - " + e.text;
            list.appendChild(li);

            sum += e.amount;
        });
    }

    totalText.innerText = "Total spent: ₹" + sum;
}

prevBtn.onclick = function () {
    today.setMonth(today.getMonth() - 1);
    drawCalendar();
};

nextBtn.onclick = function () {
    today.setMonth(today.getMonth() + 1);
    drawCalendar();
};

drawCalendar();