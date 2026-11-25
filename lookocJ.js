const but=document.querySelectorAll(".but");
const goback=document.querySelector(".goback");
const text=document.querySelector(".text");
const photo=document.querySelector(".photo");
const img=document.querySelector(".img");
const ocname=document.querySelector(".name");
const user=document.querySelector(".user");
const nopicture=document.querySelector(".nopicture");
goback.addEventListener("click",function(){
    history.back();
});
let theuser=sessionStorage.getItem("theuser");
let thename=sessionStorage.getItem("thename");
let datalist=["pictrue","user","name","gender","birthday","personadj","hobby","ability","story","others"];
let which=0;
let thecha={
    user:theuser,
    name:thename
};

(async()=>{
    console.log(thecha);
    const response=await fetch("https://oworld.onrender.com/api/readalldata",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(thecha)
    });
    if(!response.ok)
    {
        console.log("fetch failed");
        const text=await response.text();
        console.log(text);
    }
    else
    {
        const oc=await response.json();
        if(Object.values(oc)[1]==="")
        {
            img.style.display="none";
            nopicture.style.width="300px";
            nopicture.style.height="300px";
            nopicture.style.display="block";
            nopicture.style.backgroundColor=`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
        }
        else if(Object.values(oc)[1]!=="")
        {
            img.style.diaplay="block";
            nopicture.style.display="none";
            img.src=Object.values(oc)[0];
        }

        ocname.innerText=Object.values(oc)[3];
        user.innerText="by:  "+Object.values(oc)[2];
        for(let i=0;i<=6;i=i+1)
        {
            but[i].addEventListener("click",function(){
                if(which!==i)
                {
                    but[which].style.border="none";
                    but[i].style.border="3px solid rgb(19,168,111)";
                    but[i].style.cursor="default";
                    text.innerText=Object.values(oc)[i+4];
                    if(text.innerText==="")
                    {
                        text.style.display="none";
                    }
                    else
                    {
                        text.style.display="flex";
                    }
                    which=i;
                }
            });
        }
        if(which===0)
        {
            but[0].style.border="3px solid rgb(19,168,111)";
            but[0].style.cursor="default";
            text.innerText=Object.values(oc)[5];
        }
    }
})();
