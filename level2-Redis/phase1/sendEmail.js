const sendEmail = async (email) => {
    await new Promise((resolve) => {
        setTimeout(resolve,5000);
    });
    console.log("email sent to:", email);
}

export default sendEmail;