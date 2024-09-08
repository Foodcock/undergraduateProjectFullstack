<script>
  window.watsonAssistantChatOptions = {
    integrationID: "2b7bea96-87a9-4d0c-b8de-26d6efb37918", // The ID of this integration.
    region: "us-south", // The region your integration is hosted in.
    serviceInstanceID: "f408bd94-9c83-4b5a-82cb-fbfc6cf679b3", // The ID of your service instance.
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });
</script>