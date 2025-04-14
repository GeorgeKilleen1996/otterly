<template>
  <div class="container mx-auto h-screen flex relative">
    <UIBackgroundsTwinkleStar />
    <!-- TODO: Animated otterly logo w/ feature icons floating around - set behind form on mobile -->
    <div class="hidden lg:flex flex-1 justify-center items-center">
      <AuthLogoArt class="w-full max-w-[75%]" />
    </div>
    <div
      class="w-full md:max-w-md flex items-center justify-center md:px-10 px-4"
    >
      <AuthLoginFormComponent class="w-full" />
    </div>
  </div>
</template>
