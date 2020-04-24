<template>
  <div>
    <main-box class="variety__addGenes mt25 cl-black fs14">
      <div>
        <el-form ref="addGensForm" :model="addGensForm" label-position="left" size="mini">
          <el-form-item label="品系名称:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.name"
              placeholder="请输入品系名称"
              class="w250"
            />
            <choice-variety-btn />
          </el-form-item>
          <el-form-item label="基因型名称:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.genes"
              placeholder="请输入基因型名名称"
              class="w250"
            />
          </el-form-item>
          <el-form-item label="饲养条件:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.breed_condition"
              placeholder="请输入饲养条件"
              class="w250"
            />
          </el-form-item>
          <el-form-item label="健康状态:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.health"
              placeholder="请输入健康状态"
              class="w250"
            />
          </el-form-item>
          <el-form-item label="毛色:" label-width="80px" class="mb8">
            <el-input
              v-model="addGensForm.fur"
              placeholder="请输入毛色"
              class="w250"
            />
          </el-form-item>
          <el-form-item label="应用领域:" label-width="80px" class="mb0">
            <el-input
              v-model="addGensForm.domain"
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
export default {
  name: 'VarietyEdit',
  components: {
    ChoiceVarietyBtn
  },
  data() {
    return {
      addGensForm: {
        name: '',
        genes: '',
        breed_condition: '',
        health: '',
        fur: '',
        domain: ''
      }
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    // 提交
    onSubmit() {
      console.log('submit!');
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
