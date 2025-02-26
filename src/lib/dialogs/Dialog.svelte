<script lang="ts" module>
  import { writable } from "svelte/store";

  let dialogRef: HTMLDialogElement;

  export const isDialogOpen = writable(false);

  export function openDialog() {
    dialogRef.showModal();
    isDialogOpen.set(true);
  }

  export function closeDialog() {
    dialogRef.close();
    isDialogOpen.set(false);
  }
</script>

<script lang="ts">
  import { type Snippet } from "svelte";
  import { fade } from "svelte/transition";

  import Button from "@/lib/buttons/Button.svelte";
  import CloseIcon from "@/lib/icons/CloseIcon.svelte";

  type Props = {
    children: Snippet;
    title: string;
  };

  let { children, title }: Props = $props();
</script>

<dialog bind:this={dialogRef}>
  {#if $isDialogOpen}
    <div
      class="modal"
      onkeydown={(event) => {
        if (event.key === "Escape") closeDialog();
      }}
      tabindex="0"
      role="button"
      in:fade={{ delay: 400, duration: 500 }}
    >
      <div class="modal-header">
        <h1>{title}</h1>
        <Button onclick={closeDialog}>
          <CloseIcon />
        </Button>
      </div>
      <div class="modal-body">
        {@render children()}
      </div>
    </div>
  {/if}
</dialog>

<style lang="scss">
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    min-width: 450px;
    background-color: transparent;
    padding: var(--s16);
    border: solid 1px var(--color3);
    border-radius: var(--border-radius);
    display: flex;
    flex-direction: column;

    .modal-header {
      display: flex;
      justify-content: space-between;

      h1 {
        font-size: var(--xl-font-size);
      }
    }

    .modal-body {
      margin-top: var(--s32);
    }
  }
</style>
