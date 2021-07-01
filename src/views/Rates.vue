<template>
  <h2>Tarifas</h2>
  <router-view />
</template>

<style>
button {
  background-color: #44c767;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  padding: 10px 25px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
  margin: 2px;
  width: 125px;
}
button:hover {
  background-color: #5cbf2a;
}
button:active {
  position: relative;
  top: 1px;
}
button:disabled,
button[disabled] {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
  cursor: default;
}
</style>
