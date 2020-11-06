<template>
  <svg
    class="view-list"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 10h16M4 14h16M4 18h16"
    />
  </svg>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.view-list {
  width: 30px;
  height: 30px;
  fill: gray;
  cursor: pointer;

  transition: fill 0.1s linear;
}
</style>
