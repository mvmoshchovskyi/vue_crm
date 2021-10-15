<template>
  <div>
    <Loader v-if="loading" />
    <p v-else-if="!record" class="center">
      записів з ключем{{ $route.params.id }} не знайдно
      <router-link to="/record">додати новий запис </router-link>
    </p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">Істория</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === "income" ? "Дохід" : "Poзхід " }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Опис: {{ record.description }}</p>
              <p>Сума:{{ record.amount | currency }}</p>
              <p>Категорія: {{ record.categoryName }}</p>

              <small>{{ record.date | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data: () => ({
    loading: true,
    record: null,
  }),
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch("fetchCategoryById", record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title,
    };
    this.loading = false;
  },
};
</script>