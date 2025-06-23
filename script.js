const askBtn = document.getElementById("ask-btn")
const micTxt = document.getElementById("mic-btn")
const promptTxt = document.getElementById("text-area")

let answer = 'Hiddwaddwa'
let long = 'HiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwaHiddwaddwa'

promptTxt.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && (!e.shiftKey && (promptTxt.value.trim() != ''))) {
        e.preventDefault();
        showResponse(answer);
        showResponse(long);
        promptTxt.value = ''
    }
})

promptTxt.addEventListener('keydown', (e) => {
    if (e.key == 'Escape') {
        promptTxt.value = ''
    }
})

askBtn.addEventListener('click', () => {
    if (promptTxt.value.trim() != '') {
        showResponse('DAPAT GUMANA TO')
        promptTxt.value = ''
    }
})

// --------------------------------- RESPONSE BOX --------------------------------------------------
const responseContainer = document.getElementById('response-container');
function showResponse(text) {
    const responseDiv = document.createElement('div');
    responseDiv.classList.add('response');
    responseDiv.innerText = text;
    responseContainer.appendChild(responseDiv);
    responseContainer.scrollTop = responseContainer.scrollHeight;
}

showResponse("hi");

