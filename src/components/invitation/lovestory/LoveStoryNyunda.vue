<template>
  <section v-if="stories.length > 0" style="padding: 60px 24px; background-color: #F5E6D0;">
    <h2 :style="{ fontFamily: themeConfig.fontHeading, color: '#5C3D2E', fontSize: '1.75rem', textAlign: 'center', marginBottom: '40px' }">Our Love Story</h2>

    <div style="max-width: 500px; margin: 0 auto;">
      <div v-for="(story, i) in stories" :key="i" style="margin-bottom: 32px; background-color: #FFF8E7; border-radius: 8px; overflow: hidden;">
        <img v-if="story.photo" :src="resolveAssetUrl(story.photo, apiBase)" :alt="story.title" style="width: 100%; aspect-ratio: 4/3; object-fit: cover;" />
        <div style="padding: 20px;">
          <div style="display: inline-block; padding: 4px 12px; background-color: #5C3D2E; color: #FFF8E7; border-radius: 4px; font-size: 0.75rem; margin-bottom: 12px;">
            {{ story.date }}
          </div>
          <h4 style="font-size: 1.1rem; font-weight: 700; color: #5C3D2E; margin: 0 0 8px 0;">{{ story.title }}</h4>
          <p style="font-size: 0.85rem; color: #8B6F5C; line-height: 1.6; white-space: pre-line; margin: 0;">{{ story.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ThemeConfig } from '@/types/theme';
import type { LoveStoryItem } from '@/types/invitation';
import { resolveAssetUrl } from '@/utils/url';

defineProps<{
  stories: LoveStoryItem[];
  themeConfig: ThemeConfig;
  apiBase: string;
}>();
</script>
