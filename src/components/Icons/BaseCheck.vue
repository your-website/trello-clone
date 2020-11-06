<template>
  <svg
    class="check"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.check {
  width: 30px;
  height: 30px;
  cursor: pointer;
  stroke: green;

  transition: stroke 0.1s linear;
}

</style>
