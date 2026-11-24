const upperphone=document.querySelector(".upperphone");
upperphone.scrollTop=upperphone.scrollHeight;
const select=document.querySelector(".select");
const back=document.querySelector(".back");
const message=document.querySelector("#message");
const con=document.querySelector(".con");
document.title=sessionStorage.getItem("world");
back.addEventListener("click",function(){
    window.location.assign("/allchat/allchatH.html");
});
const sleep=(ms)=>new Promise(
    resolve=>setTimeout(resolve,ms)
);
const colorlist=[];
let chatcount=0;
let reone="";
let resetneeded=false;
const usinguser=document.cookie.split("=")[1];
function appendchat(thephoto,thespeaker,theuoro,themessage)
{
    if(chatcount>0&&resetneeded===true)
    {
        for(let j=0;j<=chatcount-1;j=j+1)
        {
            upperphone.removeChild(upperphone.children[0]);
        }
        chatcount=0;
    }
    const onmessage=document.createElement("div");
    const nopicture=document.createElement("div");
    const photo=document.createElement("div");
    const img=document.createElement("img");
    const namediv=document.createElement("div");
    const say=document.createElement("say");
    if(thespeaker===select.value)
    {
        onmessage.classList.add("ownmessage");
    }
    else(thespeaker!==select.value)
    {
        onmessage.classList.add("onmessage");
    }
    if(chatcount===0)
    {
        onmessage.style.top="25px";
    }
    else(chatcount>=1)
    {
        onmessage.style.top=`${5*(chatcount)}px`;
    }
    if(thespeaker!==select.value)
    {
        upperphone.appendChild(onmessage);
        if(thephoto==="")
        {
            nopicture.classList.add("nopicture");
            nopicture.style.backgroundColor="rgb(130,130,130)";
            photo.classList.add("photo");
            onmessage.appendChild(photo);
            photo.appendChild(nopicture);
        }
        else(thephoto!=="")
        {
            img.src=thephoto;
            img.style.height="60px";
            img.style.width="60px";
            photo.classList.add("photo");
            onmessage.appendChild(photo);
            photo.appendChild(img);
        }
        if(theuoro==="user")
        {
            namediv.innerText="user."+thespeaker;
        }
        else(theuoro==="oc")
        {
            namediv.innerText=thespeaker;
        }
        namediv.classList.add("namediv");
        say.innerText=themessage;
        say.classList.add("say");
        onmessage.appendChild(namediv);
        onmessage.appendChild(say);
    }
    else if(thespeaker===select.value)
    {
        onmessage.innerText=themessage;
        upperphone.appendChild(onmessage);
    }
    upperphone.scrollTop=upperphone.scrollHeight;
    chatcount=chatcount+1;
}
(async()=>{
    const sendall={
        world:sessionStorage.getItem("world"),
        user:usinguser
    };
    const responseone=await fetch("http://localhost:3015/api/allchat",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(sendall)
    });
    if(!responseone.ok)
    {
        console.log("fetch one failed");
    }
    else
    {
        reone=await responseone.json();
        for(let i=0;i<=reone.length-1;i=i+1)
        {
            if(i===0)
            {
                resetneeded=true;
            }
            if(reone[i].useroroc==="oc"&&reone[i].picture)
            {
                appendchat(reone[i].picture,reone[i].speaker,reone[i].useroroc,reone[i].message);
            }
            else
            {
                appendchat("",reone[i].speaker,reone[i].useroroc,reone[i].message);
            }
            resetneeded=false;
        }
        select.addEventListener("change",async function(){
            const sendalltwo={
                world:sessionStorage.getItem("world"),
                user:usinguser
            };
            const resonetwo=await fetch("http://localhost:3015/api/allchat",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(sendalltwo)
            });
            if(!resonetwo.ok)
            {
                console.log("fetch onetwo failed");
            }
            else{
                    reone=await resonetwo.json();
                    for(let j=0;j<=reone.length-1;j=j+1)
                    {
                        if(j===0)
                        {
                            resetneeded=true;
                        }
                        if(reone[j].useroroc==="oc"&&reone[j].picture)
                        {
                            appendchat(reone[j].picture,reone[j].speaker,reone[j].useroroc,reone[j].message);
                        }
                        else
                        {
                            appendchat("",reone[j].speaker,reone[j].useroroc,reone[j].message);
                        }
                        resetneeded=false;
                    }
                
            }
        });
    }
})();
(async()=>{
    const responsetwo=await fetch("http://localhost:3015/api/allspeakers",{
        method:"POST",
        headers:{"Content-Type":"text/plain"},
        body:document.cookie.split("=")[1]
    });
    if(!responsetwo.ok)
    {
        console.log("fetch two failed");
    }
    else
    {
        const retwo=await responsetwo.json();
        for(let i=0;i<=retwo.length-1;i=i+1)
        {
            let newo=new Option(retwo[i].name,retwo[i].name);
            select.add(newo);
        }

    }
})();

message.addEventListener("submit",async function(event){
    event.preventDefault();
    if(con.value!=="")
    {
        const messagedata={
            speaker:select.value,
            message:con.value,
            world:sessionStorage.getItem("world"),
            user:usinguser
        };
        const responsethree=await fetch("http://localhost:3015/api/sendchat",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(messagedata)
        });
        appendchat("xx",select.value,"xx",con.value);
        if(!responsethree.ok)
        {
            console.log("fetch three failed");
        }
        else
        {
            console.log("fetch three success");
            con.value="";
        }
    }
});