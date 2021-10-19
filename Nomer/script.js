const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Ang kailangang gulang ng isang aplikante sa Professional Driver’s License ay:',
    answers: [
      { text: '18 taong gulang', correct: true },
      { text: '17 taong gulang', correct: false },
      { text: '21 taong gulang', correct: false }
    ]
  },
  {
    question: 'Ang lisensya ng isang drayber ang nagpapahintulot na magmaneho sya ng:',
    answers: [
      { text: 'lahat ng klaseng sasakyan', correct: false },
      { text: 'mga sasakyan na nakalahad sa kanyang lisensya', correct: true },
      { text: 'kotse lamang', correct: false},
      { text: 'Wala sa nabanggit', correct: false }
    ]
  },
  {
    question: 'Tumutukoy ito sa anumang mga sasakyan pang transportasyon sa lupa na hinihimok sa pamamagitan ng anumang power kaysa sa muscular power.?',
    answers: [
      { text: 'Kotse', correct: false },
      { text: 'Motorsiklo', correct: false },
      { text: 'Muscle car', correct: false },
      { text: 'Sasakyan', correct: true }
    ]
  },
  {
    question: 'Ang hindi marunong magbasa at sumunod sa ilaw trapiko ay:',
    answers: [
      { text: 'nagpapatunay na mahusay kang drayber', correct: false },
      { text: 'maaaring masangkot sa aksidente', correct: true },
      { text: 'nakatipid sa gasolina', correct: false },
      { text: 'nakatipid sa gasolina', correct: false }
    ]
  }
]