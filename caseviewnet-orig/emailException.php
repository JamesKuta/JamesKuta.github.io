<?php


// Pear Mail Library
//require_once ("Mail.php");
//require_once ("Mail/mime.php");
require_once ('class.phpmailer.php');





$errorMessage = '';


$emailTo = 'danielbednarczyk@hotmail.com';
$nameTo = 'daniel';
$clientName = '';
$data = '';


$headers = array();
foreach ($_SERVER as $key => $value) {
    if (strpos($key, 'HTTP_') === 0) {
        $headers[str_replace(' ', '', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))] = $value;
    }
}

if(!isset($headers["Clientname"]) || strlen($headers["Clientname"]) == 0)
	$errorMessage .= 'Client Name is missing. ';
else
	$clientName = $headers["Clientname"];


$data = file_get_contents('php://input');


if(strlen($data) == 0)
	$errorMessage .= 'Data is missing. ';

if(strlen($errorMessage) == 0)
{
	//$from = 'danielbednarczyk2@gmail.com';
	$from = 'caseviewnet@stenograph.com';
	$to = $emailTo;
	//we need string to be in latin1
	$fileData = utf8_decode(urldecode($data));

	
	$subject = 'Exception ' . $clientName;
	$text = 'File is attached.';

	$mail = new PHPMailer;
	$mail->isSMTP();
	$mail->SMTPDebug = 0;
	$mail->Debugoutput = 'html';
	$mail->Host = 'smtp.office365.com';
	$mail->Port = 587;
	$mail->SMTPAuth = true;
	$mail->Username = 'caseviewnet@stenograph.com';
	$mail->Password = 'CV.Steno-17';
	$mail->setFrom($from, 'caseviewnet');
	//$mail->addReplyTo('replyto@example.com', 'First Last');
	$mail->addAddress($to, $nameTo);
	$mail->Subject = $subject;
	$mail->AddStringAttachment($fileData, $clientName . '.txt','base64','attachment');
	$mail->Body = $text;



	if (!$mail->send()) {
		echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
		echo "Message sent!";
	}


}
else
{
	echo($errorMessage);
}