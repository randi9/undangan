<template>
  <section
    ref="coupleSection"
    class="relative w-full overflow-hidden box-border"
    :style="{
      background: '#F4EDE0',
      fontFamily: themeConfig?.fontBody || `'Plus Jakarta Sans', sans-serif`,
      minHeight: '100dvh',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
    }"
  >
    <!-- Background Decor -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-[#CDE0F2]/50 rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/3 -right-20 w-96 h-96 bg-[#A7C7E7]/40 rounded-full blur-3xl"></div>
      <div class="absolute top-12 left-10 text-[#D4AF37] text-xl opacity-30">✦</div>
      <div class="absolute bottom-16 right-10 text-[#D4AF37] text-lg opacity-30">✧</div>
    </div>

    <!-- Judul section -->
    <div ref="headerRef" class="relative z-10 w-full flex flex-col items-center text-center px-4" style="margin-top: 28px; padding-top: 8px; padding-bottom: 4px;">
      <h2
        class="text-[#1E354D] leading-tight"
        :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive`, fontSize: 'clamp(36px, 9vw, 60px)', fontWeight: 700, letterSpacing: '0.01em', margin: 0 }"
      >
        The Happy Couple
      </h2>
      <!-- step dots: 0 foto / 1 groom / 2 bride -->
      <div class="flex items-center gap-1.5 mt-3">
        <span :style="{ width: '20px', height: '4px', borderRadius: '999px', background: phase === 0 ? '#386B99' : '#CDE0F2', transition: 'all .3s' }"></span>
        <span :style="{ width: '20px', height: '4px', borderRadius: '999px', background: phase === 1 ? '#386B99' : '#CDE0F2', transition: 'all .3s' }"></span>
        <span :style="{ width: '20px', height: '4px', borderRadius: '999px', background: phase === 2 ? '#386B99' : '#CDE0F2', transition: 'all .3s' }"></span>
      </div>
    </div>

    <!-- Horizontal Viewport (100vw, overflow hidden) -->
    <div
      ref="viewportRef"
      style="position: relative; z-index: 10; width: 100vw; flex: 1; overflow: hidden; display: flex; align-items: center;"
    >
      <!-- Track 200vw : [bride 50vw][foto 100vw][groom 50vw], start tengah -->
      <div ref="trackRef" style="display: flex; flex-direction: row; align-items: stretch; width: 200vw; height: 100%; will-change: transform; flex-shrink: 0;">
        <!-- BRIDE panel kiri : tanpa container, sebar vertikal -->
        <div style="width: 50vw; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; box-sizing: border-box; flex-shrink: 0; padding: 0 10px 0 20px; overflow: hidden;">
          <div ref="brideInfoRef" style="position: relative; width: 100%; height: auto; max-height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 26px; align-items: flex-end; text-align: right;">
            <div>
              <p style="margin: 0; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #386B99; font-weight: 700;">Mempelai Wanita</p>
              <p v-if="invitation.bride_origin" style="margin: 6px 0 0 0; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #7DA8CC; font-weight: 600;">{{ invitation.bride_origin }}</p>
            </div>
            <div>
              <div style="width: 36px; height: 2px; background: #D4AF37; margin: 0 0 10px auto; border-radius: 2px;"></div>
              <h3 style="margin: 0; color: #1E354D; font-weight: 700; line-height: 1.05; font-size: clamp(24px, 6.5vw, 54px); overflow-wrap: break-word;"
                :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }">
                {{ invitation.bride_name || invitation.bride_full_name }}
              </h3>
              <p v-if="invitation.bride_full_name" style="margin: 8px 0 0 0; font-size: 11px; letter-spacing: 0.08em; color: #1E354D; font-weight: 600;">{{ invitation.bride_full_name }}</p>
            </div>
            <div>
              <p style="margin: 0; font-size: 11px; line-height: 1.7; color: #5B7B99;">Putri dari<br /><strong style="color: #1E354D;">{{ invitation.bride_father || '-' }}</strong><br />&amp; <strong style="color: #1E354D;">{{ invitation.bride_mother || '-' }}</strong></p>
            </div>
          </div>
        </div>

        <!-- FOTO tengah : full, tanpa container -->
        <div style="width: 100vw; height: 100%; display: flex; align-items: center; justify-content: center; padding: 0; margin: 0; box-sizing: border-box; flex-shrink: 0;">
          <div ref="imageWrapRef" style="position: relative; width: 100%; will-change: transform;">
            <!-- LOVE 1: container foto — foto di-clip di dalam hati, ikut rotate, tidak bisa keluar -->
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              :style="{
                position: 'absolute',
                top: love1.top + '%',
                left: love1.left + '%',
                width: love1.size + '%',
                height: 'auto',
                aspectRatio: '1 / 1',
                transform: 'translate(-50%, -50%) rotate(' + love1.rotate + 'deg)',
                transformOrigin: 'center center',
                opacity: love1.opacity,
                zIndex: 2,
                pointerEvents: 'none',
              }"
            >
              <defs>
                <clipPath id="loveClip1">
                  <path d="M10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Q12 22.5 10.55 20.03z" />
                </clipPath>
              </defs>
              <!-- alas hati (kelihatan saat foto loading) -->
              <path d="M10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Q12 22.5 10.55 20.03z" fill="#a7cceb" />
              <!-- foto di dalam hati kiri: base default + overlay bride (crossfade halus) -->
              <image
                :href="PHOTO_LEFT"
                :x="12 - 12 * love1.imgZoom + love1.imgX"
                :y="12 - 12 * love1.imgZoom + love1.imgY"
                :width="24 * love1.imgZoom"
                :height="24 * love1.imgZoom"
                preserveAspectRatio="xMidYMid meet"
                clip-path="url(#loveClip1)"
                opacity="1"
              />
              <image
                v-if="brideUrl"
                :href="brideUrl"
                :x="12 - 12 * love1.userImgZoom + love1.userImgX"
                :y="12 - 12 * love1.userImgZoom + love1.userImgY"
                :width="24 * love1.userImgZoom"
                :height="24 * love1.userImgZoom"
                preserveAspectRatio="xMidYMid meet"
                clip-path="url(#loveClip1)"
                :style="{
                  opacity: phase === 2 ? 1 : 0,
                  transform: phase === 2 ? 'scale(1)' : 'scale(1.08)',
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  transition: 'opacity 0.9s ease, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }"
              />
            </svg>
            <!-- LOVE 2: container foto kanan — sama seperti kiri -->
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              :style="{
                position: 'absolute',
                top: love2.top + '%',
                left: love2.left + '%',
                width: love2.size + '%',
                height: 'auto',
                aspectRatio: '1 / 1',
                transform: 'translate(-50%, -50%) rotate(' + love2.rotate + 'deg)',
                transformOrigin: 'center center',
                opacity: love2.opacity,
                zIndex: 2,
                pointerEvents: 'none',
              }"
            >
              <defs>
                <clipPath id="loveClip2">
                  <path d="M10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Q12 22.5 10.55 20.03z" />
                </clipPath>
              </defs>
              <path d="M10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54Q12 22.5 10.55 20.03z" fill="#a7cceb" />
              <!-- foto kanan: base default + overlay groom (crossfade halus) -->
              <image
                :href="PHOTO_RIGHT"
                :x="12 - 12 * love2.imgZoom + love2.imgX"
                :y="12 - 12 * love2.imgZoom + love2.imgY"
                :width="24 * love2.imgZoom"
                :height="24 * love2.imgZoom"
                preserveAspectRatio="xMidYMid meet"
                clip-path="url(#loveClip2)"
                opacity="1"
              />
              <image
                v-if="groomUrl"
                :href="groomUrl"
                :x="12 - 12 * love2.userImgZoom + love2.userImgX"
                :y="12 - 12 * love2.userImgZoom + love2.userImgY"
                :width="24 * love2.userImgZoom"
                :height="24 * love2.userImgZoom"
                preserveAspectRatio="xMidYMid meet"
                clip-path="url(#loveClip2)"
                :style="{
                  opacity: phase === 1 ? 1 : 0,
                  transform: phase === 1 ? 'scale(1)' : 'scale(1.08)',
                  transformBox: 'fill-box',
                  transformOrigin: 'center',
                  transition: 'opacity 0.9s ease, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
                }"
              />
            </svg>
            <img
              :src="PHOTO"
              alt="Mempelai"
              draggable="false"
              @load="onImgLoad"
              style="width: 100%; height: auto; display: block; user-select: none;"
            />
          </div>
        </div>

        <!-- GROOM panel kanan : tanpa container, sebar vertikal -->
        <div style="width: 50vw; height: 100%; position: relative; display: flex; align-items: center; justify-content: center; box-sizing: border-box; flex-shrink: 0; padding: 0 20px 0 10px; overflow: hidden;">
          <div ref="groomInfoRef" style="position: relative; width: 100%; height: auto; max-height: 100%; display: flex; flex-direction: column; justify-content: center; gap: 26px; align-items: flex-start; text-align: left;">
            <div>
              <p style="margin: 0; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #386B99; font-weight: 700;">Mempelai Pria</p>
              <p v-if="invitation.groom_origin" style="margin: 6px 0 0 0; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #7DA8CC; font-weight: 600;">{{ invitation.groom_origin }}</p>
            </div>
            <div>
              <div style="width: 36px; height: 2px; background: #D4AF37; margin: 0 0 10px 0; border-radius: 2px;"></div>
              <h3 style="margin: 0; color: #1E354D; font-weight: 700; line-height: 1.05; font-size: clamp(24px, 6.5vw, 54px); overflow-wrap: break-word;"
                :style="{ fontFamily: themeConfig?.fontHeading || `'Caveat', cursive` }">
                {{ invitation.groom_name || invitation.groom_full_name }}
              </h3>
              <p v-if="invitation.groom_full_name" style="margin: 8px 0 0 0; font-size: 11px; letter-spacing: 0.08em; color: #1E354D; font-weight: 600;">{{ invitation.groom_full_name }}</p>
            </div>
            <div>
              <p style="margin: 0; font-size: 11px; line-height: 1.7; color: #5B7B99;">Putra dari<br /><strong style="color: #1E354D;">{{ invitation.groom_father || '-' }}</strong><br />&amp; <strong style="color: #1E354D;">{{ invitation.groom_mother || '-' }}</strong></p>
            </div>
          </div>
        </div>
      </div>
      <div style="position: absolute; left: 50%; bottom: 12px; transform: translateX(-50%); z-index: 20; display: flex; flex-direction: column; align-items: center; gap: 2px; pointer-events: none;">
        <p style="margin: 0; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #fff; text-shadow: 0 1px 8px rgba(0,0,0,0.5);">Scroll ke bawah</p>
        <div style="font-size: 16px; color: #fff; text-shadow: 0 1px 8px rgba(0,0,0,0.5); animation: couple-bounce 1.4s infinite;">↓</div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Invitation } from "@/types/invitation";
import type { ThemeConfig } from "@/types/theme";
import { resolveAssetUrl } from "@/utils/url";

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  invitation: Invitation;
  themeConfig?: ThemeConfig;
  apiBase?: string;
}>();

const PHOTO =
  "https://media.mengundanganda.com/haneul/couple%20section/dewirandi_ec1a2e80-b7c3-4aec-8bb8-24e1dc4372a5.webp";
const PHOTO_LEFT =
  "https://media.mengundanganda.com/haneul/couple%20section/dewirandi_fe46cff2-0503-4a20-9600-51fe64d56629.webp";
const PHOTO_RIGHT =
  "https://media.mengundanganda.com/haneul/couple%20section/dewirandi_828bb61e-7cec-4883-964a-b01f09c55371.webp";

// ===== LOVE 1 = CONTAINER FOTO (gampang disetel) =====
// size/top/left/rotate = posisi hati
// imgX/imgY/imgZoom = foto DEFAULT | userImgX/userImgY/userImgZoom = foto UPLOAD user
const love1 = { size: 38, top: 54, left: 31.5, rotate: -19, opacity: 1, imgX: 0, imgY: 5, imgZoom: 1.2, userImgX: 0, userImgY: 2, userImgZoom: 1.2 };
const love2 = { size: 38, top: 54, left: 69.5, rotate: 17, opacity: 1, imgX: 0, imgY: 5, imgZoom: 1.2, userImgX: 0, userImgY: 2, userImgZoom: 1.2 };

const coupleSection = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const viewportRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const imageWrapRef = ref<HTMLElement | null>(null);
const groomInfoRef = ref<HTMLElement | null>(null);
const brideInfoRef = ref<HTMLElement | null>(null);
const phase = ref(0);

// ===== FOTO LOVE DINAMIS IKUT SCROLL =====
// kiri hanya ganti saat bride (phase 2), kanan hanya ganti saat groom (phase 1)
// kalau user tidak upload → tetap default
const brideUrl = computed(() => resolveAssetUrl(props.invitation?.bride_photo, props.apiBase ?? ""));
const groomUrl = computed(() => resolveAssetUrl(props.invitation?.groom_photo, props.apiBase ?? ""));

let ctx: gsap.Context | null = null;

const onImgLoad = () => {
  ScrollTrigger.refresh();
};

onMounted(() => {
  if (!coupleSection.value || !trackRef.value) return;

  ctx = gsap.context(() => {
    // posisi awal: tengah (foto), info hide
    gsap.set(trackRef.value, { xPercent: -25 });
    gsap.set(groomInfoRef.value, { opacity: 0, x: 60 });
    gsap.set(brideInfoRef.value, { opacity: 0, x: -60 });

    if (headerRef.value) {
      gsap.fromTo(
        headerRef.value,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: coupleSection.value, start: "top 85%" },
        }
      );
    }

    // pin + scrub: tengah -> geser kiri (groom kanan) -> geser kanan (bride kiri)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: coupleSection.value,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          phase.value = self.progress < 0.3 ? 0 : self.progress < 0.8 ? 1 : 2;
        },
      },
    });

    // 1) geser ke kiri: foto jadi setengah + groom muncul kanan
    tl.to(trackRef.value, { xPercent: -50, ease: "none", duration: 1 }, 0);
    tl.fromTo(
      groomInfoRef.value,
      { opacity: 0, x: 60 },
      { opacity: 1, x: 0, ease: "power1.out", duration: 0.4 },
      0.35
    );
    tl.to(imageWrapRef.value, { scale: 1.05, ease: "none", duration: 1 }, 0);

    // 2) geser ke kanan: foto setengah kiri + bride muncul kiri
    tl.to(groomInfoRef.value, { opacity: 0, x: 40, ease: "power1.in", duration: 0.3 }, 1.05);
    tl.to(trackRef.value, { xPercent: 0, ease: "none", duration: 1.2 }, 1);
    tl.to(imageWrapRef.value, { scale: 1, ease: "none", duration: 1.2 }, 1);
    tl.fromTo(
      brideInfoRef.value,
      { opacity: 0, x: -60 },
      { opacity: 1, x: 0, ease: "power1.out", duration: 0.4 },
      1.55
    );
  }, coupleSection.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>
@keyframes couple-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.9; }
  50% { transform: translateY(6px); opacity: 0.5; }
}
</style>
