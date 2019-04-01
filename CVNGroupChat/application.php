<?php
$errorMessage = '';

$sessionCode = '';
$password = '';
$name = '';
$company = '';
$email = '';

$GUID = '';
$cookie_name = 'GUID';
if(isset($_COOKIE[$cookie_name])) {
    $GUID = $_COOKIE[$cookie_name];
}

//allow these clients only
//$sessionCodeArray = array('5UUUQB','BRAD','DEPOMAN','DEPOQUEEN','DEPOWIFE',
//	'DEV10','DEVDAN','DEVDEV','JRSDEPO','JRSDEPO2','MERILEE','QA', 'FPD8DC',
//	'1BKX9Z', 'JIMTEST', 'CONNOR', '72LMZ5', 'BASHFUL', 'VWP6QD', 'XKCVAL',
//	'MNDEMO', 'RONCOPE', 'PENGUIN', 'QA1CONN', 'QA5CONN', 'QA10CONN' , 'TUTOR4',
//	'BHKFH5', 'S6MUL8', 'MERVIN');




$curl = curl_init();

//$hostName = '192.168.177.143';
//$hostName = 'localhost:4443';
//$hostName = '54.175.194.156';
//$hostName = '192.168.177.161';
//$hostName = 'devtest.stenograph.com';
$hostName = 'cvstream.cloud.stenograph.com';

$httpServerURL = 'https://' . $hostName . '/login';

//check if required fields are present
if(!isset($_POST["sessionCode"]) || strlen($_POST["sessionCode"]) == 0)
	$errorMessage .= 'Session Code is missing. ';
else
	$sessionCode = $_POST["sessionCode"];
if(!isset($_POST["password"]) || strlen($_POST["password"]) == 0)
	$errorMessage .= 'Password is missing. ';
else
	$password = $_POST["password"];
if(!isset($_POST["name"]) || strlen($_POST["name"]) == 0)
	$errorMessage .= 'Name is missing. ';
else
	$name = $_POST["name"];
if(!isset($_POST["company"]) || strlen($_POST["company"]) == 0)
	$errorMessage .= 'Company is missing. ';
else
	$company = $_POST["company"];
if(!isset($_POST["email"]) || strlen($_POST["email"]) == 0)
	$errorMessage .= 'E-Mail is missing. ';
else
	$email = $_POST["email"];

//if (!in_array($sessionCode, $sessionCodeArray)) {
//    $errorMessage .= "Sorry, CaseViewNet Browser Edition is still in beta testing, and this session code is not approved. Please check back soon!";
//}



if(strlen($errorMessage) > 0)
{
	//throw an error and exit.
	echo $errorMessage;
	include 'index.html';
	die();
}

//if it is a demo session code we are not going to continue with a login
if($sessionCode == "DEMO")
{
	include 'caseViewNet.php';
	die();
}

//sanitize variables
//$sessionCode = filter_var($sessionCode, FILTER_SANITIZE_STRING);
$sessionCode = strtoupper(trim($sessionCode));
//$password = filter_var($password, FILTER_SANITIZE_STRING);
//$name = filter_var($name, FILTER_SANITIZE_STRING);
//$company = filter_var($company, FILTER_SANITIZE_STRING);
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
//$GUID = filter_var($GUID, FILTER_SANITIZE_STRING);

//Validate login credentials at the HTTP Server

curl_setopt($curl, CURLOPT_URL, $httpServerURL);
//curl_setopt($curl, CURLOPT_PORT, 444);

$headers = array(
				"Accept: text/xml",
				"SessionCode:" . $sessionCode, 
				"Password:" . $password, 
				"Name:" . $name, 
				"Company:" . $company, 
				"Email:" . $email,
				"Guid:" . $GUID
			);
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HEADERFUNCTION, 'header_callback');


//we can remove the 2 lines below if we have a officially signed certificateda
curl_setopt($curl,CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl,CURLOPT_SSL_VERIFYHOST, false);

// Send the request and save response to $resp
$resp = curl_exec($curl);


//get the return http code
$http_code = 0;

if(!curl_errno($curl)) {
	$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
}

// Close request to clear up some resources
curl_close($curl);
//die();

// for now we allow codes other than 200 because application stream will handle error reasons
//we only reject if we cannot access the server at all
if(isset($GUID) && strlen($GUID) > 0)// && $http_code == 200)
{
	setcookie('GUID', $GUID);
	//echo $GUID . strlen($GUID); 
	include 'caseViewNet.php';
}
else
{
	$errorMessage = 'Login failed. You are not authorized to access the page.';
	echo $errorMessage;
	include 'index.html';
	die();
}
//echo $resp;
//echo $GUID;



function header_callback($curl, $header_line){
	
	
	//echo 'function called with:' . $header_line;
	if(substr($header_line, 0, 4) === 'Guid')
	{
		$GLOBALS['GUID'] = str_replace("\r\n","" , substr($header_line, 6));
		
	}
	return strlen($header_line);
}
?>