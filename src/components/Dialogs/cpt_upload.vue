<template>
  <div>
    <!-- 上传 -->
    <el-upload
      class="upload-demo"
      :action="actionUrl"
      :headers="{
        Authorization: getToken()
      }"
      name="files"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :show-file-list="false"
      :limit="5"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
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
import { getToken } from '@/utils/auth'

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
    },
    bizType: { // 上传文件对应的业务类型
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 根据是否传了id 走不同的上传接口
      actionUrl: this.id ? `${process.env.VUE_APP_BASE_API}/sysfile/uploads/${this.bizType}/${this.id}` : `${process.env.VUE_APP_BASE_API}/sysfile/uploadFiles`,
      fileList: [],
      cacheUrl: []
    }
  },
  created() {
    // this.getParams()
  },
  methods: {
    getToken,
    // getParams() {
    //   getUploadParams({
    //     attachType: this.attachType
    //   }).then((res) => {
    //     console.log(res)
    //   })
    // },
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
      this.$message.success('文件上传成功')
      console.log(response, file, fileList)
      if (!this.id && response.data.length > 0) {
        console.log(this.cacheUrl, fileList)
        // 因为设计稿只有一个上传按钮，所以没法做手动上传，就无法一次性传多张图，只能多次传单张图，为了确保done调用获得的data是全部
        if (response.data.length <= fileList.length) {
          this.cacheUrl.push(response.data[0])
        }
        if (this.cacheUrl.length === fileList.length) {
          console.log('触发done')
          this.$emit('done', this.cacheUrl, fileList)
        }
      }
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    }
  }
}
</script>

<style lang="scss">

</style>