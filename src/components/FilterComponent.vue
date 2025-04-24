<template>
  <div class="border rounded bg-white shadow-sm mb-3">
    <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
      <button class="btn p-0 text-decoration-none" @click="show = !show">
        <i :class="['bi', show ? 'bi-caret-down-fill' : 'bi-caret-right']"></i>
        <strong class="ms-2">{{ $t('filters.title') }}</strong>
      </button>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary">{{ $t('filters.favorites') }}</button>
        <button class="btn btn-outline-secondary">{{ $t('filters.more') }}</button>
      </div>
    </div>

    <div v-if="show" class="p-3">
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <label class="fw-semibold">{{ $t('filters.status') }}:</label>

        <!-- Vue-controlled dropdown -->
        <div class="position-relative">
          <button
            class="btn btn-light border dropdown-toggle"
            type="button"
            @click="dropdownOpen = !dropdownOpen"
          >
            {{ $t('status.' + modelValue) }}
          </button>

          <ul
            class="dropdown-menu show"
            v-if="dropdownOpen"
            style="display: block; position: absolute; z-index: 1000;"
          >
            <li v-for="option in options" :key="option">
              <a
                class="dropdown-item"
                href="#"
                @click.prevent="select(option)"
              >
                {{ $t('status.' + option) }}
              </a>
            </li>
          </ul>
        </div>

        <i
          class="bi bi-info-circle text-muted"
          :title="$t('filters.tooltip')"
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

const show = ref(true)
const dropdownOpen = ref(false)
const options = ['Todos', 'Registrado', 'Baixado', 'Manutenção', 'Em uso']

function select(option) {
  emit('update:modelValue', option)
  dropdownOpen.value = false
}
</script>

