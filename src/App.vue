<script setup>
import FilterComponent from './components/FilterComponent.vue'
import SwitchLanguage from './components/SwitchLanguage.vue';
import TableComponent from './components/TableComponent.vue'
</script>

<template>
    <SwitchLanguage/>
    <div class="container my-4">
      <!-- <div class="mb-4">
        <h1 class="mb-1 h6 text"{{ $t('moduleTitle') }}</h1>
        <h2>{{ $t('items') }}</h2>
      </div> -->
  
      <TableComponent />
    </div>
  </template>