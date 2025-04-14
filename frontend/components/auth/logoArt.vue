<template>
  <div class="gradient-container w-full h-full">
    <svg
      class="masked-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <mask id="svgMask">
          <!-- Replace this path with your actual SVG path -->
          <path
            d="M250,50 A200,200 0 1,1 250,450 A200,200 0 1,1 250,50 Z"
            fill="white"
          />
        </mask>

        <!-- Define the gradient inside SVG -->
        <linearGradient id="svgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="var(--ui-primary)" />
          <stop offset="100%" stop-color="var(--ui-secondary)" />
        </linearGradient>
      </defs>

      <!-- Masked gradient rectangle -->
      <rect
        class="gradient-element"
        width="100%"
        height="100%"
        fill="url(#svgGradient)"
        mask="url(#svgMask)"
      />
    </svg>
  </div>
</template>

<style scoped>
.gradient-container {
  width: 100%;
  height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.masked-svg {
  width: 100%;
  height: 100%;
  max-width: 850px;
  max-height: 850px;
}

.gradient-element {
  animation: adjustHue 7s infinite;
}

@keyframes adjustHue {
  50% {
    filter: saturate(150%) hue-rotate(-35deg);
  }
}
</style>
