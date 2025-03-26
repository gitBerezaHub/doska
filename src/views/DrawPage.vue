<script setup>
import CoordinateRuler from "@/components/CoordinateRuler.vue";
import { onMounted, ref, watch } from "vue";
import { getRandomColor } from "@/shared";
const rospisi = ref([
  {
    id: 1,
    text: "ИКИТ СИЛА",
    size: 50,
    color: "000",
    positionX: 0,
    positionY: 0,
  },
]);

const socket = new WebSocket("ws://localhost:3000");

socket.onopen = function (e) {
  console.log("open -> ", e);
};

socket.onmessage = function (e) {
  console.log("message -> ", e.data);
  let id = rospisi.value[rospisi.value.length - 1].id + 1;
  let margin = JSON.parse(e.data).text.length + 50;
  let posX = Math.random() * (window.innerHeight - margin);
  let posY = Math.random() * (window.innerWidth - margin);
  if (posX <= 300 && posY <= 300) {
    Math.random() < 0.5 ? (posX += 300) : (posY += 300);
  }
  rospisi.value.push({
    id: id,
    text: JSON.parse(e.data).text,
    size: Math.random() * 20 + 20,
    color: getRandomColor(),
    positionX: posX,
    positionY: posY,
  });
  localStorage.setItem(
    id,
    JSON.stringify(rospisi.value[rospisi.value.length - 1])
  );
};

socket.onclose = function () {
  console.log("closed");
};

socket.onerror = function () {
  console.log("error");
};

watch(
  rospisi,
  () => {
    for (let rospis of rospisi.value) {
      localStorage.setItem(rospis.id, JSON.stringify(rospis));
    }
  },
  { deep: true }
);

onMounted(() => {
  const arr = [];
  let i = 2;
  while (JSON.parse(localStorage.getItem(i))) {
    arr.push(JSON.parse(localStorage.getItem(i)));
    i++;
  }
  if (arr.length) {
    rospisi.value.push(...arr);
  }
});
</script>

<template>
  <CoordinateRuler>
    <p
      class="rospis"
      v-for="rospis in rospisi"
      :key="rospis.text"
      :style="{
        fontSize: `${rospis.size}px`,
        color: `#${rospis.color}`,
        left: `${rospis.positionY}px`,
        top: `${rospis.positionX}px`,
      }"
    >
      {{ rospis.text }}
    </p>
    <img class="img" src="../assets/qr.png" alt="" />
  </CoordinateRuler>
</template>

<style scoped lang="scss">
@import "reset-css";

.rospis {
  position: absolute;
  top: 100px;
}

.img {
  margin: 10px;
}
</style>
