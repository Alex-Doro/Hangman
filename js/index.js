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

    startGame({target}) {
        this.$menu.classList.toggle('disabled')
        this.$gameContainer.classList.toggle('active')
        this.getRandomWord(target.innerHTML)
        this.$title.innerHTML = target.innerHTML
    },

    getRandomWord(topic) {
        this.randomWord = this.categories[topic][Math.floor(Math.random() * this.categories[topic].length)]
        this.displayWord = '_'.repeat(this.randomWord.length)
        this.renderWord()
    },

    renderWord() {
        this.$word.innerHTML = this.displayWord
    },

    checkLetter({target}) {
        let letter = target.innerHTML.toLowerCase();
        let indexes = []

        for (let i = 0; i < this.randomWord.length; i++) {

            if (this.randomWord.indexOf(letter) === -1) {
                target.classList.toggle('incorrect')
                document.getElementById(this.tryCounter).classList.toggle('active')

                if (this.tryCounter === 11) {
                    this.$deadFace.classList.toggle('active')
                    this.$leftEye.classList.toggle('active')
                    this.$rightEye.classList.toggle('active')
                    this.$newGame.classList.toggle('active')
                }

                this.tryCounter++
                break
            }

            if (this.randomWord[i] === letter) {

                indexes.push(i)
                target.classList.toggle('correct')
                continue
            }

        }

        for (let index of indexes) {
            this.displayWord = this.displayWord.substring(0, index) + letter + this.displayWord.substring(index + 1)

            if (this.randomWord === this.displayWord) this.$newGame.classList.toggle('active')
        }

        this.renderWord()
    },

    startNewGame() {
        this.$newGame.classList.toggle('active')
        this.$menu.classList.toggle('disabled')
        this.$gameContainer.classList.toggle('active')

        this.tryCounter = 1

        for (let item of this.$letters.children) {
            if (item.classList.contains('incorrect')) item.classList.toggle('incorrect')
            if (item.classList.contains('correct')) item.classList.toggle('correct')
        }

        for (let item of this.$figure.children) {
            if (item.classList.contains('active')) item.classList.toggle('active')
        }

        if (this.$deadFace.classList.contains('active')) this.$deadFace.classList.toggle('active')
        if (this.$leftEye.classList.contains('active')) this.$leftEye.classList.toggle('active')
        if (this.$rightEye.classList.contains('active')) this.$rightEye.classList.toggle('active')
    },

    test() {

    }
}

hangman.setEvents()
hangman.test()