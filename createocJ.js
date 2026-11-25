const oneocdata=document.querySelector("#oneocdata");
const cloudname="o3czwnxa";
const preset="OCpictures";
let url="";
const img=document.querySelector(".img");
const photo=document.querySelector(".photo");
photo.addEventListener("change",function(){
     let pho=photo.files[0];
     img.src=URL.createObjectURL(pho);
     img.style.display="block";
     img.style.maxWidth="250px";
     img.style.objectFit="contain";
})
           
oneocdata.addEventListener("submit",async(event)=>{
    event.preventDefault();
    let datalist=[];
    let count=0;
    const data=document.querySelectorAll(".data");
    const databig={};
    data.forEach(function(element){
        datalist[count]=element.value;
        count=count+1;
    });
    if(datalist[0]=="")
    {
        alert("名稱是必填的");
    }
    else
    {
        const thephoto=photo.files[0];
        if(thephoto)
        {
            const photodata=new FormData;
            photodata.append("file",thephoto);
            photodata.append("upload_preset",preset);
            console.log(window.fetch.toString());
            const photoresponse=await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,{
                method:"POST",
                body:photodata
            });
            if(!photoresponse.ok)
            {
                console.log("PHOTOFAILED");
            }
            else
            {
                url=await photoresponse.json();
                url=url.secure_url;
            }
            databig.picture=url;
        }
        else
        {
             databig.picture="";
        }
        databig.username=document.cookie;
        databig.name=datalist[0];
        databig.gender=datalist[1];
        databig.birthday=datalist[2];
        databig.adj=datalist[3];
        databig.hobby=datalist[4];
        databig.ability=datalist[5];
        databig.story=datalist[6];
        databig.others=datalist[7];
        const response=await fetch("https://oworld.onrender.com/api/savedata",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(databig)
        });
        if(response.ok)
        {
            console.log("上傳SUCCESS");
            window.location.reload();
        }
    }
});
