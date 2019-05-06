<?php
header("Cache-Control: no-cache, must-revalidate");
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="apple-mobile-web-app-title" content="Case View Net">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link rel="stylesheet" href="bootstrap.min.css">
	<link rel="icon" href="icvnet_icon175x175.jpeg">
	<!--<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />-->
	<title>CaseViewNet Browser Edition</title>
	<link rel="stylesheet" href="caseViewNetStyles.css">
</head>
<body onresize="onDocumentResize()" class="body-front-page noselect">
	<meta http-equiv="no-cache">
	<meta http-equiv="Expires" content="-1">
	<meta http-equiv="Cache-Control" content="no-cache">
	
	
	<div id="divContent">
		<div id="divContainerScroll">
			<div id="divContainerFullTranscript">
				<div id="divContainerPartialTranscript">
					<div id="divContainerItemList">
					</div>
				</div>
			</div>
		</div>
		<div id="divCartOutter">
			<div id="divCartInner">
				<div id="divCartParagraphFull">
					<div id="divCartParagraphList"></div>
				</div>
			</div>
		</div>
	</div>
	<div id="divMenuContainer">
		<div id="divTopMenuContainer" class="divTopMenuContainer">
			<button id="buttonConnect" type="button" class="btn btn-default" onclick="requestData();">Connect</button>
			<button id="buttonFollowRealTime" type="button" class="btn btn-default" onclick="followRealTimeClicked();">Follow Realtime</button>
			<div id="divMenuToggle" class="leftMargin5 floatRight">
				<!--A fake / hidden checkbox is used as click reciever,
			    so you can use the :checked selector on it.-->
			    <input id="inputHiddenHamburgerMenu" type="checkbox" />
			    <!--Some spans to act as a hamburger.-->
			    <span></span>
			    <span></span>
			    <span></span>
			    <ul id="menu">
			      <a href="#" onclick="showHideChatForm();"><li>Chat</li></a>
			      <a href="#" onclick="showHideSearchForm(false);"><li>Search</li></a>
			      <a href="#" onclick="showHideEmailForm();"><li>Email</li></a>
			    </ul>
			</div>
			<button id="buttonEmail" type="button" class="btn btn-default leftMargin5 floatRight" onclick="showHideEmailForm();">Email</button>
			<button id="buttonSearch" type="button" class="btn btn-default leftMargin5 floatRight" onclick="showHideSearchForm(false);">Search</button>
			<button id="buttonChat" type="button" class="btn btn-default floatRight" onclick="showHideChatForm();">Chat</button>
		</div><!--divTopMenuContainer-->
		<div id="divShowHideSideMenu" class="divShowHideSideMenu">
			<button id="buttonShowHideSideMenu" type="button" class="btn btn-default" onclick="showHideSideMenu();">&lt;&lt;</button>
		</div><!--divShowHideSideMenu-->
		
		<div id="divSideMenuContainer" class="divSideMenuContainer">
			<div class="divSwitchView">
				<button id="buttonSwitchView" type="button" class="btn btn-default buttonSwitchView" onclick="switchView();">CARTView</button>
			</div><!--divSwitchView-->
			<div class="divOptionsOutter">
				<div class="divOptionsInner">
					<div class="divChangeSize">
						<h1>> Size Options</h1>
						<div class="divMenuOption">
							<p>Font</p>
							<div class="divSingleOption">
								<button id="buttonMinusFontSize" type="button" class="btn btn-default">-</button>
								<input id="inputFontSize" type="text" class="inputNumerical" onchange="validateInput(this);" oninput="sanitizeInput(this);"></input>
								<button id="buttonPlusFontSize" type="button" class="btn btn-default">+</button>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
						<div class="divMenuOption">
							<p>Outline</p>
							<div class="divSingleOption">
								<button id="buttonMinusOutlineSize" type="button" class="btn btn-default">-</button>
								<input id="inputOutlineSize" type="text" class="inputNumerical" onchange="validateInput(this);" oninput="sanitizeInput(this);"></input>
								<button id="buttonPlusOutlineSize" type="button" class="btn btn-default">+</button>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
						<div class="divMenuOption">
							<p>Line Spacing</p>
							<div class="divSingleOption">
								<button id="buttonMinusLineSpacing" type="button" class="btn btn-default">-</button>
								<input id="inputLineSpacing" type="text" class="inputNumerical" onchange="validateInput(this);" oninput="sanitizeInput(this);"></input>
								<button id="buttonPlusLineSpacing" type="button" class="btn btn-default">+</button>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
						<div class="divMenuOption">
							<p>Left &amp; Right Margin</p>
							<div class="divSingleOption">
								<button id="buttonMinusLeftRightMarginSize" type="button" class="btn btn-default">-</button>
								<input id="inputLeftRightMarginSize" type="text" class="inputNumerical" onchange="validateInput(this);" oninput="sanitizeInput(this);"></input>
								<button id="buttonPlusLeftRightMarginSize" type="button" class="btn btn-default">+</button>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
						<div class="divMenuOption">
							<p>Bottom Margin</p>
							<div class="divSingleOption">
								<button id="buttonMinusBottomMarginSize" type="button" class="btn btn-default">-</button>
								<input id="inputBottomMarginSize" type="text" class="inputNumerical" onchange="validateInput(this);" oninput="sanitizeInput(this);"></input>
								<button id="buttonPlusBottomMarginSize" type="button" class="btn btn-default">+</button>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
					</div>

					<div class="divChangeColor">
						<h1>> Color Options</h1>
						<div class="divMenuOption">
							
							<div class="divSingleOption">
								<button id="colorPickerFont" type="button" class="btn btn-default "></button>
								<p>Font</p>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
						<div class="divMenuOption">
							
							<div class="divSingleOption">
								<button id="colorPickerBackground" type="button" class="btn btn-default "></button>
								<p>Background</p>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
						<div class="divMenuOption">
							
							<div class="divSingleOption">
								<button id="colorPickerOutline" type="button" class="btn btn-default "></button>
								<p>Outline</p>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
					</div>
					
					<div class="divChangeFont">
						<h1>> Font Options</h1>
						<div class="divMenuOptionRadio">
							<div class="divRadioButton">
								<input id="inputFontGeorgia" type="radio" name="fontFamily" class="inputRadioButton" value="georgia" onclick="changeFontFamily(this)" checked>
								<p style="font-family: Georgia, serif;">Georgia</p>
							</div><!--divRadioButton-->
							<div class="divRadioButton">
								<input id="inputFontArial" type="radio" name="fontFamily" class="inputRadioButton" value="arial"onclick="changeFontFamily(this)">
								<p style="font-family: Arial, Helvetica, sans-serif;">Arial</p>
							</div><!--divRadioButton-->
							<div class="divRadioButton">
								<input id="inputFontCourier" type="radio" name="fontFamily" class="inputRadioButton" value="courier"onclick="changeFontFamily(this)">
								<p style="font-family: &quot;Courier New&quot;, Courier, monospace;">Courier New</p>
							</div><!--divRadioButton-->
						</div><!--divMenuOptionRadio-->
						<div class="divMenuOption">
							<div class="divSingleOption">
								<div class="btn-group divCheckbox" data-toggle="buttons">
									<label id="labelFontBold" class="btn btn-default" onclick="changeFontBold();">
										<input type="checkbox" class="inputCheckbox" autocomplete="off">
											<span class="glyphicon glyphicon-ok spanGlyphicon"></span>
										</input>
									</label>				
								</div><!--divSingleOption-->
								<p style="font-weight: bold;">Bold</p>
							</div>
						</div><!--divMenuOption-->
					</div>

					<div id="divLineLabels" class="divLineLabels">
						<h1>> Line Options</h1>
						<div class="divMenuOption">
							<div class="divSingleOption">
								<div class="btn-group divCheckbox" data-toggle="buttons">
									<label id="labelTimestamps" class="btn btn-default active" onclick="showHideTimestamps();">
										<input type="checkbox" class="inputCheckbox" autocomplete="off">
											<span class="glyphicon glyphicon-ok spanGlyphicon"></span>
										</input>
									</label>				
								</div><!--divSingleOption-->
								<p>Timestamps</p>
							</div>
						</div><!--divMenuOption-->
						<div class="divMenuOption">
							<div class="divSingleOption">
								<div class="btn-group divCheckbox" data-toggle="buttons">
									<label id="labelLineNumbers" class="btn btn-default active" onclick="showHideLineNumbers();">
										<input type="checkbox" class="inputCheckbox" autocomplete="off">
											<span class="glyphicon glyphicon-ok spanGlyphicon"></span>
										</input>
									</label>				
								</div>
								<p>Page/Line #</p>
							</div><!--divSingleOption-->
						</div><!--divMenuOption-->
					</div><!--divLineLabels-->
				</div><!--divOptionsInner-->
			</div><!--divOptionsOutter-->
			
		</div><!--divSideMenuContainer-->
		<div id="divSearchToolContainer" class ="divSearchToolContainer">
			<div class="divMenuOption">
				<div class="divSingleOption">
					<input id="inputSearchText" type="text" class="inputText" placeholder="Search..." onchange="onSearchChange(this)" oninput="onSearchChange(this)"></input>
				</div><!--divSingleOption-->
			</div><!--divMenuOption-->
			<div id="divSearchResult" class="divSearchResult">
				<div id="divSpinIconSearch" class="divSingleOption">
					<div class="center">
					<span class="glyphicon glyphicon-refresh spin"></span>
					</div>
				</div><!--divSpinIconSearch-->
				<div id="divSearchResultInner" class="divSearchResultInner">
				
				</div><!--divSearchResultInner-->

			</div><!--divSearchResult-->
		</div><!--divSearchToolContainer-->
		<div id="divEmailContainer" class ="divEmailContainer">
			<div class="divMenuOption">
				<div class="divSingleOption">
					<input id="inputEmail" type="text" class="inputText" placeholder="Email">
				</div><!--divSingleOption-->
				<div id="divSpinIconEmail" class="divSingleOption">
					<div class="center">
					<span class="glyphicon glyphicon-refresh spin"></span>
					</div>
				</div><!--divSpinIconEmail-->
				<div class="divSingleOption">
					<div class="center"><button id="buttonSendMail" type="button" class="btn btn-default" onclick="sendEmail();">Send</button>
					</div>
				</div><!--divSingleOption-->
			</div><!--divMenuOption-->
		</div><!--divEmailContainer-->
		<div id="divChatContainer" class="divChatContainer">
							<!-- **Added By JK** START -->
							<div id="divCreateGroupContainer"> 
							<input id="textInputCreatGroup" class="" type="text" placeholder="Type a Group Chat Name"> 
							<button id="buttonCreateGroup" class="btn btn-success btn-xs">Create Group</button>
						</div> 
						<!--JK End-->


		
			<div class="divChatInnerContainer">
			
				<div id="divChatContactListContainer" class="divChatContactListContainer">
				
				
					<div id="divChatContactListInner" class="divChatContactListInner">
						
						<hr>
						<div id="divChatContactEveryone" class="divContactListRow" broadcast="true" online="true" onclick="onChatUserChanged(event, this);">
							<div class="divChatContactCircle">E</div>
							<div class="divChatContactName">Everyone</div>
							
							<!--<div class="divChatContactMessageNotification"></div>-->
						</div>
						<!--<div id="divChatContactEveryone" class="divContactListRow" broadcast="true" onclick="onChatUserChanged(event, this);" ontouchend="onChatUserChanged(event, this);" ontouchmove="onChatTouchMove();">Everyone</div>-->
						<hr>
					</div><!--divChatContactListInner-->
				</div><!--divChatContactListContainer-->
				<div class="divChatContactListSeparator"></div>
				<div id ="divChatConversationContainer" class="divChatConversationContainer">
					<div id="divChatConversationHistory" class="divChatConversationHistory">
						
					</div><!--divChatConversationHistory-->
					<div class="divChatConversationSeparator"></div>
					
					
					<div id="divChatConversationCurrent" class="divChatConversationCurrent">
						<div class="divChatConversationCurrentButton">
							<button id="buttonSendChatMessage" type="button" class="btn btn-success buttonSendChatMessage">Send</button>
						</div>
						<div class="divChatConversationCurrentMessage">
							<textarea id="textareaChatMessage" class="textareaChatMessage" placeholder="Send a message"></textarea>
							
						</div>
						
					</div><!--divChatConversationCurrent-->
				</div><!--divChatConversationContainer-->
							
			</div><!--divChatInnerContainer-->
							
		</div><!--divChatContainer-->
							
	</div><!--divMenuContainer-->

	<!--JK Start-->
	<div class="container">
  
  <!-- Trigger the modal with a button -->
  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Open Modal</button>

  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-md">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
					<h1 class="modal-title modal-title-size">Name of the Chat Group Here</h1>
					<div class="modal-instruction-text"><h2>Select the members to add to this group.</h2></div>
				</div>
				
        <div class="modal-body">
          <p></p>
        </div>
        <div class="modal-footer">
					<button id="modal-ok" type="button" class="btn btn-success" data-dismiss="modal">OK</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        </div>
      </div>
    </div>
  </div>

	<!--JK End-->



	

	<script type="text/javascript">
		var hostName = '<?php echo $hostName; ?>';
		var sseUrl = 'https://' + hostName + '/stream';
		var chatUrl = 'https://' + hostName + '/chat';
		var name = '<?php echo $name; ?>';
		var email = '<?php echo $email; ?>';
		var guid = '<?php echo $GUID; ?>';
		var sessionCode = '<?php echo $sessionCode; ?>';
		var company = '<?php echo $company; ?>';
	</script>
		
	<script src="jquery.min.js"></script>
	<script src="jquery-ui.min.js"></script>
	<script src="bootstrap.min.js"></script>
	<script type="text/javascript" src="colorPicker.js"></script>
	<script type="text/javascript" src="EventSource.js"></script>
	<script type="text/javascript" src="smap-shim.js"></script>
	<script type="text/javascript" src="caseViewNetSDK.js"></script>
	<script type="text/javascript" src="caseViewNet.js"></script>
	<script type="text/javascript" src="caseViewNetGroupChat.js"></script> <!--JK-->
</body>
</html>


