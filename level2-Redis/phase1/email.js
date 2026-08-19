const sendEmail = async (email) => {
    const promise = new Promise((resolve)=>{
        setTimeout(resolve,5000);
    })
    console.log("Email Sent. Task completed");

}
export default sendEmail;