let groupChatButton = document.getElementById('buttonCreateGroup');
let inputTextGroupChat = document.getElementById('textInputCreatGroup');

//place to store the chat users.
let chatUsersArray = [];
let selectedUsers = [];
let chatGroups = [];


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

function createChatGroupModal(modalType)
{

    //Get Rid of spaces at begining and end of group name
    let groupName = inputTextGroupChat.value.trim();

    //Was the group name null or just spaces?
    if (groupName != '')
    {
        //Add Group Chat Name to Modal
        let modalHeading = document.querySelector(".modal-title");
        modalHeading.innerHTML = groupName;

        //Create Add Modal Type
        if (modalType == 'add')
        {
            //Add Chat Users to Modal
            let modalBody = document.querySelector(".modal-body");

            //Clear any previous content of the modal body
            modalBody.innerHTML = '';

            for (let i = 0; i < chatUsersArray.length; i++)
            {
                // make a copy (clone) of each element in the Array
                let clone = chatUsersArray[ i ].cloneNode(true);
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

            //Change Instruction Text
            let instructionText = document.querySelector('.modal-instruction-text');
            instructionText.innerHTML = "Select the members for this group.";

            inputTextGroupChat.value = '';
            $('#myModal').modal('show');

            let okButton = document.getElementById("modal-ok");

            okButton.addEventListener('click', function ()
            {
                //if (selectedUsers.length > 0)
                //{
                    createGroup(groupName);
                //}
            });


        }

        //Create Remove Users From Chat Modal Type
        if (modalType == 'remove')
        {
            //Do Some Stuff
        }

    } else
    {
        inputTextGroupChat.value = '';
        inputTextGroupChat.focus();
    }
}

//Toggle Selected User State in Modal
function userSelected(currentSelectedUser)
{
    let modalBody = document.querySelector(".modal-body");
    let myUsers = modalBody.querySelectorAll('.divContactListRow');
    let selectedUserClass = "modal-selected-user";
    console.log(currentSelectedUser);

    for (let i = 0; i < myUsers.length; i++)
    {
        if (currentSelectedUser.getAttribute('guid') == myUsers[ i ].getAttribute('guid')
            && !currentSelectedUser.classList.contains(selectedUserClass))
        {
            myUsers[ i ].classList.add(selectedUserClass);
            return;
        }
        else if (currentSelectedUser.getAttribute('guid') == myUsers[ i ].getAttribute('guid')
            && currentSelectedUser.classList.contains(selectedUserClass))
        {
            myUsers[ i ].classList.remove(selectedUserClass);
            return;
        }
    }
}

//Create Group
function createGroup(groupName)
{
    // create structure for chatGroups array
    let modalBody = document.querySelector(".modal-body");
    let myUsers = modalBody.querySelectorAll('.divContactListRow');
    let selectedUserClass = "modal-selected-user"
    let group = {};
    
    //Add name property to group object
    group.name = groupName;
    group.users = [];
    
    //add selected users to chat group
    for (let i = 0; i < myUsers.length; i++)
    {
        if(myUsers[i].classList.contains(selectedUserClass))
        {
            group.users.push(myUsers[i]);
            //console.log(group);
        }      
    }
    // add the group to the chatGrops array
    chatGroups.push(group);
    console.log(chatGroups);
}











// Event Listeners
groupChatButton.addEventListener('click', function ()
{
    createChatGroupModal('add');
});

inputTextGroupChat.onkeydown = function (event)
{
    if (event.keyCode == 13)
    {
        event.preventDefault();
        createChatGroupModal('add');
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
