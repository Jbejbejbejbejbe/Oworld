(async()=>{
    try
    {
        const response=await fetch("https://localhost:3000/api/account",{
            method:"POST",
            header
        });

    }
    catch(error)
    {
        console.log("FAIL "+error);
    }
})()