# lwcWebShare

**An investigation into seeing if I can access the cool [Navigator.share() API]([https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share) from within Salesforce Lightning.**

**We look at using Lightning Web Components, Aura Lightning Components, and Lightning Container Components... all in the name of trying to bring a nice "share" experience to mobile users.**

## Our user case

Looked at creating a lightning component that could have gone onto a record page, and *if* this worked then we could have turned it into a quick action (could not be a LWC in this case).

## Working notes

`sfdx force:project:create -n lwcWebShare --template standard`

`cd lwcWebShare`

`sfdx force:org:create -s -f config/project-scratch-def.json -a lwcWebShare --setdefaultusername`

Enable the New Salesforce Mobile App (from setup)

Create new perm set with “New Mobile Salesforce App”, and assign to my user

`sfdx force:user:password:generate -u lwcWebShare`

**.xml to expose for mobile form factor only**
```
<targets>
    <target>lightning__RecordPage</target>
</targets>
<targetConfigs>
    <targetConfig targets="lightning__RecordPage">
        <supportedFormFactors>
            <supportedFormFactor type="Small" />
        </supportedFormFactors>
    </targetConfig>
</targetConfigs>
```
 Otherwise “Unsupported form Factor”

Don’t think LWC can be a quick action - maybe wrap in Aura

For aura -need to set formfactor too…
```
<design:component >
   <design:supportedFormFactors>
       <design:supportedFormFactor type="Small"/>
   </design:supportedFormFactors>
</design:component>
```
Even after setting this I had an error, but the component palette showed up as “mobile”

I have also set this to API 39 (API 47 blocks this, so confirms locker stops navigator access)

**Boo!**, I get this error; “DOMException: Must be handling a user gesture to perform a share request” → This is a restriction of webshare.

Can I call a .click on a button?

Weird, this error now goes away… running in the browser it works… running in app it now fails with “no navigator.share”.

`navigator.vendor` is there, just not `navigator.share`.

Maybe need to use a LCC?

Using LCC...

Could not use         `<input type="button" onclick="handleClick()" value="Click me" />` due to inline event handler

Now using `document.getElementById("btnWebShare").onclick = handleClick;`
Works in SF1 browser

Still does not work in App.

Used `LCC.onlineSupport.sendMessage("containerUserMessage", {payload: m});` and lightning aura toast to see what was going on.

Still no navigator.share :/
