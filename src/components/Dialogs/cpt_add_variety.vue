<template>
  <div class="dib">
    <el-button type="primary" @click="varietyDialog = true">{{ btnText }}</el-button>
    <!-- 新增品系弹窗 -->
    <el-dialog
      :title="btnText"
      :visible.sync="varietyDialog"
      width="433px"
    >
      <div class="mouse__varietyDialog">
        <el-form ref="addVarietyForm" :model="addVarietyForm" label-position="left" size="mini">
          <el-form-item
            label="品系名称:"
            label-width="80px"
            class="mb8"
            prop="name"
            :rules="[
              { required: true, message: '品系名称不能为空'}
            ]"
          >
            <el-input
              v-model="addVarietyForm.name"
              placeholder="请输入品系名称"
              class="w250"
            />
          </el-form-item>
        </el-form>
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
  name: 'VarietyEdit',
  props: {
    btnText: {
      type: String,
      default: '新增品系'
    }
  },
  data() {
    return {
      addVarietyForm: {
        name: ''
      },
      varietyDialog: false
    }
  },
  methods: {
    fillVarity() {
      this.$refs['addVarietyForm'].validate((valid) => {
        if (valid) {
          this.varietyDialog = false
          // 提交成功后触发done
          this.$emit('done')
        } else {
          return false
        }
      })
      // 填充品系
    }
  }
}
</script>

<style lang="scss">
</style>
