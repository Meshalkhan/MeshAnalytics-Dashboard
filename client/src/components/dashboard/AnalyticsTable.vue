<template>
  <BaseCard title="Top Accounts" subtitle="Highest revenue contributors in the selected window">
    <template #actions>
      <BaseButton variant="secondary" size="sm" :disabled="!rows.length" @click="exportCsv">
        <template #leading><BaseIcon name="download" :size="14" /></template>
        Export CSV
      </BaseButton>
    </template>

    <div class="table">
      <table>
        <thead>
          <tr>
            <th v-for="column in columns" :key="column.key" :class="column.align && `align-${column.align}`">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading && !rows.length">
            <tr v-for="n in 4" :key="n" class="table__skeleton-row">
              <td v-for="col in columns" :key="col.key">
                <BaseSkeleton width="80%" height="14px" />
              </td>
            </tr>
          </template>
          <template v-else-if="rows.length">
            <tr v-for="row in rows" :key="row.id">
              <td>
                <div class="table__account">
                  <span class="table__avatar">{{ getInitials(row.account) }}</span>
                  <span>{{ row.account }}</span>
                </div>
              </td>
              <td>{{ row.region }}</td>
              <td class="align-right">{{ row.revenue }}</td>
              <td class="align-right">{{ row.conversionRate }}</td>
            </tr>
          </template>
          <tr v-else>
            <td :colspan="columns.length" class="table__empty">No accounts match the current filters.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from "../ui/BaseCard.vue";
import BaseButton from "../ui/BaseButton.vue";
import BaseIcon from "../ui/BaseIcon.vue";
import BaseSkeleton from "../ui/BaseSkeleton.vue";
import { downloadCsv } from "../../utils/csv.js";

const props = defineProps({
  rows: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
});

const columns = [
  { key: "account", label: "Account" },
  { key: "region", label: "Region" },
  { key: "revenue", label: "Revenue", align: "right" },
  { key: "conversionRate", label: "Conversion", align: "right" }
];

function getInitials(name) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function exportCsv() {
  downloadCsv("meshanalytics-top-accounts.csv", columns, props.rows);
}
</script>

<style scoped>
.table {
  margin: 0 calc(var(--space-5) * -1) calc(var(--space-5) * -1);
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

thead th {
  text-align: left;
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-subtle);
  padding: 12px var(--space-5);
  background: var(--color-surface-muted);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

tbody td {
  padding: 14px var(--space-5);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-sm);
  color: var(--color-text);
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover td {
  background: var(--color-surface-muted);
}

.align-right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.table__account {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-weight: 500;
}

.table__avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  display: grid;
  place-items: center;
}

.table__empty {
  text-align: center;
  color: var(--color-text-subtle);
  padding: var(--space-8) var(--space-5);
}
</style>
