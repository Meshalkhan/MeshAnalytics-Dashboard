<template>
  <AppLayout>
    <template #topbar>
      <AppTopbar
        title="Revenue Performance"
        subtitle="Track pipeline health, conversion velocity, and account growth across regions."
      >
        <template #actions>
          <BaseButton variant="secondary" size="md" :loading="isLoading" @click="loadDashboard">
            <template #leading><BaseIcon name="refresh" :size="16" /></template>
            Refresh
          </BaseButton>
        </template>
      </AppTopbar>
    </template>

    <ErrorState
      v-if="error"
      class="dashboard__error"
      :message="error"
      @retry="loadDashboard"
    />

    <section class="dashboard">
      <FiltersPanel
        :filters="filters"
        :loading="isLoading"
        :last-updated="lastUpdated || ''"
        @apply="updateFilters"
        @reset="resetFilters"
      />

      <div class="dashboard__content">
        <KpiGrid :kpis="kpis" :loading="isLoading" />

        <div class="dashboard__charts">
          <ChartCard title="Revenue Trend" subtitle="Weekly performance vs pipeline" :loading="isLoading && !hasData">
            <LineAnalyticsChart v-if="hasData" :data="charts.revenueTrend" />
          </ChartCard>

          <ChartCard title="Channel Performance" subtitle="Lead volume by acquisition source" :loading="isLoading && !hasData">
            <BarAnalyticsChart v-if="hasData" :data="charts.channelPerformance" />
          </ChartCard>

          <ChartCard title="Segment Breakdown" subtitle="Revenue contribution by segment" :loading="isLoading && !hasData">
            <DoughnutAnalyticsChart v-if="hasData" :data="charts.segmentBreakdown" />
          </ChartCard>
        </div>

        <AnalyticsTable :rows="table" :loading="isLoading && !hasData" />
      </div>
    </section>
  </AppLayout>
</template>

<script setup>
import { onMounted } from "vue";
import AppLayout from "../components/layout/AppLayout.vue";
import AppTopbar from "../components/layout/AppTopbar.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseIcon from "../components/ui/BaseIcon.vue";
import KpiGrid from "../components/dashboard/KpiGrid.vue";
import FiltersPanel from "../components/dashboard/FiltersPanel.vue";
import ChartCard from "../components/dashboard/ChartCard.vue";
import AnalyticsTable from "../components/dashboard/AnalyticsTable.vue";
import ErrorState from "../components/feedback/ErrorState.vue";
import LineAnalyticsChart from "../charts/LineAnalyticsChart.vue";
import BarAnalyticsChart from "../charts/BarAnalyticsChart.vue";
import DoughnutAnalyticsChart from "../charts/DoughnutAnalyticsChart.vue";
import { useDashboard } from "../composables/useDashboard.js";

const {
  filters,
  kpis,
  charts,
  table,
  error,
  lastUpdated,
  isLoading,
  hasData,
  loadDashboard,
  updateFilters,
  resetFilters
} = useDashboard();

onMounted(loadDashboard);
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: var(--space-5);
  align-items: start;
}

.dashboard__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  min-width: 0;
}

.dashboard__charts {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-auto-rows: minmax(0, auto);
  gap: var(--space-4);
}

.dashboard__charts > :first-child {
  grid-column: 1 / -1;
}

.dashboard__error {
  margin-bottom: var(--space-5);
}

@media (max-width: 1180px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .dashboard__charts {
    grid-template-columns: 1fr;
  }

  .dashboard__charts > :first-child {
    grid-column: auto;
  }
}
</style>
