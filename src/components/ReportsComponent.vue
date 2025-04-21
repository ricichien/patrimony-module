<template>
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
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    modelValue: String
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const opcoes = ['Registrado', 'Baixado', 'Manutenção', 'Em uso']
  const mostrar = ref(true)
  </script>
  