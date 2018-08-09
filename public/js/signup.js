var formSignup = document.getElementById('form-signup')
var btnSignup = document.getElementById('btn-signup');
var firstNameEl = document.getElementById('firstname');
var lastNameEl = document.getElementById('lastname');
var emailEl = document.getElementById('email');
var passwordEl = document.getElementById('password');
var password2El = document.getElementById('password2');
var loader = document.getElementById('loader');
var outputEl = document.getElementById('output');
formSignup.addEventListener('submit',(e)=>{
    e.preventDefault();
    outputEl.innerText = '';
    if(password2El.value !== passwordEl.value){
        outputEl.innerText = "Password doesn't match";
        passwordEl.value = '';
        password2El.value = '';
        return false;
    }
    var userInfo = {
        firstname: firstNameEl.value,
        lastname: lastNameEl.value,
        email: emailEl.value,
        password: passwordEl.value
    }
    loader.style.display = 'block';
    auth.createUserWithEmailAndPassword(userInfo.email,userInfo.password)
        .then((data)=>{
            delete userInfo.password;
            database.ref(`users/${data.user.uid}`).set(userInfo);
            window.location.assign('index.html');
        })
        .catch((err)=>{
            outputEl.innerText = err.message;
            loader.style.display = 'none';            
            passwordEl.value = '';
            password2El.value = '';    
        })
})