<template>
  <div>
    <div class="page-title">
      <h3>Планування</h3>
      <h4>{{ info.bill | currency("UAH") }}</h4>
    </div>
    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      немає категорій додайте нову
      <router-link to="/categories">category</router-link>
    </p>

    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}</strong>
          {{ cat.spend | currency }} из {{ cat.limit | currency }}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{ width: cat.progressPercent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import curencyFilter from "@/filters/currency.filter"
import Loader from "../components/app/Loader.vue";
export default {
  components: { Loader },
  name: "Planing",
  data: () => ({
    loading: false,
    categories: [],
  }),
  computed: {
    ...mapGetters(["info"]),
  },

  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.categories = categories.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === "outcome")
        .reduce((total, record) => {
          return (total += +record.amount);
        }, 0);
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      const progressColor =
        percent < 60 ? "green" : percent < 100 ? "yellov" : "red";
      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0 ? 'перевищено ліміт на ': 'залишилось'} ${curencyFilter(Math.abs(tooltipValue)) }`
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });
    this.loading = false;
  },
};
</script>