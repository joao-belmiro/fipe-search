<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    chartData: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: true
    }
  },
  watch: {
    chartData () {
      this.renderChart(this.chartData, this.options)
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
