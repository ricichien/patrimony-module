<template>
    <div class="language-switcher d-flex justify-content-end p-2">
      <button class="btn btn-outline-secondary me-2" @click="switchLanguage">
        {{ currentLanguage === 'pt_BR' ? 'EN' : 'PT' }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import i18next from 'i18next'
  
  const currentLanguage = ref(i18next.language)
  
  const switchLanguage = () => {
    const newLang = currentLanguage.value === 'pt_BR' ? 'en_US' : 'pt_BR'
    i18next.changeLanguage(newLang)
    currentLanguage.value = newLang
  }
  </script>

  