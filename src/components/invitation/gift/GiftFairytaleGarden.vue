<template>
  <div v-if="!isInline" class="hidden"></div>
  <div
    v-else
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      width: 100%;
      box-sizing: border-box;
    "
  >
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 16px; width: 100%;">
      <h2
        class="text-3xl sm:text-4xl md:text-5xl"
        :style="{ fontFamily: themeConfig.fontHeading }"
        style="
          color: #8A4E56;
          font-weight: 700;
          text-shadow: 0 1px 3px rgba(255,255,255,0.85);
          line-height: 1.25;
          margin: 0 0 4px 0;
        "
      >
        Wedding Gift
      </h2>
      <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 6px; color: #EBCFD1; opacity: 0.8;">
        <svg viewBox="0 0 60 2" style="width: 36px; opacity: 0.4;">
          <rect width="60" height="1" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 24 24" style="width: 12px; height: 12px; opacity: 0.6;">
          <path
            d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"
            fill="currentColor"
          />
        </svg>
        <svg viewBox="0 0 60 2" style="width: 36px; opacity: 0.4;">
          <rect width="60" height="1" fill="currentColor" />
        </svg>
      </div>
      <p
        :style="{ fontFamily: themeConfig.fontBody }"
        style="
          max-width: 400px;
          margin: 0 auto;
          font-size: 11px;
          line-height: 1.5;
          color: #6A4E42;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.85);
          padding: 0 12px;
        "
      >
        Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, apabila Anda ingin memberikan tanda kasih, kami menyediakan amplop digital di bawah ini.
      </p>
    </div>

    <!-- Cards Container -->
    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        width: 100%;
        padding: 4px 0;
        box-sizing: border-box;
      "
      class="sm:flex-row"
    >
      <!-- Bank Accounts -->
      <div
        v-for="(bank, index) in bankList"
        :key="index"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
          max-width: 290px;
        "
      >
        <!-- Debit Card Design -->
        <div
          style="
            position: relative;
            width: 100%;
            aspect-ratio: 1.58;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid #EBCFD1;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(106, 78, 66, 0.06);
            padding: 14px 18px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
            transition: all 0.3s ease;
            overflow: hidden;
          "
          class="group hover:shadow-[0_12px_35px_rgba(106,78,66,0.12)] hover:-translate-y-1"
        >
          <!-- Elegant Pattern Decor -->
          <div style="position: absolute; right: -40px; top: -40px; width: 160px; height: 160px; border: 1.5px solid rgba(235, 207, 209, 0.25); border-radius: 50%; pointer-events: none;"></div>
          <div style="position: absolute; right: -20px; top: -20px; width: 100px; height: 100px; border: 1.5px solid rgba(235, 207, 209, 0.35); border-radius: 50%; pointer-events: none;"></div>
          <div style="position: absolute; left: -40px; bottom: -40px; width: 130px; height: 130px; border: 1px solid rgba(235, 207, 209, 0.15); border-radius: 50%; pointer-events: none;"></div>

          <!-- Top Row: Chip and Bank Name -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; z-index: 10;">
            <!-- EMV Chip -->
            <div style="width: 32px; height: 22px; border-radius: 4px; position: relative; overflow: hidden; box-shadow: 0 1px 2px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.1); background: linear-gradient(135deg, #EBCFD1 0%, #D9A9AF 100%);">
              <div style="position: absolute; top: 0; bottom: 0; left: 8px; width: 1px; background: rgba(0,0,0,0.06);"></div>
              <div style="position: absolute; top: 0; bottom: 0; right: 8px; width: 1px; background: rgba(0,0,0,0.06);"></div>
              <div style="position: absolute; left: 0; right: 0; top: 7px; height: 1px; background: rgba(0,0,0,0.06);"></div>
              <div style="position: absolute; left: 0; right: 0; bottom: 7px; height: 1px; background: rgba(0,0,0,0.06);"></div>
            </div>

            <div style="font-weight: 800; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #8A4E56; font-family: sans-serif;">
              {{ bank.bank_name }}
            </div>
          </div>

          <!-- Middle: Account Number -->
          <div style="position: relative; z-index: 10; margin-top: auto; margin-bottom: 8px;">
            <div style="font-size: 15px; font-weight: 700; letter-spacing: 0.06em; font-family: 'Courier New', Courier, monospace; display: flex; align-items: center; gap: 6px; color: #6A4E42;">
              {{ bank.bank_account }}
              <button
                @click="copyAccount(index)"
                title="Salin Nomor"
                style="
                  background: #ffffff;
                  border: 1px solid #EBCFD1;
                  padding: 3px;
                  border-radius: 4px;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: all 0.2s ease;
                  outline: none;
                "
                class="hover:bg-[#FCF8F4] active:scale-90"
              >
                <svg v-if="copiedIndex !== index" viewBox="0 0 24 24" style="width: 12px; height: 12px; fill: #AEB8A3;">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                </svg>
                <svg v-else viewBox="0 0 24 24" style="width: 12px; height: 12px; fill: #6E875C;">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </button>
            </div>
            <div
              v-show="copiedIndex === index"
              style="
                position: absolute;
                top: 100%;
                left: 0;
                font-size: 8px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #6E875C;
              "
              class="animate-fade-in"
            >
              Berhasil Disalin!
            </div>
          </div>

          <!-- Bottom Row: Card Holder & Rings -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; z-index: 10;">
            <div style="display: flex; flex-direction: column; text-align: left; max-width: 75%;">
              <span style="font-size: 7.5px; color: #AEB8A3; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1px; font-family: sans-serif;">A.N. Rekening</span>
              <span
                :style="{ fontFamily: themeConfig.fontBody }"
                style="
                  font-size: 11.5px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.03em;
                  color: #5A1E25;
                  line-height: 1.2;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ bank.bank_holder }}
              </span>
            </div>
            <!-- Debit Card Rings Mock -->
            <div style="display: flex; opacity: 0.6; align-items: center;">
              <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #AEB8A3; mix-blend-mode: multiply;"></div>
              <div style="width: 20px; height: 20px; border-radius: 50%; background-color: #EBCFD1; mix-blend-mode: multiply; margin-left: -8px;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Physical Gift Address Card -->
      <div
        v-if="invitation.gift_address"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100%;
          max-width: 290px;
        "
      >
        <div
          style="
            position: relative;
            width: 100%;
            aspect-ratio: 1.58;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid #EBCFD1;
            border-radius: 16px;
            box-shadow: 0 8px 25px rgba(106, 78, 66, 0.06);
            padding: 14px 18px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: left;
            transition: all 0.3s ease;
            overflow: hidden;
          "
          class="group hover:shadow-[0_12px_35px_rgba(106,78,66,0.12)] hover:-translate-y-1"
        >
          <!-- Elegant dashed inner border (for postcard parchment feel) -->
          <div
            style="
              position: absolute;
              top: 5px;
              bottom: 5px;
              left: 5px;
              right: 5px;
              border: 1px dashed rgba(174, 184, 163, 0.3);
              border-radius: 12px;
              pointer-events: none;
              box-sizing: border-box;
            "
          ></div>

          <!-- Top Row: Card Title & Stamp -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; z-index: 10;">
            <div style="font-weight: 800; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #8A4E56; font-family: sans-serif;">
              Kirim Kado
            </div>

            <!-- Elegant Mini Postage Stamp -->
            <div
              style="
                width: 26px;
                height: 31px;
                border: 1.2px dashed #D9A9AF;
                border-radius: 2px;
                background: #FCF8F4;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 1px 3px rgba(0,0,0,0.03);
              "
            >
              <svg viewBox="0 0 24 24" style="width: 13px; height: 13px; fill: #D9A9AF;">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>

          <!-- Middle: Address Content (Scrollable if too long to prevent overflow) -->
          <div style="z-index: 10; margin-top: 3px; margin-bottom: 3px; overflow-y: auto; max-height: 52px;" class="hide-scrollbar">
            <p
              :style="{ fontFamily: themeConfig.fontBody }"
              style="
                font-size: 10.5px;
                line-height: 1.4;
                color: #6A4E42;
                font-weight: 600;
                margin: 0;
                white-space: pre-line;
              "
            >
              {{ invitation.gift_address }}
            </p>
          </div>

          <!-- Bottom Row: Recipient Info & Copy Button -->
          <div style="display: flex; justify-content: space-between; align-items: flex-end; z-index: 10;">
            <div style="display: flex; flex-direction: column; text-align: left; max-width: 60%;">
              <span style="font-size: 7.5px; color: #AEB8A3; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 1px; font-family: sans-serif;">Penerima</span>
              <span
                :style="{ fontFamily: themeConfig.fontBody }"
                style="
                  font-size: 11px;
                  font-weight: 700;
                  text-transform: uppercase;
                  letter-spacing: 0.03em;
                  color: #5A1E25;
                  line-height: 1.2;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
              >
                {{ invitation.gift_recipient || "-" }}
              </span>
              <span v-if="invitation.gift_phone" style="font-size: 8.5px; color: #8C655A; font-family: monospace; margin-top: 0.5px;">
                Telp: {{ invitation.gift_phone }}
              </span>
            </div>

            <!-- Action Button inside postcard -->
            <button
              @click="copyAddress"
              style="
                background: #ffffff;
                border: 1px solid #EBCFD1;
                color: #8A4E56;
                padding: 4px 8px;
                border-radius: 6px;
                font-size: 8.5px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.03em;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 3px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.03);
                transition: all 0.2s ease;
                outline: none;
              "
              class="hover:bg-[#FCF8F4] active:scale-95"
            >
              <svg v-if="!copiedAddress" viewBox="0 0 24 24" style="width: 10px; height: 10px; fill: #AEB8A3;">
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
              <svg v-else viewBox="0 0 24 24" style="width: 10px; height: 10px; fill: #6E875C;">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              {{ copiedAddress ? "Disalin" : "Salin" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { ThemeConfig } from "@/types/theme";
import type { Invitation, BankAccount } from "@/types/invitation";

const props = defineProps<{
  invitation: Invitation;
  themeConfig: ThemeConfig;
  isInline?: boolean;
}>();

const copiedIndex = ref<number | null>(null);
const copiedAddress = ref(false);

const bankList = computed<BankAccount[]>(() => {
  if (
    props.invitation.banks &&
    Array.isArray(props.invitation.banks) &&
    props.invitation.banks.length > 0
  ) {
    return props.invitation.banks.filter((b) => b.bank_name || b.bank_account);
  }
  if (props.invitation.bank_name) {
    return [
      {
        bank_name: props.invitation.bank_name,
        bank_account: props.invitation.bank_account,
        bank_holder: props.invitation.bank_holder,
      },
    ];
  }
  return [];
});

function copyAccount(index: number) {
  const bank = bankList.value[index];
  if (!bank?.bank_account) return;
  navigator.clipboard.writeText(bank.bank_account);
  copiedIndex.value = index;
  setTimeout(() => {
    copiedIndex.value = null;
  }, 2500);
}

function copyAddress() {
  if (!props.invitation.gift_address) return;
  let text = props.invitation.gift_address;
  if (props.invitation.gift_recipient) {
    text += `\n(Penerima: ${props.invitation.gift_recipient}`;
    if (props.invitation.gift_phone)
      text += `, Telp: ${props.invitation.gift_phone}`;
    text += `)`;
  }
  navigator.clipboard.writeText(text);
  copiedAddress.value = true;
  setTimeout(() => {
    copiedAddress.value = false;
  }, 2500);
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
