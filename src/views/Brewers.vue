<template>
<div id="brewers" class="w3-container">
    <table class="w3-table-all w3-hoverable">
        <tr class="w3-light-grey">
            <th><b>Id</b></th>
            <th><b>Name</b></th>
            <th><b>Number of beers</b></th>
        </tr>
        <tr v-for="brewer in brewers" @click="redirectToBeer(brewer.id)" :key="brewer.id">
            <td>{{ brewer.id }}</td>
            <td>{{ brewer.name }}</td>
            <td>{{ brewer.amount }}</td>
        </tr>
    </table>
    <pagination :pagination="pagination"
                @prev="--brewersData.page; getBrewers();"
                @next="brewersData.page++; getBrewers();">
    </pagination>
</div>
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/Pagination.vue';

const API = process.env.VUE_APP_API_URL;

export default {
  name: 'Brewers',
  mounted() {
    this.getBrewers();
  },
  components: {
    Pagination,
  },
  data() {
    return {
      brewers: [],
      brewersData: {
        per_page: 20,
        page: 1,
      },
      pagination: {
        prevPage: '',
        nextPage: '',
        totalPage: '',
        from: '',
        to: '',
        total: '',
      },
    };
  },
  methods: {
    getBrewers() {
      axios.get(`${API}brewers`, { params: this.brewersData })
        .then((response) => {
          this.brewers = response.data.data;
          this.configPagination(response.data.meta);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    configPagination(meta) {
      this.pagination.total = +meta.total;
      this.pagination.totalPages = +meta.last_page;
      this.pagination.from = this.pagination.total ? ((this.brewersData.page - 1) * this.brewersData.per_page) + 1 : ' ';
      this.pagination.to = (this.brewersData.page * this.brewersData.per_page)
        > this.pagination.total
        ? this.pagination.total
        : this.brewersData.page * this.brewersData.per_page;
      this.pagination.prevPage = this.brewersData.page > 1 ? this.brewersData.page : '';
      this.pagination.nextPage = this.brewersData.page < this.pagination.totalPages ? this.brewersData.page + 1 : '';
    },
    redirectToBeer(id) {
      this.$router.push(`/?brewer_id=${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
th {
  background-color: LightGrey !important;
}
tr {
  background-color: whitesmoke !important;
}
tr:hover {
  cursor: pointer;
  background-color: white !important;
}
</style>
