<template>
  <div>

  <NuxtLayout>

    
    <NuxtPage />
  </NuxtLayout>
  

  </div>
</template>

<script setup>
const auth = useAuthStore()
auth.fetchUser()

</script>