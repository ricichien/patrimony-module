<template>
  <div class="d-flex justify-content-end p-3">
    <div class="position-relative d-inline-block">
      <button
        class="btn btn-light border dropdown-toggle"
        @click="dropdownOpen = !dropdownOpen"
      >
        {{ $t('reports.reports') }}
      </button>

      <ul
        v-if="dropdownOpen"
        class="dropdown-menu show mt-1"
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
  </div>
</template>

<script setup>

</script>
