<template>
  <div class="dib">
    <el-button type="primary" size="mini" class="w60" @click="addGenesDialog = true">{{ btnText }}</el-button>
    <!-- 新增基因弹窗 -->
    <el-dialog
      title="新增基因型"
      :visible.sync="addGenesDialog"
      width="450px"
    >
      <div>
        <el-form ref="addGensForm" :model="addGensForm" label-width="90px" label-position="left" size="mini">
          <el-form-item label="品系名称:" label-width="80.56px" style="padding-left: 9.44px;" class="mb0">
            <span>{{ varietiesName }}</span>
          </el-form-item>
          <el-form-item
            label="基因型名称:"
            prop="geneName"
            class="mb18"
            :rules="[
              { required: true, message: '基因型名称不能为空', trigger: 'change' }
            ]">
            <el-input v-model="addGensForm.geneName" />
          </el-form-item>
          <el-form-item label="饲养条件:" label-width="80.56px" style="padding-left: 9.44px;" class="mb18">
            <el-input v-model="addGensForm.miceCondition" />
          </el-form-item>
          <el-form-item label="健康状态:" label-width="80.56px" style="padding-left: 9.44px;" class="mb18">
            <el-input v-model="addGensForm.status" />
          </el-form-item>
          <el-form-item label="毛色:" label-width="80.56px" style="padding-left: 9.44px;" class="mb18">
            <el-input v-model="addGensForm.color" />
          </el-form-item>
          <el-form-item label="应用领域:" label-width="80.56px" style="padding-left: 9.44px;" class="mb0">
            <el-input v-model="addGensForm.area" type="textarea" />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="addGenesDialog = false">取 消</el-button>
        <el-button type="primary" size="small" @click="doAddGenes()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addNewGenes } from '@/api/genes'

export default {
  name: 'VarietyEdit',
  props: {
    btnText: {
      type: String,
      default: '新增'
    },
    genesData: {
      type: String,
      default: ''
    },
    // 品系id
    varietiesId: {
      type: Number,
      default: 0
    },
    // 品系名称
    varietiesName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 新增基因型
      addGenesDialog: false,
      // 新增基因型表单
      addGensForm: {
        geneName: '',
        miceCondition: '',
        status: '',
        color: '',
        area: ''
      }
    }
  },
  methods: {
    doAddGenes() {
      this.$refs['addGensForm'].validate((valid) => {
        if (valid) {
          this.addGenesDialog = false
          const { source, geneName, miceCondition, status, color, area } = this.addGensForm
          addNewGenes({
            area,
            color,
            createUser: this.$store.getters.info.id,
            geneName,
            miceCondition,
            source,
            status,
            varietiesId: this.varietiesId
          }).then((res) => {
            console.log(res)
            this.addGensForm.id = res.data
            this.$emit('update:genesData', JSON.stringify(this.addGensForm))
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
