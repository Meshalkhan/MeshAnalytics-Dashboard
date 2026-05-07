<template>
  <section class="data-table-card">
    <div class="section-header">
      <h2>Top Accounts</h2>
      <button class="btn-secondary" @click="exportCsv">Export CSV</button>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Region</th>
            <th>Revenue</th>
            <th>Conversion Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.account">
            <td>{{ row.account }}</td>
            <td>{{ row.region }}</td>
            <td>{{ row.revenue }}</td>
            <td>{{ row.conversionRate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  rows: { type: Array, default: () => [] }
});

function exportCsv() {
  const header = "Account,Region,Revenue,Conversion Rate";
  const lines = props.rows.map((row) => [row.account, row.region, row.revenue, row.conversionRate].join(","));
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "analytics-export.csv";
  link.click();
  URL.revokeObjectURL(url);
}
</script>
