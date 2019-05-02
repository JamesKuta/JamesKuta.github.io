let groupChatButton = document.getElementById('buttonCreateGroup');
let inputTextGroupChat = document.getElementById('textInputCreatGroup');

//place to store the chat users.
let chatUsersArray = [];

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

function addUserToGroupChatArray(user)
{
    let okToAddUser = true;
    //See if user is already in the chatUsersArray
    for (let i = 0; i < chatUsersArray.length; i++)
    {
        if (user.getAttribute('guid') === chatUsersArray[ i ].getAttribute('guid'))
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

        //Clear the previous content of the modal body
        modalBody.innerHTML = '';

        for (let i = 0; i < chatUsersArray.length; i++)
        {
            //create the checkbox
            let chkBox = document.createElement('input');
            chkBox.setAttribute('type', 'checkbox');
            //make guid of checkbox correspond to guid of chat user
            chkBox.setAttribute('guid', chatUsersArray[ i ].getAttribute('guid'));
            //need to do something when checkbox is clicked
            chkBox.setAttribute('onclick', 'selectUser()');
            //add checkbox to modal
            modalBody.appendChild(chkBox);
            //modalBody.appendChild(hr);


            // make a copy (clone) of each element in the Array
            let clone = chatUsersArray[ i ].cloneNode(true);
            //don't want onclick to update chat pane.
            clone.setAttribute('onclick', '');
            if (clone.classList.contains("divContactListRowSelected"))
            {
                clone.classList.remove("divContactListRowSelected");
            }

            //add chat user to modalBody
            modalBody.appendChild(clone);

            console.log(clone);
        }

        inputTextGroupChat.value = '';
        $('#myModal').modal('show');
    } else
    {
        inputTextGroupChat.value = '';
        inputTextGroupChat.focus();
    }
}

function selectUser()
{
    let modalBody = document.querySelector(".modal-body");
    let myCheckBoxes = modalBody.getElementsByTagName('input');
    let myUsers = modalBody.querySelectorAll('.divContactListRow');
    console.log(myUsers);
    for (let i = 0; i < myCheckBoxes.length; i++)
    {
        if (myCheckBoxes[ i ].checked && myCheckBoxes[ i ].getAttribute('guid') === myUsers[ i ].getAttribute('guid'))
        {
            myUsers[ i ].classList.add("modal-selected-user-color");
        }
        else if (!myCheckBoxes[ i ].checked && myCheckBoxes[ i ].getAttribute('guid') === myUsers[ i ].getAttribute('guid'))
        {
            myUsers[ i ].classList.remove("modal-selected-user-color");
        }
    }
}