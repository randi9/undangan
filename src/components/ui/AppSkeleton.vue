<template>
  <div
    class="animate-pulse bg-slate-200"
    :class="roundedClass"
    :style="{ width, height }"
  ></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  width: { type: String, default: '100%' },
  height: { type: String, default: '20px' },
  rounded: { type: String, default: 'md' }, // sm, md, lg, xl, full, none
});

const roundedClass = computed(() => {
  if (props.rounded === 'none') return 'rounded-none';
  if (props.rounded === 'sm') return 'rounded-sm';
  if (props.rounded === 'md') return 'rounded-md';
  if (props.rounded === 'lg') return 'rounded-lg';
  if (props.rounded === 'xl') return 'rounded-xl';
  if (props.rounded === 'full') return 'rounded-full';
  return `rounded-${props.rounded}`;
});
</script>
