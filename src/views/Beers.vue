<template>

    <div id="beers" class="w3-container">
        <table class="w3-table-all w3-hoverable">
            <tr class="w3-light-grey">
                <th>
                    <input v-model="beersData.name" @input="getBeers()"/> <br/>
                    <b>Name</b>
                </th>
                <th>
                    <select v-model="beersData.brewer_id" @change="getBeers()">
                        <option value="">All</option>
                        <option
                          v-for="brewer in brewers"
                          :key="brewer.id"
                          :value="brewer.id">
                          {{ brewer.name }}
                        </option>
                    </select> <br/>
                    <b>Brewer</b></th>
                <th>
                    <select v-model="beersData.type" @change="getBeers()">
                        <option value="">All</option>
                        <option
                          v-for="type in types"
                          :key="type.type"
                          :value="type.type">
                          {{ type.type }}
                        </option>
                    </select> <br/>
                    <b>Type</b></th>
                <th>
                    <select v-model="beersData.country_code" @change="getBeers()">
                        <option value="">All</option>
                        <option
                          v-for="country in countries"
                          :key="country.id"
                          :value="country.alpha2code">
                          {{ country.name }}
                        </option>
                    </select>
                    <br/>
                    <b>Country</b></th>
                <th>
                  Search by price from
                  <input style="width: 80px" v-model="beersData.price_from" @input="getBeers()"/> to
                  <input style="width: 80px" v-model="beersData.price_to" @input="getBeers()"/><br/>
                  <b>Price per litre</b></th>
            </tr>
            <template v-for="(beer, index) in beers">
              <span :key="index"></span>
                <tr @click="addOrDeleteEvent(index)">
                    <td>{{ beer.name }}</td>
                    <td>{{ beer.brewer.name }}</td>
                    <td>{{ beer.type }}</td>
                    <td>{{ beer.country.name }}</td>
                    <td>{{ beer.price_per_litre }}</td>
                </tr>

                <tr v-show="itemsToShow.includes(index)" class="info" :key="index">
                    <td colspan="3" style="text-align: center; vertical-align: middle">
                        <img v-bind:src="beer.image_url"
                             onerror="this.error=null;this.src='https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'"/>
                    </td>
                    <td colspan="2" style="text-align: left; vertical-align: middle">
                        <b>Size:</b> {{ beer.size }} <br/>
                        <b>Price:</b> {{ beer.price }} <br/>
                    </td>
                </tr>
            </template>
        </table>
            <pagination :pagination="pagination"
                        @prev="--beersData.page; getBeers();"
                        @next="beersData.page++; getBeers();">
            </pagination>
    </div>
</template>

<script>
import axios from 'axios';
import Pagination from '@/components/Pagination.vue';

const API = process.env.VUE_APP_API_URL;

export default {
  name: 'Beers',
  mounted() {
    this.beersData.brewer_id = this.$route.query.brewer_id;
    this.getBeers();
    this.getBrewers();
    this.getTypes();
    this.getCountries();
  },
  components: {
    Pagination,
  },
  data() {
    return {
      beers: [],
      beersData: {
        per_page: 20,
        page: 1,
        name: '',
        brewer_id: '',
        type: '',
        country_code: '',
        price_from: '',
        price_to: '',
      },
      pagination: {
        prevPage: '',
        nextPage: '',
        totalPage: '',
        from: '',
        to: '',
        total: '',
      },
      brewers: [],
      types: [],
      countries: [],
      itemsToShow: [],
    };
  },
  methods: {
    getBeers() {
      axios.get(`${API}beers?`, { params: this.beersData })
        .then((response) => {
          this.beers = response.data.data;
          this.configPagination(response.data.meta);
          this.itemsToShow = [];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    configPagination(meta) {
      this.pagination.total = +meta.total;
      this.pagination.totalPages = +meta.last_page;
      this.pagination.from = this.pagination.total ? ((this.beersData.page - 1) * this.beersData.per_page) + 1 : ' ';
      this.pagination.to = (this.beersData.page * this.beersData.per_page)
        > this.pagination.total
        ? this.pagination.total
        : this.beersData.page * this.beersData.per_page;
      this.pagination.prevPage = this.beersData.page > 1 ? this.beersData.page : '';
      this.pagination.nextPage = this.beersData.page < this.pagination.totalPages ? this.beersData.page + 1 : '';
    },
    getBrewers() {
      axios.get(`${API}brewers`)
        .then((response) => {
          this.brewers = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTypes() {
      axios.get(`${API}types`)
        .then((response) => {
          this.types = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCountries() {
      axios.get(`${API}countries`)
        .then((response) => {
          this.countries = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addOrDeleteEvent(index) {
      const i = this.itemsToShow.indexOf(index);
      if (i >= 0) {
        this.itemsToShow.splice(i, 1);
      } else {
        this.itemsToShow.push(index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hiddenDetails {
    display: none;
}
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
tr.info {
  background: white !important;
}
</style>
