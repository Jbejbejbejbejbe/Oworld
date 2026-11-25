const allchat=document.querySelector(".allchat");
const newchatname=document.querySelector("#newchatname");
const formdiv=document.querySelector(".formdiv");
const addchat=document.querySelector(".addchat");
const cancel=document.querySelector(".cancel");
const nametext=document.querySelector(".name");
let chatnamecount=0;
let writing=false;
let row="";
function putchat(thename)
{
    const chatbody=document.createElement("div");
    chatbody.innerText=thename;
    chatbody.classList.add("chatbody");
    chatbody.style.cursor="pointer";
    chatbody.style.zIndex="13";
    chatbody.style.top=`${0+Math.floor(chatnamecount/5)*250}px`;
    row.appendChild(chatbody);
    chatbody.addEventListener("click",function(){
        if(writing===false)
        {
            sessionStorage.setItem("world",thename);
            window.top.location.assign("/chat/chatH.html");
        }
    });
    chatnamecount=chatnamecount+1;
}
function clearall()
{
    while(allchat.children.length>1)
    {
        allchat.removeChild(allchat.lastElementChild);
    }
    chatnamecount=0;
}
addchat.addEventListener("click",function(){
    formdiv.style.display="flex";
    allchat.style.opacity="0.1";
    for(let i=0;i<=Math.floor(chatnamecount/5);i=i+1)
    {
        for(let j=0;j<=4;j=j+1)
        {
            if(i*5+j+1<=chatnamecount)
            {
                allchat.children[i+1].children[j].style.cursor="default";
            }
        }
    }
    writing=true;
    cancel.addEventListener("click",function(){
        for(let i=1;i<=Math.floor(chatnamecount/5);i=i+1)
        {
            for(let j=0;j<=4;j=j+1)
            {
                if(i*5+j+1<=chatnamecount-1)
                {
                    allchat.children[i+1].children[j].style.cursor="pointer";
                }
            }

        }
        console.log("AAAAA");
        formdiv.style.display="none";
        allchat.style.opacity="1";
        writing=false;
    });
});
async function putallchat()
{
    const responseget=await fetch("https://oworld.onrender.com",{
        method:"POST",
    });
    if(!responseget.ok)
    {
        console.log("fetch get failed");
    }
    else
    {
        const allthechat=await responseget.text();
        const allchatjs=JSON.parse(allthechat);
        if(allchatjs.length!==0)
        {
            console.log(allchatjs);
            clearall();
            for(let j=0;j<=Math.floor(allchatjs.length/5);j=j+1)
            {
                row=document.createElement("div");
                row.classList.add("row");
                allchat.appendChild(row);
                for(let k=0;k<=4;k=k+1)
                {
                    if(j*5+k<=allchatjs.length-1)
                    {
                        putchat(allchatjs[j*5+k].name);
                    }
                }

            }
        }
    }
}

putallchat();

newchatname.addEventListener("submit",async function(event){
    event.preventDefault();
    if(nametext.value==="")
    {
        alert("請輸入世界的名稱");
    }
    else if(nametext.value!=="")
    {
        const responsesend=await fetch("https://oworld.onrender.com",{
            method:"POST",
            headers:{"Content-Type":"text/plain"},
            body:nametext.value
        });
        if(!responsesend.ok)
        {
            console.log("fetch send failed");
            console.log("BBBBBBB");
        }
        allchat.style.opacity="1";
        formdiv.style.display="none";
        console.log("AAAAAAAAA");
        writing=false;
        putallchat();
    }
});
