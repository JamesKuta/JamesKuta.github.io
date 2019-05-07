/**
 **Title: CaseViewNet Browser Edition Group Chat
 **Author: James Kuta
 **Version: 1.0
 **Release Date: XX-XX-XXXX
 **/

let groupChatButton = document.getElementById('buttonCreateGroup');
let inputTextGroupChat = document.getElementById('textInputCreatGroup');

//place to store the chat users.
let chatUsersArray = [];

// array of chat group names and users
let chatGroups = [];

//keep track of how many users are selected in modal
let selectedCount = 0;


function addUserToGroupChatArray(user)
{
    let okToAddUser = true;
    //See if user is already in the chatUsersArray. Don't add again if it is found.
    for (let i = 0; i < chatUsersArray.length; i++)
    {
        if (user.getAttribute('guid') === chatUsersArray[ i ].getAttribute('guid'))
        {
            okToAddUser = false;
            return; // found it, so stop.
        }
    }

    //if user is not found in chatUsersArray, add to chatUsersArray
    if (okToAddUser)
    {
        chatUsersArray.push(user);
        console.log('group: ', user.getAttribute('guid')); // remove for production
    }
}

function createChatGroupModal(modalType)
{

    //Get Rid of spaces at begining and end of group name and store the text
    let groupName = inputTextGroupChat.value
    groupName = groupName.trim();

    //Make sure groupName was not empty or just spaces.
    if (groupName != '')
    {
        //Add Group Chat Name to Modal
        let modalHeading = document.querySelector(".modal-title");
        modalHeading.innerHTML = groupName;

        //Create Add Modal Type
        if (modalType == 'add')
        {
            // grap the the Modal body
            let modalBody = document.querySelector(".modal-body");

            //Clear any previous content of the modal body
            modalBody.innerHTML = '';

            //loop through the current list of available chat users
            for (let i = 0; i < chatUsersArray.length; i++)
            {
                // make a copy (clone) of each element in the chatUserArray. Don't want to change the Divs already there.
                let clone = chatUsersArray[ i ].cloneNode(true);
                
                //give each DIV it's own onclick event
                clone.setAttribute('onclick', "userSelected(this)");

                //Don't want the selected color to be applied to Modal listing if it was selected in chat pane
                if (clone.classList.contains("divContactListRowSelected"))
                {
                    clone.classList.remove("divContactListRowSelected");
                }

                //add chat user to modalBody
                modalBody.appendChild(clone);
            }

            //Change modal Instruction Text
            let instructionText = document.querySelector('.modal-instruction-text');
            instructionText.innerHTML = "Select the members for this group.";

            //clear the create group chat text field
            inputTextGroupChat.value = '';
            
            //show the modal dialog
            $('#myModal').modal('show');

            //grap the OK button on the modal dialog
            let okButton = document.getElementById("modal-ok");

            //do this when OK is clicked and there is user(s) selected in the modal dialog
            okButton.addEventListener('click', function ()
            {
                if(selectedCount > 0)
                {
                    createGroup(groupName);
                }
            });


        }

        //Create Remove Users From Chat Modal Type
        if (modalType == 'remove')
        {
            //Do Some Stuff
        }
    //If groupName was empty or just white spaces...
    } else
    {
        //clear groupName field
        inputTextGroupChat.value = '';
        //set cursor focus back to groupName field
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
            return selectedCount++;
        }
        else if (currentSelectedUser.getAttribute('guid') == myUsers[ i ].getAttribute('guid')
            && currentSelectedUser.classList.contains(selectedUserClass))
        {
            myUsers[ i ].classList.remove(selectedUserClass);
            return selectedCount--;
        }
    }
}

//Create Group
function createGroup(groupNameValue)
{
    // create structure for chatGroups array
    let modalBody = document.querySelector(".modal-body");
    let myUsers = modalBody.querySelectorAll('.divContactListRow');
    let selectedUserClass = "modal-selected-user"
    let group = {};
    
    //Add name property to group object
    group.name = groupNameValue;
    group.users = [];
    
    //add selected users to chat group
    for (let i = 0; i < myUsers.length; i++)
    {
        if(myUsers[i].classList.contains(selectedUserClass))
        {
            group.users.push(myUsers[i]);
        }      
    }
    // add the group to the chatGrops array
    chatGroups.push(group);
    
    //reset selected count for next group creation
    selectedCount = 0;
    
    console.log(chatGroups);

    //hide the modal
    $('#myModal').modal('hide');
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
