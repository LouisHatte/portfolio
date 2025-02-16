<script lang="ts">
  import { setContext, type Snippet } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { cubicInOut, cubicOut } from "svelte/easing";

  import CloseIcon from "@/lib/icons/CloseIcon.svelte";
  import { isMobile } from "@/stores/screenSize";
  import Button from "../buttons/Button.svelte";

  type Props = {
    children: Snippet;
    show: boolean;
    title: String;
  };

  let { children, show = $bindable(), title }: Props = $props();

  function closeModal() {
    show = false;
  }
  setContext("closeModal", closeModal);

  const fadeOptions = { duration: 1000, easing: cubicInOut };
  const flyOptions = { y: 500, duration: 500, easing: cubicOut };
</script>

{#if show && !$isMobile}
  <div class="modal-overlay" style="--align-items: center;">
    <div
      class="modal"
      in:fade={fadeOptions}
      tabindex="0"
      role="button"
      onkeydown={(event) => {
        if (event.key === "Escape") closeModal();
      }}
    >
      <div class="modal-header">
        <h1>{title}</h1>
        <Button onclick={closeModal}>
          <CloseIcon />
        </Button>
      </div>
      <div class="modal-body">
        {@render children()}
      </div>
    </div>
  </div>
{:else if show && $isMobile}
  <div class="modal-overlay" style="--align-items: flex-end;">
    <div
      class="modal_M"
      transition:fly={flyOptions}
      tabindex="0"
      role="button"
      onkeydown={(event) => {
        if (event.key === "Escape") closeModal();
      }}
    >
      <div class="modal-header">
        <h1>{title}</h1>
        <Button onclick={() => (show = false)}>
          <CloseIcon />
        </Button>
      </div>
      <div class="modal-body">
        {@render children()}
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 30px;
    }
  }

  .modal-body {
    margin-top: var(--s32);
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    align-items: var(--align-items);
    z-index: var(--z-third);

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30%;
      min-width: 450px;
      background-color: rgba(0, 0, 0, 0.01);
      backdrop-filter: blur(1px);
      padding: var(--s16);
      border: solid 1px var(--border-color);
      border-radius: var(--border-radius);
      display: flex;
      flex-direction: column;

      @extend .modal-header;
      @extend .modal-body;
    }

    .modal_M {
      width: 100%;
      height: 60%;
      max-width: 450px;
      background-color: rgba(0, 0, 0, 0.01);
      backdrop-filter: blur(1px);
      padding: var(--s12);
      border: solid 1px var(--border-color);
      border-bottom: none;
      border-top-left-radius: var(--xl-border-radius_M);
      border-top-right-radius: var(--xl-border-radius_M);
      overflow: scroll;
      display: flex;
      flex-direction: column;

      @extend .modal-header;
      @extend .modal-body;
    }
  }
</style>
