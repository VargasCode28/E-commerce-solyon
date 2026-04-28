<script setup lang="ts">
import { ref } from 'vue'





import { useAuthStore } from '~/stores/auth'  

const auth = useAuthStore()





const products = ref([
  { id: 1, name: 'Camiseta Minimalista Algodón', price: 45, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800' },
  { id: 2, name: 'Pantalón Lino Premium', price: 89, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800' },
  { id: 3, name: 'Chaqueta Estructurada', price: 120, img: 'https://images.unsplash.com/photo-1539533377285-b8927ae2f33e?auto=format&fit=crop&w=800' },
  { id: 4, name: 'Jersey de Punto Fino', price: 65, img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800' }
])
</script>

<template>
  <div class="home-container">
    <section class="fashion-hero">
      <div class="hero-image-wrapper">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2070" 
          alt="Fashion Editorial" 
          class="hero-img-animated"
        />
        <div class="hero-overlay">
          <div class="hero-text-content">
            <span class="label">Nueva Temporada 2026</span>
            <h1 class="main-title">Elegancia <br/> Atemporal</h1>
          </div>
        </div>
      </div>
    </section>

    <section class="content-body">
      <div class="welcome-box">
        <div class="blue-line"></div>
        <h2>Colección Exclusiva</h2>
        <p class="sub-desc">Piezas seleccionadas con un enfoque minimalista y funcional.</p>
      </div>

      <div class="product-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
          <div class="img-container">
            <img :src="product.img" :alt="product.name" />
            <button class="add-btn">Añadir a la bolsa</button>
          </div>
          <div class="info">
            <span class="p-name">{{ product.name }}</span>
            <span class="p-price">{{ product.price }}€</span>
          </div>
        </div>
      </div>
    </section>




<section class="journal-section">
      <div class="section-divider"></div>
      <div class="journal-header">
        <span class="subtitle">Solyon Journal</span>
        <h2 class="section-title">Cuidar cada detalle</h2>
      </div>

      <div class="journal-grid">
        <article class="journal-card">
          <div class="journal-img-wrapper">
            <img src="https://images.unsplash.com/photo-1490133504938-204780565f44?auto=format&fit=crop&w=800" alt="Sostenibilidad" />
          </div>
          <div class="journal-info">
            <span class="date">Abril 2026</span>
            <h3>Sostenibilidad: El futuro del tejido</h3>
            <p>Descubre cómo seleccionamos nuestras fibras orgánicas...</p>
            <NuxtLink to="/" class="read-more">Leer más</NuxtLink>
          </div>
        </article>

        <article class="journal-card">
          <div class="journal-img-wrapper">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800" alt="Diseño" />
          </div>
          <div class="journal-info">
            <span class="date">Marzo 2026</span>
            <h3>Arquitectura y Moda: Espacios mínimos</h3>
            <p>La inspiración detrás de nuestra línea de corte recto.</p>
            <NuxtLink to="/" class="read-more">Leer más</NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <section class="community-grid">
      <div class="community-item" v-for="i in 4" :key="i">
        <div class="insta-overlay"><span>@SOLYON_STUDIO</span></div>
        <img :src="`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80&sig=${i}`" alt="Social" />
      </div>
    </section>




  </div>
</template>



<style scoped>
.home-container {
  background: #fff;
  width: 100%;
}

/* --- ANIMACIÓN DE LA IMAGEN (MANTENIDA) --- */
.fashion-hero {
  width: 100%;
  height: 85vh;
  overflow: hidden;
  position: relative;
}

.hero-image-wrapper {
  width: 100%;
  height: 100%;
}

.hero-img-animated {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Animación constante de zoom lento */
  animation: kenBurns 20s infinite alternate ease-in-out;
}

@keyframes kenBurns {
  from { transform: scale(1); }
  to { transform: scale(1.15); }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  padding: 0 80px;
}

.hero-text-content { color: #fff; }
.label { font-size: 11px; text-transform: uppercase; letter-spacing: 5px; margin-bottom: 20px; display: block; }
.main-title { font-size: clamp(3rem, 8vw, 6rem); line-height: 0.9; font-weight: 300; }

/* --- SECCIÓN PRODUCTOS --- */
.content-body {
  max-width: 1400px;
  margin: -100px auto 100px;
  background: #fff;
  padding: 80px 60px;
  position: relative;
  z-index: 10;
  box-shadow: 0 40px 100px rgba(0,0,0,0.03);
}

.welcome-tag { font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #999; }
.user-name { color: #0066ff; font-weight: 700; }
.blue-line { width: 35px; height: 2px; background: #0066ff; margin: 15px 0 30px; }

.sub-desc { color: #666; margin-bottom: 60px; max-width: 500px; line-height: 1.6; }

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.img-container {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f4f4f4;
  margin-bottom: 15px;
}

.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.product-card:hover img { transform: scale(1.05); }

.add-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.product-card:hover .add-btn { transform: translateY(0); }

.info { display: flex; flex-direction: column; gap: 5px; }
.p-name { font-size: 13px; font-weight: 500; }
.p-price { font-size: 13px; color: #888; }

@media (max-width: 1024px) { .product-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .product-grid { grid-template-columns: 1fr; } .hero-overlay { padding: 40px; } }











/* --- SECCIÓN JOURNAL --- */
.journal-section {
  max-width: 1400px;
  margin: 0 auto 120px;
  padding: 0 60px;
}

.section-divider {
  width: 100%;
  height: 1px;
  background: #eee;
  margin-bottom: 80px;
}

.journal-header {
  text-align: center;
  margin-bottom: 60px;
}

.journal-header .subtitle {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 4px;
  color: #0066ff;
  font-weight: 700;
}

.journal-header .section-title {
  font-size: 32px;
  font-weight: 300;
  margin-top: 10px;
}

.journal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.journal-card {
  display: flex;
  flex-direction: column;
}

.journal-img-wrapper {
  aspect-ratio: 16/9;
  overflow: hidden;
  margin-bottom: 25px;
}

.journal-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1s ease;
}

.journal-card:hover img {
  transform: scale(1.05);
}

.journal-info .date {
  font-size: 10px;
  color: #aaa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.journal-info h3 {
  font-size: 20px;
  margin: 10px 0;
  font-weight: 500;
}

.journal-info p {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.read-more {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;
  border-bottom: 1px solid #1a1a1a;
  align-self: flex-start;
  padding-bottom: 2px;
}

/* --- COMMUNITY GRID (INSTAGRAM STYLE) --- */
.community-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  height: 350px;
}

.community-item {
  position: relative;
  overflow: hidden;
}

.community-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.insta-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 102, 255, 0.4); /* Azul de marca translúcido */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  color: white;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}

.community-item:hover .insta-overlay {
  opacity: 1;
}

@media (max-width: 768px) {
  .journal-grid { grid-template-columns: 1fr; }
  .community-grid { grid-template-columns: 1fr 1fr; height: auto; }
}


</style>