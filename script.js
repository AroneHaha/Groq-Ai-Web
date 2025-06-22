const askBtn = document.getElementById("ask-btn")
const promptTxt = document.getElementById("text-area")

promptTxt.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && !e.shiftKey && (promptTxt.value.trim() != '')) {
        e.preventDefault();
        promptTxt.value = ''
    }
})

promptTxt.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        promptTxt.value = ''
    }
})
