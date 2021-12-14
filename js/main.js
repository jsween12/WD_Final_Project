//1. works!


function createElemWithText(htmlTag = "p", bodyText="", optionalClass="" ){
    const newElement = document.createElement(htmlTag);
    newElement.textContent = bodyText; 
    newElement.className = optionalClass; 
    return (newElement); 
}

//2. Works!! -------------------------------------------

 function createSelectOptions(jsonData){
    if(!jsonData){ return  }

    else{
        //console.log(jsonData); 
        //console.log(jsonData[0]+ jsonData[1]);
        //console.log("The jsonData array length is: " + jsonData?.length); 
        //iterate through each user
        let optionArray=[]; 
        for (let i=0; i < jsonData?.length; i++)
        {  //console.log("iteration number : "+ i); 
            let user = jsonData[i];
            //create a new option element
            let newOption = document.createElement("option"); 
            //assign this element the proper values
            newOption.value = user.id; 
            newOption.textContent = user.name;
            //console.log(newOption);
            optionArray.push(newOption);  
        }
        
        return optionArray; 

    }
}


//3. works -----------------------------------------------------------------------------------------
function toggleCommentSection (postId){
    if(!postId) return;
    else{
        //console.log("Else reached");
        //let sectionElement = document.querySelectorAll("post" < postId);
        let sectionElement = document.querySelector(`section[data-post-id='${postId}']`);
        //console.log("This is 3's sectionElement: "+ sectionElement); 
        if(!sectionElement) return null; 

        sectionElement.classList.toggle("hide"); 
        //console.log(sectionElement.classList); 
        return sectionElement; 
    }
}

//4. //issues: the console log statments show that it recieves data, but the button is always null----------
// and the function never proceeds out of the if else section. 



function toggleCommentButton(postId){
    if(!postId) return; 

    let button = document.querySelector(`button[data-post-id='${postId}']`); 
    if(!button) return null; 


    if(button.textContent == "Show Comments") { 
        button.textContent="Hide Comments"; 
        return button; }

    else  {  
        button.textContent="Show Comments";
        return button; }
    
    
    
    }

//5 I think I've got it correct. Why is the parentElement returned not passing the test? It looks right. --------

function deleteChildElements(parentElement){
    //console.log("The variable passed in is: "+ parentElement); 
    //if(!parentElement || typeof parentElement != 'object' || parentElement == ""||!parentElement.lastElementChild) {
    if(!parentElement?.tagName){
        ///console.log( parentElement+ " is returned as undefined.");
        return; 
    }
    else{ 
        //console.log("Else statment begins. Data is correct so the function continues")
        let childVar= parentElement.lastElementChild; 
        //console.log("The childVar value is: " + childVar)
 
        while(childVar){
            childVar.remove(); 
            childVar=parentElement.lastElementChild;              
        }
        //console.log("This is the parent element returned" + parentElement)
        return(parentElement); 
    }
}
            
//6 -------------------------------------------------------------------------------------------------------------

function addButtonListeners(){
    let main = document.querySelector("main");
    let buttons = main.querySelectorAll("button");
let getPostId; 
if(buttons){
    for(let i = 0; i< buttons.length; i++){
        getPostId=buttons[i].dataset.postId; 
        buttons[i].addEventListener("click",function (e) {toggleComments(e, getPostId)});
        }
    }
return buttons; 
}

//7 -------------------------------------------------------------------------------------------------------------

function removeButtonListeners(){
    let main = document.querySelector("main");
    let buttons = main.querySelectorAll("button");
    let getPostId; 
    if(buttons){
        for(let i = 0; i< buttons.length; i++){
            getPostId=buttons[i].dataset.postId; 
            buttons[i].removeEventListener("click",function (e) {toggleComments(e, getPostId)});
            }
        }
    return buttons; 
    }

// 8 Works!! ------------------------------------------------------------------------------------------------------

function createComments(JSONcomments){
    if(!JSONcomments)return; 
    let fragment = document.createDocumentFragment(); 
    
    for (let i=0 ; i < JSONcomments.length; i++){
        //console.log(JSONcomments[i]); 

        let articleElement = document.createElement("article"); 

        let h3Element = createElemWithText('h3', JSONcomments[i].name); 
        let paragraphElement = createElemWithText('p', JSONcomments[i].body); 
        let paragraphElement2 = createElemWithText('p', `From: ${JSONcomments[i].email}`);
        
        //append the h3 and paragraph elements to the article element
        articleElement.append(h3Element, paragraphElement, paragraphElement2);

        fragment.append(articleElement);
    }
            
    //console.log(fragment); 
    return fragment; 
}

// 9 works! ----------------------------------------------------------------------------------------------------

function populateSelectMenu(userJSON){
    if(!userJSON) return; 
    let user = document.getElementById("selectMenu");
    let arrayOptions = createSelectOptions(userJSON); 

    for(let i=0; i<arrayOptions.length; i++){
        user.append(arrayOptions[i]);
    }
    return user; 
}

//10. works! --------------------------------------------------------------------------------------------------------

async function getUsers (){
try {
    const users = await fetch('https://jsonplaceholder.typicode.com/users');
    if(!users.ok) throw new Error("Fetch JSON user data failed"); 
    return await users.json(); 
    } 
catch (err){
        console.error(err); 
        }
return usersJSON; 
}

//11. works! -------------------------------------------------------------------------------------------------------

async function getUserPosts(userId){
    if(!userId)return; 
    try {
        const post = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        if(!post.ok) throw new Error("Fetch JSON post data failed"); 
        return await post.json(); 
        } 
        catch (err){
            console.error(err); 
            }


}

//12. -------------------------------------------------------------------------------------------------

async function getUser(userId){
    if(!userId)return; 
    try {
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        if(!user.ok) throw new Error("Fetch JSON user data failed"); 

        return await user.json(); 
        } 
        catch (err){
            console.error(err); 
            }

}

//13 works! ---------------------------------------------------------------------------------------------

async function getPostComments(postId){
    if(!postId)return; 
    try {
        const comment = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        if(!comment.ok) throw new Error("Fetch JSON comment data failed"); 
        return await comment.json(); 
        } 
        catch (err){
            console.error(err); 
            }

}

//14 works!-----------------------------------------------------------


async function displayComments(postId){
    if(!postId) return; 

    let newSection = document.createElement("section"); 

    newSection.dataset.postId = postId;

    newSection.classList.add("comments"); 
    newSection.classList.add("hide"); 
    

    let newComment = await getPostComments(postId); 
    let fragment = createComments(newComment); 
    
    newSection.append(fragment); 

    return newSection; 
}


//15 -------------------------------------------------------------------------------------

async function createPosts(dataJSON){
    if(!dataJSON) return ;
    let fragment = document.createDocumentFragment(); 

for(let i = 0; i<dataJSON.length; i++ ){
    
    //create article
    let articleElement = document.createElement("article");

    //create h2 with proper title
    
    let h2Element = document.createElement("h2"); 
    h2Element.textContent = dataJSON[i].title;


    //create p element with post body

    let pBody = document.createElement("p");
    pBody.textContent = dataJSON[i].body; 

    //create p with post id
    let pElement = document.createElement("p"); 
    pElement.textContent=`Post ID: ${dataJSON[i].id}`;

    //define an author
    let author = await getUser(dataJSON[i].userId);

    //create another p element
    let pElement2 = document.createElement("p");
    pElement2.textContent = `Author: ${author.name} with ${author.company.name}`; 

    //create p element for company catch phrase. 
    let pElement3 = document.createElement("p");
    pElement3.textContent = author.company.catchPhrase; 

    //create button
    let button = document.createElement("button"); 
    button.textContent = "Show Comments"; 
    button.dataset.postId = dataJSON[i].id; 

    //create section element
    let section = await displayComments(dataJSON[i].id); 

    //put em in article
    articleElement.append(h2Element, pBody, pElement, pElement2, pElement3, button, section);

    fragment.append(articleElement);
}


return fragment; 

}

//16 ----------------------------------------------------------------------------------------

async function displayPosts(postData){
    if(!postData) {
        let defaultParagraph = createElemWithText("p", "Select an Employee to display their posts.", "default-text");

        return defaultParagraph; 
    }

    else{
        let element = await createPosts(postData);
    

        let mainElement = document.querySelector("main");

        mainElement.append(element); 

        return element; 

    }

}

//17 --------------------------------------------------------

function toggleComments(event, postId){
    if(!event || !postId) return; 

    event.target.listener = true; 

    let section = toggleCommentSection(postId); 
    let button = toggleCommentButton(postId); 

    return [section, button]; 

}

// 18 -------------------------------------------------------------------------------

async function refreshPosts(postJSON){
     if(!postJSON) return; 

    let button=  removeButtonListeners(); 

   let mainElement=  deleteChildElements(document.querySelector("main")); 

   let fragment = await displayPosts(postJSON); 

   let addButtons = addButtonListeners(); 

   return [button, mainElement, fragment, addButtons];

}

//19 -----------------------------------------------------------------------------------

async function selectMenuChangeEventHandler(event){
    let userId = 1; 

    let selectMenu = document.getElementById("selectMenu");

    selectMenu.addEventListener("change", function (event) {userId=event.target.value || 1}); 

    let postsJSON = await getUserPosts(userId);

    let refreshPostsArray = await refreshPosts(postsJSON); 

    return [userId, postsJSON, refreshPostsArray]; 



}

//20 ------------------------------------------------------------------------------------

async function initPage(){

    let userJSON = await getUsers(); 

    let selectElement = populateSelectMenu(userJSON);
    
    return [userJSON, selectElement]; 

}


//21 --------------------------------------------------------------------------------------

function initApp(){
initPage();

let selectMenu = document.getElementById("selectMenu"); 

selectMenu.addEventListener("change", selectMenuChangeEventHandler); 

}

document.addEventListener("DOMContentLoaded", initApp); 