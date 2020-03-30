var objCustomer =[
    {
        username:"Marco",
        password:"1234"
    },
    {
        username:"Giulia",
        password:"1234"
    },
    {
        username:"Stefano",
        password:"1234"
    }
]

function login(){
    var username =  document.getElementById("username").value
    var password =  document.getElementById("password").value

    for (i=0; i<objCustomer.length; i++){
        if(username==objCustomer[i].username && password== objCustomer[i].password){
            console.log(username + 'is logged in!')
            return;
        }
    }
    console.log('Incorrect username or password!')

}