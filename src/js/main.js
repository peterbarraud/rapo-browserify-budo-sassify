const sayhello = document.getElementById("sayhello");
const showhello = document.getElementById("showhello");

sayhello.addEventListener("click", function(){
    showhello.innerText = "Allo, allo";
});
