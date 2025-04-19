<template>
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
        <tr v-for="(item, index) in items" :key="item.id">
          <td>
            <div>
              <button class="btn p-0">
                <div class="">
                  <i class="bi bi-caret-right text-muted"></i>
                </div>
              </button>
            </div>
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
          <td>
            <div>

            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchItems } from '@/services/itemService'

const items = ref([])

onMounted(async () => {
  items.value = await fetchItems()
})
</script>
