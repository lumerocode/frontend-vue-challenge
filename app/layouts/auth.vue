<template>
  <div class="w-full min-h-screen grid grid-cols-1 md:grid-cols-10 bg-kambista-appBg">
    <aside class="hidden md:flex md:col-span-5 bg-gradient-auth flex-col justify-between p-12 text-neutral-white relative overflow-hidden">
      
      <div class="relative z-10 flex flex-col gap-20 my-auto w-full max-w-[545px] mx-auto">
        <div class="flex justify-center w-full">
          <img src="/assets/img/brand/logo-white.svg" alt="Kambista" class="h-22 w-auto object-image" />
        </div>
        
        <div class="flex flex-col gap-[37px]">
          <div class="flex gap-[28px] items-start">
            <img src="/assets/img/illustrations/step-quote-operation.svg" class=" w-15 h-15 object-contain shrink-0" alt="" />
            <div>
              <h4 class="font-sans font-bold text-xl text-neutral-white">Cotiza tu operación</h4>
              <p class="font-sans font-semibold text-base text-white mt-[12px]">Utiliza la calculadora para verificar el <span class="text-kambista-mint">Tipo de Cambio</span> en tiempo real.</p>
            </div>
          </div>

          <div class="flex gap-[28px] items-start">
            <img src="/assets/img/illustrations/step-make-transfer.svg" class="w-15 h-15 object-contain shrink-0" alt="" />
            <div>
              <h4 class="font-sans font-bold text-xl text-neutral-white">Realiza la transferencia</h4>
              <p class="font-sans font-semibold text-base text-white mt-[12px]">Envía desde tu banco el <span class="text-kambista-mint">dinero</span> que desees cambiar a la cuenta de Kambista indicada.</p>
            </div>
          </div>

          <div class="flex gap-[28px] items-start">
            <img src="/assets/img/illustrations/step-get-money.svg" class="w-15 h-15 object-contain shrink-0" alt="" />
            <div>
              <h4 class="font-sans font-bold text-xl text-neutral-white">Obtén tu dinero</h4>
              <p class="font-sans font-semibold text-base text-white mt-[12px]">El dinero será <span class="text-kambista-mint">depositado</span> en tu cuenta de destino.</p>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <main class="col-span-1 md:col-span-5 flex flex-col justify-center items-center px-6 md:px-16 py-12 bg-kambista-appBg min-h-screen">
      <div class="w-full max-w-100% mx-auto flex flex-col justify-center md:max-w-[343px]">
        <slot />
      </div>
    </main>
  </div>
</template>