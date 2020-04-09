<template>
  <div class="app-container">
    <el-button icon="el-icon-question" type="primary" @click.prevent.stop="guide">
      {{ text }}
    </el-button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'

export default {
  name: 'Guide',
  props: {
    text: { // 按钮文案
      type: String,
      default: 'show Guide'
    },
    steps: { // 引导需要一个步骤的数组
      type: Array,
      default: function() {
        return steps
      }
    }
  },
  data() {
    return {
      driver: null
    }
  },
  mounted() {
    // https://github.com/kamranahmedse/driver.js
    this.driver = new Driver()
  },
  methods: {
    guide() {
      console.log(this.steps)
      this.driver.defineSteps(this.steps)
      this.driver.start()
    }
  }
}
</script>
