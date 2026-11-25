const yours=document.querySelector(".yours");
const create=document.querySelector(".create");
const username=document.cookie;
let yorc="y";
let iframe="";
let allcha=[];
async function rundata()
{

            let response=await fetch("https://oworld.onrender.com/api/useroc",{
                method:"POST",
                headers:{"Content-Type":"text/plain"},
                body:document.cookie.split("=")[1]
            });
            if(!response.ok)
            {
                console.log("fetch沒成功");
            }
            else
            {
                const ocs=await response.text();
                const ocscript=JSON.parse(ocs);
       
                for(let j=1;j<=Math.ceil(ocscript.length/5);j=j+1)
                {
                    allcha[j]=document.createElement("div");
                    document.body.appendChild(allcha[j]);
                    for(let i=0;i<=4;i=i+1)
                    {
                        if((j-1)*5+i<=ocscript.length-1)
                        {

                            const cha=document.createElement("div");
                            const thep=document.createElement("div");
                            const theimg=document.createElement("img");
                            const theuser=document.createElement("div");
                            const thename=document.createElement("div");
                            console.log((j-1)*5+i);
                            theimg.style.width="220px";
                            theimg.style.height="220px";
                            theuser.innerText=ocscript[(j-1)*5+i].user;
                            thename.innerText=ocscript[(j-1)*5+i].name;
                            cha.classList.add("cha");
                            if(ocscript[(j-1)*5+i].picture==="")
                            {
                                thep.classList.add("nopicture");
                                let a=Math.floor(Math.random()*255);
                                let b=Math.floor(Math.random()*255);
                                let c=Math.floor(Math.random()*255);
                                thep.style.backgroundColor=`rgb(${a},${b},${c})`;
                                console.log(a);
                            }
                            else
                            {
                                theimg.src=ocscript[(j-1)*5+i].picture;
                                thep.classList.add("picture");
                                theimg.width="180px";
                                theimg.height="180px";
                            }
                            cha.style.top=`${210+((j-1)*29)}px`;
                            theuser.classList.add("user");
                            thename.classList.add("name");
                            allcha[j].appendChild(cha);
                            cha.appendChild(thename);
                            if(theimg.src)
                            {
                                thep.appendChild(theimg);
                            }
                            cha.appendChild(thep);
                            cha.appendChild(theuser);
                            thename.addEventListener("click",function(){
                                const data={
                                    user:ocscript[(j-1)*5+i].user,
                                    name:ocscript[(j-1)*5+i].name
                                };
                                sessionStorage.setItem("theuser",ocscript[(j-1)*5+i].user);
                                sessionStorage.setItem("thename",ocscript[(j-1)*5+i].name);
                                window.top.location.assign("/lookocH.html");
                            });
                        }
                        allcha[j].classList.add("allcha");
                    }
                }
            }
}
rundata();
create.addEventListener("click",function(){
    
    if(yorc==="y")
    {
        if(allcha)
        {
            for(let i=1;i<=allcha.length-1;i=i+1)
            {
                document.body.removeChild(allcha[i]);
            }
        }
        iframe=document.createElement("iframe");
        iframe.src="/createocH.html";
        iframe.width="100%";
        iframe.height="700px";
        iframe.style.border="none";
        iframe.style.position="absolute";
        iframe.style.top="195px";
        iframe.style.left="50px";
        document.body.appendChild(iframe);
        yours.style.border="none";
        yours.style.cursor="pointer";
        create.style.cursor="default";
        create.style.border="2px solid rgb(81,117,224)";
        yorc="c";
    }
});
yours.addEventListener("click",function(){
    if(yorc==="c")
    {
        if(iframe)
        {
            document.body.removeChild(iframe);
        }
        create.style.border="none";
        create.style.cursor="pointer";
        yours.style.border="2px solid rgb(81,117,224)";
        yours.style.cursor="default";
        yorc="y";
        rundata();
    }
});
