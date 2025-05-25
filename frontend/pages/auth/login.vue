<template>
  <div class="mx-auto h-screen flex relative overflow-hidden">
    <div
      class="hidden lg:flex flex-1 justify-center items-center bg-primary relative"
    >
      <img
        src="~/assets/img/otterly-logo.png"
        alt="Otterly Logo"
        class="w-1/2 h-auto absolute opacity-15 -rotate-20 -bottom-[10%] -left-[10%]"
      />
      <!-- TODO: Some sort of information section / slider?  -->
    </div>
    <div
      class="w-full max-w-lg flex items-center justify-center md:px-10 px-4 mx-auto"
    >
      <AuthLoginFormComponent class="w-full" />
    </div>
  </div>
</template>
