// num1 + num2 = numSum

var num1 = undefined;
var num2 = undefined;
var numSum = undefined;
var soundCorrect = document.getElementById("correctSound");
var soundWrong = document.getElementById("wrongSound");

//Create the left side of the equation var num1 + var num2 store total in var numSum

//function reloadPage() {
//  location.reload();
//}

/*var eKey = document.getElementById("equals");
eKey.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("subBtn").click();
    }
}); */

createEquation();

function uniKeyCode(event) {
    var key = event.keyCode;
    if (key == 13) {
        event.preventDefault()
        answer();
    }
}

function createEquation() {
    // num1 = num2 = numSum = undefined;
    document.getElementById('result').innerHTML = "Don't 'F' this up, Chris!";
    //document.getElementById('equals').value = "";
    document.getElementById("equals").value = '';
    document.getElementById('equals').focus();
    document.getElementById('equals').select();
    document.getElementById("equals").style.backgroundColor = "white";

    num1 = Math.floor((Math.random() * 100));
    //do {
    num2 = Math.floor((Math.random() * 100));

    //while (num2 > num1);
    document.getElementById("equation").innerHTML = num1 + ' + ' + num2;
    numSum = num1 + num2;
    //Use next line if I want to test numSum
    //document.getElementById("sum").innerHTML = numSum;
}

function answer() {
    var correctAnswer = document.getElementById("equals").value;
    console.log(correctAnswer);
    //document.getElementById("sum").innerHTML = numSum;
    if (correctAnswer == numSum) {
        //document.getElementById("sum").innerHTML = numSum;
        document.getElementById("result").innerHTML = "You shouldn't be too excited!";
        document.getElementById("equals").style.backgroundColor = "green";
        soundCorrect.play();
        setTimeout(createEquation, 2000);



    } else {
        document.getElementById("result").innerHTML = "How many degrees do you have?";
        document.getElementById("equals").value = '';
        document.getElementById('equals').focus();
        document.getElementById('equals').select();
        document.getElementById("equals").style.backgroundColor = "red";
        soundWrong.play();
    }


}
