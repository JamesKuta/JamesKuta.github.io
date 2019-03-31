<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="icon" href="icvnet_icon175x175.jpeg">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="apple-mobile-web-app-title" content="Case View Net">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>CaseViewNet Browser Edition</title>
	<link rel="stylesheet" href="stylesLogin.css">
</head>
<body class="body-front-page">
	<div class="div_logo max_width350 min_width320"><img class="img_logo" src="CVNet_Browser-Edition bystenograph.png"></div>

	<div class="div_logo max_width350 min_width320" >
		<p>Session Code and Password should be supplied by your court reporter.</p>
	</div>
	<br/>
	<div class="div_login-form max_width350 min_width320">
		<form class="login_form" action="application.php" method="post"  autocomplete="off" onsubmit="return validateForm()">
			<div class="div_label col-11">Login Information:</div>
			<div class="div_inputField width90per"><input id="sessionCode" class="input_field" type="text" name="sessionCode" autocomplete="off" placeholder="Session Code" onchange="convertToUpperCase(this)" oninput="convertToUpperCase(this)"></div>
			<div class="div_inputField width90per"><input id="password" class="input_field" type="password" name="password" autocomplete="off" placeholder="Password"></div>
			<div class="div_inputField width90per"><input id="name" class="input_field" type="text" name="name" autocomplete="off" placeholder="Name"></div>
			<div class="div_inputField width90per"><input id="company" class="input_field" type="text" name="company" autocomplete="off" placeholder="Company"></div>
			<div class="div_inputField width90per"><input id="email" class="input_field" type="email" name="email" autocomplete="off" placeholder="E-Mail"></div>
			<div class="div_inputField width90per"><input class="input_button" type="submit" value="Connect"></div>
		</form>
	</div>

	<br/>

	<div class="div_links max_width350 min_width320">	
		<a href="http://www.stenograph.com/content/files/documents/CVN_Browser_Quick_Reference.pdf" target="_blank"><p>Browser Edition Quick Reference</p></a>
		
		<a href="http://www.stenograph.com/content/files/documents/CVNSetup.exe" target="_blank"><p>CaseViewNet for Windows</p></a>
		<a href="#" onclick="startDemo(event);"><p>Try Demo</p></a>
	</div>
	<div class="div_logo max_width350 min_width320"><div class="divinner"><a href="http://www.stenograph.com" target="_blank"><img class="img_logo_stenograph" src="sg_logo_256web.png"></a></div></div>
	<div class="div_logo max_width350 min_width320 copyright">© Copyright <?php echo date("Y"); ?> Stenograph L.L.C. All rights reserved.</div>
</body>

<script type="text/javascript">
function validateForm() {
	var sessionCode = document.getElementById('sessionCode');
	var password = document.getElementById('password');
	var name = document.getElementById('name');
	var company = document.getElementById('company');
	var email = document.getElementById('email');
	
	if(isEmptyOrWhiteSpace(sessionCode.value))
	{
		alert('Session Code is missing.');
		sessionCode.focus();
	}
	else if(isEmptyOrWhiteSpace(password.value))
	{
		alert('Password is missing.');
		password.focus();
	}
	else if(isEmptyOrWhiteSpace(name.value))
	{
		alert('Name is missing.');
		name.focus();
	}
	else if(isEmptyOrWhiteSpace(company.value))
	{
		alert('Company is missing.');
		company.focus();
	}
	else if(isEmptyOrWhiteSpace(email.value))
	{
		alert('E-Mail is missing.');
		email.focus();
	}
	else
		return true;
		
	return false;
};

function isEmptyOrWhiteSpace(value) {
	if(value && value !== '' && value.trim() !== '')
		return false;
	else
		return true;
};

function convertToUpperCase(input) {
	input.value = input.value.toUpperCase().trim();
};

function startDemo(event) {
	event.preventDefault();
	var form = document.createElement("form");
	form.setAttribute("method", 'post');
    form.setAttribute("action", 'application.php');

    var sessionCode = document.createElement("input");
    var password = document.createElement("input");
    var name = document.createElement("input");
    var company = document.createElement("input");
    var email = document.createElement("input");


    sessionCode.setAttribute("type", "hidden");
    password.setAttribute("type", "hidden");
    name.setAttribute("type", "hidden");
    company.setAttribute("type", "hidden");
    email.setAttribute("type", "hidden");

    sessionCode.setAttribute("name", "sessionCode");
    password.setAttribute("name", "password");
    name.setAttribute("name", "name");
    company.setAttribute("name", "company");
    email.setAttribute("name", "email");

    sessionCode.setAttribute("value", "DEMO");
    password.setAttribute("value", "demo");
    name.setAttribute("value", "name");
    company.setAttribute("value", "company");
    email.setAttribute("value", "example@domain.com");

    form.appendChild(sessionCode);
    form.appendChild(password);
    form.appendChild(name);
    form.appendChild(company);
    form.appendChild(email);
	document.body.appendChild(form);
	form.submit();


};


</script>



</html>