<template>
  <div class="language-switcher d-flex justify-content-end p-2">
    <!-- Botão para alternar entre idiomas -->
    <button class="btn btn-outline-secondary me-2" @click="switchLanguage">
      {{ currentLanguage === 'pt_BR' ? 'EN' : 'PT' }} <!-- Exibe 'EN' ou 'PT' com base no idioma atual -->
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import i18next from 'i18next'

// Define o idioma atual a partir da configuração do i18next
const currentLanguage = ref(i18next.language)

// Função para alternar o idioma entre 'pt_BR' e 'en_US'
const switchLanguage = () => {
  const newLang = currentLanguage.value === 'pt_BR' ? 'en_US' : 'pt_BR'
  i18next.changeLanguage(newLang)  // Altera o idioma no i18next
  currentLanguage.value = newLang  // Atualiza o idioma local no Vue
}
</script>
