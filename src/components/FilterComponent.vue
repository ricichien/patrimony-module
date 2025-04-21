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

        <!-- Dropdown controlado por Vue -->
        <div class="position-relative">
          <button
            class="btn btn-light border dropdown-toggle"
            type="button"
            @click="dropdownAberto = !dropdownAberto"
          >
            {{ modelValue }}
          </button>

          <ul
            class="dropdown-menu show"
            v-if="dropdownAberto"
            style="display: block; position: absolute; z-index: 1000;"
          >
            <li v-for="opcao in opcoes" :key="opcao">
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="selecionar(opcao)"
              >
                {{ opcao }}
              </a>
            </li>
          </ul>
        </div>

        <i
          class="bi bi-info-circle text-muted"
          title="Filtra pela situação atual do item."
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
})

const emit = defineEmits(['update:modelValue'])

const mostrar = ref(true)
const dropdownAberto = ref(false)
const opcoes = ['Todos', 'Registrado', 'Baixado', 'Manutenção', 'Em uso']

function selecionar(opcao) {
  emit('update:modelValue', opcao)
  dropdownAberto.value = false
}
</script>
