// num1 + num2 = numSum

var num1 = undefined;
var num2 = undefined;
var numSum = undefined;


//Create the left side of the equation var num1 + var num2 store total in var numSum

function reloadPage() {
    location.reload();
}
createEquation();

function createEquation() {
   // num1 = num2 = numSum = undefined;
    document.getElementById('result').innerHTML = "YOU CAN DO IT, JAMES!";
    //document.getElementById('equals').value = "";
    num1 = Math.floor((Math.random() * 9));
    //do {
        num2 = Math.floor((Math.random() * 9));
    
    //while (num2 > num1);
    document.getElementById("equation").innerHTML = num1 + ' + ' + num2;
    numSum = num1 + num2;
    //Use next line if I want to test numSum
    //document.getElementById("sum").innerHTML = numSum;
} 

function answer() {
   var correctAnswer = document.getElementById("equals").value;
    //document.getElementById("sum").innerHTML = numSum;
    if (correctAnswer == numSum) {
        //document.getElementById("sum").innerHTML = numSum;
        document.getElementById("result").innerHTML = "CORRECT! NICE JOB, JAMES!";
        
        
    } else {
        document.getElementById("result").innerHTML = "TRY AGAIN, JAMES!";
    }
    }


