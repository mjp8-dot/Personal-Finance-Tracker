import {
    clearLocalStorage,  
} from './storage.js';


export function settings() {

    let settingsPanel =
    document.getElementById(
        "settings-panel"
    );

    if (settingsPanel) {

        settingsPanel.classList
        .toggle("hidden");

        return;

    }

    settingsPanel =
    document.createElement("div");

    settingsPanel.id =
    "settings-panel";

    settingsPanel.classList.add(
        "card"
    );

    settingsPanel.innerHTML = `

        <h2>⚙ Settings</h2>

        <label for="monthly-limit">
            Monthly Limit
        </label>

        <input
            type="number"
            id="monthly-limit"
            class="settingsinput"
            placeholder="Enter limit"
        >

        <button
            class="button"
            id="save-limit"
        >
            Save Limit
        </button>

        <button
            class="button"
            id = "remove-limit"
        >
            Remove Limit
        </button>

        <br><br>

        <button
            class="button"
            id="clear-data"
        >
            Clear All Data
        </button>

        <button
            class="button"
            id="close-settings"
        >
            Close
        </button>

    `;

    document.body.appendChild(
        settingsPanel
    );

    document
    .getElementById("save-limit")
    .addEventListener(
        "click",
        function() {

            const limit =
            document
            .getElementById(
                "monthly-limit"
            )
            .value;

            if (!limit) {

                alert(
                    "Please enter a limit."
                );

                return;

            }

            localStorage.setItem(
                "monthlyLimit",
                limit
            );

            alert(
                "Monthly limit saved!"
            );
            location.reload();

        }
    );

    document.getElementById("remove-limit").addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "monthlyLimit"
            );

            alert(
                "Monthly limit removed!"
            );
            location.reload();
        }
    );

    document
    .getElementById("clear-data")
    .addEventListener(
        "click",
        function() {

            if (!confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
                return;
            }

            clearLocalStorage();

            alert(
                "All data cleared!"
            );
            location.reload();
        }
    );

    document
    .getElementById("close-settings")
    .addEventListener(
        "click",
        function() {

            settingsPanel.classList.add(
                "hidden"
            );

        }
    );

}

