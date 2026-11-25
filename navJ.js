const thecookie=document.cookie;
let incookie=[];
incookie=thecookie.split(";");
username=incookie[0].split("=");
username=username[1];
let userpart=document.querySelector(".sixdiv");
let logout="";
let a=0;
userpart.innerText="歐管："+username;
userpart.style.zIndex="10";
userpart.addEventListener("mouseover",function(){
    if(a===0)
    {
        logout=document.createElement("div");
        logout.innerText="登出";
        logout.classList.add("logout");
        logout.style.zIndex="12";
        userpart.appendChild(logout);
        a=1;
        logout.addEventListener("click",function(){
        console.log("AA");
        document.cookie=`username=${document.cookie.split("=")[1]};path=/;max-age=0;`
        console.log(document.cookie);
        window.top.location.assign("/loginH.html");
    });
    }
});
userpart.addEventListener("mouseleave",function(){
    if(a===1)
    {
        userpart.removeChild(logout);
        a=0;
        console.log(a);
    }
});
if(a===1)
{
    console.log("BB");
    
}
