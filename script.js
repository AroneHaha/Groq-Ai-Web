const askBtn = document.getElementById("ask-btn");
const micTxt = document.getElementById("mic-btn");
const promptTxt = document.getElementById("text-area");
const messageContainer = document.getElementById('response-container');

/*  Check if history array is initialized  */
/*  Load if yes  */
function loadConversationHistory() {
    const history = localStorage.getItem('conversationHistory');
    return history ? JSON.parse(history) : [];
}

/*  Convert the history into string and save to local storage  */
function saveConversationHistory(history) {
    localStorage.setItem('conversationHistory', JSON.stringify(history));
}

function userPrompt(text) {
    const userBubble = document.createElement('div');
    userBubble.classList.add('chat-bubble');
    userBubble.innerText = text;
    messageContainer.appendChild(userBubble);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function botResponse(text) {
    const responseDiv = document.createElement('div');
    responseDiv.classList.add('response');
    responseDiv.innerText = text;
    messageContainer.appendChild(responseDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

async function handleAIRequest(message) {
    userPrompt(message);
    document.querySelector('.suggestions').style.display = 'none';
    try {
        const conversationHistory = loadConversationHistory();
        conversationHistory.push({ role: "user", content: message });
        saveConversationHistory(conversationHistory);

        const res = await fetch("api-config.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: message,
                history: conversationHistory,
            }),
        });

        const data = await res.json();

        if (
            data &&
            data.choices &&
            data.choices[0] &&
            data.choices[0].message &&
            data.choices[0].message.content
        ) {
            botResponse(data.choices[0].message.content);
            conversationHistory.push({
                role: "assistant",
                content: data.choices[0].message.content,
            });
            saveConversationHistory(conversationHistory);
        } else {
            botResponse("Error: Invalid response from API");
        }
    } catch (err) {
        botResponse("Error: " + err.message);
    }
}

/* =================== SENDING PROMPT THRU 'ENTER' ======================== */
promptTxt.addEventListener('keydown', async (e) => {
    const message = promptTxt.value.trim();
    if (e.key === 'Enter' && !e.shiftKey && promptTxt.value.trim() !== '') {
        e.preventDefault();
        promptTxt.value = '';
        handleAIRequest(message)
    }
});

promptTxt.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        promptTxt.value = '';
    }
});

/* =================== SENDING PROMPT THRU CLICK =================== */
askBtn.addEventListener('click', async () => {
    const message = promptTxt.value.trim();
    if (message !== '') {
        e.preventDefault();
        promptTxt.value = '';
        handleAIRequest(message)
    }
});
 
messageContainer.addEventListener('contextmenu', (e) => {
    if (e.target.classList.contains('response')) {
        e.preventDefault();

        /* ====== REMOVE PREVIOUS SHOWN COPY ICON(TO PREVENT DUPES) ========= */
        const existing = document.querySelector('.custom-menu');
        if (existing) {
            existing.remove();
        }
        
        const menu = document.createElement('div');
        menu.className = 'custom-menu';
        document.body.appendChild(menu);
        menu.style.top = e.pageY + 'px';
        menu.style.left = e.pageX + 'px';
        menu.style.display = 'block';

        /* =============== COPY ================ */
        const copyOption = document.createElement('div');
        copyOption.innerText = '📋 Copy';

        copyOption.onclick = () => {
        navigator.clipboard.writeText(e.target.innerText);
        menu.remove();
        };

        menu.appendChild(copyOption);

        /* =============== DOWNLOAD AS PDF THE AI'S RESPOND ================ */
        const pdfOption = document.createElement('div');
        pdfOption.innerText = '📄 Download as PDF';

        pdfOption.onclick = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFont("Helvetica");
        doc.setFontSize(12);
        doc.text(e.target.innerText, 10, 10);
        doc.save("response.pdf");
        console.log("yup")
        menu.remove();
        };

        menu.appendChild(pdfOption);

        menu.onclick = () => {
            navigator.clipboard.writeText(e.target.innerText);
            menu.remove();
        }
    }
});

/* ========== WHEN OTHER ELEMENTS WERE CLICK, HIDE =========== */
document.addEventListener('click', () => {
    const menu = document.querySelector('.custom-menu');
    if (menu) menu.remove();
});

