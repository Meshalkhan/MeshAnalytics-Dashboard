import { defineStore } from "pinia";
import { fetchDashboard } from "../services/dashboardApi";

const defaultFilters = {
  period: "30d",
  region: "all",
  segment: "all"
};

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    loading: false,
    error: "",
    filters: { ...defaultFilters },
    kpis: [],
    charts: {
      revenueTrend: { labels: [], datasets: [] },
      segmentBreakdown: { labels: [], datasets: [] },
      channelPerformance: { labels: [], datasets: [] }
    },
    table: []
  }),
  getters: {
    hasData: (state) => state.kpis.length > 0
  },
  actions: {
    async loadDashboard() {
      this.loading = true;
      this.error = "";
      try {
        const payload = await fetchDashboard(this.filters);
        this.kpis = payload.kpis;
        this.charts = payload.charts;
        this.table = payload.table;
      } catch (error) {
        this.error = "Unable to load analytics data. Please retry.";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async updateFilters(nextFilters) {
      this.filters = { ...this.filters, ...nextFilters };
      await this.loadDashboard();
    },
    async resetFilters() {
      this.filters = { ...defaultFilters };
      await this.loadDashboard();
    }
  }
});
