function createAudienceChart(){
  if(!usedAudiencePoll && (fiftyFiftyLevelUsed != questionLevel && phoneLevelUsed != questionLevel)){
    document.getElementById("audiencePollCont").style.display = "block";
    document.getElementById("audiencePoll").style.opacity = "0.2";
    var optionPercent = findCorrectOption();
    var chart = new CanvasJS.Chart("audienceChart", {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Audience Poll"
      },
      axisY: {
        title: "POll Results in %"
      },
      data: [{
        type: "column",
        showInLegend: true,
        legendMarkerColor: "grey",
        legendText: "Value in percentage",
        dataPoints: [
          { y: optionPercent[0].value, label: "Option A" },
          { y: optionPercent[1].value, label: "Option B" },
          { y: optionPercent[2].value, label: "Option C" },
          { y: optionPercent[3].value, label: "Option D" }
        ]
      }]
    });
    chart.render();
    usedAudiencePoll = true;
    audienceLevelUsed = questionLevel;
  }
}

function removeChart(){
  document.getElementById("audiencePollCont").style.display = "none";
}

function findCorrectOption(){
  var currentQuestionId = questions[currentQuestionIndex].questionsId;
  return findCorrectAnswer(currentQuestionId);
}

function findCorrectAnswer(currQuestionId){
  return getOptionPercentage(getCorrectOption(currQuestionId));
}

function getOptionPercentage(correctOption){
  if(questionLevel < 5){
    return assignPercentages(60, correctOption);
  } else if(questionLevel > 4 && questionLevel < 9){
    return assignPercentages(50, correctOption);
  } else{
    return assignPercentages(40, correctOption);
  }
}

function assignPercentages(maxVluePercentage, correctOption){
  var optionObject = [{ "value": "" }, { "value": "" }, { "value": "" }, { "value": "" }];
  var minVals = [];
  optionObject[correctOption].value = generateValueMax(maxVluePercentage);
  var minVal = 100 - optionObject[correctOption].value;
  minVals.push(generateValueMin(minVal));
  var newMinVal2 = 100 - (optionObject[correctOption].value + minVals[0]);
  minVals.push(generateValueMin(newMinVal2));
  minVals.push(100 - (optionObject[correctOption].value + minVals[0] + minVals[1]));
  for (var optCount = 0; optCount < optionObject.length; optCount++) {
    if (optCount !== correctOption) {
      optionObject[optCount].value = minVals[optCount];
    } else {
      minVals.splice(optCount, 0, "");
    }
  }
  return optionObject;
}


function generateValueMax(maxVal) {
  var randomNum = 0;
  do {
    randomNum = Math.floor((Math.random() * maxVal) + 5)
  } while (randomNum < maxVal);
  return randomNum;
}

function generateValueMin(minVal){
  var randomNum = 0;
  randomNum = Math.floor((Math.random() * minVal))
  return randomNum;
}

function getCorrectOption(currQuestionId){
  var actualAnswerObj = gameAnswers.filter(answer => answer.questionId === currQuestionId);
  var correctOption = 0;
  var allOptions = document.getElementsByClassName("answer-box");
  for (var optCount = 0; optCount < allOptions.length; optCount++) {
    if (allOptions[optCount].innerHTML === actualAnswerObj[0].answer) {
      correctOption = optCount;
    }
  }
  return correctOption;
}