const quizData = [
    {
      question: '1.What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Marking Language', 'Hyperlink Text Module', ' None of the above'],
      answer: 'Hyper Text Markup Language',
    },
    {
      question: '2.What is the correct way to create a paragraph element in HTML?',
      options: ['<p>Paragraph Text</p>', '<paragraph>Paragraph Text</paragraph>', ' <para>Paragraph Text</para>', ' <text>Paragraph Text</text>'],
      answer: '<p>Paragraph Text</p>',
    },
    {
      question: '3.Which attribute is used to specify the type of an input element in HTML?',
      options: ['style', 'size', 'type', 'name'],
      answer: 'type',
    },
    {
      question: '4.What is the difference between inline and block elements in HTML?',
      options: ['Inline elements always have a background color, while block elements dont. ', ' Inline elements cannot contain other elements, while block elements can. ', ' Inline elements are used for headings, while block elements are used for text.', ' There is no difference; they are the same.'],
      answer: ' Inline elements cannot contain other elements, while block elements can. ',
    },
    {
      question: '5. What property in CSS is used to change the font color of an element?',
      options: [
        'text-color ',
        'background-color',
        'font-size',
        ' font-family',
      ],
      answer: 'text-color ',
    },
    {
      question: '6.What is the purpose of using media queries in CSS?',
      options: ['To add comments to your code', 'To adjust the layout of your website for different screen sizes', 'To define variables', 'To create animations'],
      answer: 'To adjust the layout of your website for different screen sizes',
    },
    {
      question: '7.What selector in CSS targets all elements of a specific tag name?',
      options: [
        '.class-name',
        'element_name',
        '#element_id',
        '#element_id',
      ],
      answer: 'element_name',
    },
    {
      question: '8.Which property in CSS controls the spacing between lines of text?',
      options: [' margin', ' padding', 'line-height', ' border'],
      answer: ' line-height',
    },
    {
      question: '9.What is the difference between "display: inline;" and "display: block;" in CSS?',
      options: [
        '"display: inline;" creates a border around the element, while "display: block;" doesnot.',
        ' "display: inline;" allows the element to wrap around other elements, while "display: block;" starts on a new line.',
        ' "display: inline;" makes the element bigger, while "display: block;" makes it smaller.',
        'There is no difference; they are the same.',
      ],
      answer: ' "display: inline;" allows the element to wrap around other elements, while "display: block;" starts on a new line.',
    },
    {
      question: '10.How can you center an element horizontally using CSS?',
      options: ['text-align: center', ' margin: 0 auto; ', 'float: center', 'position: absolute;'],
      answer: ' margin: 0 auto; ',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();