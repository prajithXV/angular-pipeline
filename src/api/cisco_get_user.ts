export const ciscoGetUserBodyResultTalking = `<User>
    <dialogs>/finesse/api/User/215194/Dialogs</dialogs>
    <extension>215194</extension>
    <firstName>Coin</firstName>
    <lastName>App</lastName>
    <loginId>215194</loginId>
    <loginName>coinapp</loginName>
    <mediaType>1</mediaType>
    <pendingState></pendingState>
    <reasonCodeId>49</reasonCodeId>
    <roles>
        <role>Agent</role>
    </roles>
    <settings>
        <wrapUpOnIncoming>REQUIRED</wrapUpOnIncoming>
    </settings>
    <state>TALKING</state>
    <stateChangeTime>2017-09-28T17:33:40.875Z</stateChangeTime>
    <teamId>5007</teamId>
    <teamName>IBE_SAD</teamName>
    <uri>/finesse/api/User/215194</uri>
</User>`;

export const ciscoGetUserBodyResultNotReady = `<User>
    <dialogs>/finesse/api/User/215194/Dialogs</dialogs>
    <extension>215194</extension>
    <firstName>Coin</firstName>
    <lastName>App</lastName>
    <loginId>215194</loginId>
    <loginName>coinapp</loginName>
    <mediaType>1</mediaType>
    <pendingState></pendingState>
    <reasonCode>
        <category>NOT_READY</category>
        <code>27</code>
        <forAll>false</forAll>
        <id>49</id>
        <label>Lunch</label>
        <uri>/finesse/api/ReasonCode/49</uri>
    </reasonCode>
    <reasonCodeId>49</reasonCodeId>
    <roles>
        <role>Agent</role>
    </roles>
    <settings>
        <wrapUpOnIncoming>REQUIRED</wrapUpOnIncoming>
    </settings>
    <state>NOT_READY</state>
    <stateChangeTime>2017-09-28T17:33:40.875Z</stateChangeTime>
    <teamId>5007</teamId>
    <teamName>IBE_SAD</teamName>
    <uri>/finesse/api/User/215194</uri>
</User>`;

let make_call_body = `<Dialog>
<requestedAction>MAKE_CALL</requestedAction>
<fromAddress>215194</fromAddress>
<toAddress>914696014194</toAddress>
</Dialog>`;

// http://IBDC1-CCE-FINA01/finesse/api/User/215194/Dialogs
// http://IBDC1-CCE-FINA01/finesse/api/User/215194

// Basic Y29pbmFwcDoyMTUxOTQ=
