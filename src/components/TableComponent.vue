<template>
  <FilterComponent v-model="filtroSituacao" />

  <div class="mt-4">
    <table class="table table-hover ">
      <thead>
        <tr class="bg-secondary text-white">
          <th></th>
          <th>Agregado</th>
          <th>Tombamento</th>
          <th>Tombamento SAMP</th>
          <th>Número</th>
          <th>Item principal</th>
          <th>Valor aquisição</th>
          <th>Situação</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in paginatedItems" :key="index">
          <!-- Linha principal -->
          <tr>
            <td>
              <button class="btn p-0" @click="toggleRow(index)">
                <i :class="['bi', isExpanded(index) ? 'bi-caret-down' : 'bi-caret-right', 'text-muted']"></i>
              </button>
            </td>
            <td>
              <div :class="item.agregado ? 'bg-yes' : 'bg-no'">
                {{ item.agregado ? 'Sim' : 'Não' }}
              </div>
            </td>
            <td class="text-muted">{{ item.tombamento }}</td>
            <td class="text-muted">{{ item.tombamentoSAMP }}</td>
            <td class="text-muted">{{ item.numero }}</td>
            <td class="text-muted">{{ item.itemPrincipal }}</td>
            <td class="text-muted">{{ item.valorAquisicao }}</td>
            <td>
              <div class="bg-success-situation">
                {{ item.situacao }}
              </div>
            </td>
            <td><button class="btn p-0">
                <i class="bi bi-three-dots-vertical"></i>
              </button></td>
          </tr>

          <!-- Linha de detalhes (dropdown) -->
          <tr v-if="isExpanded(index)">
            <td colspan="9" class="bg-light">
              <div class="p-2">
                <p><strong>Data de aquisição:</strong> {{ item.detalhes.dataAquisicao }}</p>
                <p><strong>Bem relacionável:</strong> {{ item.detalhes.bemRelacionavel ? 'Sim' : 'Não' }}</p>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <PaginationComponent :totalItems="items.length" :page="page" :pageSize="pageSize" @update:page="page = $event"
    @update:pageSize="pageSize = $event" />

</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchItems } from '@/services/itemService'
import PaginationComponent from '@/components/PaginationComponent.vue'
import FilterComponent from '@/components/FilterComponent.vue' // ajuste o caminho se necessário

const filtroSituacao = ref('Registrado')

const filteredItems = computed(() => {
  return items.value.filter(item => item.situacao === filtroSituacao.value)
})

const items = ref([])
const page = ref(1)
const pageSize = ref(8)

const expandedRows = ref([])

const toggleRow = (index) => {
  const rowIndex = expandedRows.value.indexOf(index)
  if (rowIndex === -1) {
    expandedRows.value.push(index)
  } else {
    expandedRows.value.splice(rowIndex, 1)
  }
}

const isExpanded = (index) => {
  return expandedRows.value.includes(index)
}

onMounted(async () => {
  items.value = await fetchItems()
})

// const paginatedItems = computed(() => {
//   const start = (page.value - 1) * pageSize.value
//   return items.value.slice(start, start + pageSize.value)
// })
const paginatedItems = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredItems.value.slice(start, start + pageSize.value)
})
</script>
