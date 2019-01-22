//CaseViewNet Solution Finder
//James Kuta

window.onload = function ()
{
  //grap the submit button and tell it what to do when clicked
  let submit = document.getElementById('submit-button');
  submit.addEventListener('click', validate);

  //grab the <select> for each question and tell them what to do
  let q1 = document.getElementById("cat-software");
  q1.addEventListener('change', function ()
  {
    setAnswerColorAttrib(q1);
    showNextQuestion();
    showSubmitButton();
  });

  let q2 = document.getElementById("same-room-select");
  q2.addEventListener('change', function ()
  {
    setAnswerColorAttrib(q2);
    showNextQuestion();
    showSubmitButton();''
  });

  let q3 = document.getElementById("network-select");
  q3.addEventListener('change', function ()
  {
    setAnswerColorAttrib(q3);
    showNextQuestion();
    showSubmitButton();
  });
};

//What to do with answered and unanswered questions
let showNextQuestion = function () 
{
  let question1 = document.getElementById("q1");
  let question2 = document.getElementById("q2");
  let question3 = document.getElementById("q3");
  let questionsArray = new Array(question1, question2, question3);
  

  for (let i = 1; i < questionsArray.length; i++)
  {    
    if (questionsArray[i].classList.contains('hidden'))
      {
        questionsArray[i].classList.remove('hidden');
        //questionsArray[i].style.display = 'inline-block';
        break;
      } 
  }
}

function showSubmitButton()
{
  let question1 = document.getElementById("cat-software");
  let question2 = document.getElementById("same-room-select");
  let question3 = document.getElementById("network-select");
  let submitBtn = document.getElementById('submit-button');
  
  if (
    question1.value !== "Choose..." &&
    question2.value !== "Choose..." &&
    question3.value !== "Choose..."
    ) 
  {
    submitBtn.classList.remove('hidden');
  }
}

//Check to make sure all questions are answered when submit is clicked. (not really needed anymore)
function validate()
{
  let question1 = document.getElementById("cat-software");
  let question2 = document.getElementById("same-room-select");
  let question3 = document.getElementById("network-select");
  let questionsArray = new Array(question1, question2, question3);
  //console.log(questionsArray);

  if (
    question1.value !== "Choose..." &&
    question2.value !== "Choose..." &&
    question3.value !== "Choose..."
  )
  {
    removeErrorMessage();
    handleSelections(question1, question2, question3);
  } else
  {
    for (let i = 0; i < questionsArray.length; i++)
    {
      if (questionsArray[i].value === "Choose...")
      {
        questionsArray[i].style.color = "red";
      } // end inner if
    } // end for
    let answerMissing = document.getElementById("instructions");
    let h6 = document.createElement("h6");
    removeErrorMessage();
    answerMissing.appendChild(h6);
    h6.innerHTML =
      '<h6 id="error" style="color:red;" >Please answer all questions.</h6>';
  } // end else
} // end validate

//Remove the red color for the answered questions
function setAnswerColorAttrib(el)
{
  el.removeAttribute('style');
  //console.log(el);
}

//Remove the "Please Answer All Questions text"
function removeErrorMessage()
{
  if (document.contains(document.getElementById("error")))
  {
    document.getElementById("error").remove();
  }
}


// Enable to toggle display of Internet Important question if using CATalyst yes or no
/* function showInternetImportant(el) {
    let internetQuestion = document.getElementById("internet-question");
    if(el.value === 'yes' && internetQuestion.style.display == "none"){
        internetQuestion.style.display = "inline-block";
    } else {
        internetQuestion.style.display = "none";
    }
    
} */

function handleSelections(el1, el2, el3)
{
  if (el1.id === "cat-software")
  {
    catSoftwareOptions(el1.value, el2.value, el3.value);
  }

  if (el2.id === "same-room-select")
  {
    sameRoomOptions(el1.value, el2.value, el3.value);
    console.log(el2.value);
  }

  if (el3.id === "network-select")
  {
    console.log(el1.value, el2.value, el3.value);
  }
}

// What to do once CAT software question is answerd
function catSoftwareOptions(value1, value2, value3)
{
  let explanation = document.getElementById("explanation-text");
  let buy = document.getElementById("buy-text");

  // clear any existing text
  explanation.innerHTML = "";
  buy.innerHTML = "";

  //check the values and act on them
  if (value1 === "yes")
  {
    //text for explination pane
    let div = document.createElement("div");
    let h6 = document.createElement("h6");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let headingText = document.createTextNode(
      "Because you use Case CATalyst: "
    );
    let text = document.createTextNode(
      "You're in great shape for this!" +
      " Case CATalyst, with a CaseViewNet license, will" +
      " give you refresh of all editing changes!"
    );
    explanation.appendChild(div); // create a <div> inside explanation
    div.appendChild(h6); // create a <h4> inside of the <div>
    h6.appendChild(headingText); // add the text to the <h4> element
    div.appendChild(ul); // create a <ul> element under the <h4> in the <div>
    ul.appendChild(li); // create a <li> element in the <ul>
    li.appendChild(text); // add the text to the <li> element

    //text for What to buy pane
    let div2 = document.createElement("div");
    let h62 = document.createElement("h6");
    let ul2 = document.createElement("ul");
    let li2 = document.createElement("li");
    let headingText2 = document.createTextNode(
      "Because you use Case CATalyst: "
    );
    let text2 =
      '<a href="http://www.stenograph.com" class="badge badge-light" target="_blank">CaseViewNet License</a>';
    buy.appendChild(div2); // create a <div> inside explanation
    div2.appendChild(h62); // create a <h4> inside of the <div>
    h62.appendChild(headingText2); // add the text to the <h4> element
    div2.appendChild(ul2); // create a <ul> element under the <h4> in the <div>
    ul2.appendChild(li2); // create a <li> element in the <ul>
    li2.innerHTML = text2; // add the text to the <li> element
  }

  if (value1 === "no")
  {
    //text for explination pane
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let h6 = document.createElement("h6");
    let ul = document.createElement("ul");
    let li = document.createElement("li");
    let headingText = document.createTextNode(
      "Because you don't use Case CATalyst: "
    );
    let text = document.createTextNode(
      "You'll need a CaseViewNet Cloud Session Code and an Internet connection"
    );
    explanation.appendChild(div); // create a <div> inside explanation
    div.appendChild(h6); // create a <h4> inside of the <div>
    h6.appendChild(headingText); // add the text to the <h4> element
    div.appendChild(ul); // create a <ul> element under the <h4> in the <div>
    ul.appendChild(li); // create a <li> element in the <ul>
    li.appendChild(text); // add the text to the <li> element

    //text for What to buy pane
    let h62 = document.createElement("h6");
    let ul2 = document.createElement("ul");
    let li2 = document.createElement("li");
    let headingText2 = document.createTextNode(
      "Because you don't use Case CATalyst: "
    );
    let text2 =
      '<a href="http://www.stenograph.com" class="badge badge-light" target="_blank">CaseViewNet Cloud Session Code</a>';
    buy.appendChild(div2); // create a <div> inside explanation
    div2.appendChild(h62); // create a <h4> inside of the <div>
    h62.appendChild(headingText2); // add the text to the <h4> element
    div2.appendChild(ul2); // create a <ul> element under the <h4> in the <div>
    ul2.appendChild(li2); // create a <li> element in the <ul>
    li2.innerHTML = text2; // add the text to the <li> element
  }
}

function sameRoomOptions(value1, value2, value3)
{

}