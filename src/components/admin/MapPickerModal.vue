<script setup lang="ts">
import { ref, watch, shallowRef } from 'vue';
import { Icon } from '@iconify/vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'select', payload: { lat: number, lng: number, address: string, link: string }): void;
}>();

const mapContainer = ref<HTMLElement | null>(null);
const searchQuery = ref('');
const searchResults = ref<any[]>([]);
const isSearching = ref(false);
const selectedAddress = ref('');
const selectedLat = ref<number | null>(null);
const selectedLng = ref<number | null>(null);
const skipNextMapClick = ref(false);

// Use shallowRef for Leaflet instances to avoid Vue reactivity proxying deep objects
const mapInstance = shallowRef<L.Map | null>(null);
const markerInstance = shallowRef<L.Marker | null>(null);

function initMap() {
  if (!mapContainer.value) return;
  // Use existing coordinates if available, otherwise default to Indonesia
  const initialLat = selectedLat.value !== null ? selectedLat.value : -0.789275;
  const initialLng = selectedLng.value !== null ? selectedLng.value : 113.921327;
  const initialZoom = selectedLat.value !== null ? 16 : 5;

  mapInstance.value = L.map(mapContainer.value).setView([initialLat, initialLng], initialZoom);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapInstance.value);

  mapInstance.value.on('click', async (e: L.LeafletMouseEvent) => {
    // Prevent map click from overriding a just-selected search result
    if (skipNextMapClick.value) {
      skipNextMapClick.value = false;
      return;
    }
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setMarker(lat, lng);
    await reverseGeocode(lat, lng);
  });
  
  // Re-add marker if already selected
  if (selectedLat.value !== null && selectedLng.value !== null) {
      markerInstance.value = null; // force recreation since map is new
      setMarker(selectedLat.value, selectedLng.value);
  }

  // Fix marker icons for Leaflet in Vite
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
}

function setMarker(lat: number, lng: number) {
  selectedLat.value = lat;
  selectedLng.value = lng;
  if (!mapInstance.value) return;
  
  if (markerInstance.value) {
    markerInstance.value.setLatLng([lat, lng]);
  } else {
    markerInstance.value = L.marker([lat, lng]).addTo(mapInstance.value);
  }
}

function formatPhotonAddress(properties: any) {
  const parts = [];
  if (properties.name) parts.push(properties.name);
  if (properties.street && properties.street !== properties.name) parts.push(properties.street);
  if (properties.district && properties.district !== properties.name) parts.push(properties.district);
  if (properties.city && properties.city !== properties.district && properties.city !== properties.name) parts.push(properties.city);
  if (properties.state && properties.state !== properties.city) parts.push(properties.state);
  return parts.join(', ');
}

async function searchLocation() {
  if (!searchQuery.value.trim()) return;
  isSearching.value = true;
  try {
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(searchQuery.value)}&limit=5`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    if (data && data.features) {
      searchResults.value = data.features.map((f: any) => ({
        place_id: f.properties.osm_id || Math.random().toString(),
        lat: f.geometry.coordinates[1],
        lon: f.geometry.coordinates[0],
        display_name: formatPhotonAddress(f.properties) || 'Lokasi'
      }));
    }
  } catch (error) {
    console.error("Geocoding error", error);
  } finally {
    isSearching.value = false;
  }
}

function selectResult(result: any) {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);
  setMarker(lat, lng);
  selectedAddress.value = result.display_name;
  searchResults.value = [];
  searchQuery.value = result.display_name;
  // On mobile, tapping a search result can also fire a map click underneath.
  // Skip the next map click so the address doesn't get overwritten by reverseGeocode.
  skipNextMapClick.value = true;
  if (mapInstance.value) {
    mapInstance.value.setView([lat, lng], 16);
  }
}

async function reverseGeocode(lat: number, lng: number) {
  isSearching.value = true;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000); // 6s timeout for mobile
    const res = await fetch(`https://photon.komoot.io/reverse?lon=${lng}&lat=${lat}`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const data = await res.json();
    if (data && data.features && data.features.length > 0) {
      const address = formatPhotonAddress(data.features[0].properties);
      if (address) {
        selectedAddress.value = address;
        searchQuery.value = address;
        return;
      }
    }
    // Fallback if no valid address
    selectedAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch (error) {
    console.error("Reverse geocoding error", error);
    // If reverse geocoding fails, fallback to coordinates
    selectedAddress.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } finally {
    isSearching.value = false;
  }
}

function confirmSelection() {
  if (selectedLat.value === null || selectedLng.value === null) return;
  
  const link = `https://www.google.com/maps/search/?api=1&query=${selectedLat.value},${selectedLng.value}`;
  
  emit('select', {
    lat: selectedLat.value,
    lng: selectedLng.value,
    address: selectedAddress.value,
    link
  });
}

function resetAndClose() {
  searchResults.value = [];
  emit('close');
}

// Re-init map when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      // Due to v-if, DOM is destroyed on hide. We must completely reset Leaflet.
      if (mapInstance.value) {
         mapInstance.value.remove();
         mapInstance.value = null;
         markerInstance.value = null;
      }
      initMap();
    }, 200);
  }
});
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="map-modal-overlay" @click.self="resetAndClose">
      <div class="map-modal">
        <div class="map-modal-header">
          <div>
            <h2 style="display: flex; align-items: center; gap: 8px;">
              <Icon icon="lucide:map-pin" style="color: var(--admin-primary);" />
              Pilih Lokasi dari Peta
            </h2>
            <p style="color: var(--admin-text-secondary); font-size: 13px; margin-top: 4px;">Cari dan klik peta untuk menetapkan alamat & Google Maps link</p>
          </div>
          <button class="map-modal-close" @click="resetAndClose">
            <Icon icon="lucide:x" />
          </button>
        </div>

        <div class="map-search-bar">
          <div class="search-input-wrapper">
            <Icon icon="lucide:search" class="search-icon" />
            <input 
              v-model="searchQuery" 
              type="text" 
              class="search-input" 
              placeholder="Ketik lokasi (contoh: Masjid Istiqlal, Jakarta)..."
              @keyup.enter="searchLocation"
            />
            <button class="btn btn-primary btn-sm search-btn" @click="searchLocation" :disabled="isSearching">
              <span v-if="isSearching" class="loading-spinner" style="border-width: 2px; width: 14px; height: 14px;"></span>
              <span v-else>Cari</span>
            </button>
          </div>
          
          <ul v-if="searchResults.length > 0" class="search-results">
            <li 
              v-for="res in searchResults" 
              :key="res.place_id" 
              @click="selectResult(res)"
            >
              <Icon icon="lucide:map-pinned" style="flex-shrink: 0; color: var(--admin-text-secondary); margin-top: 2px;" />
              <div class="result-text">{{ res.display_name }}</div>
            </li>
          </ul>
        </div>

        <div class="map-container" ref="mapContainer"></div>

        <div class="map-modal-footer">
          <div class="selected-info">
            <template v-if="selectedLat !== null">
              <strong>Alamat Terpilih:</strong>
              <div class="address-text">{{ selectedAddress || `${selectedLat.toFixed(5)}, ${selectedLng?.toFixed(5)}` }}</div>
            </template>
            <template v-else>
              <span class="placeholder-text">Klik area peta atau cari lokasi terlebih dahulu.</span>
            </template>
          </div>
          <button 
            type="button" 
            class="btn btn-success confirm-btn" 
            :disabled="selectedLat === null || isSearching"
            @click="confirmSelection"
          >
            <span v-if="isSearching" class="loading-spinner" style="border-width: 2px; width: 14px; height: 14px; margin-right: 4px;"></span>
            <Icon v-else icon="lucide:check" style="font-size: 16px; margin-right: 4px;" />
            {{ isSearching ? 'Memuat alamat...' : 'Gunakan Lokasi Ini' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.map-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.map-modal {
  width: 100%;
  max-width: 800px;
  background: var(--admin-surface, #ffffff);
  border-radius: var(--radius-xl, 1.25rem);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
  overflow: visible;
}

.map-modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--admin-border, #e2e8f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--admin-surface, #ffffff);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.map-modal-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: var(--admin-text, #1e293b);
  margin: 0;
}

.map-modal-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--admin-bg, #f8fafc);
  color: var(--admin-text-secondary, #64748b);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.map-modal-close:hover {
  background: #e2e8f0;
  color: #ef4444;
}

.map-search-bar {
  padding: 16px 24px;
  background: var(--admin-bg, #f8fafc);
  border-bottom: 1px solid var(--admin-border, #e2e8f0);
  position: relative;
  z-index: 1001;
}

.search-input-wrapper {
  display: flex;
  gap: 8px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--admin-text-secondary, #94a3b8);
  font-size: 18px;
  pointer-events: none;
}

.search-input {
  flex: 1;
  padding: 10px 12px 10px 40px;
  border: 1px solid var(--admin-border, #cbd5e1);
  border-radius: var(--radius-md, 0.5rem);
  font-size: 14px;
  background: var(--admin-surface, #ffffff);
}

.search-input:focus {
  outline: none;
  border-color: var(--admin-primary, #3b82f6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-btn {
  padding-left: 16px;
  padding-right: 16px;
  min-width: 80px;
}

.search-results {
  position: absolute;
  top: calc(100% - 8px);
  left: 24px;
  right: 24px;
  background: white;
  border: 1px solid var(--admin-border, #cbd5e1);
  border-radius: 8px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  max-height: 250px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 4px 0 0;
}

.search-results li {
  padding: 12px 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  border-bottom: 1px solid var(--admin-border, #f1f5f9);
  transition: background 0.2s;
}

.search-results li:hover {
  background: #f8fafc;
}

.search-results li:last-child {
  border-bottom: none;
}

.result-text {
  font-size: 13px;
  color: var(--admin-text, #334155);
  line-height: 1.4;
}

.map-container {
  height: 400px;
  width: 100%;
  background: #e2e8f0;
  position: relative;
  z-index: 10;
}

.map-modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--admin-border, #e2e8f0);
  background: var(--admin-surface, #ffffff);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-radius: 0 0 var(--radius-xl) var(--radius-xl);
}

.selected-info {
  flex: 1;
  font-size: 13px;
}

.selected-info strong {
  display: block;
  color: var(--admin-text-secondary, #64748b);
  margin-bottom: 4px;
  font-size: 12px;
}

.address-text {
  color: var(--admin-text, #1e293b);
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.4;
}

.placeholder-text {
  color: var(--admin-text-secondary, #94a3b8);
  font-style: italic;
}

.confirm-btn {
  flex-shrink: 0;
  padding-left: 20px;
  padding-right: 20px;
  height: 42px;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active .map-modal,
.fade-leave-active .map-modal {
  transition: transform 0.2s ease;
}
.fade-enter-from .map-modal,
.fade-leave-to .map-modal {
  transform: scale(0.95) translateY(10px);
}
</style>
