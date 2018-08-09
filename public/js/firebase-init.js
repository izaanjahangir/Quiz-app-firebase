/****************************************
 ****************************************
  Put your firebase configuration here 
  i am not providing because of security issues
  
 ****************************************
 ***************************************/

var database = firebase.database();
var auth = firebase.auth();



// Prevent user to open quizes if not logged in
// Prevent user to open signin or signout if logged in
if(localStorage.getItem('userUid') !== null){ 

      if(window.location.pathname === '/signin.html' || window.location.pathname === '/signup.html'){
          window.location.assign('/index.html');
      }

}else{
      
    if(window.location.pathname === '/' ||window.location.pathname === '/index.html' || window.location.pathname === '/result.html' || window.location.pathname === '/quiz.html'){
        window.location.assign('/signin.html');
    }  
}




// Signout user and clear local storage
function signOut(){
  auth.signOut().then(function() {
    localStorage.removeItem('questionDone');
    localStorage.removeItem('questions');    
    localStorage.removeItem('quizName');
    localStorage.removeItem('score');
    localStorage.removeItem('userUid');
    localStorage.removeItem('userInfo');    
    localStorage.setItem('isDone',true)  
    window.location.assign('signin.html');
  });
}


// If user signed in and uid not found on local storage
// Fetch it from firebase
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log('Logged in');


      // Fetch user from firebase, if not found on local storage
      if(!localStorage.getItem('userUid')){
        
        database.ref(`users/${user.uid}`).once('value')
          .then((snap)=>{
            userInfo = snap.val();
            localStorage.setItem('userInfo',JSON.stringify(userInfo))
            userInfo.uid = user.uid;
            localStorage.setItem('userUid',userInfo.uid);
    
          })
      }


  } else {
    console.log('Logged out');
  }
});



// Fetch user uid from local storage
userInfo = JSON.parse(localStorage.getItem('userInfo'));
userInfo.uid = localStorage.getItem('userUid');
