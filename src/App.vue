<script setup>
import FilterComponent from './components/FilterComponent.vue'
import SwitchLanguage from './components/SwitchLanguage.vue';
import TableComponent from './components/TableComponent.vue'
</script>

<template>
    <SwitchLanguage/>
    <div class="container my-4">
      <div class="mb-4">
        <h1 class="mb-1 h6 text">Módulo de Patrimônio</h1>
        <h2>Itens</h2>
      </div>
  
      <TableComponent />
    </div>
  </template>