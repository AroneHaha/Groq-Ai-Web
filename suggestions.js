document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ask-weather").addEventListener("click", async () => {
        const message = "How are you? 😊";
        handleAIRequest(message)
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ask-meal").addEventListener("click", async () => {
        const message = "Give me a meal plan 🍗";
        handleAIRequest(message)
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ask-joke").addEventListener("click", async () => {
        const message = "Tell me a joke 😆";
        handleAIRequest(message)
    });
});