// num1 + num2 = numSum

var num1 = undefined;
var num2 = undefined;
var numSum = undefined;


//Create the left side of the equation var num1 + var num2 store total in var numSum

//function reloadPage() {
  //  location.reload();
//}
createEquation();

document.getElementById

function createEquation() {
   // num1 = num2 = numSum = undefined;
    document.getElementById('result').innerHTML = "Don't F This Up, Chris!";
    //document.getElementById('equals').value = "";
    document.getElementById("equals").value ='';
    document.getElementById('equals').focus();
    document.getElementById('equals').select();
    document.getElementById("equals").style.backgroundColor ="white";
    num1 = Math.floor((Math.random() * 100));
    do {
        num2 = Math.floor((Math.random() * 100));
    }
    
    while (num2 > num1);
    document.getElementById("equation").innerHTML = num1 + ' - ' + num2;
    numSum = num1 - num2;
    //Use next line if I want to test numSum
    //document.getElementById("sum").innerHTML = numSum;
} 

function answer() {
   var correctAnswer = document.getElementById("equals").value;
    //document.getElementById("sum").innerHTML = numSum;
    if (correctAnswer == numSum) {
        //document.getElementById("sum").innerHTML = numSum;
        document.getElementById("result").innerHTML = "Yay! My sister can subtract.";
        document.getElementById("equals").style.backgroundColor ="green";
        setTimeout(createEquation, 2000);
        
        
    } else {
        document.getElementById("result").innerHTML = "Seriously? Insert Face Palm Here.";
        document.getElementById("equals").focus();
        document.getElementById("equals").select();
        document.getElementById("equals").style.backgroundColor ="red";
        document.getElementById("equals").value ='';
    }
    }


