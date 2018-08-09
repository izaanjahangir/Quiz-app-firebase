var emailEl = document.getElementById('email');
var passwordEl = document.getElementById('password');
var loader = document.getElementById('loader');
var formSignin = document.getElementById('form-signin');
var btnSignin = document.getElementById('btn-signin');
var outputEl = document.getElementById('output');
formSignin.addEventListener('submit',(e)=>{
    e.preventDefault();
    outputEl.innerText = '';
    loader.style.display = 'block';
    auth.signInWithEmailAndPassword(emailEl.value,passwordEl.value)
        .then((data)=>{
            localStorage.setItem('userUid',data.user.uid);
            database.ref(`users/${data.user.uid}`).once('value')
                .then((snap)=>{
                    console.log(snap);
                    console.log(snap.val());
                    debugger;
                    localStorage.setItem('userInfo',JSON.stringify(snap.val()));
                    window.location.assign('index.html');
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            loader.style.display = 'none';
            outputEl.innerText = err.message;
        })
})
