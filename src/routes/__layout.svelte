<script>
  import { MaterialApp, Icon, Alert } from "svelte-materialify";
  import { mdiCheck, mdiAlert, mdiAlertCircleOutline } from "@mdi/js";
  import { alerts } from "$lib/stores";
  import "../app.css";
</script>

<!-- Container -->
<div class="flex flex-col h-screen bg-gray-100">
  <MaterialApp>
    {#each $alerts as alert}
      <Alert
        class={alert.type === "info" ? "blue white-text" : `${alert.type}-color`}
        dismissible={true}
        transitionOpts={{ duration: 300 }}
      >
        <div slot="icon">
          {#if alert.type === "info"}
            <Icon path={mdiAlertCircleOutline} />
          {:else if alert.type === "success"}
            <Icon path={mdiCheck} />
          {:else if alert.type === "error"}
            <Icon path={mdiAlert} />
          {/if}
        </div>
        {alert.message}
      </Alert>
    {/each}

    <slot />
  </MaterialApp>
</div>
