<template>
  <div class="ruler-container" ref="rulerContainer">
    <div class="horizontal-ruler">
      <div
        v-for="tick in horizontalTicks"
        :key="`h-${tick}`"
        class="tick horizontal-tick"
        :class="{ 'major-tick': tick % 50 === 0 }"
        :style="{ left: `${tick}px` }"
      >
        <span v-if="tick % 50 === 0" class="tick-label">{{ tick }}</span>
      </div>
    </div>
    <div class="vertical-ruler">
      <div
        v-for="tick in verticalTicks"
        :key="`v-${tick}`"
        class="tick vertical-tick"
        :class="{ 'major-tick': tick % 50 === 0 }"
        :style="{ top: `${tick}px` }"
      >
        <span v-if="tick % 50 === 0" class="tick-label">{{ tick }}</span>
      </div>
    </div>
    <div class="content-area" ref="contentArea">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// References to DOM elements
const rulerContainer = ref(null);
const contentArea = ref(null);

// State
const containerWidth = ref(800);
const containerHeight = ref(600);

// Generate ticks every 10 pixels
const horizontalTicks = computed(() => {
  const ticks = [];
  for (let i = 0; i <= containerWidth.value; i += 10) {
    ticks.push(i);
  }
  return ticks;
});

const verticalTicks = computed(() => {
  const ticks = [];
  for (let i = 0; i <= containerHeight.value; i += 10) {
    ticks.push(i);
  }
  return ticks;
});

// Update dimensions on mount and resize
onMounted(() => {
  updateDimensions();
  window.addEventListener("resize", updateDimensions);
});

function updateDimensions() {
  if (contentArea.value) {
    containerWidth.value = contentArea.value.clientWidth;
    containerHeight.value = contentArea.value.clientHeight;
  }
}
</script>

<style lang="scss" scoped>
$ruler-size: 30px;
$ruler-color: #f0f0f0;
$tick-color: #888;
$major-tick-color: #333;
$border-color: #ccc;

.ruler-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  overflow: hidden;
}

.horizontal-ruler {
  position: absolute;
  top: 0;
  left: $ruler-size;
  right: 0;
  height: $ruler-size;
  background-color: $ruler-color;
  border-bottom: 1px solid $border-color;
  z-index: 10;
}

.vertical-ruler {
  position: absolute;
  top: $ruler-size;
  left: 0;
  bottom: 0;
  width: $ruler-size;
  background-color: $ruler-color;
  border-right: 1px solid $border-color;
  z-index: 10;
}

.content-area {
  position: absolute;
  top: $ruler-size;
  left: $ruler-size;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: white;
}

.tick {
  position: absolute;
  background-color: $tick-color;

  &.horizontal-tick {
    width: 1px;
    height: 5px;
    bottom: 0;

    &.major-tick {
      height: 10px;
      background-color: $major-tick-color;
    }
  }

  &.vertical-tick {
    height: 1px;
    width: 5px;
    right: 0;

    &.major-tick {
      width: 10px;
      background-color: $major-tick-color;
    }
  }
}

.tick-label {
  position: absolute;
  font-size: 9px;
  color: $major-tick-color;

  .horizontal-tick & {
    top: -14px;
    left: -10px;
    width: 20px;
    text-align: center;
  }

  .vertical-tick & {
    top: -7px;
    right: 12px;
    text-align: right;
  }
}
</style>
