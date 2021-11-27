const hangman = {
    tryCounter: 1,
    randomWord: '',
    displayWord: '',

    $menu: document.querySelector('.hangman__menu'),
    $categories: document.querySelector('.hangman__categories'),
    $gameContainer: document.querySelector('.hangman__container'),
    $figure: document.querySelector('.hangman__figure'),
    $deadFace: document.querySelector('.hangman__figure__dead-face'),
    $leftEye: document.querySelector('.hangman__figure__dead-face__left-eye'),
    $rightEye: document.querySelector('.hangman__figure__dead-face__right-eye'),
    $title: document.querySelector('.hangman__topic'),
    $word: document.querySelector('.hangman__word'),
    $letters: document.querySelector('.hangman__letter__container'),
    $newGame: document.querySelector('.hangman__new-game'),
    $newGameBtn: document.querySelector('.hangman__new-game__btn'),

    categories: {
        plants: ['broccoli', 'cabbage', 'carrot', 'cauliflower', 'cucumber', 'eggplant', 'garlic', 'potato', 'pumpkin', 'apple', 'avocado', 'banana', 'blackberry'],
        sports: ['badminton', 'basketball', 'cycling', 'fencing', 'football', 'golf', 'handball', 'hockey', 'rowing', 'skiing', 'tennis', 'volleyball'],
        music: ['rock', 'pop', 'hip-hop', 'dance', 'jazz', 'classical', 'alternative', 'lo-fi', 'drum and bass'],
        movies: ['cast', 'character', 'cinema', 'comedy', 'director', 'documentary', 'drama', 'horror']
    },

    setEvents() {
        this.$categories.addEventListener('click', e => {if (e.target.classList.contains('hangman__categories__item')) this.startGame(e)})
        this.$letters.addEventListener('click', e => {if (e.target.classList.contains('hangman__letter')) this.checkLetter(e)})
        this.$newGameBtn.addEventListener('click', e => this.startNewGame())
    },

    // Start a new game and call a function getRandomWord(with a chosen topic as an argument) 
    // to pull a random word from this.categories
    startGame({target}) {
        this.$menu.classList.toggle('disabled')
        this.$gameContainer.classList.toggle('active')
        this.getRandomWord(target.innerHTML)
        this.$title.innerHTML = target.innerHTML
    },

    // Generate a random number from 0 to the length of an array of a chosen topic,
    // and then pull a word based on it's index - this.randomWord
    // Change all characters to '_' and put the string in this.displayWord to be shown to a player
    getRandomWord(topic) {
        this.randomWord = this.categories[topic][Math.floor(Math.random() * this.categories[topic].length)]
        this.displayWord = '_'.repeat(this.randomWord.length)
        this.renderWord()
    },
    
    // Display an updated word with guessed letters shown
    renderWord() {
        this.$word.innerHTML = this.displayWord
    },

    // This function is called every time a player presses a button with a letter to check if it is correct
    // and apply certain classes, depending on a fact if the guess was correct or not
    checkLetter({target}) {
        let letter = target.innerHTML.toLowerCase();
        let indexes = []

        // Loop through a generated random word, to check if a pressed button is correct
        for (let i = 0; i < this.randomWord.length; i++) {

            // If the pressed button is incorrect
            if (this.randomWord.indexOf(letter) === -1) {
                target.classList.toggle('incorrect')
                document.getElementById(this.tryCounter).classList.toggle('active')
                this.tryCounter++ // a counter of mistakes, takes a number from 1 to 11 and is corresponding to an id# of a
                                  // hangman figure element

                // If the game is lost
                if (this.tryCounter === 12) {
                    this.$word.innerHTML = this.randomWord
                    this.$deadFace.classList.toggle('active')
                    this.$leftEye.classList.toggle('active')
                    this.$rightEye.classList.toggle('active')
                    this.$newGame.classList.toggle('active')
                    this.$word.innerHTML = this.randomWord
                    return
                }

                break
            }

            // If the pressed button is correct loop through the random word for indexes of a guessed letter
            // and push them into indexes array
            if (this.randomWord[i] === letter) {
                indexes.push(i)
                target.classList.toggle('correct')
                continue
            }

        }
        
        // Loop through the indexes array and change same indexes in this.displayWord with a letter that was clicked by a player
        for (let index of indexes) {
            this.displayWord = this.displayWord.substring(0, index) + letter + this.displayWord.substring(index + 1)

            // Once the initial randomly pulled word is equal to a word that is diplayed to a player, the game is won and 
            // a New game option pops up
            if (this.randomWord === this.displayWord) this.$newGame.classList.toggle('active')
        }
        
        this.renderWord()
    },

    // This function is called once the player clicks on a New Game button
    startNewGame() {

        // Change classes to display initial main menu with a selection of topics
        this.$newGame.classList.toggle('active')
        this.$menu.classList.toggle('disabled')
        this.$gameContainer.classList.toggle('active')

        // Reset the counter of mistakes
        this.tryCounter = 1

        // Remove extra classes from letters to reset them
        for (let item of this.$letters.children) {
            if (item.classList.contains('incorrect')) item.classList.toggle('incorrect')
            if (item.classList.contains('correct')) item.classList.toggle('correct')
        }

        // Remove extra classes from hangman figure elements to reset them
        for (let item of this.$figure.children) {
            if (item.classList.contains('active')) item.classList.toggle('active')
        }

        // Remove extra classes from hangman figure dead face and eyes to reset them
        if (this.$deadFace.classList.contains('active')) this.$deadFace.classList.toggle('active')
        if (this.$leftEye.classList.contains('active')) this.$leftEye.classList.toggle('active')
        if (this.$rightEye.classList.contains('active')) this.$rightEye.classList.toggle('active')
    }
}

hangman.setEvents()