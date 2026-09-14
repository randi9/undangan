<template>
  <section
    v-if="hasStories || showDoa"
    ref="storySection"
    class="relative h-[100dvh] w-full bg-[#AED4DA] overflow-hidden text-center flex items-center justify-center isolate"
  >
    <div
      aria-hidden="true"
      style="position:absolute;inset:0;z-index:-20;pointer-events:none;background-image:url('https://media.mengundanganda.com/royalfantasy/lovestory%20section/dewirandi_94877491-73ef-4791-a079-c3df9522c320.webp');background-size:auto 100%;background-position:center center;background-repeat:no-repeat;"
    ></div>
    <div class="absolute inset-0 pointer-events-none -z-10" style="background:radial-gradient(ellipse at 50% 36%, rgba(255,252,245,0.6) 0%, rgba(255,252,245,0.22) 40%, transparent 68%), linear-gradient(to bottom, rgba(174,212,218,0.12) 0%, transparent 30%, transparent 72%, rgba(36,48,41,0.16) 100%);"></div>

    <img src="https://media.mengundanganda.com/royalfantasy/lovestory%20section/dewirandi_a21322ca-2a29-4a60-b174-4e40e3d70375.webp" alt="" class="flower-float"
      style="position:absolute;z-index:5;pointer-events:none;left:50%;bottom:36px;transform:translateX(-50%);width:132px;max-width:none;height:auto;filter:drop-shadow(0 10px 16px rgba(36,48,41,0.25));" />
    <img src="https://media.mengundanganda.com/royalfantasy/lovestory%20section/dewirandi_66fc97bc-c597-4c78-a56e-22ee6922ff81.webp" alt=""
      style="position:absolute;z-index:6;pointer-events:none;left:50%;bottom:36px;transform:translateX(-50%);width:228px;max-width:none;height:auto;" />

    <!-- PART 1 : judul di atas, semua card tampil utuh tanpa scroll -->
    <div v-if="hasStories" ref="storyPanel" class="absolute inset-0 z-10 w-full h-full flex flex-col items-center" style="justify-content:flex-start;padding:52px 16px 158px 16px;">
      <div style="width:100%;max-width:380px;margin:0 auto;display:flex;flex-direction:column;align-items:center;">

        <!-- Header : tanpa mahkota, hanya ornamen daun + hati -->
        <div style="text-align:center;margin-bottom:10px;flex-shrink:0;">
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:5px;">
            <svg width="44" height="12" viewBox="0 0 44 12" fill="none"><path d="M1 6 H16" stroke="#9A7D4A" stroke-width="1" stroke-linecap="round" opacity="0.7"/><path d="M17 6 c2-3 5-4 8-2 c-3 0-5 1-8 2 Z" fill="#8FA79B"/><path d="M17 6 c2 3 5 4 8 2 c-3 0-5-1-8-2 Z" fill="#B0808A" opacity="0.8"/></svg>
            <span style="font-size:10px;letter-spacing:0.36em;text-indent:0.36em;text-transform:uppercase;color:#6E6250;font-weight:600;">Kisah Cinta</span>
            <svg width="44" height="12" viewBox="0 0 44 12" fill="none" style="transform:scaleX(-1);"><path d="M1 6 H16" stroke="#9A7D4A" stroke-width="1" stroke-linecap="round" opacity="0.7"/><path d="M17 6 c2-3 5-4 8-2 c-3 0-5 1-8 2 Z" fill="#8FA79B"/><path d="M17 6 c2 3 5 4 8 2 c-3 0-5-1-8-2 Z" fill="#B0808A" opacity="0.8"/></svg>
          </div>
          <h2 style="margin:0;color:#22302A;font-weight:400;font-size:clamp(23px,6.4vw,30px);line-height:1.2;" :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }">Cerita Perjalanan Kami</h2>
          <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-top:8px;">
            <span style="display:block;width:46px;height:1px;background:linear-gradient(to right,transparent,#9A7D4A);"></span>
            <svg width="15" height="13" viewBox="0 0 24 22" fill="none"><path d="M12 20 C7.5 16 3.5 12.6 3.5 8.6 C3.5 6 5.5 4.2 7.9 4.2 C9.5 4.2 11 5.2 12 6.7 C13 5.2 14.5 4.2 16.1 4.2 C18.5 4.2 20.5 6 20.5 8.6 C20.5 12.6 16.5 16 12 20 Z" fill="none" stroke="#B0808A" stroke-width="1.3"/><path d="M12 17 C9 14.4 6.2 12 6.2 9 C6.2 7.4 7.4 6.3 8.8 6.3 C9.8 6.3 10.9 7 11.5 8 L12 8.8 L12.5 8 C13.1 7 14.2 6.3 15.2 6.3 C16.6 6.3 17.8 7.4 17.8 9 C17.8 12 15 14.4 12 17 Z" fill="#B0808A" opacity="0.9"/></svg>
            <span style="display:block;width:46px;height:1px;background:linear-gradient(to left,transparent,#9A7D4A);"></span>
          </div>
        </div>

        <!-- SINGLE : card biasa, tampil utuh -->
        <div v-if="stories.length === 1 && firstStory" style="width:100%;max-width:330px;flex-shrink:0;">
          <div style="position:relative;overflow:hidden;background:rgba(248,244,238,0.96);border:1px solid rgba(154,125,74,0.35);border-radius:16px;padding:14px 16px 14px 16px;box-shadow:0 12px 28px rgba(36,48,41,0.18);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);text-align:center;--card-gold:#B89A62;">
            <CardFrameRoyalFantasy />
            <div style="position:relative;z-index:1;">
            <div v-if="firstStory.photo" style="border-radius:10px;overflow:hidden;height:110px;background:#22302A;margin-bottom:10px;">
              <img :src="resolveUrl(firstStory.photo)" :alt="firstStory.title" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy" />
            </div>
            <div style="display:inline-block;padding:3px 12px;border-radius:999px;background:#22302A;margin-bottom:6px;">
              <span style="font-size:10px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#F2E8D2;">{{ firstStory.date }}</span>
            </div>
            <h3 style="margin:0 0 4px 0;font-size:16px;line-height:1.4;color:#22302A;font-weight:400;" :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }">{{ firstStory.title }}</h3>
            <div style="width:40px;height:1px;background:#C8AC7A;margin:0 auto 6px auto;opacity:0.8;"></div>
            <p style="margin:0;font-size:12px;line-height:1.65;color:#55655D;">{{ firstStory.description }}</p>
            </div>
          </div>
        </div>

        <!-- MULTIPLE : semua card tampil, tanpa scroll, tanpa kepotong -->
        <div v-else style="width:100%;max-width:340px;flex-shrink:0;">
          <div style="position:relative;display:flex;flex-direction:column;gap:18px;padding:2px 2px 2px 18px;">
            <div aria-hidden="true" style="position:absolute;left:5px;top:8px;bottom:8px;width:1px;background:rgba(154,125,74,0.5);"></div>
            <div v-for="(item, idx) in stories" :key="idx" style="position:relative;background:rgba(248,244,238,0.96);border:1px solid rgba(154,125,74,0.3);border-radius:12px;padding:12px 14px 12px 26px;box-shadow:0 6px 16px rgba(36,48,41,0.13);text-align:left;--card-gold:#B89A62;">
              <CardFrameRoyalFantasy :show-separator="false" />
              <span aria-hidden="true" :style="{position:'absolute',left:'-17px',top:'16px',width:'8px',height:'8px',borderRadius:'50%',background: idx===0 ? '#B0808A' : '#C8AC7A', border:'1px solid #FFFDF6', boxShadow:'0 0 0 1px rgba(154,125,74,0.5)'}"></span>
              <div style="position:relative;z-index:1;">
              <div style="display:flex;align-items:center;gap:7px;margin-bottom:4px;">
                <span style="font-size:9.5px;font-weight:700;letter-spacing:0.08em;color:#9A7D4A;">0{{ idx+1 }}</span>
                <span style="display:inline-block;padding:2px 9px;border-radius:999px;background:#22302A;">
                  <span style="font-size:9px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#F2E8D2;">{{ item.date }}</span>
                </span>
              </div>
              <h3 style="margin:0 0 2px 0;font-size:13.5px;line-height:1.35;color:#22302A;font-weight:400;" :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }">{{ item.title }}</h3>
              <p style="margin:0 0 6px 0;font-size:11.5px;line-height:1.6;color:#55655D;">{{ item.description }}</p>
              <div v-if="item.photo" style="border-radius:8px;overflow:hidden;height:76px;background:#22302A;">
                <img :src="resolveUrl(item.photo)" :alt="item.title" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy" />
              </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- PART 2 : DOA card biasa -->
    <div v-if="showDoa" ref="doaPanel" class="absolute inset-0 z-10 w-full h-full flex items-center justify-center" style="padding:18px 18px 130px 18px;" :style="{ pointerEvents: hasStories ? 'none' : 'auto' }">
      <div ref="doaCard" style="position:relative;width:100%;max-width:400px;text-align:center;filter:drop-shadow(0 12px 24px rgba(36,48,41,0.25));">
        <img src="https://media.mengundanganda.com/royalfantasy/doa%20section/dewirandi_16bc6976-f979-497c-8ff9-67aa87bbb82a.webp" alt="" style="display:block;width:100%;height:auto;pointer-events:none;user-select:none;opacity:1;transform:scale(1.18);transform-origin:center;" />
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:21% 11% 23% 11%;">
        <h3 style="margin:0 0 8px 0;font-size:clamp(19px,5.2vw,23px);color:#22302A;font-weight:400;" :style="{ fontFamily: themeConfig?.fontHeading || `'Cinzel Decorative', serif` }">Doa Untuk Pengantin</h3>
        <div style="display:flex;align-items:center;justify-content:center;gap:7px;margin-bottom:8px;">
          <span style="width:36px;height:1px;background:linear-gradient(to right,transparent,#B0808A);"></span>
          <svg width="12" height="11" viewBox="0 0 24 22" fill="#B0808A"><path d="M12 20 C7.5 16 3.5 12.6 3.5 8.6 C3.5 6 5.5 4.2 7.9 4.2 C9.5 4.2 11 5.2 12 6.7 C13 5.2 14.5 4.2 16.1 4.2 C18.5 4.2 20.5 6 20.5 8.6 C20.5 12.6 16.5 16 12 20 Z"/></svg>
          <span style="width:36px;height:1px;background:linear-gradient(to left,transparent,#B0808A);"></span>
        </div>
        <p style="margin:0 0 8px 0;color:#22302A;text-align:center;font-family:'Amiri','Traditional Arabic',serif;direction:rtl;white-space:nowrap;font-size:clamp(12px,3.4vw,14px);line-height:1.9;">باركَ الله لكما وبارك عليكما وجمع بينكما في خير</p>
        <p style="margin:0 0 8px 0;font-size:12px;line-height:1.7;color:#7A6A4A;font-weight:500;letter-spacing:0.02em;">Baarakallaahu laka wa baaraka 'alaika wa jama-'a bainakumaa fii khair.</p>
        <div style="width:48px;height:1px;background:#C8AC7A;margin:0 auto 8px auto;opacity:0.8;"></div>
        <p style="margin:0 0 6px 0;font-size:12px;line-height:1.7;color:#55655D;font-style:italic;">&ldquo;Semoga Allah memberkahimu dan menyatukan kalian berdua dalam kebaikan.&rdquo;</p>
        <p style="margin:0;font-size:10px;letter-spacing:0.08em;color:#9A7D4A;font-weight:600;">(HR. Abu Dawud no. 2130)</p>
        </div>
      </div>
    </div>
    <ScrollCueRoyalFantasy />
  </section>
</template>

<script setup lang="ts">
import ScrollCueRoyalFantasy from '@/components/invitation/royal/ScrollCueRoyalFantasy.vue';
import CardFrameRoyalFantasy from './CardFrameRoyalFantasy.vue';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { LoveStoryItem } from '@/types/invitation';
import type { ThemeConfig } from '@/types/theme';
import { resolveAssetUrl } from '@/utils/url';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  stories: LoveStoryItem[];
  themeConfig?: ThemeConfig;
  apiBase?: string;
  showDoa?: boolean;
}>();

const storySection = ref<HTMLElement | null>(null);
const storyPanel = ref<HTMLElement | null>(null);
const doaPanel = ref<HTMLElement | null>(null);
const doaCard = ref<HTMLElement | null>(null);

const hasStories = computed(() => !!(props.stories && props.stories.length > 0));
const hasBoth = computed(() => hasStories.value && !!props.showDoa);
const firstStory = computed(() => props.stories?.[0]);

let ctx: gsap.Context | null = null;

const resolveUrl = (url: string | undefined) => {
  if (!url) return '';
  return resolveAssetUrl(url, props.apiBase || '');
};

onMounted(() => {
  if (!storySection.value) return;

  ctx = gsap.context(() => {
    if (hasBoth.value && storyPanel.value && doaPanel.value) {
      gsap.set(storyPanel.value, { opacity: 1, scale: 1, y: 0 });
      gsap.set(doaPanel.value, { opacity: 0, scale: 0.92, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: storySection.value,
          start: 'top top',
          end: '+=130%',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to({}, { duration: 0.6 })
        .to(storyPanel.value, {
          opacity: 0,
          scale: 0.95,
          y: -30,
          duration: 1,
          ease: 'power2.inOut',
          onStart: () => {
            if (storyPanel.value) storyPanel.value.style.pointerEvents = 'none';
          },
          onReverseComplete: () => {
            if (storyPanel.value) storyPanel.value.style.pointerEvents = 'auto';
          },
        })
        .to(
          doaPanel.value,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            onStart: () => {
              if (doaPanel.value) doaPanel.value.style.pointerEvents = 'auto';
            },
            onReverseComplete: () => {
              if (doaPanel.value) doaPanel.value.style.pointerEvents = 'none';
            },
          },
          '-=0.4'
        )
        // tahan doa agar terbaca, lalu LEPAS PIN — doa SENGAJA tidak di-fade-out:
        // section bergulir pergi dengan konten utuh sehingga gerakannya
        // menyambung mulus ke pin RSVP berikutnya (fade-out sebelum unpin
        // justru bikin momen diam + sentakan saat pin dilepas).
        .to({}, { duration: 1.2 });
    }
    else if (hasStories.value && storyPanel.value) {
      gsap.from(storyPanel.value, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: storySection.value,
          start: 'top 75%',
        },
      });
    }
    else if (props.showDoa && doaPanel.value) {
      gsap.from(doaPanel.value, {
        opacity: 0,
        scale: 0.94,
        y: 30,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: storySection.value,
          start: 'top 75%',
        },
      });
    }
  }, storySection.value);

  // Stabilisasi posisi pin setelah layout final (gambar/bg/font render) agar
  // handoff unpin LoveStory -> pin RSVP berikutnya tetap slide mulus 100vh
  // tanpa loncat akibat start/end basi. Pola sama seperti RsvpGiftRoyalFantasy.
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
  if (typeof document !== 'undefined' && document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }
});

onBeforeUnmount(() => {
  ctx?.revert();
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === storySection.value) {
      st.kill();
    }
  });
});
</script>

<style scoped>
.flower-float {
  animation: flower-hover 4.5s ease-in-out infinite;
  will-change: transform;
}

@keyframes flower-hover {
  0%,
  100% {
    transform: translateX(-50%) translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateX(-50%) translateY(-12px) rotate(1.5deg);
  }
  50% {
    transform: translateX(-50%) translateY(-20px) rotate(0deg);
  }
  75% {
    transform: translateX(-50%) translateY(-10px) rotate(-1.5deg);
  }
}

.no-scrollbar::-webkit-scrollbar { display: none; }

@media (prefers-reduced-motion: reduce) {
  .flower-float {
    animation: none;
  }
}
</style>
