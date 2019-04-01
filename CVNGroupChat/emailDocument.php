<?php


// Pear Mail Library
//require_once ("Mail.php");
//require_once ("Mail/mime.php");
require_once ('class.phpmailer.php');



function generateTxtFile($mainBuffer) {
    $bufferSize = sizeof($mainBuffer);
    //echo var_dump($bufferSize);
    if ($bufferSize == 0)
        return "";

    $file = "";
    for ($i = 0; $i < $bufferSize; ++$i)
    {
    	//echo var_dump($mainBuffer[$i]->data);
        $file .= $mainBuffer[$i]->data . "\r\n";
    }

    //echo var_dump($file);
    return $file;
};



function generatePtfFile($mainBuffer, $dateString, $clientName) {
    $bufferSize = sizeof($mainBuffer);

    if ($bufferSize == 0)
        return "";

    $firstLine = $mainBuffer[0];
    
    $file = "begin=Head\r\n";
    $file .= "type=ptf\r\n";
    $file .= "version=1.3\r\n";
    $file .= "end=Head\r\n";
    $file .= "begin=CaseInfo\r\n";
    $file .= "path=\r\n";
    $file .= "name=\r\n";
    $file .= "end=CaseInfo\r\n";
    $file .= "begin=TranscriptInfo\r\n";
    $file .= "datetime=" . $dateString . "\r\n"; //2010 09 15 12 00 00
    $file .= "name=" . $clientName . "\r\n";
    $file .= "begin=comments\r\n";
    $file .= "end=comments\r\n";
    
    $pages = intval($mainBuffer[$bufferSize - 1]->page);

    $file .= "pagenames=";//1,2,3,4,5,6,7,8,9,10\r\n";

    for ($i = 1; $i <= $pages; ++$i) {
        if ($i < $pages) {
            $file .= $i . ",";
        }
        else {
            $file .= $i . "\r\n";
        }
    }


    
    $lineNames = "linenames=";
    $lineTimestamps = "linetimestamps=";
    $annotations = '';
    $lineData = '';

    $pageNumber = $firstLine->page;

    for ($i = 0; $i < $bufferSize; ++$i)
    {
        $line = $mainBuffer[$i];

        $ts = $line->timestamp;
        if ($ts && strlen($ts) > 8) {
            $ts = substr($ts, 0, 8);
        }

        //line names
        //line Timestamps
        if ($i < $bufferSize - 1) {
            $lineNames .= $line->line . ",";
            $lineTimestamps .= $ts . ",";
        }
        else {
            $lineNames .= $line->line . "\r\n";
            $lineTimestamps .= $ts . "\r\n";
        }


        //annotations
        if ($line->selected) {
            $annotations .= "quick=" . $i . "\r\n";
        }

        //text
        if ($pageNumber != $line->page) {
            $pageNumber = $line->page;
            $lineData .= "fmt=pb\r\n";
        }

        $lineData .= $i . "=" . $line->data . "\r\n";
    }

    $file .= $lineNames;
    $file .= $lineTimestamps;

    $file .= "firstpage=1\r\n";
    $file .= "pagelen=" . $pages . "\r\n";
    $file .= "end=TranscriptInfo\r\n";
    $file .= "begin=ActiveIssues\r\n";
    $file .= "99=\r\n";//workaround so that CaseViewNet imports marks
    $file .= "end=ActiveIssues\r\n";
    $file .= "begin=DeletedIssues\r\n";
    $file .= "end=DeletedIssues\r\n";
    $file .= "begin=Annotations\r\n";

    $file .= $annotations;

    $file .= "end=Annotations\r\n";
    $file .= "begin=Text\r\n";

    $file .= $lineData;


    $file .= "end=Text\r\n";
    
    return $file;
};



$errorMessage = '';


$emailTo = '';
$nameTo = '';
$fileName = '';
$data = '';
$dateString = '';


$headers = array();
foreach ($_SERVER as $key => $value) {
    if (strpos($key, 'HTTP_') === 0) {
        $headers[str_replace(' ', '', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))] = $value;
    }
}

if(!isset($headers["Emailto"]) || strlen($headers["Emailto"]) == 0)
	$errorMessage .= 'Email To is missing. ';
else
	$emailTo = $headers["Emailto"];

if(!isset($headers["Nameto"]) || strlen($headers["Nameto"]) == 0)
	$errorMessage .= 'Name To is missing. ';
else
	$nameTo = $headers["Nameto"];

if(!isset($headers["Filename"]) || strlen($headers["Filename"]) == 0)
	$errorMessage .= 'File Name is missing. ';
else
	$fileName = $headers["Filename"];
if(!isset($headers["Datestring"]) || strlen($headers["Datestring"]) == 0)
	$errorMessage .= 'Date String is missing. ';
else
	$dateString = $headers["Datestring"];


$data = file_get_contents('php://input');


if(strlen($data) == 0)
	$errorMessage .= 'Data is missing. ';

if(strlen($errorMessage) == 0)
{
	//$from = 'danielbednarczyk2@gmail.com';
	$from = 'caseviewnet@stenograph.com';
	$to = $emailTo;
	//we need string to be in latin1
	$fileData = urldecode($data);
	//$fileData = utf8_decode(urldecode($data));

	//echo var_dump($fileData);
	$mainBuffer = json_decode($fileData);

	//echo var_dump($mainBuffer);
	$textData = utf8_decode(generateTxtFile($mainBuffer));
	//echo var_dump($testData);
	$ptfData = utf8_decode(generatePtfFile($mainBuffer, $dateString, $nameTo));



	$subject = 'CaseViewNet Transcript Delivery';
	$text = 'Your transcript is attached. Thank you for using CaseViewNet Browser Edition.';

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
	$mail->AddStringAttachment($textData, $fileName . '.txt','base64','attachment');
	$mail->AddStringAttachment($ptfData, $fileName . '.ptf','base64','attachment');
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