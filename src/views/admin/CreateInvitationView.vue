<template>
  <EditInvitationView mode="create" />
</template>

<script setup lang="ts">
/**
 * CreateInvitationView — Thin wrapper around EditInvitationView in "create" mode.
 *
 * All form logic, wizard steps, and UI are shared in EditInvitationView.vue.
 * This file exists solely to provide a clean route component for /dashboard/create.
 */
import EditInvitationView from './EditInvitationView.vue';
</script>
