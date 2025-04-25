<template>
  <div class="container-fluid px-0 mt-2">
    <div class="row">
      <div class="col-12 d-flex flex-wrap justify-content-center justify-content-md-end align-items-center gap-1">

        <!-- Seletor de itens por página -->
        <select v-model.number="localPageSize" @change="handlePageSizeChange" class="form-select form-select-sm w-auto">
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size.toString().padStart(2, '0') }} {{ $t('pagination.perPage') }}
          </option>
        </select>

        <!-- Paginação numérica -->
        <div class="btn-group flex-wrap gap-2" role="group">
          <!-- Botão para página anterior -->
          <button class="btn btn-sm btn-outline-secondary rounded-1" :disabled="page === 1" @click="goTo(page - 1)">
            &lt;
          </button>

          <!-- Botões para páginas visíveis -->
          <button
            v-for="p in visiblePages"
            :key="p"
            class="btn btn-sm rounded-1"
            :class="{
              'btn-outline-primary': p === page,
              'btn-outline-secondary': p !== page
            }"
            @click="goTo(p)"
          >
            {{ p }}
          </button>

          <!-- Ellipsis para indicar páginas ausentes -->
          <button v-if="showEllipsis" class="btn btn-sm btn-outline-secondary rounded-1" disabled>
            ...
          </button>

          <!-- Botão para a última página -->
          <button
            v-if="totalPages > 1"
            class="btn btn-sm rounded-1"
            :class="{
              'btn-outline-primary': page === totalPages,
              'btn-outline-secondary': page !== totalPages
            }"
            @click="goTo(totalPages)"
          >
            {{ totalPages }}
          </button>

          <!-- Botão para página seguinte -->
          <button class="btn btn-sm btn-outline-secondary rounded-1" :disabled="page === totalPages" @click="goTo(page + 1)">
            &gt;
          </button>
        </div>

        <!-- Campo para navegar diretamente para uma página -->
        <div class="d-flex align-items-center ms-2">
          <label for="gotoPageInput" class="me-1 mb-0 small">{{ $t('pagination.goTo') }}</label>
          <input
            id="gotoPageInput"
            type="number"
            v-model.number="jumpPage"
            @keyup.enter="goTo(jumpPage)"
            :min="1"
            :max="totalPages"
            class="form-control form-control-sm"
            style="width: 70px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

// Define as propriedades recebidas do componente pai
const props = defineProps({
    totalItems: Number,
    pageSize: Number,
    page: Number
})

// Emite eventos para atualizar o número da página e o tamanho da página
const emit = defineEmits(['update:page', 'update:pageSize'])

// Variáveis reativas para controlar o número da página e o tamanho da página
const jumpPage = ref(props.page)
const localPageSize = ref(props.pageSize)
const pageSizeOptions = [5, 8, 10, 20, 50]

// Sincroniza o número da página com o valor recebido do componente pai
watch(() => props.page, newPage => {
    jumpPage.value = newPage
})

// Calcula o total de páginas com base no número total de itens e o tamanho da página
const totalPages = computed(() => {
    return Math.ceil(props.totalItems / localPageSize.value)
})

// Calcula quais páginas devem ser exibidas na navegação
const visiblePages = computed(() => {
    const maxVisible = 4
    const pages = []
    const half = Math.floor(maxVisible / 2)

    let start = props.page - half
    let end = props.page + half

    if (maxVisible % 2 === 0) {
        end -= 1
    }

    if (start < 1) {
        start = 1
        end = Math.min(maxVisible, totalPages.value)
    }

    if (end > totalPages.value) {
        end = totalPages.value
        start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
        pages.push(i)
    }

    return pages
})

// Exibe os elipses (...) se houver mais páginas além das visíveis
const showEllipsis = computed(() => {
    return visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1
})

// Função para navegar até a página específica
const goTo = (p) => {
    if (p >= 1 && p <= totalPages.value) {
        emit('update:page', p)
    }
}

// Função chamada quando o tamanho da página é alterado
const handlePageSizeChange = () => {
    emit('update:pageSize', localPageSize.value)
    emit('update:page', 1) // Reseta para a primeira página ao alterar o tamanho da página
}
</script>
