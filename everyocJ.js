let oclist=[];
(async()=>{
    const response=await fetch("https://oworld.onrender.com/api/characters",{
        method:"POST",
    });
    if(!response.ok)
    {
        console.log("fetch failed");
    }
    else
    {
        const alloc=await response.text();
        const allocjs=JSON.parse(alloc);
        for(let i=1;i<=Math.ceil(allocjs.length/5);i=i+1)
        {
            oclist[i-1]=document.createElement("div");
            document.body.appendChild(oclist[i-1]);
            for(let j=0;j<=4;j=j+1)
            {
                if((i-1)*5+j<=allocjs.length-1)
                {
                    const cha=document.createElement("div");
                    cha.classList.add("cha");
                    cha.style.top=`${190+(i-1)*360}px`;
                    oclist[i-1].appendChild(cha);
                    const photo=document.createElement("div");
                    const img=document.createElement("img");
                    const user=document.createElement("div");
                    const name=document.createElement("div");
                    if(allocjs[(i-1)*5+j].picture==="")
                    {
                        photo.classList.add("nopicture");
                        photo.style.backgroundColor=`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
                        cha.appendChild(photo);
                    }
                    else
                    {
                        photo.classList.add("photo");
                        img.src=allocjs[(i-1)*5+j].picture;
                        img.style.width="230px";
                        img.style.height="230px";
                        cha.appendChild(photo);
                        photo.appendChild(img);
                    }
                    user.innerText=allocjs[(i-1)*5+j].user;
                    name.innerText=allocjs[(i-1)*5+j].name;
                    user.classList.add("user");
                    name.classList.add("oc");
                    cha.appendChild(user);
                    cha.appendChild(name);
                    name.addEventListener("click",function(){
                        sessionStorage.setItem("theuser",allocjs[(i-1)*5+j].user);
                        sessionStorage.setItem("thename",allocjs[(i-1)*5+j].name);
                        window.top.location.assign("https://jbejbejbejbejbe.github.io/Oworld/lookocH.html");
                    });
                }
            }
            oclist[i-1].classList.add("allcha");
        }
    }
})();
