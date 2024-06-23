<script setup>
const props = defineProps(["getTasks"]);
</script>

<template>
  <header class="header-background p-5 mb-4 mt-8 rounded-3 text-center">
    <h2><b>WELCOME TO ZAKIA's WEB PROJECT </b></h2>
  </header>
</template>

<style>
@keyframes moveLightning {
  0% {
    left: -100%;
  }
  50% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}

body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #809ebc;
  color: #343a40;
}

.header-background {
  position: relative;
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px;
  margin-top: 5%;
  border-radius: 8px;
  color: #171111;
  background: linear-gradient(45deg, #ff4848, #ff8a80);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden; /* Hide the overflow of the moving lightning */
}

.header-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%);
  animation: moveLightning 10s infinite linear;
}

.header-background:hover {
  transform: scale(1.05); /* Scale up on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
}

h2 {
  margin-bottom: 20px;
  font-size: 2.5em;
  font-weight: bold;
  color: #000000; /* Black text color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow */
}

p {
  font-size: 1.2em;
  color: #ffffff; /* White text color */
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for text */
  padding: 10px 20px;
  border-radius: 5px;
}
</style>
