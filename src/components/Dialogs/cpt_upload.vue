<template>
  <div>
    <!-- 上传 -->
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="5"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :file-list="fileList"
    >
      <el-button
        v-if="btnText"
        type="text"
        class="btn-text--black"
      >{{ btnText }}</el-button>
      <svg-icon v-else icon-class="upload" class="cp" />
    </el-upload>
  </div>
</template>

<script>
import { saveFiles } from '@/api/cmn'

export default {
  name: 'UploadFile',
  props: {
    id: {
      type: Number,
      default: null
    },
    type: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleSuccess(response, file, fileList) {
      // 上传成功后，调后端接口存路径
      const { id: userId } = this.$store.getters.info
      const createTme = +new Date() / 1000
      console.log(response)
      debugger
      saveFiles({
        createTme,
        createUser: userId,
        file: '',
        fileId: this.id,
        type: this.type
      }).then((res) => {})
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    }
  }
}
</script>

<style lang="scss">

</style>