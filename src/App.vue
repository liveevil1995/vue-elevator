<template>
  <div class="wrapper">
    <elevator-entrance></elevator-entrance>
  </div>
</template>

<script>
  import ElevatorEntrance from './components/ElevatorEntrance.vue';

  export default {
    components: {
      ElevatorEntrance
    }
  }
  
</script>

<style>

  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }

  .wrapper {
    padding-bottom: 30px;
    position: relative;
    background: url('./assets/bg.jpeg');
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: end;
    height: 100%;
    gap: 20px;
  }

  .wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    z-index: 2;
  }

</style>
