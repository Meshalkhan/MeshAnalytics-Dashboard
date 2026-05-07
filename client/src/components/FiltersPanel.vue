<template>
  <aside class="filters-panel">
    <h2>Filters</h2>
    <label>
      Period
      <select v-model="localFilters.period">
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>
    </label>

    <label>
      Region
      <select v-model="localFilters.region">
        <option value="all">All regions</option>
        <option value="north-america">North America</option>
        <option value="emea">EMEA</option>
        <option value="apac">APAC</option>
        <option value="latam">LATAM</option>
      </select>
    </label>

    <label>
      Segment
      <select v-model="localFilters.segment">
        <option value="all">All segments</option>
        <option value="enterprise">Enterprise</option>
        <option value="mid-market">Mid-Market</option>
        <option value="smb">SMB</option>
      </select>
    </label>

    <div class="filter-actions">
      <button class="btn-primary" @click="applyFilters">Apply</button>
      <button class="btn-secondary" @click="resetFilters">Reset</button>
    </div>
  </aside>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  filters: { type: Object, required: true }
});

const emit = defineEmits(["apply", "reset"]);

const localFilters = reactive({
  period: props.filters.period,
  region: props.filters.region,
  segment: props.filters.segment
});

watch(
  () => props.filters,
  (nextFilters) => {
    localFilters.period = nextFilters.period;
    localFilters.region = nextFilters.region;
    localFilters.segment = nextFilters.segment;
  },
  { deep: true }
);

function applyFilters() {
  emit("apply", { ...localFilters });
}

function resetFilters() {
  emit("reset");
}
</script>
