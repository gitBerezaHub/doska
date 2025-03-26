<script setup>
import CoordinateRuler from "@/components/CoordinateRuler.vue";
import { onMounted, ref, watch } from "vue";
const rospisi = ref([
  {
    id: 1,
    text: "ИКИТ СИЛА",
    size: 20,
    color: "000",
    positionX: 0,
    positionY: 0,
  },
]);

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
  </CoordinateRuler>
</template>

<style scoped lang="scss">
@import "reset-css";

.rospis {
  position: absolute;
  top: 100px;
}
</style>
