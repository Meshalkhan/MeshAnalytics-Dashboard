<template>
  <section class="section-view">
    <div class="section-view__toolbar">
      <BaseButton variant="secondary" class="section-view__back" @click="$emit('back')">
        <template #leading><BaseIcon name="arrowLeft" :size="16" /></template>
        Back to Dashboard
      </BaseButton>
    </div>

    <BaseCard :title="meta.title" :subtitle="meta.subtitle">
      <div class="section-view__body">
        <p>{{ meta.description }}</p>
        <ul>
          <li v-for="item in meta.bullets" :key="item">{{ item }}</li>
        </ul>
        <BaseButton variant="primary" class="section-view__cta" @click="$emit('back')">
          <template #leading><BaseIcon name="arrowLeft" :size="16" /></template>
          Back to Dashboard
        </BaseButton>
      </div>
    </BaseCard>
  </section>
</template>

<script setup>
import { computed } from "vue";
import BaseCard from "../components/ui/BaseCard.vue";
import BaseButton from "../components/ui/BaseButton.vue";
import BaseIcon from "../components/ui/BaseIcon.vue";

const props = defineProps({
  section: { type: String, required: true }
});

defineEmits(["back"]);

const CONTENT = {
  reports: {
    title: "Reports",
    subtitle: "Scheduled and on-demand analytics packs",
    description: "Build recurring exports for leadership reviews and share pipeline snapshots with stakeholders.",
    bullets: [
      "Weekly revenue packs with region breakdowns",
      "Conversion funnel snapshots by segment",
      "CSV and PDF delivery to your workspace"
    ]
  },
  customers: {
    title: "Customers",
    subtitle: "Account health and expansion signals",
    description: "Monitor active accounts, renewal risk, and expansion opportunities across your book of business.",
    bullets: [
      "Account scoring based on conversion velocity",
      "Region and segment concentration views",
      "Jump back to dashboard filters for deeper analysis"
    ]
  },
  segments: {
    title: "Segments",
    subtitle: "Cohort definitions used by the dashboard",
    description: "Enterprise, Mid-Market, and SMB segments drive KPI scaling and chart contribution on the main dashboard.",
    bullets: [
      "Enterprise: strategic accounts and larger deal sizes",
      "Mid-Market: balanced volume and ACV",
      "SMB: high-volume, faster conversion cycles"
    ]
  },
  settings: {
    title: "Settings",
    subtitle: "Workspace preferences",
    description: "Manage display defaults for period, region, and segment filters used across MeshAnalytics.",
    bullets: [
      "Default filters applied on first load",
      "Notification preferences for KPI alerts",
      "Export filename conventions for CSV downloads"
    ]
  }
};

const meta = computed(() => CONTENT[props.section] || CONTENT.settings);
</script>

<style scoped>
.section-view {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
}

.section-view__toolbar {
  display: flex;
  align-items: center;
}

.section-view__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  color: var(--color-text-muted);
  font-size: 14px;
  line-height: 1.5;
}

.section-view__body ul {
  margin: 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-view__body li {
  color: var(--color-text);
}

@media (max-width: 600px) {
  .section-view__toolbar :deep(.btn),
  .section-view__cta {
    width: 100%;
  }
}
</style>
