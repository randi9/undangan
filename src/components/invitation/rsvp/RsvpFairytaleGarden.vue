<template>
  <!-- Empty placeholder because this section is combined with the Footer for pinning -->
  <div class="hidden"></div>
</template>

<script setup lang="ts">
import type { ThemeConfig } from "@/types/theme";
import type { Rsvp } from "@/types/invitation";

defineProps<{
  rsvpMessages: Rsvp[];
  themeConfig: ThemeConfig;
  submitting: boolean;
}>();

defineEmits<{
  (e: 'submitRsvp', form: { guest_name: string; attendance: 'hadir' | 'tidak_hadir'; guest_count: number; message: string }): void;
}>();
</script>
