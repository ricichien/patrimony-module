<template>
  <FilterComponent v-model="filtroSituacao" />
  <ReportsComponent />

  <div class="mt-4">
    <table class="table table-hover">
      <thead>
        <tr class="bg-secondary text-white">
          <th></th>
          <th>{{ $t('table.aggregated') }}</th>
          <th>{{ $t('table.tombamento') }}</th>
          <th>{{ $t('table.tombamentoSAMP') }}</th>
          <th>{{ $t('table.number') }}</th>
          <th>{{ $t('table.mainItem') }}</th>
          <th>{{ $t('table.acquisitionValue') }}</th>
          <th>{{ $t('table.status') }}</th>
          <th>{{ $t('table.options') }}</th>
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
                {{ item.agregado ? $t('common.yes') : $t('common.no') }}
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
            <td>
              <button class="btn p-0">
                <i class="bi bi-three-dots-vertical"></i>
              </button>
            </td>
          </tr>

          <!-- Linha de detalhes -->
          <tr v-if="isExpanded(index)">
            <td colspan="9" class="bg-light">
              <div class="p-2">
                <p><strong>{{ $t('table.acquisitionDate') }}:</strong> {{ item.detalhes.dataAquisicao }}</p>
                <p><strong>{{ $t('table.relatableAsset') }}:</strong> {{ item.detalhes.bemRelacionavel ? $t('common.yes') : $t('common.no') }}</p>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>

  <PaginationComponent
    :totalItems="filteredItems.length"
    :page="page"
    :pageSize="pageSize"
    @update:page="page = $event"
    @update:pageSize="pageSize = $event"
  />
</template>

 
 <script setup>
 import { ref, computed, onMounted } from 'vue'
 import { fetchItems } from '@/services/itemService'
 import PaginationComponent from '@/components/PaginationComponent.vue'
 import FilterComponent from '@/components/FilterComponent.vue'
 import ReportsComponent from '@/components/ReportsComponent.vue'
 
 const filtroSituacao = ref('Todos')
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
 
 const isExpanded = (index) => expandedRows.value.includes(index)
 
 onMounted(async () => {
   items.value = await fetchItems()
 })
 
 const filteredItems = computed(() => {
   if (filtroSituacao.value === 'Todos') return items.value
   return items.value.filter(item => item.situacao === filtroSituacao.value)
 })
 
 
 const paginatedItems = computed(() => {
   const start = (page.value - 1) * pageSize.value
   return filteredItems.value.slice(start, start + pageSize.value)
 })
 </script>
 