<div class="outer" bind:this={div} on:scroll={scroll}>
  <div class="inner">
    <span>A</span>
    <span>B</span>
    <span>C</span>
    <span>D</span>
    <span>E</span>
    <span>F</span>
    <span>G</span>
    <span>H</span>
    <span>J</span>
    <span>K</span>
    <span>L</span>
    <span>M</span>
    <span>N</span>
    <span>O</span>
    <span>P</span>
  </div>
</div>

<script>
  let div, y = 0

  const scroll = () => {
    if (div) y = div.scrollTop * -2
  }

  $: div && scroll()
</script>

<style>
  div.outer {
    height: 70vh;
    overflow-y: auto;
    transform: scaleY(-1);
  }

  div.inner {
    transform: scaleY(-1);
  }

  span {
    display: block;
    border: 1px solid black;
    text-align: center;
    font-size: 4rem;
    padding: 4rem;
    margin: 1rem;
  }
</style>