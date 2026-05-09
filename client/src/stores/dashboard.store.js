import { defineStore } from "pinia";
import { fetchDashboard } from "../services/dashboard.service.js";
import { DEFAULT_FILTERS } from "../constants/filters.js";

const emptyCharts = () => ({
  revenueTrend: { labels: [], datasets: [] },
  channelPerformance: { labels: [], datasets: [] },
  segmentBreakdown: { labels: [], datasets: [] }
});

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    status: "idle",
    error: null,
    lastUpdated: null,
    filters: { ...DEFAULT_FILTERS },
    kpis: [],
    charts: emptyCharts(),
    table: [],
    inflightController: null
  }),
  getters: {
    isLoading: (state) => state.status === "loading",
    hasData: (state) => state.kpis.length > 0,
    isInitial: (state) => state.status === "idle" && state.kpis.length === 0
  },
  actions: {
    async loadDashboard() {
      if (this.inflightController) {
        this.inflightController.abort();
      }
      const controller = new AbortController();
      this.inflightController = controller;
      this.status = "loading";
      this.error = null;

      try {
        const snapshot = await fetchDashboard(this.filters, { signal: controller.signal });
        if (controller.signal.aborted) return;
        this.kpis = snapshot.kpis;
        this.charts = snapshot.charts;
        this.table = snapshot.table;
        this.lastUpdated = snapshot.generatedAt;
        this.status = "success";
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") return;
        this.error = err.message || "Unable to load analytics data.";
        this.status = "error";
      } finally {
        if (this.inflightController === controller) {
          this.inflightController = null;
        }
      }
    },
    async updateFilters(nextFilters) {
      this.filters = { ...this.filters, ...nextFilters };
      await this.loadDashboard();
    },
    async resetFilters() {
      this.filters = { ...DEFAULT_FILTERS };
      await this.loadDashboard();
    }
  }
});
