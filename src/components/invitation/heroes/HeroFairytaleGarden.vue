<template>
  <section
    ref="heroSection"
    style="
      height: 100dvh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      text-align: center;
      padding: 48px 16px;
      position: relative;
      overflow: hidden;
      background-color: transparent;
    "
  >
    <!-- Hidden SVG Filter for Realistic Water Distortion -->
    <svg style="position: absolute; width: 0; height: 0; pointer-events: none">
      <filter id="waterfall-distortion" x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.035 0.05"
          numOctaves="4"
          result="noise"
        >
          <animate
            attributeName="seed"
            from="1"
            to="100"
            dur="18s"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="25"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>

    <!-- Scenic Backdrop Container (animates zoom and blur on mount) -->
    <div class="hero-scenic-backdrop">
      <!-- Sky Background Image (was on parent section style) -->
      <div
        style="
          position: absolute;
          inset: 0;
          background-image: url(&quot;https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_808a2f2b-d48a-4099-a3d2-b4a59147644c.webp&quot;);
          background-size: cover;
          background-position: center;
          z-index: 0;
        "
      ></div>

      <!-- Cloud Left & Right Overlays -->
      <img
        src="https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_fd4ee1ea-950e-433a-8026-cf80364cb6a9.webp"
        alt="Cloud Left"
        class="cloud-anim-left"
        style="
          position: absolute;
          top: 0;
          right: -250px;
          width: 100%;
          height: 40%;
          object-fit: cover;
          z-index: 1;
          pointer-events: none;
        "
      />
      <img
        src="https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_4c1a0785-54c4-4f62-a27b-c6277249360d.webp"
        alt="Cloud Right"
        class="cloud-anim-right"
        style="
          position: absolute;
          top: 100px;
          left: -160px;
          width: 100%;
          height: 40%;
          object-fit: cover;
          z-index: 1;
          pointer-events: none;
        "
      />

      <!-- Foreground Cliff Overlay (without sky) -->
      <img
        src="https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_e5766616-8b07-419a-b12f-cb576a738daa.webp"
        alt="Cliff Overlay"
        class="bg-cliff-layer"
        style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          pointer-events: none;
        "
      />

      <!-- Dynamic Waterfall Animation Overlay -->
      <div class="waterfall-container">
        <div class="waterfall-stream stream-1"></div>
        <div class="waterfall-stream stream-2"></div>
        <div class="waterfall-mist-container">
          <div
            v-for="n in 8"
            :key="n"
            :class="['mist-particle', `mist-${n}`]"
          ></div>
        </div>
      </div>

      <!-- Large Rolling Fog/Mist at the bottom of the waterfall -->
      <div class="waterfall-fog-container">
        <div class="fog-layer fog-1"></div>
        <div class="fog-layer fog-2"></div>
        <div class="fog-layer fog-3"></div>
      </div>

      <!-- Static Decorative Assets inside backdrop to zoom/blur together -->
      <img
        v-for="(asset, index) in DECORATIVE_ASSETS.filter(
          (a) => a.className === 'anim-static',
        )"
        :key="'static-' + index"
        :src="asset.src"
        :alt="asset.name"
        class="decor-asset anim-static"
        :style="asset.style"
      />
    </div>

    <!-- Dynamic Foreground/Entrance Decorative Assets (trees, shrubs, flowers) -->
    <img
      v-for="(asset, index) in DECORATIVE_ASSETS.filter(
        (a) => a.className !== 'anim-static',
      )"
      :key="'dynamic-' + index"
      :src="asset.src"
      :alt="asset.name"
      :class="['decor-asset', asset.className]"
      :style="asset.style"
    />

    <!-- Content slot -->
    <div
      ref="heroContentContainer"
      style="
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        color: #6a4e42;
        z-index: 3;
        position: relative;
        transform: translateY(8vh);
        will-change: opacity, transform;
      "
    >
      <slot />
    </div>

    <!-- Quotes Container (fades in as hero content fades out) -->
    <div
      v-if="quote"
      ref="quoteCardRef"
      class="fairytale-quote-container"
      style="
        position: absolute;
        inset: 0;
        z-index: 10;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transform: translateY(15vh);
        will-change: opacity, transform;
      "
    >
      <div class="fairytale-quote-card">
        <!-- Inner Wrapper to translate the text up while keeping the background cover full screen -->
        <div
          class="quote-inner-wrapper flex flex-col items-center justify-center"
          style="transform: translateY(-6vh)"
        >
          <!-- Quote Icon -->
          <div class="quote-icon-wrapper mb-8 text-[#8A4E56]">
            <svg
              class="w-8 h-8 mx-auto"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
              />
            </svg>
          </div>

          <!-- Quote Content -->
          <blockquote
            class="quote-text text-lg md:text-xl font-bold text-[#8A4E56] leading-relaxed md:leading-loose tracking-wide break-words whitespace-pre-line px-4"
            :style="{ fontFamily: themeConfig?.fontBody }"
          >
            {{ quote }}
          </blockquote>

          <!-- Bottom Accent Line -->
          <div class="w-12 h-[1px] bg-[#8A4E56] mx-auto mt-4"></div>
        </div>
      </div>
    </div>

    <!-- Pinned Bridge Asset -->
    <img
      v-if="quote"
      ref="bridgeRef"
      src="https://media.mengundanganda.com/fairygarden/quotes%20section/dewirandi_16ea4f80-300c-41c5-91b1-4ba941ed161a.webp"
      alt="Quotes bottom decoration"
      class="absolute bottom-0 left-0 w-full object-contain pointer-events-none origin-bottom scale-[1.6]"
      style="
        z-index: 12;
        opacity: 0;
        transform: translateY(100px);
        will-change: transform, opacity;
      "
    />

    <!-- Couple Background Cover -->
    <div
      ref="coupleBgRef"
      style="
        position: absolute;
        inset: 0;
        background-image: url(&quot;https://media.mengundanganda.com/fairygarden/couple%20section/dewirandi_b42881e0-cb77-4565-8f1f-d4603ff53253.webp&quot;);
        background-size: cover;
        background-position: center;
        z-index: 8;
        opacity: 0;
        pointer-events: none;
      "
    ></div>

    <!-- Leaves Animation Container -->
    <div
      ref="leavesContainerRef"
      class="absolute inset-0 overflow-hidden pointer-events-none z-[11]"
      style="opacity: 0"
    >
      <!-- Background Leaves -->
      <img
        v-for="(n, index) in 12"
        :key="'bg-leaf-' + n"
        :ref="
          (el) => {
            if (el) bgLeavesRefs[index] = el as HTMLElement;
          }
        "
        src="https://media.mengundanganda.com/fairygarden/couple%20section/dewirandi_f558ffe0-5a6f-400f-a20c-22300414bcd6.webp"
        alt="flying leaf"
        class="absolute pointer-events-none select-none"
        style="
          width: 40px;
          height: 40px;
          object-fit: contain;
          transform-origin: center center;
        "
      />
    </div>

    <!-- Focus Leaf Container -->
    <div
      ref="focusLeafContainerRef"
      class="absolute pointer-events-none z-[14] select-none flex items-center justify-center w-[380px] h-[380px] md:w-[580px] md:h-[580px]"
      style="
        display: none;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <!-- Leaf Image container (sways/rotates) -->
      <div
        ref="focusLeafInnerRef"
        class="absolute inset-0 flex items-center justify-center w-full h-full"
      >
        <img
          ref="focusLeafRef"
          src="https://media.mengundanganda.com/fairygarden/couple%20section/dewirandi_f558ffe0-5a6f-400f-a20c-22300414bcd6.webp"
          class="w-full h-full object-contain"
          style="transform-origin: center center"
        />
      </div>

      <!-- Couple Names Overlay (stays upright, centered exactly on parent) -->
      <div
        ref="coupleNamesRef"
        class="absolute inset-0 flex items-center justify-center w-full h-full"
        style="z-index: 15"
      >
        <!-- Groom Info -->
        <div
          ref="groomInfoRef"
          class="absolute flex flex-col items-center text-center px-6 w-full animate-fade"
          style="opacity: 0; pointer-events: none; transform: translateY(-15px)"
        >
          <!-- Title -->
          <span
            class="text-xs md:text-sm tracking-[0.3em] text-[#7A3E45] uppercase font-extrabold pb-1 border-b border-[#7A3E45] mb-3 md:mb-4"
            style="
              font-family: &quot;Cormorant Garamond&quot;, serif;
              position: relative;
              top: -25px;
              text-shadow:
                0 0 10px rgba(255, 255, 255, 0.95),
                0 0 20px rgba(255, 255, 255, 0.8),
                0 0 30px rgba(255, 255, 255, 0.6);
            "
          >
            The Groom
          </span>

          <!-- Groom Name -->
          <h2
            class="text-4xl md:text-6xl text-[#5A1E25] font-bold leading-none mb-2 md:mb-3"
            style="
              font-family: &quot;Great Vibes&quot;, cursive;
              text-shadow:
                0 0 10px rgba(255, 255, 255, 0.95),
                0 0 20px rgba(255, 255, 255, 0.8),
                0 0 30px rgba(255, 255, 255, 0.6);
            "
          >
            {{ invitation?.groom_name }}
          </h2>

          <!-- Groom Full Name -->
          <p
            class="text-sm md:text-lg tracking-[0.2em] text-[#5A1E25] uppercase font-bold mb-4 md:mb-6 max-w-[260px] md:max-w-[420px] mx-auto break-words whitespace-normal leading-relaxed"
            style="
              font-family: &quot;Cormorant Garamond&quot;, serif;
              text-shadow:
                0 0 8px rgba(255, 255, 255, 0.95),
                0 0 16px rgba(255, 255, 255, 0.8),
                0 0 24px rgba(255, 255, 255, 0.6);
            "
          >
            {{
              getSubName(invitation?.groom_full_name, invitation?.groom_name)
            }}
          </p>

          <!-- Parent Info -->
          <p
            v-if="invitation?.groom_father || invitation?.groom_mother"
            class="text-xs md:text-sm leading-relaxed text-[#7A3E45] font-semibold"
            style="
              font-family: &quot;Cormorant Garamond&quot;, serif;
              text-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
            "
          >
            Putra dari<br />
            <span
              v-if="invitation?.groom_father"
              class="font-bold text-[#5A1E25]"
              >Bapak {{ invitation?.groom_father }}</span
            >
            <br v-if="invitation?.groom_father && invitation?.groom_mother" />
            <span
              v-if="invitation?.groom_mother"
              class="font-bold text-[#5A1E25]"
              ><span v-if="invitation?.groom_father">&amp; </span>Ibu
              {{ invitation?.groom_mother }}</span
            >
          </p>
        </div>

        <!-- Bride Info -->
        <div
          ref="brideInfoRef"
          class="absolute flex flex-col items-center text-center px-6 w-full animate-fade"
          style="opacity: 0; pointer-events: none; transform: translateY(-15px)"
        >
          <!-- Title -->
          <span
            class="text-xs md:text-sm tracking-[0.3em] text-[#7A3E45] uppercase font-extrabold pb-1 border-b border-[#7A3E45] mb-3 md:mb-4"
            style="
              font-family: &quot;Cormorant Garamond&quot;, serif;
              position: relative;
              top: -25px;
              text-shadow:
                0 0 10px rgba(255, 255, 255, 0.95),
                0 0 20px rgba(255, 255, 255, 0.8),
                0 0 30px rgba(255, 255, 255, 0.6);
            "
          >
            The Bride
          </span>

          <!-- Bride Name -->
          <h2
            class="text-4xl md:text-6xl text-[#5A1E25] font-bold leading-none mb-2 md:mb-3"
            style="
              font-family: &quot;Great Vibes&quot;, cursive;
              text-shadow:
                0 0 10px rgba(255, 255, 255, 0.95),
                0 0 20px rgba(255, 255, 255, 0.8),
                0 0 30px rgba(255, 255, 255, 0.6);
            "
          >
            {{ invitation?.bride_name }}
          </h2>

          <!-- Bride Full Name -->
          <p
            class="text-sm md:text-lg tracking-[0.2em] text-[#5A1E25] uppercase font-bold mb-4 md:mb-6 max-w-[260px] md:max-w-[420px] mx-auto break-words whitespace-normal leading-relaxed"
            style="
              font-family: &quot;Cormorant Garamond&quot;, serif;
              text-shadow:
                0 0 8px rgba(255, 255, 255, 0.95),
                0 0 16px rgba(255, 255, 255, 0.8),
                0 0 24px rgba(255, 255, 255, 0.6);
            "
          >
            {{
              getSubName(invitation?.bride_full_name, invitation?.bride_name)
            }}
          </p>

          <!-- Parent Info -->
          <p
            v-if="invitation?.bride_father || invitation?.bride_mother"
            class="text-xs md:text-sm leading-relaxed text-[#7A3E45] font-semibold"
            style="
              font-family: &quot;Cormorant Garamond&quot;, serif;
              text-shadow: 0 0 6px rgba(255, 255, 255, 0.9);
            "
          >
            Putri dari<br />
            <span
              v-if="invitation?.bride_father"
              class="font-bold text-[#5A1E25]"
              >Bapak {{ invitation?.bride_father }}</span
            >
            <br v-if="invitation?.bride_father && invitation?.bride_mother" />
            <span
              v-if="invitation?.bride_mother"
              class="font-bold text-[#5A1E25]"
              ><span v-if="invitation?.bride_father">&amp; </span>Ibu
              {{ invitation?.bride_mother }}</span
            >
          </p>
        </div>
      </div>
    </div>

    <!-- Couple Content (fades in after bridge moves to center) -->
    <div
      v-if="false"
      ref="coupleContentRef"
      class="absolute inset-0 z-[13] flex flex-col items-center justify-center px-4 py-8 md:px-6 md:py-12"
      style="
        opacity: 0;
        pointer-events: none;
        transform: translateY(20px);
        will-change: transform, opacity;
      "
    >
      <div
        class="max-w-5xl w-full mx-auto flex flex-col justify-between h-full max-h-[85vh] md:max-h-[80vh]"
      >
        <!-- Section Header -->
        <div class="mb-4 md:mb-8 text-center">
          <h2
            class="text-3xl md:text-5xl mb-2 text-[#D9A9AF]"
            :style="{ fontFamily: themeConfig?.fontHeading }"
          >
            Mempelai
          </h2>
          <div class="flex items-center justify-center gap-4">
            <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4">
              <rect width="60" height="1.5" rx="0.75" fill="#AEB8A3" />
            </svg>
            <svg
              viewBox="0 0 24 24"
              class="w-4 h-4 md:w-5 md:h-5 text-[#D9A9AF]"
              style="opacity: 0.8"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
              />
            </svg>
            <svg viewBox="0 0 60 2" class="w-12 md:w-16" style="opacity: 0.4">
              <rect width="60" height="1.5" rx="0.75" fill="#AEB8A3" />
            </svg>
          </div>
        </div>

        <div
          class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 flex-1"
        >
          <!-- Groom -->
          <div class="flex-1 flex flex-col items-center">
            <!-- Photo with botanical frame -->
            <div
              class="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-4 md:mb-6"
            >
              <!-- Sage Green Ring with Leaf Details -->
              <svg
                viewBox="0 0 240 240"
                class="absolute inset-0 w-full h-full z-[2] pointer-events-none text-[#AEB8A3]"
              >
                <circle
                  cx="120"
                  cy="120"
                  r="114"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="110"
                  fill="none"
                  stroke="#D9A9AF"
                  stroke-width="1"
                  stroke-dasharray="4,4"
                />
                <circle
                  cx="120"
                  cy="6"
                  r="5"
                  fill="#EBCFD1"
                  stroke="#6A4E42"
                  stroke-width="1"
                />
                <circle
                  cx="120"
                  cy="234"
                  r="5"
                  fill="#EBCFD1"
                  stroke="#6A4E42"
                  stroke-width="1"
                />
                <circle
                  cx="6"
                  cy="120"
                  r="5"
                  fill="#EBCFD1"
                  stroke="#6A4E42"
                  stroke-width="1"
                />
                <circle
                  cx="234"
                  cy="120"
                  r="5"
                  fill="#EBCFD1"
                  stroke="#6A4E42"
                  stroke-width="1"
                />
              </svg>
              <!-- Photo -->
              <div
                class="absolute inset-[10px] rounded-full overflow-hidden z-[1]"
              >
                <img
                  v-if="invitation?.groom_photo"
                  :src="resolveAssetUrl(invitation?.groom_photo || '', apiBase)"
                  class="w-full h-full object-cover"
                  alt="Groom"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-3xl bg-[#EBCFD1] text-[#6A4E42]"
                >
                  👤
                </div>
              </div>
            </div>
            <h3
              class="text-xl sm:text-2xl md:text-3xl font-normal mb-1 md:mb-2 text-[#6A4E42]"
              :style="{ fontFamily: themeConfig?.fontHeading }"
            >
              {{ invitation?.groom_full_name || invitation?.groom_name }}
            </h3>
            <p
              v-if="invitation?.groom_father || invitation?.groom_mother"
              class="text-xs sm:text-sm md:text-base leading-relaxed text-[#9A7B6B]"
            >
              Putra dari<br />
              <span
                v-if="invitation?.groom_father"
                class="text-[#6A4E42] font-semibold"
                >Bapak {{ invitation?.groom_father }}</span
              >
              <span v-if="invitation?.groom_father && invitation?.groom_mother">
                &amp;
              </span>
              <span
                v-if="invitation?.groom_mother"
                class="text-[#6A4E42] font-semibold"
                >Ibu {{ invitation?.groom_mother }}</span
              >
            </p>
          </div>

          <!-- Divider -->
          <div class="hidden md:block my-2 md:my-0">
            <svg viewBox="0 0 60 80" class="w-10 md:w-16" style="opacity: 0.5">
              <line
                x1="30"
                y1="0"
                x2="30"
                y2="25"
                stroke="#AEB8A3"
                stroke-width="1"
                opacity="0.6"
              />
              <text
                x="30"
                y="52"
                text-anchor="middle"
                fill="#D9A9AF"
                font-size="36"
                :style="{ fontFamily: themeConfig?.fontHeading }"
              >
                &amp;
              </text>
              <line
                x1="30"
                y1="62"
                x2="30"
                y2="80"
                stroke="#AEB8A3"
                stroke-width="1"
                opacity="0.6"
              />
            </svg>
          </div>
          <div class="md:hidden text-lg font-semibold text-[#D9A9AF] my-1">
            &amp;
          </div>

          <!-- Bride -->
          <div class="flex-1 flex flex-col items-center">
            <!-- Photo with botanical frame -->
            <div
              class="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 mb-4 md:mb-6"
            >
              <svg
                viewBox="0 0 240 240"
                class="absolute inset-0 w-full h-full z-[2] pointer-events-none text-[#AEB8A3]"
              >
                <circle
                  cx="120"
                  cy="120"
                  r="114"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                />
                <circle
                  cx="120"
                  cy="120"
                  r="110"
                  fill="none"
                  stroke="#D9A9AF"
                  stroke-width="1"
                  stroke-dasharray="4,4"
                />
                <circle
                  cx="120"
                  cy="6"
                  r="5"
                  fill="#EBCFD1"
                  stroke="#6A4E42"
                  stroke-width="1"
                />
                <circle
                  cx="120"
                  cy="234"
                  r="5"
                  fill="#EBCFD1"
                  stroke="#6A4E42"
                  stroke-width="1"
                />
                <circle
                  cx="6"
                  cy="120"
                  r="5"
                  fill="#EBCFD1"
                  stroke="#6A4E42"
                  stroke-width="1"
                />
                <circle
                  cx="234"
                  cy="120"
                  r="5"
                  fill="#EBCFD1"
                  stroke="#6A4E42"
                  stroke-width="1"
                />
              </svg>
              <div
                class="absolute inset-[10px] rounded-full overflow-hidden z-[1]"
              >
                <img
                  v-if="invitation?.bride_photo"
                  :src="resolveAssetUrl(invitation?.bride_photo || '', apiBase)"
                  class="w-full h-full object-cover"
                  alt="Bride"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center text-3xl bg-[#EBCFD1] text-[#6A4E42]"
                >
                  👤
                </div>
              </div>
            </div>
            <h3
              class="text-xl sm:text-2xl md:text-3xl font-normal mb-1 md:mb-2 text-[#6A4E42]"
              :style="{ fontFamily: themeConfig?.fontHeading }"
            >
              {{ invitation?.bride_full_name || invitation?.bride_name }}
            </h3>
            <p
              v-if="invitation?.bride_father || invitation?.bride_mother"
              class="text-xs sm:text-sm md:text-base leading-relaxed text-[#9A7B6B]"
            >
              Putri dari<br />
              <span
                v-if="invitation?.bride_father"
                class="text-[#6A4E42] font-semibold"
                >Bapak {{ invitation?.bride_father }}</span
              >
              <span v-if="invitation?.bride_father && invitation?.bride_mother">
                &amp;
              </span>
              <span
                v-if="invitation?.bride_mother"
                class="text-[#6A4E42] font-semibold"
                >Ibu {{ invitation?.bride_mother }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import type { CSSProperties } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import type { ThemeConfig } from "@/types/theme";
import type { Invitation } from "@/types/invitation";
import { resolveAssetUrl } from "@/utils/url";
import { useSmoothScroll } from "@/composables/useSmoothScroll";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const props = defineProps<{
  overlayGradient: string;
  quote?: string;
  themeConfig?: ThemeConfig;
  invitation?: Invitation;
  apiBase?: string;
}>();

function getSubName(
  fullName: string | undefined,
  firstName: string | undefined,
): string {
  if (!fullName) return "";
  if (!firstName) return fullName;

  const cleanFull = fullName.trim();
  const cleanFirst = firstName.trim();

  if (cleanFull.toLowerCase().startsWith(cleanFirst.toLowerCase())) {
    return cleanFull.substring(cleanFirst.length).trim();
  }
  return cleanFull;
}

const heroSection = ref<HTMLElement | null>(null);
const heroContentContainer = ref<HTMLElement | null>(null);
const quoteCardRef = ref<HTMLElement | null>(null);
const bridgeRef = ref<HTMLElement | null>(null);
const coupleBgRef = ref<HTMLElement | null>(null);
const coupleContentRef = ref<HTMLElement | null>(null);
const coupleNamesRef = ref<HTMLElement | null>(null);

const bgLeavesRefs = ref<HTMLElement[]>([]);
const focusLeafRef = ref<HTMLElement | null>(null);
const focusLeafContainerRef = ref<HTMLElement | null>(null);
const focusLeafInnerRef = ref<HTMLElement | null>(null);
const leavesContainerRef = ref<HTMLElement | null>(null);
const groomInfoRef = ref<HTMLElement | null>(null);
const brideInfoRef = ref<HTMLElement | null>(null);

const { stop: stopScroll, start: startScroll } = useSmoothScroll();

let lockedScrollPos = 0;
let isLeafAnimating = false;

const handleScrollLock = () => {
  if (isLeafAnimating && triggerInstance) {
    window.scrollTo(0, lockedScrollPos);
  }
};

let scrollTl: gsap.core.Timeline | null = null;
let triggerInstance: ScrollTrigger | null = null;

let idleTween: gsap.core.Timeline | gsap.core.Tween | null = null;
let leafFlyInTl: gsap.core.Timeline | null = null;

function animateLeaf(leafEl: any, index: number, isInitial = false) {
  let scale, opacity, blurVal;
  if (index % 3 === 0) {
    scale = gsap.utils.random(0.15, 0.25);
    opacity = gsap.utils.random(0.2, 0.4);
    blurVal = 2;
  } else if (index % 3 === 1) {
    scale = gsap.utils.random(0.3, 0.4);
    opacity = gsap.utils.random(0.5, 0.7);
    blurVal = 0;
  } else {
    scale = gsap.utils.random(0.45, 0.6);
    opacity = gsap.utils.random(0.7, 0.9);
    blurVal = 0;
  }

  leafEl._originalScale = scale;
  leafEl._originalOpacity = opacity;

  const startXVal = isInitial ? gsap.utils.random(-10, 100) : -15;
  const startYVal = gsap.utils.random(10, 90);

  gsap.set(leafEl, {
    scale: scale,
    opacity: opacity,
    filter: blurVal > 0 ? `blur(${blurVal}px)` : "none",
    x: `${startXVal}vw`,
    y: `${startYVal}vh`,
    rotation: gsap.utils.random(0, 360),
    rotationZ: gsap.utils.random(0, 360),
  });

  const duration = gsap.utils.random(4, 8);
  const remainingFraction = isInitial ? (115 - startXVal) / 130 : 1;
  const adjustedDuration = duration * remainingFraction;

  const path = [];
  if (isInitial) {
    path.push({ x: `${startXVal}vw`, y: `${startYVal}vh` });
    if (startXVal < 40) {
      path.push({
        x: `${gsap.utils.random(40, 60)}vw`,
        y: `${startYVal + gsap.utils.random(-3, 3)}vh`,
      });
    }
    if (startXVal < 80) {
      path.push({
        x: `${gsap.utils.random(70, 90)}vw`,
        y: `${startYVal + gsap.utils.random(-3, 3)}vh`,
      });
    }
    path.push({ x: "115vw", y: `${startYVal + gsap.utils.random(-3, 3)}vh` });
  } else {
    path.push({ x: "-15vw", y: `${startYVal}vh` });
    path.push({
      x: `${gsap.utils.random(20, 40)}vw`,
      y: `${startYVal + gsap.utils.random(-3, 3)}vh`,
    });
    path.push({
      x: `${gsap.utils.random(60, 80)}vw`,
      y: `${startYVal + gsap.utils.random(-3, 3)}vh`,
    });
    path.push({ x: "115vw", y: `${startYVal + gsap.utils.random(-3, 3)}vh` });
  }

  const tween = gsap.to(leafEl, {
    motionPath: {
      path: path,
      curviness: 1.2,
      autoRotate: false,
    },
    duration: adjustedDuration,
    ease: "none",
    onComplete: () => {
      animateLeaf(leafEl, index, false);
    },
  });

  const rotTween = gsap.to(leafEl, {
    rotation: `+=${gsap.utils.random(180, 720)}`,
    rotationZ: `+=${gsap.utils.random(90, 360)}`,
    duration: adjustedDuration,
    ease: "sine.inOut",
  });

  leafEl._gsapTween = tween;
  leafEl._gsapRotTween = rotTween;
}

function startIdleAnimation() {
  if (idleTween) idleTween.kill();
  idleTween = gsap.timeline({ repeat: -1, yoyo: true });
  idleTween.to(focusLeafInnerRef.value, {
    x: 0, // stay centered
    y: "+=4",
    rotation: -32,
    duration: 2.5,
    ease: "sine.inOut",
  });
}

function stopIdleAnimation() {
  if (idleTween) {
    idleTween.kill();
    idleTween = null;
  }
}

onMounted(async () => {
  await nextTick();
  if (!heroSection.value) return;

  // Initialize background leaves
  bgLeavesRefs.value.forEach((leafEl, idx) => {
    animateLeaf(leafEl, idx, true);
  });

  let activated = false;
  let activateScrollAnimations = () => {};

  // --- BACKGROUND ENTRANCE ANIMATION VIA GSAP ---
  const semakKanan = heroSection.value.querySelector(".anim-semak-kanan");
  const semakKiri = heroSection.value.querySelector(".anim-semak-kiri");
  const pohonKanan = heroSection.value.querySelector(".anim-pohon-kanan");
  const pohonKiri = heroSection.value.querySelector(".anim-pohon-kiri");
  const flowers1 = heroSection.value.querySelectorAll(".pair-1");
  const flowers2 = heroSection.value.querySelectorAll(".pair-2");
  const flowers3 = heroSection.value.querySelectorAll(".pair-3");
  const cloudLeft = heroSection.value.querySelector(".cloud-anim-left");
  const cloudRight = heroSection.value.querySelector(".cloud-anim-right");

  // Set initial states in GSAP to match the CSS starting values exactly
  gsap.set([semakKanan, semakKiri], { y: 100, opacity: 0 });
  gsap.set(pohonKanan, { x: 350, rotation: -15, scale: 1, opacity: 0 });
  gsap.set(pohonKiri, { x: -350, rotation: 12, scale: 1, opacity: 0 });
  gsap.set(flowers1, { y: 200, rotation: 0, opacity: 0 });
  gsap.set(flowers2, { y: 200, rotation: 0, opacity: 0 });
  gsap.set(flowers3, { y: 200, rotation: 0, opacity: 0 });
  gsap.set(cloudLeft, { x: 250, opacity: 0 });
  gsap.set(cloudRight, { x: -250, opacity: 0 });

  // Semak Kanan & Kiri entry (delay 3.2s, duration 1.8s)
  gsap.to([semakKanan, semakKiri], {
    y: 0,
    opacity: (index) => (index === 0 ? 1 : 0.95),
    duration: 1.8,
    ease: "power2.out",
    delay: 3.2,
  });

  // Pohon Kanan entry (delay 3.2s, duration 2.5s)
  gsap.to(pohonKanan, {
    x: 0,
    rotation: -15,
    opacity: 0.95,
    duration: 2.5,
    ease: "power2.out",
    delay: 3.2,
    onComplete: () => {
      // Start sway animation
      gsap.to(pohonKanan, {
        rotation: -11,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
  });

  // Pohon Kiri entry (delay 4.5s, duration 2.5s)
  gsap.to(pohonKiri, {
    x: 0,
    rotation: 12,
    opacity: 0.9,
    duration: 2.5,
    ease: "power2.out",
    delay: 4.5,
    onComplete: () => {
      gsap.to(pohonKiri, {
        rotation: 8,
        duration: 4.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
  });

  // Flowers pair 1 (delay 3.8s, duration 2.2s)
  gsap.to(flowers1, {
    y: 0,
    rotation: 0,
    opacity: 1,
    duration: 2.2,
    ease: "power2.out",
    delay: 3.8,
    onComplete: () => {
      gsap.to(flowers1, {
        rotation: -4.5,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
  });

  // Flowers pair 2 (delay 4.4s, duration 2.2s)
  gsap.to(flowers2, {
    y: 0,
    rotation: 0,
    opacity: 1,
    duration: 2.2,
    ease: "power2.out",
    delay: 4.4,
    onComplete: () => {
      gsap.to(flowers2, {
        rotation: 4,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
  });

  // Flowers pair 3 (delay 5.0s, duration 2.2s)
  gsap.to(flowers3, {
    y: 0,
    rotation: 0,
    opacity: 1,
    duration: 2.2,
    ease: "power2.out",
    delay: 5.0,
    onComplete: () => {
      gsap.to(flowers3, {
        rotation: -3.5,
        duration: 4.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      // Activate scroll animations once entrance completes naturally
      if (scrollTl && !activated) {
        activateScrollAnimations();
      }
    },
  });

  // Cloud Left (delay 3.2s, duration 8s)
  gsap.to(cloudLeft, {
    x: 0,
    opacity: 1,
    duration: 8,
    ease: "power2.out",
    delay: 3.2,
    onComplete: () => {
      gsap.to(cloudLeft, {
        x: -8,
        y: -3,
        duration: 24,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
  });

  // Cloud Right (delay 3.2s, duration 8s)
  gsap.to(cloudRight, {
    x: 0,
    opacity: 1,
    duration: 8,
    ease: "power2.out",
    delay: 3.2,
    onComplete: () => {
      gsap.to(cloudRight, {
        x: 8,
        y: 3,
        duration: 28,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
  });

  const allFlowers = heroSection.value.querySelectorAll(".anim-flower");
  const fadeOutTargets = [
    semakKanan,
    semakKiri,
    ...Array.from(allFlowers),
  ].filter(Boolean);

  activateScrollAnimations = () => {
    if (activated) return;
    activated = true;

    // Stop entrance animations on y and opacity so they don't fight with the scrub timeline
    gsap.killTweensOf(fadeOutTargets, "y,opacity");

    if (scrollTl) {
      // Add the fade out tween to the timeline at the very beginning (position 0)
      scrollTl.to(
        fadeOutTargets,
        {
          opacity: 0,
          y: 200,
          ease: "power1.inOut",
          duration: 1,
        },
        0,
      );

      // Invalidate the timeline to record correct start values
      scrollTl.invalidate();
    }
  };

  // --- SCROLLTRIGGER PINNING TIMELINE ---
  if (props.quote) {
    scrollTl = gsap.timeline();

    // --- PHASE 1: HERO OUT ---
    scrollTl.to(heroContentContainer.value, {
      opacity: 0,
      y: "-8vh",
      ease: "power1.inOut",
      duration: 1,
    });

    // --- PHASE 2: QUOTE IN ---
    scrollTl.to(
      quoteCardRef.value,
      {
        opacity: 1,
        y: "0vh",
        ease: "power1.inOut",
        duration: 1,
        onUpdate: function () {
          const progress = this.progress();
          if (quoteCardRef.value) {
            if (progress > 0.5) {
              quoteCardRef.value.style.pointerEvents = "auto";
            } else {
              quoteCardRef.value.style.pointerEvents = "none";
            }
          }
        },
      },
      "-=0.5",
    );

    scrollTl.to(
      bridgeRef.value,
      {
        opacity: 1,
        y: 0,
        ease: "power1.inOut",
        duration: 1,
      },
      "-=1",
    );

    // Pause on quotes
    scrollTl.to({}, { duration: 1.2 });

    // --- PHASE 3: QUOTE OUT & COUPLE BG IN & BRIDGE SWIPE TO CENTER ---
    scrollTl.to(quoteCardRef.value, {
      opacity: 0,
      y: "0vh",
      ease: "power1.inOut",
      duration: 1,
      onComplete: () => {
        if (quoteCardRef.value) quoteCardRef.value.style.pointerEvents = "none";
      },
    });

    scrollTl.to(
      coupleBgRef.value,
      {
        opacity: 1,
        ease: "power1.inOut",
        duration: 1.2,
      },
      "-=0.8",
    );

    scrollTl.to(
      bridgeRef.value,
      {
        y: "-35dvh",
        scale: 1.5,
        ease: "power2.inOut",
        duration: 1.5,
      },
      "-=1.2",
    );

    scrollTl.to(
      leavesContainerRef.value,
      {
        opacity: 1,
        ease: "power1.inOut",
        duration: 1.2,
      },
      "-=1.2",
    );

    scrollTl.addLabel("coupleSectionFullyOpen");

    gsap.set(focusLeafContainerRef.value, {
      xPercent: -50,
      yPercent: -50,
    });

    // Define the real-time automatic leaf fly-in timeline
    leafFlyInTl = gsap.timeline({
      paused: true,
      onStart: () => {
        gsap.set(focusLeafContainerRef.value, { display: "flex" });
        gsap.set(coupleNamesRef.value, { display: "flex" });
        stopScroll();
        isLeafAnimating = true;
        if (triggerInstance) {
          const progress = (triggerInstance as any).progress;
          lockedScrollPos =
            (triggerInstance as any).start +
            ((triggerInstance as any).end - (triggerInstance as any).start) *
              progress;
          window.scrollTo(0, lockedScrollPos);
        }
        window.addEventListener("scroll", handleScrollLock, { passive: true });
      },
      onComplete: () => {
        startIdleAnimation();
        startScroll();
        isLeafAnimating = false;
        window.removeEventListener("scroll", handleScrollLock);
      },
      onReverseComplete: () => {
        stopIdleAnimation();
        gsap.set(focusLeafContainerRef.value, { display: "none" });
        gsap.set(coupleNamesRef.value, { display: "none" });
        startScroll();
        isLeafAnimating = false;
        window.removeEventListener("scroll", handleScrollLock);
      },
    });

    // Set initial position
    leafFlyInTl.set(focusLeafContainerRef.value, {
      xPercent: -50,
      yPercent: -50,
      x: "-100vw",
      y: "10vh",
      scale: 0.15,
      opacity: 0,
      filter: "blur(3px)",
    });
    leafFlyInTl.set(focusLeafInnerRef.value, {
      rotation: 120,
      rotationZ: 0,
    });
    leafFlyInTl.set([groomInfoRef.value, brideInfoRef.value], {
      opacity: 0,
    });

    // Animate leaf & name container flying from far left directly to center (position only)
    leafFlyInTl.to(focusLeafContainerRef.value, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      duration: 2.2, // slow duration
      ease: "power2.out",
    });

    // Animate scale, opacity, and blur with keyframes to make it stay small initially
    // and start zooming from the middle
    leafFlyInTl.to(
      focusLeafContainerRef.value,
      {
        keyframes: [
          {
            scale: 0.22,
            opacity: 0.4,
            filter: "blur(2px)",
            duration: 1.0,
            ease: "power1.in",
          },
          {
            scale: 1.1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power2.out",
          },
        ],
      },
      "<",
    );

    // Rotate the leaf during fly-in (rotating from 120 to 45, then to -35)
    leafFlyInTl.to(
      focusLeafInnerRef.value,
      {
        keyframes: [
          { rotation: 45, duration: 1.0, ease: "sine.inOut" },
          { rotation: -35, duration: 1.2, ease: "power2.out" },
        ],
      },
      "<",
    );

    // Fade in groom info on the leaf
    leafFlyInTl.to(
      groomInfoRef.value,
      {
        opacity: 1,
        duration: 0.8,
        ease: "power1.out",
      },
      "-=0.6",
    );

    // Trigger leaf fly-in automatically when the couple section is fully open!
    scrollTl.call(
      () => {
        const isBackward = triggerInstance && triggerInstance.direction === -1;
        if (isBackward) {
          if (leafFlyInTl) {
            isLeafAnimating = true;
            stopScroll();
            if (triggerInstance) {
              const progress = (triggerInstance as any).progress;
              lockedScrollPos =
                (triggerInstance as any).start +
                ((triggerInstance as any).end -
                  (triggerInstance as any).start) *
                  progress;
              window.scrollTo(0, lockedScrollPos);
            }
            window.addEventListener("scroll", handleScrollLock, {
              passive: true,
            });
            leafFlyInTl.reverse();
            stopIdleAnimation();
          }
        } else {
          if (leafFlyInTl) {
            isLeafAnimating = true;
            stopScroll();
            if (triggerInstance) {
              const progress = (triggerInstance as any).progress;
              lockedScrollPos =
                (triggerInstance as any).start +
                ((triggerInstance as any).end -
                  (triggerInstance as any).start) *
                  progress;
              window.scrollTo(0, lockedScrollPos);
            }
            window.addEventListener("scroll", handleScrollLock, {
              passive: true,
            });
            leafFlyInTl.play(0);
          }
        }
      },
      undefined,
      "coupleSectionFullyOpen",
    );

    // Add a pause of 0.8 scroll duration to let the user scroll while seeing the Groom info
    scrollTl.to({}, { duration: 0.8 });

    // Ensure leafFlyInTl is complete before starting the fade-out
    scrollTl.call(() => {
      const isBackward = triggerInstance && triggerInstance.direction === -1;
      if (!isBackward && leafFlyInTl) {
        leafFlyInTl.progress(1);
      }
    });

    // Groom Info fades out on scroll
    scrollTl.to(groomInfoRef.value, {
      opacity: 0,
      duration: 0.6,
      ease: "power1.inOut",
    });

    // Bride Info fades in on scroll (crossfading for faster transition)
    scrollTl.to(
      brideInfoRef.value,
      {
        opacity: 1,
        duration: 0.6,
        ease: "power1.inOut",
      },
      "-=0.2",
    );

    // Pause on bride info
    scrollTl.to({}, { duration: 0.8 });

    // After showing the bride info, Bride Info fades out and leaf flies to the right
    scrollTl.to(brideInfoRef.value, {
      opacity: 0,
      duration: 0.6,
      ease: "power1.inOut",
    });

    scrollTl.to(
      focusLeafContainerRef.value,
      {
        xPercent: -50,
        yPercent: -50,
        x: "100vw",
        y: "-10vh",
        scale: 0.15,
        opacity: 0,
        filter: "blur(3px)",
        duration: 1.2,
        ease: "power1.inOut",
        onStart: () => {
          stopIdleAnimation();
        },
        onReverseComplete: () => {
          startIdleAnimation();
        },
      },
      "<",
    );

    scrollTl.to(
      focusLeafInnerRef.value,
      {
        rotation: 120,
        duration: 1.2,
        ease: "power1.inOut",
      },
      "<",
    );

    // Final pause of couple section exit transition
    scrollTl.to({}, { duration: 0.8 });

    triggerInstance = ScrollTrigger.create({
      trigger: heroSection.value,
      start: "top top",
      end: "+=450%", // Increased scroll distance to accommodate the exit fly-off phase smoothly
      pin: true,
      scrub: 1.2, // Smooth scrub linked to scrollbar
      animation: scrollTl,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        // If the user starts scrolling (scrolled past 20px), activate the animations immediately
        if (!activated && self.scroll() > 20) {
          activateScrollAnimations();
        }
      },
      onToggle: (self) => {
        if (self.isActive) {
          resumeBackgroundAnimations();
        } else {
          pauseBackgroundAnimations();
        }
      },
    });
  }
});

function pauseBackgroundAnimations() {
  bgLeavesRefs.value.forEach((leaf: any) => {
    if (leaf._gsapTween) leaf._gsapTween.pause();
    if (leaf._gsapRotTween) leaf._gsapRotTween.pause();
  });
}

function resumeBackgroundAnimations() {
  bgLeavesRefs.value.forEach((leaf: any) => {
    if (leaf._gsapTween) leaf._gsapTween.resume();
    if (leaf._gsapRotTween) leaf._gsapRotTween.resume();
  });
}

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScrollLock);
  if (scrollTl) scrollTl.kill();
  if (triggerInstance) triggerInstance.kill();
  if (leafFlyInTl) leafFlyInTl.kill();
  // Kill entry animations and sway loops
  const elements = heroSection.value?.querySelectorAll(
    ".decor-asset, .cloud-anim-left, .cloud-anim-right",
  );
  if (elements) {
    elements.forEach((el) => gsap.killTweensOf(el));
  }
  if (bridgeRef.value) gsap.killTweensOf(bridgeRef.value);
  if (coupleBgRef.value) gsap.killTweensOf(coupleBgRef.value);
  if (coupleContentRef.value) gsap.killTweensOf(coupleContentRef.value);
  if (coupleNamesRef.value) gsap.killTweensOf(coupleNamesRef.value);

  // Kill leaf animations
  if (bgLeavesRefs.value) {
    bgLeavesRefs.value.forEach((leaf: any) => {
      if (leaf._gsapTween) leaf._gsapTween.kill();
      if (leaf._gsapRotTween) leaf._gsapRotTween.kill();
    });
  }
  if (idleTween) idleTween.kill();
});

/**
 * =========================================================================
 * CENTRALIZED DECORATIVE ASSETS CONFIGURATION
 * =========================================================================
 * You can easily customize the position, size, rotation, scale, z-index,
 * and visibility of each asset by editing the properties below.
 * =========================================================================
 */
interface DecorativeAsset {
  name: string;
  src: string;
  className: string;
  style: CSSProperties;
}

const DECORATIVE_ASSETS: DecorativeAsset[] = [
  {
    name: "gazebo",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_48c13914-302a-45a6-88af-b607ce04cb6c.webp",
    className: "anim-static",
    style: {
      position: "absolute",
      bottom: "270px",
      right: "-80px",
      width: "180px",
      zIndex: 5,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "pohon ijo",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_3eb9571f-8d1d-4713-917e-c16867e656a1.webp",
    className: "anim-static",
    style: {
      position: "absolute",
      bottom: "240px",
      right: "100px",
      width: "50px",
      zIndex: 5,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "tanah",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_7cc65aec-b5b2-48a7-8ebe-a4cb6c798b50.webp",
    className: "anim-static",
    style: {
      position: "absolute",
      bottom: "70px",
      right: "-10px",
      width: "230px",
      zIndex: 5,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "semak kanan",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_b2bc00e4-6742-443a-a73b-1f5c4db4b7f1.webp",
    className: "anim-semak-kanan",
    style: {
      position: "absolute",
      bottom: "0",
      right: "0",
      width: "200px",
      zIndex: 5,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "semak kiri",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_4553fba2-ed12-47a5-9137-ac646642cc15.webp",
    className: "anim-semak-kiri",
    style: {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "200px",
      zIndex: 4,
      opacity: 0.95,
      pointerEvents: "none",
    },
  },
  {
    name: "pohon kanan",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_05679a4e-ee34-4138-85f9-528f6f06630e.webp",
    className: "anim-pohon-kanan",
    style: {
      position: "absolute",
      top: "16%",
      right: "-240px",
      width: "300px",
      "--base-transform": "rotate(-15deg) scale(1)",
      zIndex: 5,
      opacity: 0.95,
      pointerEvents: "none",
    } as CSSProperties,
  },
  {
    name: "pohon kiri",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_efe194b7-b4cb-46c1-ab20-28d9fc85e3f5.webp",
    className: "anim-pohon-kiri",
    style: {
      position: "absolute",
      bottom: "30%",
      left: "-30%",
      width: "210px",
      "--base-transform": "rotate(12deg) scale(1)",
      zIndex: 5,
      opacity: 0.9,
      pointerEvents: "none",
    } as CSSProperties,
  },
  {
    name: "bunga 1",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_99b2b330-5fbc-48e5-ab76-94f3d595c6b1.webp",
    className: "anim-flower pair-1",
    style: {
      position: "absolute",
      bottom: "50px",
      left: "-9%",
      width: "100px",
      zIndex: 6,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "bunga 2",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_90a53a4b-4dce-4779-a421-1c48ca4b7f93.webp",
    className: "anim-flower pair-3",
    style: {
      position: "absolute",
      bottom: "-40px",
      left: "13%",
      width: "120px",
      zIndex: 6,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "bunga 2",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_90a53a4b-4dce-4779-a421-1c48ca4b7f93.webp",
    className: "anim-flower pair-2",
    style: {
      position: "absolute",
      bottom: "-40px",
      right: "-4%",
      width: "120px",
      zIndex: 7,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "bunga 3",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_373980a6-6fcb-4798-bba7-cd4e9c6eea5b.webp",
    className: "anim-flower pair-2",
    style: {
      position: "absolute",
      bottom: "-20px",
      left: "-7%",
      width: "120px",
      zIndex: 6,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "bunga 4",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_06344b3b-a7d2-46b4-8a7a-9f1f34a40033.webp",
    className: "anim-flower pair-1",
    style: {
      position: "absolute",
      bottom: "20px",
      right: "-7%",
      width: "120px",
      zIndex: 6,
      opacity: 1,
      pointerEvents: "none",
    },
  },
  {
    name: "bunga 3",
    src: "https://media.mengundanganda.com/fairygarden/hero%20section/dewirandi_373980a6-6fcb-4798-bba7-cd4e9c6eea5b.webp",
    className: "anim-flower pair-3",
    style: {
      position: "absolute",
      bottom: "-70px",
      right: "17%",
      width: "120px",
      zIndex: 6,
      opacity: 1,
      pointerEvents: "none",
    },
  },
];
</script>

<style scoped>
.bg-cliff-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
  pointer-events: none;
}

/* Base configuration for decorative assets */
.decor-asset {
  opacity: 0;
  transform-origin: bottom center;
}

/* Pohon Kanan slide from right + sway */
.anim-pohon-kanan {
  transform-origin: bottom right;
  --base-transform: rotate(-15deg) scale(1);
  transform: translateX(350px) var(--base-transform);
}

/* Pohon Kiri slide from left + sway */
.anim-pohon-kiri {
  transform-origin: bottom left;
  --base-transform: rotate(12deg) scale(1);
  transform: translateX(-350px) var(--base-transform);
}

/* Ground layers entry */
.decor-asset.anim-static {
  opacity: 1 !important;
  transform: none !important;
}

.anim-semak-kanan {
  transform: translateY(100px);
}

.anim-semak-kiri {
  transform: translateY(100px);
}

/* Flowers entry & sway animations */
.anim-flower {
  transform-origin: bottom center;
  transform: translateY(200px);
}

/* Keyframes for Tree Swaying (Wind Effect) */
@keyframes sway-kanan {
  0% {
    transform: rotate(-15deg) scale(1);
  }
  100% {
    transform: rotate(-11deg) scale(1);
  }
}

@keyframes sway-kiri {
  0% {
    transform: rotate(12deg) scale(1);
  }
  100% {
    transform: rotate(8deg) scale(1);
  }
}

@keyframes sway-general {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(3.5deg);
  }
}

/* Keyframes for Flower Swaying */
@keyframes sway-flower-p1 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-4.5deg);
  }
}

@keyframes sway-flower-p2 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(4deg);
  }
}

@keyframes sway-flower-p3 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-3.5deg);
  }
}

/* ========================================================= */
/* DYNAMIC WATERFALL ANIMATION OVERLAY                        */
/* ========================================================= */
.waterfall-container {
  position: absolute;
  top: 23%;
  left: 43%; /* Shifted right to match the background waterfall */
  width: 23%;
  height: 44%;
  z-index: 3;
  pointer-events: none;
  clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
  overflow: visible;
  filter: url(#waterfall-distortion);
  mask-image: radial-gradient(ellipse at 50% 45%, black 20%, transparent 85%);
  -webkit-mask-image: radial-gradient(
    ellipse at 50% 45%,
    black 20%,
    transparent 85%
  );
  opacity: 0.85; /* Increased opacity to highlight the falling waves */
  transform: rotate(3deg);
  transform-origin: top center;
}

.waterfall-stream {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: screen; /* Changed to screen for brighter, more pronounced highlights */
}

.stream-1 {
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.35) 15%,
    rgba(255, 255, 255, 0.7) 25%,
    rgba(255, 255, 255, 0.75) 35%,
    rgba(255, 255, 255, 0.35) 45%,
    rgba(255, 255, 255, 0) 60%
  );
  background-size: 100% 220px;
  animation: waterfall-flow-down 8s linear infinite; /* Slower, more elegant flow */
}

.stream-2 {
  background: repeating-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.25) 20%,
    rgba(255, 255, 255, 0.5) 35%,
    rgba(255, 255, 255, 0.55) 45%,
    rgba(255, 255, 255, 0.25) 60%,
    rgba(255, 255, 255, 0) 80%
  );
  background-size: 100% 300px;
  transform: scaleX(-1);
  animation: waterfall-flow-down 12s linear infinite; /* Slower secondary flow */
}

@keyframes waterfall-flow-down {
  0% {
    background-position-y: 0px;
  }
  100% {
    background-position-y: 1000px;
  }
}

/* Mist Particles at the bottom */
.waterfall-mist-container {
  position: absolute;
  bottom: -15px;
  left: -10%;
  width: 120%;
  height: 40px;
  pointer-events: none;
}

.mist-particle {
  position: absolute;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  filter: blur(10px);
  opacity: 0;
}

/* Staggered Mist Semburan */
.mist-1 {
  left: 10%;
  width: 35px;
  height: 35px;
  animation: mist-rise-up 2.2s ease-out infinite;
  animation-delay: 0.1s;
}
.mist-2 {
  left: 23%;
  width: 28px;
  height: 28px;
  animation: mist-rise-up 1.8s ease-out infinite;
  animation-delay: 0.5s;
}
.mist-3 {
  left: 38%;
  width: 32px;
  height: 32px;
  animation: mist-rise-up 2.5s ease-out infinite;
  animation-delay: 0.9s;
}
.mist-4 {
  left: 50%;
  width: 40px;
  height: 40px;
  animation: mist-rise-up 2.1s ease-out infinite;
  animation-delay: 0.3s;
}
.mist-5 {
  left: 62%;
  width: 25px;
  height: 25px;
  animation: mist-rise-up 1.9s ease-out infinite;
  animation-delay: 1.2s;
}
.mist-6 {
  left: 75%;
  width: 30px;
  height: 30px;
  animation: mist-rise-up 2.4s ease-out infinite;
  animation-delay: 0.7s;
}
.mist-7 {
  left: 88%;
  width: 36px;
  height: 36px;
  animation: mist-rise-up 2s ease-out infinite;
  animation-delay: 1.5s;
}
.mist-8 {
  left: 45%;
  width: 32px;
  height: 32px;
  animation: mist-rise-up 2.3s ease-out infinite;
  animation-delay: 1.8s;
}

@keyframes mist-rise-up {
  0% {
    transform: translateY(15px) scale(0.6);
    opacity: 0;
  }
  30% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-25px) scale(1.7);
    opacity: 0;
  }
}

/* Cloud Animations */
.cloud-anim-left {
  opacity: 0;
  transform: translateX(250px);
}

.cloud-anim-right {
  opacity: 0;
  transform: translateX(-250px);
}

@keyframes cloud-left-entry {
  0% {
    opacity: 0;
    transform: translateX(250px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes cloud-float-left {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(-8px, -3px);
  }
  100% {
    transform: translate(4px, 3px);
  }
}

@keyframes cloud-right-entry {
  0% {
    opacity: 0;
    transform: translateX(-250px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes cloud-right-float {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(8px, 3px);
  }
  100% {
    transform: translate(-4px, -3px);
  }
}

/* Waterfall Bottom Fog/Mist Animations */
.waterfall-fog-container {
  position: absolute;
  top: 60%;
  left: 38%;
  width: 32%;
  height: 120px;
  z-index: 3;
  pointer-events: none;
  overflow: visible;
}

.fog-layer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(255, 255, 255, 0.4) 55%,
    rgba(255, 255, 255, 0) 80%
  );
  filter: blur(22px);
  border-radius: 50%;
  transform-origin: center center;
  will-change: transform;
  contain: layout style;
}

.fog-1 {
  animation: roll-fog-1 25s ease-in-out infinite alternate;
  opacity: 0.9;
}

.fog-2 {
  animation: roll-fog-2 30s ease-in-out infinite alternate;
  opacity: 0.8;
  filter: blur(30px);
  height: 80%;
  bottom: 10px;
}

.fog-3 {
  animation: roll-fog-3 20s ease-in-out infinite alternate;
  opacity: 0.85;
  filter: blur(22px);
  height: 60%;
  bottom: -5px;
}

@keyframes roll-fog-1 {
  0% {
    transform: translate(-15px, 0) scale(1);
  }
  50% {
    transform: translate(20px, -5px) scale(1.15);
  }
  100% {
    transform: translate(-8px, 6px) scale(0.95);
  }
}

@keyframes roll-fog-2 {
  0% {
    transform: translate(20px, 6px) scale(0.85);
  }
  50% {
    transform: translate(-15px, -3px) scale(1.2);
  }
  100% {
    transform: translate(8px, 10px) scale(0.95);
  }
}

@keyframes roll-fog-3 {
  0% {
    transform: translate(8px, -10px) scale(1.1);
  }
  50% {
    transform: translate(-20px, 5px) scale(0.85);
  }
  100% {
    transform: translate(15px, -3px) scale(1.15);
  }
}

/* Scenic backdrop entry zoom-fade and blur */
.hero-scenic-backdrop {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  transform: scale(0.88);
  filter: blur(12px);
  opacity: 0;
  animation: hero-backdrop-zoom-in 3.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes hero-backdrop-zoom-in {
  0% {
    transform: scale(0.88);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    filter: blur(0);
    opacity: 1;
  }
}

/* Fairytale Theme Quote Card & Container styling */
.fairytale-quote-container {
  box-sizing: border-box;
}

.fairytale-quote-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;
  width: 100%;
  max-width: none;
  height: 100%;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: none;
  border-radius: 0;
  box-shadow: inset 0 0 12px rgba(255, 255, 255, 0.2);
  padding: 40px 48px;
  position: relative;
  z-index: 1;
}

.quote-decor-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  object-fit: contain;
  z-index: 0;
  pointer-events: none;
}
</style>
