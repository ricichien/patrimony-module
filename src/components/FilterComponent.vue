<template>
  <div class="border rounded bg-white shadow-sm mb-3">
    <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
      <button class="btn p-0 text-decoration-none" @click="mostrar = !mostrar">
        <i :class="['bi', mostrar ? 'bi-caret-down-fill' : 'bi-caret-right']"></i>
        <strong class="ms-2">Filtros de pesquisa</strong>
      </button>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary">Favoritos</button>
        <button class="btn btn-outline-secondary">Mais filtros</button>
      </div>
    </div>

    <div v-if="mostrar" class="p-3">
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <label class="fw-semibold">Situação:</label>
        <div class="dropdown">
          <button class="btn btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown">
            {{ modelValue }}
          </button>
          <ul class="dropdown-menu">
            <li v-for="opcao in opcoes" :key="opcao">
              <a class="dropdown-item" href="#" @click.prevent="$emit('update:modelValue', opcao)">
                {{ opcao }}
              </a>
            </li>
          </ul>
        </div>
        <i class="bi bi-info-circle text-muted" title="Filtra pela situação atual do item."></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

defineProps({
  modelValue: String,
})

const opcoes = ['Registrado', 'Baixado', 'Manutenção', 'Em uso']
const mostrar = ref(true)
</script>


<!-- <template>
    <div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterComponent'
  };
  </script>
  
  <style scoped>
  /* Estilos específicos deste componente */
  </style>
   -->