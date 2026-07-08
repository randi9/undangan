<template>
  <div v-if="!isInline" class="hidden"></div>
  <div
    v-else
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
      position: relative;
    "
  >
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 24px; width: 100%;">
      <h2
        class="text-4xl sm:text-5xl md:text-6xl"
        :style="{ fontFamily: themeConfig.fontHeading }"
        style="
          color: #8A4E56;
          font-weight: 700;
          text-shadow: 0 1px 3px rgba(255,255,255,0.85);
          line-height: 1.25;
          margin: 0 0 6px 0;
        "
      >
        Our Love Story
      </h2>
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 6px; color: #EBCFD1; opacity: 0.8;">
        <svg viewBox="0 0 60 2" style="width: 36px; opacity: 0.4;">
          <rect width="60" height="1" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 24 24" style="width: 14px; height: 14px; fill: #8A4E56;">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        <svg viewBox="0 0 60 2" style="width: 36px; opacity: 0.4;">
          <rect width="60" height="1" fill="currentColor" />
        </svg>
      </div>
    </div>

    <!-- Timeline Wrapper -->
    <div
      style="
        position: relative;
        width: calc(100% - 48px);
        max-width: 500px;
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding-left: 24px;
        padding-right: 12px;
        box-sizing: border-box;
      "
    >
      <!-- Timeline Central Line (placed on the left of cards) -->
      <div
        style="
          position: absolute;
          left: 6px;
          top: 8px;
          bottom: 24px;
          width: 2px;
          border-left: 2px dashed #EBCFD1;
          z-index: 1;
        "
      ></div>

      <!-- Story Items -->
      <div
        v-for="(story, i) in stories"
        :key="i"
        style="position: relative; width: 100%; z-index: 2;"
      >
        <!-- Timeline Node (Leaf / Flower design) -->
        <div
          style="
            position: absolute;
            left: -20px;
            top: 24px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #ffffff;
            border: 2px solid #8A4E56;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 6px rgba(138, 78, 86, 0.2);
            z-index: 10;
          "
        >
          <!-- Center dot -->
          <div style="width: 6px; height: 6px; border-radius: 50%; background: #6E875C;"></div>
        </div>

        <!-- Story Card -->
        <div
          style="
            position: relative;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid #EBCFD1;
            border-radius: 16px 36px 16px 36px;
            box-shadow: 0 8px 30px rgba(106, 78, 66, 0.05);
            overflow: hidden;
            padding: 20px 20px 24px 20px;
            box-sizing: border-box;
            transition: all 0.3s ease;
          "
          class="group hover:shadow-[0_12px_40px_rgba(106,78,66,0.1)] hover:-translate-y-1"
        >
          <!-- Elegant dashed inner border -->
          <div
            style="
              position: absolute;
              top: 8px;
              bottom: 8px;
              left: 8px;
              right: 8px;
              border: 1px dashed rgba(174, 184, 163, 0.35);
              border-radius: 10px 30px 10px 30px;
              pointer-events: none;
              box-sizing: border-box;
            "
          ></div>

          <!-- Botanical Deco in Background -->
          <svg viewBox="0 0 100 100" style="position: absolute; bottom: 8px; right: 8px; width: 64px; height: 64px; color: rgba(174, 184, 163, 0.15); pointer-events: none;" fill="currentColor">
            <path d="M15,85 Q45,65 85,25" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" />
            <path d="M35,62 Q25,52 30,45 Q40,50 35,62 Z" fill="currentColor" />
            <path d="M55,48 Q65,38 70,44 Q60,54 55,48 Z" fill="currentColor" />
            <path d="M45,55 Q35,45 40,39 Q50,45 45,55 Z" fill="currentColor" />
          </svg>

          <!-- Content container -->
          <div
            style="
              position: relative;
              z-index: 10;
              display: flex;
              flex-direction: column;
              gap: 16px;
              width: 100%;
              box-sizing: border-box;
            "
            :class="story.photo ? 'md:flex-row' : ''"
            :style="story.photo && i % 2 !== 0 ? { flexDirection: 'row-reverse' } : {}"
          >
            <!-- Image / Polaroid (if photo exists) -->
            <div
              v-if="story.photo"
              style="
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                box-sizing: border-box;
              "
              class="md:w-[42%] flex-shrink-0"
            >
              <!-- Polaroid Frame -->
              <div
                style="
                  position: relative;
                  background: #ffffff;
                  border: 1px solid rgba(235, 207, 209, 0.4);
                  padding: 8px 8px 16px 8px;
                  border-radius: 4px;
                  box-shadow: 0 4px 15px rgba(106, 78, 66, 0.08);
                  box-sizing: border-box;
                  width: 100%;
                  max-width: 190px;
                "
                :style="{ transform: i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)' }"
              >
                <!-- Washi Tape sticker at the top -->
                <div
                  style="
                    position: absolute;
                    top: -8px;
                    left: 50%;
                    transform: translateX(-50%) rotate(-4deg);
                    width: 50px;
                    height: 14px;
                    background: rgba(235, 207, 209, 0.6);
                    backdrop-filter: blur(1px);
                    border: 1px dashed rgba(138, 78, 86, 0.2);
                    z-index: 20;
                  "
                ></div>

                <!-- Actual Image -->
                <div
                  style="
                    width: 100%;
                    aspect-ratio: 1;
                    overflow: hidden;
                    border: 1px solid rgba(0, 0, 0, 0.05);
                    border-radius: 2px;
                    box-sizing: border-box;
                  "
                >
                  <img
                    :src="resolveAssetUrl(story.photo, apiBase)"
                    :alt="story.title"
                    style="width: 100%; height: 100%; object-fit: cover;"
                  />
                </div>

                <!-- Tiny Captions like handwritten text -->
                <div
                  style="
                    text-align: center;
                    margin-top: 8px;
                    font-size: 8.5px;
                    font-weight: 700;
                    color: #8A4E56;
                    font-family: sans-serif;
                    letter-spacing: 0.05em;
                  "
                >
                  ♥ {{ story.date }}
                </div>
              </div>
            </div>

            <!-- Text Content -->
            <div
              style="
                display: flex;
                flex-direction: column;
                text-align: left;
                box-sizing: border-box;
                width: 100%;
              "
              :class="story.photo ? 'md:w-[58%]' : ''"
            >
              <!-- Chapter and Date row (always on top of text) -->
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 8px;
                  box-sizing: border-box;
                "
              >
                <span
                  style="
                    font-size: 9px;
                    font-weight: 800;
                    letter-spacing: 0.08em;
                    color: #6E875C;
                    text-transform: uppercase;
                    font-family: sans-serif;
                  "
                >
                  Chapter {{ i + 1 }}
                </span>
                <span
                  v-if="!story.photo"
                  style="
                    display: inline-block;
                    padding: 3px 10px;
                    font-size: 9px;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    background-color: rgba(235, 207, 209, 0.3);
                    color: #8A4E56;
                    border-radius: 9999px;
                    font-family: sans-serif;
                  "
                >
                  {{ story.date }}
                </span>
              </div>

              <!-- Title -->
              <h4
                :style="{ fontFamily: themeConfig.fontHeading }"
                style="
                  font-size: 16px;
                  font-weight: 700;
                  color: #5A1E25;
                  margin-top: 0px;
                  margin-bottom: 8px;
                  line-height: 1.35;
                "
              >
                {{ story.title }}
              </h4>

              <!-- Description -->
              <p
                style="
                  font-size: 12px;
                  line-height: 1.6;
                  color: #5C3E35;
                  font-weight: 400;
                  margin: 0;
                  font-family: var(--font-body), sans-serif;
                  white-space: pre-line;
                "
              >
                {{ story.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeConfig } from "@/types/theme";
import type { LoveStoryItem } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";

defineProps<{
  stories: LoveStoryItem[];
  themeConfig: ThemeConfig;
  isInline?: boolean;
  apiBase: string;
}>();
</script>
