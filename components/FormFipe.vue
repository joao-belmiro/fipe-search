<template>
  <section class="search-container">
    <div class="border-green">
      <form @submit.prevent="search(vehicleType, brandCode, modelCode, yearsCode)">
        <div class="inputs-container">
          <div class="select input-field" placeholder="Tipo de veículo">
            <select v-model="vehicleType" required>
              <option value="cars">
                Carros
              </option>
              <option value="trucks">
                Caminhões
              </option>
              <option value="motorcycles">
                Motos
              </option>
            </select>
          </div>
          <div
            class="select input-field"
          >
            <select
              v-model="brandCode"
              placeholder=""
              :disabled="brandsTypeVehicleDisabled"
              required
            >
              <option value="" disabled selected>
                Marca
              </option>
              <option
                v-for="brand in brandsTypeVehicle"
                :key="brand.code"
                :value="brand.code"
              >
                {{ brand.name }}
              </option>
            </select>
          </div>
          <div
            class="select input-field"
          >
            <select
              v-model="modelCode"
              placeholder="Modelo"
              :disabled="modelsBrandsDisabled"
              required
            >
              <option value="" disabled selected>
                Modelo
              </option>
              <option
                v-for="model in modelsByBrand"
                :key="model.code"
                :value="model.code"
              >
                {{ model.name }}
              </option>
            </select>
          </div>
          <div
            class="select input-field"
          >
            <select
              v-model="yearsCode"
              placeholder="Ano "
              :disabled="modelsBrandsDisabled"
              required
            >
              <option value="" disabled selected>
                Ano do Modelo
              </option>
              <option
                v-for="year in yearsByModel"
                :key="year.code"
                :value="year.code"
              >
                {{ year.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="submit-container">
          <button type="submit" class="btn">
            <img src="@/static/search.svg" alt="icone de pesquisa">
            <strong> Pesquisar </strong>
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FormFipe',
  data () {
    return {
      vehicleType: 'cars',
      brandsTypeVehicle: [],
      brandsTypeVehicleDisabled: true,
      brandCode: '',
      modelsByBrand: [],
      modelsBrandsDisabled: true,
      modelCode: '',
      yearsByModel: [],
      yearsModelDisabled: true,
      yearsCode: ''
    }
  },
  watch: {
    vehicleType (current, previuos) {
      this.fetchBrands(current)
      if (current !== previuos) {
        this.brandCode = ''
        this.modelCode = ''
      }
    },
    brandCode (current, previuos) {
      if (current !== '') {
        this.fetchModelsByBrand(this.vehicleType, current)
      }
      if (current !== previuos) {
        this.modelCode = ''
      }
    },
    modelCode (current, previuos) {
      if (current !== '') {
        this.fetchYearsByModel(this.vehicleType, this.brandCode, current)
      }

      if (current !== previuos) {
        this.yearsCode = ''
      }
    }
  },
  mounted () {
    this.fetchBrands(this.vehicleType)
  },
  methods: {
    async search (vehicleType, brandCode, modelCode, yearsCode) {
      const response = await this.$axios.$get(`/${vehicleType}/brands/${brandCode}/models/${modelCode}/years/${yearsCode}`)
      const responseHistory = await this.$axios.$get(`/${vehicleType}/${response.codeFipe}/years/${yearsCode}/history`)
      this.$store.commit('setFipeData', response)
      this.$store.commit('setFipeHistory', responseHistory.priceHistory)
      this.$store.commit('setAllFetched', true)
    },
    async fetchBrands (vehicleType) {
      const response = await this.$axios.$get(`/${vehicleType}/brands`)
      this.brandsTypeVehicle = response
      this.brandsTypeVehicleDisabled = false
    },
    async fetchModelsByBrand (vehicleType, brandCode) {
      const response = await this.$axios.$get(`/${vehicleType}/brands/${brandCode}/models`)
      this.modelsByBrand = response
      this.modelsBrandsDisabled = false
    },
    async fetchYearsByModel (vehicleType, brandCode, modelCode) {
      const response = await this.$axios.$get(`/${vehicleType}/brands/${brandCode}/models/${modelCode}/years`)
      this.yearsByModel = response
      this.yearsModelDisabled = false
    }
  }
}
</script>

<style>
.search-container {
  margin-top: 30px;
}
.border-green {
  padding: 32px;
  margin: auto;
  width: 700px;
  background-color: #2d3748;
  border-radius: 10px;
}
.btn {
  outline: none !important;
  background-color: #00dc82;
  color: #f7fafc;
  font-size: 16px;
  width: 170px;
  border-radius: 8px;
  height: 40px;
  border: none;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
}
.btn:hover {
  cursor: pointer;
  box-shadow: 0 0 5px #00dc82;

}
.submit-container {
  display: flex;
  flex-direction: row;
  flex-direction: row-reverse;
}
input:focus {
  outline: none !important;
  border: 2px solid #00dc82;
  border-color: #00dc82;
  box-shadow: 0 0 10px #00dc82;
}
select:focus {
  outline: none !important;
  border: 1px solid #00dc82;
  border-color: #00dc82;
  box-shadow: 0 0 5px #00dc82;
}
.input-field {
  border: 1px solid #00dc82;
  margin-bottom: 30px;
  width: 47%;
  height: 50px;
  border-radius: 6px;
}
.inputs-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
}

select {
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  flex: 1;
  padding: 0 1em;
  color: #fff;
  background-color: #1a202c;
  background-image: none;
  cursor: pointer;
  font-size: 16px;
}
select::-ms-expand {
  display: none;
}
.select {
  position: relative;
  display: flex;
  border-radius: .25em;
  overflow: hidden;
}
.select::after {
  content: '\25BC';
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  background-color: #34495e;
  transition: .25s all ease;
  pointer-events: none;
}
.select:hover::after {
  color: #00dc82;
}

@media screen and (max-width: 800px) {
  .input-field {
    width: 100%;
  }

  .border-green {
    width: auto;
    margin: 0 16px;
    padding: 16px;
  }

  .btn {
    width: 100%;
  }
}
</style>
