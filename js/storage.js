export function updateLocalStorage(transaction){

    const transactions =
    JSON.parse(
        localStorage.getItem("transactions")
    ) || [];

    transactions.push(transaction);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

export function getTransactionsFromLocalStorage() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    return transactions;
}

export function clearLocalStorage() {
    localStorage.removeItem("transactions");
}

export function newMonth() {

    const transactions =
    getTransactionsFromLocalStorage();

    if (transactions.length === 0) {

        alert("No transactions to clear.");

        return;
    }

    const confirmed = confirm(
        "Are you sure you want to start a new month? This will remove all previous transactions and carry forward your current balance."
    );

    if (!confirmed) {
        return;
    }

    const balance = transactions.reduce(
        (acc, transaction) => {

            if (transaction.type.toLowerCase() === "income") {
                return acc + transaction.amount;
            }

            if (transaction.type.toLowerCase() === "expense") {
                return acc - transaction.amount;
            }

            return acc;

        },
        0
    );

    const openingBalance = {

        type: "income",

        category: "Opening Balance",

        description: "Balance carried forward",

        amount: balance,
        date: new Date().toLocaleDateString(), 
        id: Date.now()

    };

    localStorage.removeItem(
                "monthlyLimit"
            );

    clearLocalStorage();
    updateLocalStorage(openingBalance);
   

    alert("New month started successfully!");

    location.reload();

}

// we search the localstorage for transactinons based on category and description
export function searchTransactions(searchTerm = "") {

    const transactions =
    getTransactionsFromLocalStorage();

    const term =
    searchTerm.trim().toLowerCase();

    if (!term) {
        return transactions;
    }

    if (term === "income") {

        return transactions.filter(
            transaction =>
            transaction.type === "income"
        );

    }

    if (term === "expense") {

        return transactions.filter(
            transaction =>
            transaction.type === "expense"
        );

    }

    return transactions.filter(transaction =>

        transaction.category.includes(term)

        ||

        transaction.description.includes(term)

    );

}

export function deleteTransaction(id) {

    if(!confirm("Are you sure you want to delete this transaction?")) {
        return;
    }

    const transactions =
    getTransactionsFromLocalStorage();

    const updatedTransactions =
    transactions.filter(transaction => transaction.id !== parseInt(id));

    localStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
    );
}

export function editTransaction(id) {

    const transactions =
    getTransactionsFromLocalStorage();

    const transaction =
    transactions.find(
        transaction =>
        transaction.id === Number(id)
    );

    if (!transaction) {
        alert("Transaction not found.");
        return;
    }

    const edittransaction =
    document
    .querySelector(
        `.editbtn[data-id="${id}"]`
    )
    .closest(".transaction");

    edittransaction.innerHTML = `

        <label>Type:</label>

        <select class="edit-type">

            <option
                value="income"
                ${
                    transaction.type === "income"
                    ? "selected"
                    : ""
                }>
                Income
            </option>

            <option
                value="expense"
                ${
                    transaction.type === "expense"
                    ? "selected"
                    : ""
                }>
                Expense
            </option>

        </select>

        <label>Amount:</label>

        <input
            type="number"
            class="edit-amount"
            value="${transaction.amount}"
        >

        <label>Category:</label>

        <input
            type="text"
            class="edit-category"
            value="${transaction.category}"
        >

        <label>Description:</label>

        <input
            type="text"
            class="edit-description"
            value="${transaction.description}"
        >

        <label>Date:</label>

        <input
            type="date"
            class="edit-date"
            value="${transaction.date}"
        >

        <button
            class="button savebtn"
            data-id="${transaction.id}"
        >
            Save
        </button>

    `;

    const savebtn =
    edittransaction.querySelector(
        ".savebtn"
    );

    savebtn.addEventListener(
        "click",
        function () {

            if (!confirm("Are you sure you want to save the changes?")) {
                return;
            }

            const updatedTransaction = {

                type:
                edittransaction
                .querySelector(".edit-type")
                .value,

                amount:
                parseFloat(
                    edittransaction
                    .querySelector(".edit-amount")
                    .value
                ),

                category:
                edittransaction
                .querySelector(".edit-category")
                .value,

                description:
                edittransaction
                .querySelector(".edit-description")
                .value,

                date:
                edittransaction
                .querySelector(".edit-date")
                .value,

                id:
                transaction.id

            };

            const updatedTransactions =
            transactions.map(t =>

                t.id === transaction.id

                ? updatedTransaction

                : t

            );

            localStorage.setItem(
                "transactions",
                JSON.stringify(
                    updatedTransactions
                )
            );

            location.reload();

        }
    );

}

export function getMonthlyLimit() {

    const limit =
    localStorage.getItem("monthlyLimit");

    return limit ? parseFloat(limit) : null;

}