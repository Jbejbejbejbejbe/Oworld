const login=document.querySelector(".login");
login.addEventListener("click",function(){
	window.location.assign("loginH.html");
});
let acname="";
let pw="";

document.querySelector("#userdata").addEventListener("submit",function(event){
	event.preventDefault();
	const userdata=document.querySelector("#userdata");
	const accountname=document.querySelector(".accountname");
	const password=document.querySelector(".password");
	const passwordcheck=document.querySelector(".passwordcheck");
	if(accountname.value==="")
	{
		alert("您未輸入使用者名稱");
		return;
	}
	else
	{
		
		acname=accountname.value;
		if(password.value==="")
		{
			alert("您未輸入密碼");
		}
		else
		{
			if(password.value!=passwordcheck.value)
			{
				alert("您的密碼與確認的密碼不一致！");
				return;
			}
			else
			{
				(async()=>{
					try
					{
						const response=await fetch("https://oworld.onrender.com/api/checkaccount",{
							method:"POST",
							headers:{"Content-Type":"text/plain"},
							body:accountname.value
						});
						let rt=await response.text();
						if(rt=="USED")
						{
							alert("該帳號已存在！");
						}
						else if(rt=="NEW")
						{
							pw=password.value;
							(async()=>{
							const alldata={
								"username":accountname.value,
								"password":password.value
							};
							const ther=await fetch("https://oworld.onrender.com/api/userdata",{
								method:"POST",
								headers:{"Content-Type":"application/json"},
								body:JSON.stringify(alldata)
							});
							if(ther.ok)
							{
								console.log("上傳至server.js成功");
						
							}
							else
							{
								console.log("上傳至server.js失敗");
							}
						})();
						}
					}
		catch(error)
		{
			console.log("Failed "+error);
		}
		})();
	}
	}
}});
