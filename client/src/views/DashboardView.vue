<template>
  <main class="dashboard-layout">
    <header class="topbar">
      <div>
        <h1>MeshAnalytics Dashboard</h1>
        <p>Enterprise data visualization and KPI monitoring</p>
      </div>
      <button class="btn-primary" @click="store.loadDashboard">Refresh Data</button>
    </header>

    <section class="content-grid">
      <FiltersPanel :filters="store.filters" @apply="store.updateFilters" @reset="store.resetFilters" />

      <section class="analytics-content">
        <div class="kpi-grid">
          <KpiCard
            v-for="kpi in store.kpis"
            :key="kpi.title"
            :title="kpi.title"
            :value="kpi.value"
            :trend="kpi.trend"
          />
        </div>

        <div class="chart-grid">
          <article class="chart-card">
            <div class="section-header">
              <h2>Revenue Trend</h2>
            </div>
            <div class="chart-wrap">
              <LineAnalyticsChart :data="store.charts.revenueTrend" />
            </div>
          </article>

          <article class="chart-card">
            <div class="section-header">
              <h2>Channel Performance</h2>
            </div>
            <div class="chart-wrap">
              <BarAnalyticsChart :data="store.charts.channelPerformance" />
            </div>
          </article>

          <article class="chart-card">
            <div class="section-header">
              <h2>Segment Breakdown</h2>
            </div>
            <div class="chart-wrap">
              <DoughnutAnalyticsChart :data="store.charts.segmentBreakdown" />
            </div>
          </article>
        </div>

        <AnalyticsTable :rows="store.table" />
      </section>
    </section>

    <section v-if="store.loading" class="status-banner">Loading analytics data...</section>
    <section v-if="store.error" class="status-banner error">{{ store.error }}</section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useDashboardStore } from "../store/dashboardStore";
import FiltersPanel from "../components/FiltersPanel.vue";
import KpiCard from "../components/KpiCard.vue";
import AnalyticsTable from "../components/AnalyticsTable.vue";
import LineAnalyticsChart from "../charts/LineAnalyticsChart.vue";
import BarAnalyticsChart from "../charts/BarAnalyticsChart.vue";
import DoughnutAnalyticsChart from "../charts/DoughnutAnalyticsChart.vue";

const store = useDashboardStore();

onMounted(() => {
  store.loadDashboard();
});
</script>
