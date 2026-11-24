const signup=document.querySelector(".signup");
signup.addEventListener("click",function(){
	window.location.assign("file:///C:/Users/Nora/Documents/Oworld/signup/signupH.html");
});
document.querySelector("#thelogin").addEventListener("submit",function(event){
	event.preventDefault();
	const account=document.querySelector("#laccount");
	const password=document.querySelector("#lpassword");
	if(account.value==="")
	{
		alert("您未輸入帳號");
	}
	else
	{
		if(password.value==="")
		{
			alert("您未輸入密碼");
		}
		else
		{
			(async()=>{
				const logindata={
					"username":account.value,
					"password":password.value
				};
				const response=await fetch("http://localhost:3002/api/checklogin",{
					method:"POST",
					headers:{"Content-Type":"application/json"},
					body:JSON.stringify(logindata)
				});
				let retext=await response.text();
				if(retext==="NOUSER")
				{
					alert("請先註冊");
				}
				else if(retext==="WRONG")
				{
					alert("密碼錯誤");
				}
				else if(retext==="SUCCESS")
				{
					document.cookie="username="+encodeURIComponent(account.value)+";max-age="+(60*60*24*3)+";path=/";
					window.location.assign("/homepage/homepageH.html");
				}
			})();
		}
	}
});