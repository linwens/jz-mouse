<template>
  <div class="dib">
    <el-button type="primary" :disabled="disabled" @click="chooseVarity()">选择品系</el-button>
    <!-- 选择品系弹窗 -->
    <el-dialog
      title="选择品系"
      :visible.sync="varietyDialog"
    >
      <div class="mouse__varietyDialog">
        <el-radio
          v-for="item in list"
          :key="item.id"
          v-model="variety_radio"
          :label="item"
          class="mr10 ml0 mb10"
          size="small"
          border
        >{{ item.varietiesName }}</el-radio>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="varietyDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="fillVarity()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { varietiesList } from '@/api/variety'
export default {
  name: 'ChoiceVariety',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      // 品系选择
      variety_radio: null,
      varietyDialog: false
    }
  },
  created() {
    varietiesList().then((res) => {
      this.list = res.data.records
    })
  },
  methods: {
    // 选择品系 or 基因型
    chooseVarity() {
      this.varietyDialog = true
    },
    fillVarity() {
      this.varietyDialog = false
      console.log(this.variety_radio)
      // 填充品系
      this.$emit('update:variety', JSON.stringify(this.variety_radio))
    }
  }
}
</script>

<style lang="scss">
  .mouse__varietyDialog {
    .el-radio--small.is-bordered{
      padding: 8px 10px 0;
      text-align: center;
    }
    .el-radio__input{
      display: none;
    }
    .el-radio--small.is-bordered .el-radio__label{
      padding-left: 0;
      font-size: 14px;
    }
  }

</style>
