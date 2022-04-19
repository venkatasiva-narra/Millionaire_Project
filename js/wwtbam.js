/**
 * Utility classes
 */

function addClass(elementId, className) {
  var element = document.getElementById(elementId);
  element.className += " " + className;
}

function removeClass(elementId, className) {
  var element = document.getElementById(elementId);
  element.classList.remove(className);
}

function hideElement(elementId){
  removeClass(elementId,"visible");
  addClass(elementId, "hidden");
}

function slideNewForm(oldForm, newForm){
  currentForm = newForm;
  hideElement("errorCont");
  hideElement(oldForm);
  addClass(newForm, "animation-form-show");
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 * This method will play background music on click
 */

function playBackgroundMusic(){
  var audio = document.getElementById("kbc_music");
  audio.play();
  animateLogo();
  showTCModal();
}

function animateLogo(){
  var targetElement = document.getElementById("logoCont");
  targetElement.className += " animate-logo-cont";
}

function showTCModal() {
  var modal = document.getElementById("modal");
  modal.classList.remove("animate-modal-hide");
  modal.className += " animate-modal";
}

function hideModal() {
  var modal = document.getElementById("modal");
  modal.classList.remove("animate-modal");
  modal.className += " animate-modal-hide";
}

function navigateToParticipantInfo(){
  hideModal();
  setTimeout(() => {
    window.location.href = "./templates/participantsInfo.html";
  }, 2000);
}

function hideStartGameBtn(){
  addClass("startGame", "hidden");
}

function declineGame() {
  hideModal();
  showGameOver();
  hideStartGameBtn();
}

function showGameOver(){
  setTimeout(() => {
    addClass("gameOverCont", "animation-game-over");
  }, 1000)
}

function validateSwitchForm(){
  var evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: 20,
    /* whatever properties you want to give it */
  });
  document.getElementById("startGame").dispatchEvent(evt);
}

/* Participant form javascript */
var currentForm = "name";

function validateSwitchForm(){
  switch(currentForm){

    case "name":
      validatePersonal();
      break;

    case "contact": 
      validateContact();
      break;

    case "address":
      validateAddress();
      break;

    default:
      break;
  }
}

function setAvatarInfo(btnObj){
  var avatarName = btnObj.value;
  if(document.getElementsByClassName("avatar-selected").length != 0){
    document.getElementsByClassName("avatar-selected")[0].classList.remove("avatar-selected");
  }
  btnObj.className += " avatar-selected";
  sessionStorage.setItem("avatarName", avatarName);
}

function validatePersonal(){
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var errorMsg = "";
  var radios = document.getElementsByName('gender');
  var genderValue = "";
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      genderValue = radios[i].value;
      break;
    }
  }
  var dob = document.getElementById("dob").value;

  if( fname === ""){
    errorMsg += "<p> Please enter a valid first name. </p>";
  } 
  if( lname === ""){
    errorMsg += "<p> Please enter a valid last name. </p>";
  } 
  if (genderValue === "") {
      errorMsg += "<p> Please select a 'Gender' to continue. </p>";
  }
  if (!document.getElementById("dob").checkValidity()) {
    errorMsg += "<p> Please enter a valid date of birth. </p>"; 
  }else{
    var currentDate = new Date();
    var dateArr = document.getElementById("dob").value.split("-");
    var enteredDate = new Date(dateArr[1] + "/" + (dateArr[2]) + "/" + dateArr[0]);
    if(currentDate.getTime() < enteredDate.getTime()){
      errorMsg += "<p> Do not enter a future date of birth. </p>"; 
    }
  }

  if(errorMsg !== ""){
    addClass("errorCont", "visible");
    document.getElementById("errorMsg").innerHTML = errorMsg;
  }else{
    setCookie("name", fname, 1);
    sessionStorage.setItem('fname', fname);
    sessionStorage.setItem('lname', lname);
    slideNewForm("personalDetails", "contact");
  }
}

function validateContact(){
  var phone = document.getElementById("primaryPhone").value;
  var phoneFriend = document.getElementById("friendPhone").value;
  var email = document.getElementById("email").value;
  var emptyEmail = false;
  var emptyPhone = false;
  var emptyPhoneFrnd = false;
  var errorMsg = "";

  if (phone === "") {
    errorMsg = "<p> Please enter a valid phone number. </p>";
    emptyPhone = true;
  }
  if (phoneFriend === "") {
    errorMsg += "<p> Please enter a valid phone number of friend. </p>";
    emptyPhoneFrnd = true;
  }
  if (email === "") {
    errorMsg += "<p> Please enter valid email address. </p>";
    emptyEmail = true;
  }
  if (!document.getElementById("primaryPhone").checkValidity() && !emptyPhone) {
    errorMsg += "<p> Please enter a valid primary phone number. </p>"; 
  }
  if (!document.getElementById("friendPhone").checkValidity() && !emptyPhoneFrnd) {
    errorMsg += "<p> Please enter a valid friends phone number. </p>"; 
  }
  if (!document.getElementById("email").checkValidity() && !emptyEmail) {
    errorMsg += "<p> Please enter a valid email with correct format. </p>"; 
  }
  if(phone == phoneFriend){
    errorMsg += "<p> Personal phone number and friend phone number cannot be same.</p>"; 
  }
  if (errorMsg !== "") {
    addClass("errorCont", "visible");
    document.getElementById("errorMsg").innerHTML = errorMsg;
  } else {
    sessionStorage.setItem('phone', phone);
    sessionStorage.setItem('friendPhone', phoneFriend);
    setCookie("phone", phone, 1);
    slideNewForm("contact", "address");
  }
}

function validateAddress() {
  var addr1 = document.getElementById("addr1").value;
  var addr2 = document.getElementById("addr2").value;
  var city = document.getElementById("city").value;
  var state = document.getElementById("stateVal").value;
  var zip = document.getElementById("zip").value;
  var emptyZip = false;
  var errorMsg = "";

  if (addr1 === "") {
    errorMsg = "<p> Please enter an address line 1. </p>";
  }
  if (city === "") {
    errorMsg += "<p> Please enter a valid city name. </p>";
  }
  if (state === "") {
    errorMsg += "<p> Please enter valid state. </p>";
  }
  if (zip === "") {
    errorMsg += "<p> Please enter valid zip. </p>";
  }
  if (!document.getElementById("zip").checkValidity() && !emptyZip) {
    errorMsg += "<p> Please enter a valid zip. </p>"; 
  }

  if (errorMsg !== "") {
    addClass("errorCont", "visible");
    document.getElementById("errorMsg").innerHTML = errorMsg;
  } else {
    window.location.href = "./startGame.html";
  }
}


/**
 * Game Page
 */

function checkAnswer(btnObj){
  var answerVal = btnObj.value;
  var actualAnswerObj = gameAnswers.filter(answer => answer.questionId === questions[currentQuestionIndex].questionsId);

  // match the answer provided by user by the answer mapped to question id
  if(answerVal === actualAnswerObj[0].answer){
    changeWinningAmount(btnObj);
    changeButtonAvailability(false);
    if(questionLevel === 5 || questionLevel === 10){
      showRewardsModal();
      showNextQuestion(10000);
    } else if(questionLevel === 15){
        setTimeout(function(){
          exitGame();
        }, 3000);
      }
      else {
        showNextQuestion(5000);
      }
  } else{
    wrongAnswerResponse(btnObj);
  }
}

function changeButtonAvailability(enable){
  var buttons = document.getElementById("allAnswers").querySelectorAll(".answer-box");
  for (i = 0; i < buttons.length; i++) {
    buttons[i].disabled = !enable;
  }
}

function showRewardsModal(winningAmount){
  removeClass("rewardsModal", "animate-modal-hide");
  addClass("rewardsModal", "animate-modal");
  var winningAmount = getWinningAmount();
  document.getElementById("rewardsHeader").innerHTML = "Congratulations, you have won " + winningAmount + ". You will take home this amount for sure.";
  setTimeout( function(){
    var modal = document.getElementById("rewardsModal");
    modal.classList.remove("animate-modal");
    modal.className += " animate-modal-hide";
  }, 8000);
}


function changeWinningAmount(btnObj){
  removeClass("level" + questionLevel, "active");
  if(questionLevel != 14){
    addClass("level" + (questionLevel + 1), "active");
  }
  addClass("level" + questionLevel, "correct");
  btnObj.className += " " + "correct";
  resetBtnClass(btnObj);
  var audio = document.getElementById("right_answer");
  audio.play();
  questionLevel += 1;
}

function resetBtnClass(btnObj){
  setTimeout(function(){
    btnObj.classList.remove("correct");
  },4999);
}

function wrongAnswerResponse(btnObj){
  gameLost = true;
  removeClass("level" + questionLevel, "active");
  addClass("level" + questionLevel, "wrong");
  btnObj.className += " " + "wrong";
  var audio = document.getElementById("wrong_answer");
  audio.play();
  var buttons = document.getElementById("allAnswers").querySelectorAll(".answer-box");
  var i;
  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor = "gray";
    buttons[i].disabled = true;
  }
  setTimeout(function(){
    if(questionLevel < 5){
      sessionStorage.clear();
    }
    exitGame();
  }, 3000);
}

function handlePhoneFrnd(){
  if(!usedPhoneFriend && (fiftyFiftyLevelUsed != questionLevel && audienceLevelUsed != questionLevel)){
    document.getElementById("phoneLink").style.opacity = "0.2";
    var phoneLink = "tel:"+sessionStorage.getItem("friendPhone");
    window.location.href = phoneLink;
    setTimeout(function() {
      document.getElementById("phoneLink").setAttribute("href", "javascript:void(0);");
      document.getElementById("phoneLinkMob").setAttribute("href", "javascript:void(0);");
    }, 1000);
    usedPhoneFriend = true;
    phoneLevelUsed = questionLevel;
  }
}

function handleFiftyFifty(){
  if (!usedFiftyFifty && (phoneLevelUsed != questionLevel && audienceLevelUsed != questionLevel) ){
    var currentQuestionId = questions[currentQuestionIndex].questionsId;
    var correctOption = getCorrectOption(currentQuestionId);
    var buttons = document.getElementById("allAnswers").querySelectorAll(".answer-box");
    var wrongOptions = generateOptionsToRemove(correctOption);
    for (var i = 0; i < buttons.length; i++) {
      if (wrongOptions.indexOf(i) != -1) { 
        buttons[i].style.color = "#000";
      }
    }
    document.getElementById("fiftyFifty").style.opacity = "0.2";
    usedFiftyFifty = true;
    fiftyFiftyLevelUsed = questionLevel;
  }
}

function generateOptionsToRemove(rightOption){
  var rightOptionsArr  = new Array();
  var randomOption;
  do{
    randomOption = Math.floor(Math.random() * 4);
    if (rightOptionsArr.indexOf(randomOption) === -1 && randomOption !== rightOption) rightOptionsArr.push(randomOption);
  } while( rightOptionsArr.length < 2);
  return rightOptionsArr;
}

function initializeGame(){
  var phone = getCookie("phone");
  if(sessionStorage.getItem("fname") == null){
    window.location.href = "./participantsInfo.html";
  }
  var fname = sessionStorage.getItem("fname");
  document.getElementById("playerName").innerHTML = fname;
  if(sessionStorage.getItem("avatarName") != null){
    document.getElementById("player-avatar").classList += sessionStorage.getItem("avatarName");
  } else {
    document.getElementById("player-avatar").classList += "avengers";
  };
  setQuestion();
  setOptions();
}

function exitGame(){
  hideElement("leftPanel");
  hideElement("rightPanel");
  var winningAmount = getWinningAmount();
  if (winningAmount === 0){
    addClass("exitModal", "animate-modal");
    document.getElementById("exitHeader").innerHTML = "Sorry, you did not win anything.";
  } else{
    removeClass("rewardsModal", "animate-modal-hide");
    addClass("rewardsModal", "animate-modal");
    var winningAmount = getWinningAmount();
    document.getElementById("rewardsHeader").innerHTML = "You have won " + winningAmount + ".";
    addClass("collectRewards", "visible");
  }
}

/** 3rd Phase changes */

function showNextQuestion(timeOutval){
  setTimeout(function(){
    currentQuestionIndex += 1;
    setQuestion();
    setOptions();
    changeButtonAvailability(true);
    var buttons = document.getElementById("allAnswers").querySelectorAll(".answer-box");
    for (var i = 0; i < buttons.length; i++) {
      if (usedFiftyFifty) { 
        buttons[i].style.color = "#fff";
      }
    }
  }, timeOutval);
}

function setQuestion(){
  if(currentQuestionIndex === 0){
    currentQuestionIndex = getRandomQuestionIndex();
  }
  var questionText = questions[currentQuestionIndex].questionText;
  document.getElementById("questionBoxInner").innerHTML = questionText;
}

function setOptions(){
  var optionsArray = getRandomOptionArray();
  for(var optCount=0; optCount < 4; optCount++){
    document.getElementById("option"+ optCount).value = questions[currentQuestionIndex].questionOptions[optionsArray[optCount]];
    document.getElementById("option" + optCount).innerHTML = questions[currentQuestionIndex].questionOptions[optionsArray[optCount]];
  }
}

function getRandomQuestionIndex(){
  var generatedIndex = Math.floor(Math.random() * questionCountLimit);
  if (questionIndexesFound.indexOf(generatedIndex) === -1){
    console.log(`Generated Question Index ${generatedIndex}`);
    questionIndexesFound.push(generatedIndex);
    return generatedIndex;
  } else if (questionIndexesFound.length === questionCountLimit){
    return;
  } else{
    getRandomQuestionIndex();
  }
}

function getRandomOptionArray(){
  var optionsArray = [];
  do{
    var generatedIndex = Math.floor(Math.random() * 4);
    if(optionsArray.indexOf(generatedIndex) === -1){
      console.log(`Generated option Index ${generatedIndex}`);
      optionsArray.push(generatedIndex);
      currentOptionsArray = optionsArray;
    }
  } while( optionsArray.length < 4);
  return optionsArray;
}

function showCollectRewardsModal(){
  hideElement("rewardsModal");
  addClass("collectRewardsModal", "animate-modal");
  document.getElementById("submitFname").innerHTML = sessionStorage.getItem("fname");
  document.getElementById("submitLname").innerHTML = sessionStorage.getItem("lname");
  document.getElementById("submitPhone").innerHTML = sessionStorage.getItem("phone");
  document.getElementById("submitAmount").innerHTML = rewardsLevelMap["level"+ (questionLevel-1)];

  document.getElementById("hidFname").value = sessionStorage.getItem("fname");
  document.getElementById("hidLname").value = sessionStorage.getItem("lname");
  document.getElementById("hidPhone").value = sessionStorage.getItem("phone").replace(/-/g, "");
  document.getElementById("hidAmount").value = rewardsLevelMap["level"+ (questionLevel-1)];
  sessionStorage.clear();
}

function getWinningAmount(){
  var actualQuestionLevel;
  var actualWinninAmount;
  if(gameLost){
    if(questionLevel - 1 < 4){
      actualWinninAmount = 0;
    } else if(questionLevel - 1 < 9){
      actualWinninAmount = "$1000";
    } else if(questionLevel - 1 < 14){
      actualWinninAmount = "$25000";
    }
  } else if(questionLevel == 0){
    actualWinninAmount = 0;
  } else {
    actualWinninAmount = rewardsLevelMap["level" + (questionLevel - 1)];
  }
  return actualWinninAmount;
}
