function handleClick(){
    console.log('handleClick called');
    // sendMessage('handleClick called');
    alert("test");
    if (navigator.share) {
        navigator.share({
            title: 'WebShare API Demo',
            url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
        }).then(() => {
            console.log('Should have shared OK');
        })
        .catch(e => {
            sendMessage(e);
            console.log(e);
        });
        } else {
            sendMessage('No navigation.share');
            console.log('No navigation.share');
        }
}

function sendMessage(m) {
    console.log("sendMessage", m);
    LCC.onlineSupport.sendMessage("containerUserMessage", {payload: m});
}

//- Using a function pointer:
document.getElementById("btnWebShare").onclick = handleClick;