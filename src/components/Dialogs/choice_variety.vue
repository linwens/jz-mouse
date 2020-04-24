<template>
  <div class="dib">
    <el-button type="primary" @click="chooseVarity()">选择品系</el-button>
    <!-- 选择品系弹窗 -->
    <el-dialog
      title="选择品系"
      :visible.sync="varietyDialog"
    >
      <div class="mouse__varietyDialog">
        <el-radio v-model="variety_radio" label="1" class="mr0" size="small" border>品系A</el-radio>
        <el-radio v-model="variety_radio" label="2" class="mr0" size="small" border>品系B</el-radio>
        <el-radio v-model="variety_radio" label="3" class="mr0" size="small" border>品系C</el-radio>
        <el-radio v-model="variety_radio" label="4" class="mr0" size="small" border>品系D</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="varietyDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="fillVarity()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ChoiceVariety',
  data() {
    return {
      // 品系选择
      variety_radio: null,
      varietyDialog: false
    }
  },
  methods: {
    // 选择品系 or 基因型
    chooseVarity() {
      this.varietyDialog = true
    },
    fillVarity() {
      this.varietyDialog = false
      // 填充品系
    }
  }
}
</script>

<style>

</style>