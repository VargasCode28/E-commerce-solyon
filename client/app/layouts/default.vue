<script setup lang="ts">
import { ref, onMounted } from 'vue'



const isCartOpen = ref(false)
const isScrolled = ref(false)


const auth = useAuthStore()


onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})

const handleLogout = async () => {
  await auth.logout()
  await navigateTo('/login')
}


// Datos de ejemplo para el carrito (Tus datos originales)
const cartItems = ref([
  { id: 1, name: 'Camiseta Minimalista Algodón', price: 45, size: 'M', qty: 1, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200' },
  { id: 2, name: 'Pantalón Lino Premium', price: 89, size: '42', qty: 1, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=200' }
])




onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <div class="shop-container">
    <header :class="['navbar', { 'navbar-white': isScrolled }]">
      <div class="nav-wrapper">
        
        <nav class="nav-group left">
          <NuxtLink to="/shop" class="nav-link">Colección</NuxtLink>
          <NuxtLink to="/new" class="nav-link">Novedades</NuxtLink>
        </nav> 


        <div class="nav-brand">
          <NuxtLink to="/">
            <img src="/logo_minimalist.png" alt="SOLYON" class="main-logo" />
          </NuxtLink>
        </div>

        <div class="nav-group right">
          <button class="action-btn search">Buscar</button>
          <button class="action-btn" @click="isCartOpen = true">
            Bolsa <span class="cart-badge">({{ cartItems.length }})</span>
          </button>




          <div class="nav-group right">
        <!-- <button class="action-btn search">Buscar</button> -->
        <button class="action-btn" @click="isCartOpen = true">
        <!-- Bolsa <span class="cart-badge">({{ cartItems.length }})</span> -->
        </button>

        



  <!-- Mostrar nombre si está autenticado -->
  <div v-if="auth.isAuthenticated" class="user-access">
    <span class="username">Hola, {{ auth.user?.name }}</span>
    <button @click="handleLogout" class="logout-btn">Cerrar sesión</button>
  </div>

  <!-- Si no está autenticado -->
  <NuxtLink v-else to="/login" class="user-access">Cuenta</NuxtLink>
</div>



          <!-- <NuxtLink to="/login" class="user-access">Cuenta</NuxtLink>   -->
        </div>
      </div>
    </header>

    <main class="viewport">
      <slot />
    </main>

    <Transition name="slide">
      <div v-if="isCartOpen" class="cart-modal">
        <div class="cart-overlay" @click="isCartOpen = false"></div>
        <div class="cart-panel">
          <div class="cart-header">
            <h3>Tu Selección</h3>
            <button @click="isCartOpen = false" class="close-btn">✕</button>
          </div>

          <div class="cart-content">
            <div v-if="cartItems.length > 0" class="cart-list">
              <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <img :src="item.img" :alt="item.name" class="item-img" />
                <div class="item-details">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-meta">Talla: {{ item.size }} — Cant: {{ item.qty }}</p>
                  <p class="item-price">{{ item.price }}€</p>
                </div>
              </div>
            </div>
            <div v-else class="empty-cart">
              <p>Tu bolsa está vacía</p>
            </div>
          </div>

          <div class="cart-footer">
            <div class="total-row">
              <span>Subtotal</span>
              <span>134,00€</span>
            </div>
            <button class="checkout-btn">Finalizar Compra</button>
          </div>
        </div>
      </div>
    </Transition>

    <footer class="shop-footer">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Ayuda</h4>
          <NuxtLink to="/">Envíos</NuxtLink>
          <NuxtLink to="/">Devoluciones</NuxtLink>
        </div>
        <div class="footer-col">
          <h4>Solyon</h4>
          <NuxtLink to="/">Sostenibilidad</NuxtLink>
          <NuxtLink to="/">Ética</NuxtLink>
        </div>
        <div class="footer-col newsletter">
          <h4>Newsletter</h4>
          <div class="input-group">
            <input type="email" placeholder="Email" />
            <button>→</button>
          </div>
        </div>
      </div>
      <div class="legal">
        <p>© 2026 SOLYON STUDIO — HECHO PARA DURAR</p>
      </div>
    </footer>




  </div>
</template>





<style scoped>
/* BASE */
.shop-container {
  width: 100%;
  background: #ffffff;
  color: #1a1a1a;
  min-height: 100vh;
}

/* NAVBAR */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1000;
}

.navbar-white {
  height: 75px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #f0f0f0;
}

.nav-wrapper {
  width: 100%;
  padding: 0 60px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.nav-group { display: flex; gap: 30px; }
.nav-group.right { justify-content: flex-end; }

.nav-link, .action-btn, .user-access {
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1.5px;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
}

/* LOGO */
.main-logo {
  height: 170px; /* Ajustado para que no rompa el diseño */
  width: auto;
  transition: height 0.4s ease;
}

.navbar-white .main-logo {
  height: 120px;
}

/* MODAL CARRITO SLIDE-OVER */
.cart-modal {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
}

.cart-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  backdrop-filter: blur(4px);
}

.cart-panel {
  position: relative;
  width: 100%;
  max-width: 400px;
  background: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
}

.cart-header {
  padding: 30px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h3 { text-transform: uppercase; font-size: 13px; letter-spacing: 1px; }

.cart-content { flex: 1; overflow-y: auto; padding: 30px; }

.cart-item { display: flex; gap: 20px; margin-bottom: 25px; }

.item-img { width: 80px; height: 100px; object-fit: cover; background: #f7f7f7; }

.item-name { font-size: 13px; font-weight: 600; }

.item-meta { font-size: 11px; color: #888; margin: 5px 0; }

.item-price { font-size: 13px; font-weight: 500; }

.cart-footer { padding: 30px; border-top: 1px solid #eee; }

.total-row { display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: 700; }

.checkout-btn {
  width: 100%;
  padding: 20px;
  background: #0066ff; /* Tu color de marca */
  color: white;
  border: none;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
}

/* ANIMACIONES */
.slide-enter-active, .slide-leave-active { transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from .cart-panel, .slide-leave-to .cart-panel { transform: translateX(100%); }
.slide-enter-from .cart-overlay, .slide-leave-to .cart-overlay { opacity: 0; }

/* VIEWPORT Y FOOTER */
.viewport { padding-top: 100px; min-height: 80vh; }

.shop-footer { padding: 80px 60px 40px; background: #f9f9f9; border-top: 1px solid #eee; }

.footer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }

.footer-col h4 { font-size: 12px; text-transform: uppercase; margin-bottom: 20px; }

.footer-col a { display: block; font-size: 13px; color: #666; text-decoration: none; margin-bottom: 10px; }

.input-group { display: flex; border-bottom: 1px solid #000; padding-bottom: 5px; }

.input-group input { border: none; background: none; width: 100%; outline: none; }

.legal { text-align: center; font-size: 10px; color: #aaa; margin-top: 60px; letter-spacing: 1px; }

@media (max-width: 768px) {
  .nav-group.left { display: none; }
  .nav-wrapper { grid-template-columns: 1fr 1fr; padding: 0 20px; }
}
</style>