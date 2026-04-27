

<script setup>

</script>


<template>
  <nav>
    <NuxtLink to="/">Home</NuxtLink>

    <NuxtLink v-if="!user" to="/login">
      Login
    </NuxtLink>

    <span v-else>
      {{ user.email }}
    </span>
  </nav>
</template>