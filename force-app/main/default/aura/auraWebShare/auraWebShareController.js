({
    handleClick : function(component, event, helper)  {
        console.log("API 39");
        if (navigator.share) {
            console.log("We have a navigator.share");
            navigator.share({
              title: 'WebShare API Demo',
              url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
            }).then(() => {
                console.log("Yay!");
            })
            .catch(e => {
                console.error(e)
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    mode: 'sticky',
                    message: e,
                });
                toastEvent.fire();
            });
          } else {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                mode: 'sticky',
                message: 'No navigator.share - ' + typeof(navigator.share)
            });
            toastEvent.fire();
            console.warn("No navigator.share");
          }
    }
})
