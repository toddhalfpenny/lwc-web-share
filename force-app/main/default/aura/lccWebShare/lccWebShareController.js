({
    handleMessage: function (component, event, helper) {
        var message = event.getParams();
        // var navigationEvent = $A.get("e.force:navigateToSObject");
	    // navigationEvent.setParams({
		// 	"recordId": message.payload.id,
      	// 	"slideDevName": "details"
    	// });
        // navigationEvent.fire();
        let toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            mode: 'sticky',
            message: message.payload,
            messageTemplate: message,
            messageTemplateData: ['Salesforce', {
                url: 'http://www.salesforce.com/',
                label: 'here',
                }
            ]
        });
        toastEvent.fire();
    },
})
