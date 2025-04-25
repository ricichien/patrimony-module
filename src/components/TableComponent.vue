<template>
  <!-- Container principal, com flexbox para centralizar e espaçamento dinâmico -->
  <div class="d-flex justify-content-center px-2 px-sm-3 px-md-4 py-4 my-4">

    <!-- Limitação de largura do conteúdo -->
    <div class="w-100" style="max-width: 1200px;">
      
      <!-- Títulos principais com tradução dinâmica -->
      <div class="mb-4 text-center text-md-start">
        <h1 class="mb-1 text-muted h6">{{ $t('head.moduleTitle') }}</h1>
        <h1 class="h1">{{ $t('head.items') }}</h1>
      </div>

      <!-- Componente de filtro, com v-model para ligação bidirecional -->
      <FilterComponent v-model="solutionFilter" />
      <!-- Componente de relatórios -->
      <ReportsComponent />

      <!-- Tabela responsiva com dados paginados -->
      <div class="mt-4 table-responsive">
        <table class="table table-hover small">
          <thead>
            <tr class="bg-light">
              <!-- Cabeçalhos das colunas com tradução -->
              <th class="bg-light"></th>
              <th class="bg-light">{{ $t('table.aggregated') }}</th>
              <th class="bg-light">{{ $t('table.tombamento') }}</th>
              <th class="bg-light">{{ $t('table.tombamentoSAMP') }}</th>
              <th class="bg-light">{{ $t('table.number') }}</th>
              <th class="bg-light">{{ $t('table.mainItem') }}</th>
              <th class="bg-light">{{ $t('table.acquisitionValue') }}</th>
              <th class="bg-light">{{ $t('table.status') }}</th>
              <th class="bg-light">{{ $t('table.options') }}</th>
            </tr>
          </thead>
          <tbody>
            <!-- Iteração sobre os itens filtrados e paginados -->
            <template v-for="(item, index) in paginatedItems" :key="index">
              
              <!-- Linha principal da tabela -->
              <tr>
                <td>
                  <!-- Botão para expandir ou colapsar a linha de detalhes -->
                  <button class="btn p-0" @click="toggleRow(index)">
                    <i :class="['bi', isExpanded(index) ? 'bi-caret-down' : 'bi-caret-right', 'text-muted']"></i>
                  </button>
                </td>
                <td>
                  <!-- Exibe "Sim" ou "Não" com base na propriedade 'agregado' do item -->
                  <div :class="item.agregado ? 'bg-yes' : 'bg-no'">
                    {{ item.agregado ? $t('common.yes') : $t('common.no') }}
                  </div>
                </td>
                <td class="text-muted">{{ item.tombamento }}</td>
                <td class="text-muted">{{ item.tombamentoSAMP }}</td>
                <td class="text-muted">{{ item.numero }}</td>
                <td class="text-muted me-5">{{ item.itemPrincipal }}</td>
                <td class="text-muted text-center">{{ item.valorAquisicao.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</td>
                <td>
                  <!-- Exibe a situação do item, com cores diferentes para cada status -->
                  <div v-if="item.situacao === 'Registrado'" class="bg-success-situation">
                    {{ $t('status.' + item.situacao) }}
                  </div>
                  <div v-else-if="item.situacao === 'Manutenção'" class="bg-maintenance-situation">
                    {{ $t('status.' + item.situacao) }}
                  </div>
                </td>
                <td>
                  <!-- Botão de opções (exemplo de menu com três pontos verticais) -->
                  <button class="btn p-0">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                </td>
              </tr>

              <!-- Linha de detalhes, visível apenas quando a linha principal está expandida -->
              <tr v-if="isExpanded(index)">
                <td colspan="9" class="bg-light">
                  <div class="p-2">
                    <!-- Exibe os detalhes do item, como data de aquisição e se é um bem relacionável -->
                    <p><strong>{{ $t('table.acquisitionDate') }}:</strong> {{ item.detalhes.dataAquisicao }}</p>
                    <p>
                      <strong>{{ $t('table.relatableAsset') }}:</strong>
                      {{ item.detalhes.bemRelacionavel ? $t('common.yes') : $t('common.no') }}
                    </p>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Componente de paginação, com atualização de página e tamanho de página -->
      <PaginationComponent
        :totalItems="filteredItems.length"
        :page="page"
        :pageSize="pageSize"
        @update:page="page = $event"
        @update:pageSize="pageSize = $event"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchItems } from '@/services/itemService'
import PaginationComponent from '@/components/PaginationComponent.vue'
import FilterComponent from '@/components/FilterComponent.vue'
import ReportsComponent from '@/components/ReportsComponent.vue'

const items = ref([])
const page = ref(1)
const pageSize = ref(8)
const expandedRows = ref([])
const solutionFilter = ref('Todos')

// Função para alternar o estado de expansão de uma linha
const toggleRow = (index) => {
  const rowIndex = expandedRows.value.indexOf(index)
  if (rowIndex === -1) {
    expandedRows.value.push(index) // Adiciona o índice se não estiver na lista
  } else {
    expandedRows.value.splice(rowIndex, 1) // Remove o índice se já estiver na lista
  }
}

// Verifica se a linha está expandida
const isExpanded = (index) => expandedRows.value.includes(index)

// Carrega os itens quando o componente for montado
onMounted(async () => {
  items.value = await fetchItems()
})

// Filtrar os itens com base na situação selecionada
const filteredItems = computed(() => {
  if (solutionFilter.value === 'Todos') return items.value
  return items.value.filter(item => item.situacao === solutionFilter.value)
})

// Paginar os itens filtrados
const paginatedItems = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return filteredItems.value.slice(start, start + pageSize.value) // Retorna apenas os itens da página atual
})
</script>
