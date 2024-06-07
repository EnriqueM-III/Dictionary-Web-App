const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", async () => {
    const inpWord = document.getElementById("inp-word").value.trim();
    if (!inpWord) {
        result.innerHTML = `<h3 class="error">Please enter a word.</h3>`;
        return;
    }
    result.innerHTML = `<h3 class="loading">Loading...</h3>`;
    try {
        const response = await fetch(`${url}${inpWord}`);
        if (!response.ok) {
            throw new Error('Word not found');
        }
        const data = await response.json();
        result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <p class="word-meaning">
               ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || "No example available."}
            </p>`;
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    } catch (error) {
        result.innerHTML = `<h3 class="error">${error.message}. Try another?</h3>`;
    }
});

function playSound() {
    sound.play();
}
