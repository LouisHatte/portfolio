<script lang="ts">
  type Props = {
    liked: boolean;
  };

  let { liked }: Props = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class:liked
>
  <path
    d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
  />
</svg>

<style lang="scss">
  svg {
    stroke: var(--color1);
  }
  .liked {
    fill: var(--color1);
    stroke: none;
    animation: like 0.5s 1;
    transition: all 0.5s;
  }

  @keyframes like {
    0% {
      transform: scale(1);
    }
    90% {
      transform: scale(1.4);
    }
    100% {
      transform: scale(1.1);
    }
  }
</style>
