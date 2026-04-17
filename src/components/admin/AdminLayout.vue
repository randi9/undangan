<template>
  <div class="admin-layout">
    <AdminSidebar />

    <div class="admin-main">
      <AdminTopbar>
        <template v-if="$slots.search" #search>
          <slot name="search" />
        </template>
        <template v-if="$slots.actions" #actions>
          <slot name="actions" />
        </template>
      </AdminTopbar>

      <div class="admin-container">
        <slot />
      </div>
    </div>

    <!-- Toast (global) -->
    <div v-if="toast" :class="['toast', `toast-${toast.type}`]">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import AdminSidebar from './AdminSidebar.vue'
import AdminTopbar from './AdminTopbar.vue'

// Optional toast injection from parent views
const toast = inject<{ type: string; message: string } | null>('adminToast', null)
</script>
