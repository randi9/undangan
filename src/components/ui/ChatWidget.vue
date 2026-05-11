<script setup lang="ts">
import { ref, nextTick, watch, onMounted } from 'vue';

onMounted(() => {
  console.log('[ChatWidget] ✅ Component mounted successfully!');
});

const isOpen = ref(false);
const isTyping = ref(false);
const userInput = ref('');
const messagesContainer = ref<HTMLElement | null>(null);

interface Message {
  role: 'user' | 'ai';
  text: string;
}

// Pesan pembuka bawaan
const messages = ref<Message[]>([
  { role: 'ai', text: 'Halo! 👋 Saya Mia, asisten virtual MengundangAnda. Ada yang bisa saya bantu hari ini?' }
]);

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    scrollToBottom();
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

watch(messages, () => {
  scrollToBottom();
}, { deep: true });

const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text || isTyping.value) return;

  messages.value.push({ role: 'user', text });
  userInput.value = '';
  isTyping.value = true;

  try {
    const historyToApi = messages.value.slice(-10).map(m => ({
      role: m.role,
      text: m.text
    }));

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: historyToApi })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Terjadi kesalahan');

    messages.value.push({ role: 'ai', text: data.reply });
  } catch (error: any) {
    messages.value.push({ role: 'ai', text: `Maaf, terjadi kesalahan: ${error.message}` });
  } finally {
    isTyping.value = false;
  }
};
</script>

<template>
  <div class="chat-widget-root">
    <!-- Chat Window -->
    <transition name="chat-fade">
      <div v-if="isOpen" class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-avatar">
              <img src="/images/avatar.webp" alt="Mia Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" />
            </div>
            <div>
              <div class="chat-name">Mia (AI Assistant)</div>
              <div class="chat-status">Online</div>
            </div>
          </div>
          <button @click="toggleChat" class="chat-close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>

        <!-- Messages Area -->
        <div ref="messagesContainer" class="chat-messages">
          <div v-for="(msg, index) in messages" :key="index" class="chat-msg-row" :class="msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-ai'">
            <div class="chat-bubble" :class="msg.role === 'user' ? 'bubble-user' : 'bubble-ai'">
              {{ msg.text }}
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="chat-msg-row chat-msg-ai">
            <div class="chat-bubble bubble-ai typing-indicator">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="chat-input-area">
          <form @submit.prevent="sendMessage" class="chat-form">
            <input
              v-model="userInput"
              type="text"
              placeholder="Ketik pesan..."
              class="chat-input"
              :disabled="isTyping"
            >
            <button
              type="submit"
              :disabled="!userInput.trim() || isTyping"
              class="chat-send-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </transition>

    <!-- Floating Action Button -->
    <transition name="fab-scale">
      <button v-if="!isOpen" @click="toggleChat" class="chat-fab">
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#ffffff" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<style scoped>
.chat-widget-root {
  position: fixed !important;
  bottom: 100px;
  right: 20px;
  z-index: 99999 !important;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

@media (min-width: 640px) {
  .chat-widget-root {
    bottom: 24px;
    right: 24px;
  }
}

/* === FAB Button === */
.chat-fab {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  /* Premium Liquid Glass / Glassmorphism */
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  border-left: 1px solid rgba(255, 255, 255, 0.8);
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 4px 6px rgba(255, 255, 255, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.chat-fab:hover {
  transform: scale(1.1) translateY(-2px);
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2), inset 0 4px 6px rgba(255, 255, 255, 0.6);
}

/* === Chat Window === */
.chat-window {
  position: absolute;
  bottom: 68px;
  right: 0;
  width: 340px;
  height: 480px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (min-width: 640px) {
  .chat-window {
    width: 380px;
    height: 500px;
  }
}

/* === Header === */
.chat-header {
  background: #f1f5f9;
  padding: 14px 16px;
  color: #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  border-bottom: 1px solid #e2e8f0;
}

.chat-header-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.chat-name {
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.01em;
}

.chat-status {
  font-size: 11px;
  color: rgba(30, 41, 59, 0.7);
}

.chat-close-btn {
  background: rgba(0, 0, 0, 0.05);
  border: none;
  color: #64748b;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.chat-close-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  color: #1e293b;
}

/* === Messages === */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f8f9fb;
}

.chat-msg-row {
  display: flex;
  width: 100%;
}

.chat-msg-user {
  justify-content: flex-end;
}

.chat-msg-ai {
  justify-content: flex-start;
}

.chat-bubble {
  max-width: 82%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 13.5px;
  line-height: 1.5;
  word-break: break-word;
  white-space: pre-wrap;
}

.bubble-user {
  background: #3b82f6;
  color: #fff;
  border-bottom-right-radius: 4px;
  box-shadow: 0 1px 3px rgba(59, 130, 246, 0.3);
}

.bubble-ai {
  background: #fff;
  color: #1e293b;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

/* === Typing Indicator === */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 18px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #94a3b8;
  animation: dotBounce 1.2s infinite ease-in-out;
}

.dot:nth-child(2) { animation-delay: 0.15s; }
.dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes dotBounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

/* === Input === */
.chat-input-area {
  padding: 10px 12px;
  border-top: 1px solid #f0f0f0;
  background: #fff;
  flex-shrink: 0;
}

.chat-form {
  display: flex;
  gap: 8px;
  align-items: center;
}

.chat-input {
  flex: 1;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 999px;
  padding: 10px 16px;
  font-size: 13.5px;
  color: #1e293b;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}

.chat-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.chat-input::placeholder {
  color: #9ca3af;
}

.chat-send-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #3b82f6;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  flex-shrink: 0;
}

.chat-send-btn:hover:not(:disabled) {
  background: #2563eb;
  box-shadow: 0 2px 10px rgba(59, 130, 246, 0.35);
}

.chat-send-btn:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

/* === Transition === */
.chat-fade-enter-active,
.chat-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: bottom right;
}

.chat-fade-enter-from,
.chat-fade-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(16px);
}

.fab-scale-enter-active,
.fab-scale-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: center;
}

.fab-scale-enter-from,
.fab-scale-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
