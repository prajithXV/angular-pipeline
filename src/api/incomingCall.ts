export const incomingCallHTTP = `
<Dialogs>
<Dialog>
  <associatedDialogUri></associatedDialogUri>
  <fromAddress>335892</fromAddress>
  <id>53149720</id>
  <mediaProperties>
    <DNIS>215194</DNIS>
    <callType>OTHER_IN</callType>
    <callvariables>
      <CallVariable>
        <name>callVariable1</name>
        <value></value>
      </CallVariable>
      <CallVariable>
        <name>callVariable2</name>
        <value></value>
      </CallVariable>
      <CallVariable>
        <name>callVariable3</name>
        <value></value>
      </CallVariable>
      <CallVariable>
        <name>callVariable4</name>
        <value></value>
      </CallVariable>
      <CallVariable>
        <name>callVariable5</name>
        <value></value>
      </CallVariable>
      <CallVariable>
        <name>callVariable6</name>
        <value></value>
      </CallVariable>
      <CallVariable>
        <name>callVariable7</name>
        <value></value>
      </CallVariable>
    </callvariables>
</mediaProperties>
</Dialog>
</Dialogs>`;


export const incomingCallXMPP = `
      <message from='pubsub.ibdc1-cce-fina01.ibkc.int' to='215194@ibdc1-cce-fina01.ibkc.int' id='/finesse/api/User/215194/Dialogs__215194@ibdc1-cce-fina01.ibkc.int__k15Q3'>
      <event xmlns='http://jabber.org/protocol/pubsub#event'>
          <items node='/finesse/api/User/215194/Dialogs'>
              <item id='0b6afdb5-5870-4b69-b649-7e7a8c69c0c06392128'>
                  <notification xmlns='http://jabber.org/protocol/pubsub'><Update><data><dialogs><Dialog><associatedDialogUri></associatedDialogUri><fromAddress>335892</fromAddress><id>53149720</id><mediaProperties><DNIS>215194</DNIS><callType>OTHER_IN</callType><dialedNumber>215194</dialedNumber><outboundClassification></outboundClassification><callvariables><CallVariable><name>callVariable1</name><value></value></CallVariable><CallVariable><name>callVariable2</name><value></value></CallVariable><CallVariable><name>callVariable3</name><value></value></CallVariable><CallVariable><name>callVariable4</name><value></value></CallVariable><CallVariable><name>callVariable5</name><value></value></CallVariable><CallVariable><name>callVariable6</name><value></value></CallVariable><CallVariable><name>callVariable7</name><value></value></CallVariable><CallVariable><name>callVariable8</name><value></value></CallVariable><CallVariable><name>callVariable9</name><value></value></CallVariable><CallVariable><name>callVariable10</name><value></value></CallVariable></callvariables></mediaProperties><mediaType>Voice</mediaType><participants><Participant><actions><action>ANSWER</action></actions><mediaAddress>215194</mediaAddress><mediaAddressType>AGENT_DEVICE</mediaAddressType><startTime>2017-10-13T16:17:55.401Z</startTime><state>ALERTING</state><stateCause></stateCause><stateChangeTime>2017-10-13T16:17:55.401Z</stateChangeTime></Participant><Participant><actions><action>UPDATE_CALL_DATA</action><action>DROP</action></actions><mediaAddress>335892</mediaAddress><mediaAddressType></mediaAddressType><startTime>2017-10-13T16:17:55.401Z</startTime><state>INITIATED</state><stateCause></stateCause><stateChangeTime>2017-10-13T16:17:55.401Z</stateChangeTime></Participant></participants><state>ALERTING</state><toAddress>215194</toAddress><uri>/finesse/api/Dialog/53149720</uri></Dialog></dialogs></data><event>POST</event><requestId></requestId><source>/finesse/api/User/215194/Dialogs</source></Update></notification>
              </item>
          </items>
      </event>
  </message>`;