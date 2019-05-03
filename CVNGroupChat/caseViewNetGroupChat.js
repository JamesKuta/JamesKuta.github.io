let groupChatButton = document.getElementById('buttonCreateGroup');
let inputTextGroupChat = document.getElementById('textInputCreatGroup');

//place to store the chat users.
let chatUsersArray = [];


function addUserToGroupChatArray(user)
{
    let okToAddUser = true;
    //See if user is already in the chatUsersArray
    for (let i = 0; i < chatUsersArray.length; i++)
    {
        if (user.getAttribute('guid') === chatUsersArray[i].getAttribute('guid'))
        {
            okToAddUser = false;
            break;
        }
    }

    //if user is not found in chatUsersArray add to chatUsersArray
    if (okToAddUser)
    {
        chatUsersArray.push(user);
        console.log('group: ', user.getAttribute('guid'));
    }
}

function createChatGroupModal()
{
    //Add the Group Chat Name To the Modal
    let groupName = inputTextGroupChat.value.trim();

    if (groupName != '')
    {
        //Add Group Chat Name to Modal
        let modalHeading = document.querySelector(".modal-title");
        modalHeading.innerHTML = groupName;

        //Add Chat Users to Modal
        let modalBody = document.querySelector(".modal-body");

        //Clear any previous content of the modal body
        modalBody.innerHTML = '';

        for (let i = 0; i < chatUsersArray.length; i++)
        {
            // make a copy (clone) of each element in the Array
            let clone = chatUsersArray[i].cloneNode(true);
            //don't want onclick to update chat pane.
            clone.setAttribute('onclick', "userSelected(this)");
            if (clone.classList.contains("divContactListRowSelected"))
            {
                clone.classList.remove("divContactListRowSelected");
            }

            //clone.classList.add("divModalDisplayUser");

            //add chat user to modalBody
            modalBody.appendChild(clone);
        }

        inputTextGroupChat.value = '';
        $('#myModal').modal('show');
    } else
    {
        inputTextGroupChat.value = '';
        inputTextGroupChat.focus();
    }
}

function userSelected(currentSelectedUser)
{
    let modalBody = document.querySelector(".modal-body");
    let myUsers = modalBody.querySelectorAll('.divContactListRow');
    console.log(currentSelectedUser);

    for (let i = 0; i < myUsers.length; i++)
    {
        if (currentSelectedUser.getAttribute('guid') == myUsers[i].getAttribute('guid') 
            && !currentSelectedUser.classList.contains("modal-selected-user-color"))
        {
            myUsers[i].classList.add("modal-selected-user-color");
            return;
        }
        else if (currentSelectedUser.getAttribute('guid') == myUsers[i].getAttribute('guid') 
                && currentSelectedUser.classList.contains("modal-selected-user-color"))
        {
            myUsers[i].classList.remove("modal-selected-user-color");
            return;
        }
    }
}

groupChatButton.addEventListener('click', function ()
{
    createChatGroupModal();
});

inputTextGroupChat.onkeydown = function (event)
{
    if (event.keyCode == 13)
    {
        event.preventDefault();
        createChatGroupModal();
    }
};

//otherwise spacebar would mark a line of text!
inputTextGroupChat.onkeyup = function (event)
{
    if (event.keyCode == 32)
    {
        event.stopPropagation();
        event.cancelBubble = true;
    }
};
