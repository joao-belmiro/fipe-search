<template>
  <section v-if="$store.getters.getAllFetched" class="l-container">
    <div class="l-item">
      <div class="l-info">
        <h1 class="l-info-title">
          {{ getFipeData.brand }}, {{ getFipeData.model }} - {{ getFipeData.modelYear }}
        </h1>
        <div class="group-info">
          <img src="@/static/money.svg" class="group-icon" alt="icone de preço">
          <div class="grouptext">
            <h3>Preço</h3>
            <p>{{ getFipeData.price }}</p>
          </div>
        </div>
        <div class="group-info">
          <img src="@/static/reference.svg" class="group-icon" alt="icone de preço">
          <div class="grouptext">
            <h3>Mês de referência</h3>
            <p>{{ getFipeData.referenceMonth }}</p>
          </div>
        </div>
        <div class="group-info">
          <img src="@/static/gas_pump.svg" class="group-icon" alt="icone de preço">
          <div class="grouptext">
            <h3> Combustível</h3>
            <p>{{ getFipeData.fuel }}</p>
          </div>
        </div>
        <div class="group-info">
          <img src="@/static/code.svg" class="group-icon" alt="icone de preço">
          <div class="grouptext">
            <h3>Código Fipe</h3>
            <p>{{ getFipeData.codeFipe }}</p>
          </div>
        </div>
        <div class="chart-title">
          <img src="@/static/time-line.svg" class="chart-icon" alt="icone de grafico">
          <h4 class="hist-text">
            Histórico de preços
          </h4>
        </div>
        <div class="history-chart">
          <Line-chart
            :chart-data="getChartData"
            :options="optionsChart"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LineChart from '../components/LineChart.vue'
export default {
  name: 'DataFipe',
  components: {
    LineChart
  },
  data () {
    return {
      optionsChart: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            label: (tooltipItems, data) => {
              return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(tooltipItems.yLabel)
            }
          }
        },
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          position: 'bottom',
          color: '#00dc82'
        },
        scales: {
          xAxes: [{
            ticks: {
              fontColor: '#CCC'
            }
          }],
          yAxes: [{
            ticks: {
              fontColor: '#CCC',
              callback: (value) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }
            },
            color: '#00dc82'
          }]
        }
      }
    }
  },
  computed: {
    getFipeData () {
      return this.$store.state.fipeData
    },
    getChartData () {
      return {
        labels: this.$store.getters.getFipeHistory.months,
        datasets: [{
          label: 'Valor ',
          backgroundColor: '#00dc82',
          data: this.$store.getters.getFipeHistory.values,
          fill: false,
          tension: 0.1,
          borderColor: '#00dc82'
        }]
      }
    }
  }
}
</script>

<style>
hr {
  height: 0.5px;
  background-color: #f7fafc;
  margin: 16px 0;
}
.chart-title {
  padding-top: 16px;
  border-top: 1px dashed #f7fafc;
  margin: 16px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  column-gap: 16px;
}
.chart-icon {
  width: 30px;
}
.group-info {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  column-gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}
.md-bottom {
  margin-bottom: 30px;
}
.l-container {
  margin-top: 32px;
}
.l-item {
  border-radius: 10px;
  margin: auto;
  background-color: #2d3748;
  width: 700px;
  color: #f7fafc;
  padding: 32px;
}
.l-info {
  color: #f7fafc;
}
.l-info-title {
  color: #00dc82;
  font-size: 32px;
  margin-bottom: 16px;
}
.grouptext h3 {
  letter-spacing: 2px;
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 8px;
}

.grouptext p {
  font-size: 18px;
  letter-spacing: 1px;
}

.hist-text {
  color: #00dc82;
}

@media screen and (max-width: 800px) {
  .history-chart {
    overflow-x: auto;
  }
  .l-item {
    margin: 32px 16px;
    padding: 16px;
    width: auto ;
  }
}
</style>
