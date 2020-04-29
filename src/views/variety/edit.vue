<template>
  <div>
    <main-box class="variety__addGenes mt25 cl-black fs14">
      <div>
        <el-form ref="addGensForm" :model="addGensForm" label-position="left" size="mini">
          <el-form-item label="品系名称:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.varietiesName"
              disabled
              placeholder="请输入品系名称"
              class="w250"
            />
            <choice-variety-btn :variety.sync="curVariety" />
          </el-form-item>
          <el-form-item label="基因型名称:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.geneName"
              placeholder="请输入基因型名名称"
              class="w250"
            />
          </el-form-item>
          <el-form-item label="饲养条件:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.miceCondition"
              placeholder="请输入饲养条件"
              class="w250"
            />
          </el-form-item>
          <el-form-item label="健康状态:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.status"
              placeholder="请输入健康状态"
              class="w250"
            />
          </el-form-item>
          <el-form-item label="毛色:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.color"
              placeholder="请输入毛色"
              class="w250"
            />
          </el-form-item>
          <el-form-item label="应用领域:" label-width="80px" class="mb0">
            <el-input
              v-model="addGensForm.area"
              type="textarea"
              placeholder="请输入应用领域"
              class="w250"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="variety__addGenes--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
        <el-button type="primary" size="small" class="w100" @click="onSubmit()">确定</el-button>
      </div>
    </main-box>
  </div>
</template>

<script>
import ChoiceVarietyBtn from '@/components/Dialogs/choice_variety'
import { addNewGenes } from '@/api/genes'

export default {
  name: 'VarietyEdit',
  components: {
    ChoiceVarietyBtn
  },
  data() {
    return {
      curVariety: null, // 当前选中的品系
      varietiesId: '',
      addGensForm: {
        varietiesName: '',
        geneName: '',
        miceCondition: '',
        status: '',
        color: '',
        area: ''
      }
    }
  },
  watch: {
    curVariety(n, o) {
      const newVariety = JSON.parse(n)
      this.varietiesId = newVariety.id
      this.addGensForm.varietiesName = newVariety.varietiesName
    }
  },
  created() {
    console.log(this.$route.params)
    if (this.$route.params) {
      const { varietiesName, geneName, miceCondition, status, color, area } = this.$route.params
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    // 提交
    onSubmit() {
      console.log(this.$store)
      const { geneName, miceCondition, status, color, area } = this.addGensForm;
      addNewGenes({
        varietiesId: this.varietiesId,
        geneName,
        miceCondition,
        status,
        color,
        area,
        userId: this.$store.getters.info.id
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
  .variety__addGenes{
    &--btns{
      bottom: 0;
      left: 0;
      padding-left: 40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(214,214,214,1);
    }
  }
</style>
