<template>
<div>
    <header>
    <h1>Mi sitio en Nuxt</h1>
    <nav>
        <NuxtLink to="/">Inicio</NuxtLink>
        <NuxtLink to="/about">Acerca de</NuxtLink>
    </nav>
    </header>

    <main>
    <slot /> <!-- Aquí se renderiza la página -->
    </main>

    <footer>
    <p>© 2026 Leonardo</p>
    </footer>
</div>
</template>
