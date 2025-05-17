document.addEventListener("DOMContentLoaded", () => {
    const options = ["Piedra🗻", "Papel🧻", "Tijera✂️"]
    const buttonContainer = document.getElementById("button-container")
    
    let wins = parseInt(localStorage.getItem("wins")) || 0
    let losses = parseInt(localStorage.getItem("losses")) || 0
    let ties = parseInt(localStorage.getItem("ties")) || 0
    const scoreboard = document.getElementById("scoreboard")
    updateScore()

    window.driveClick = function(name) {
        buttonContainer.innerHTML = ""
    
        const selectedButton = createButton(name, 0.1)
        const random = options[Math.floor(Math.random() * options.length)]
        const randomButton = createButton(random, 0.4)
        const resultText = document.createElement("p")
        const resetButton = document.createElement("button")
        const result = getResult(name, random)

        resultText.className = "result animated"
        resultText.style.animationDelay = "0.6s"
        resultText.textContent = result

        resetButton.className = "button animated"
        resetButton.style.backgroundColor = "#555"
        resetButton.style.animationDelay = "0.8s"
        resetButton.textContent = "Volver a jugar 🔁"
        resetButton.onclick = renderInitialButtons
    
        buttonContainer.appendChild(selectedButton)
        buttonContainer.appendChild(randomButton)
        buttonContainer.appendChild(resultText)
        buttonContainer.appendChild(resetButton)
    }

    function getResult(player, opponent) {
        if (player === opponent) {
            ties++
            updateScore()
            return "¡Empate! 😐"
        }
        if (
            (player === "Piedra🗻" && opponent === "Tijera✂️") ||
            (player === "Papel🧻" && opponent === "Piedra🗻") ||
            (player === "Tijera✂️" && opponent === "Papel🧻")
        ) {
            wins++
            updateScore()
            return "¡Ganaste! 🎉"
        } else {
            losses++
            updateScore()
            return "Perdiste 😢"
        }
    }

    function updateScore() {
        localStorage.setItem("wins", wins)
        localStorage.setItem("losses", losses)
        localStorage.setItem("ties", ties)
        scoreboard.textContent = `Victorias: ${wins} | Empates: ${ties} | Derrotas: ${losses}`
    }

    window.resetScore = function() {
        wins = 0
        ties = 0
        losses = 0
        localStorage.removeItem("wins")
        localStorage.removeItem("losses")
        localStorage.removeItem("ties")
        scoreboard.textContent = `Victorias: 0 | Empates: 0 | Derrotas: 0`
    }
    
    function createButton(text, delay) {
        const button = document.createElement("button")
        button.className = "button animated"
        button.textContent = text
    
        if (text === "Piedra🗻") {
            button.style.backgroundColor = "forestgreen"
        } else if (text === "Papel🧻") {
            button.style.backgroundColor = "crimson"
        } else if (text === "Tijera✂️") {
            button.style.backgroundColor = "blueviolet"
        }
    
        button.style.animationDelay = `${delay}s`
        return button
    }

    function renderInitialButtons() {
        buttonContainer.innerHTML = `
            <h2>Selecciona tu objeto:</h2>
            <button onclick="driveClick('Piedra🗻')" style="background-color: forestgreen;" class="button animated" style="animation-delay: 0.1s">Piedra🗻</button>
            <button onclick="driveClick('Papel🧻')" style="background-color: crimson;" class="button animated" style="animation-delay: 0.3s">Papel🧻</button>
            <button onclick="driveClick('Tijera✂️')" style="background-color: blueviolet;" class="button animated" style="animation-delay: 0.5s">Tijera✂️</button>
            `
    }

    renderInitialButtons()
})