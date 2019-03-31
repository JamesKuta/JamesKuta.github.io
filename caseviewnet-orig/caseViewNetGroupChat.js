let groupChatButton = document.getElementById('buttonCreateGroup');
let inputTextGroupChat = document.getElementById('textInputCreatGroup');
groupChatButton.addEventListener('click', function()
{
    console.log(inputTextGroupChat.value);


    // if(inputTextGroupChat.classList.contains("hidden"))
    // {
    //     inputTextGroupChat.classList.remove("hidden");
    //     inputTextGroupChat.focus();
    //     groupChatButton.textContent = "Add Group";
    // } 
    // else
    // {
    //     return;
    // }
});

inputTextGroupChat.onkeydown = function(event)
{
    if(event.keyCode == 13)
    {
        event.preventDefault();
        
    }
    

};

inputTextGroupChat.onkeyup = function(event)
{
    if(event.keyCode == 32)
    {
        
        event.stopPropagation();
        event.cancelBubble = true;
    }
    

};