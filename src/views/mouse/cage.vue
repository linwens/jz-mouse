<template>
  <div>
    <main-box class="mouse__cageChoice fs14 cl-black">
      <div class="mb16">
        <p class="mouse__cageChoice--p">
          剩余小鼠: 
          <span>{{ female }}只 (<i class="cl-purple">雌</i>)</span>
          /
          <span>{{ male }}只 (<i class="cl-blue">雄</i>)</span>
        </p>
      </div>
      <div class="mb16">
        <el-button size="small" class="w80">放入</el-button>
        <el-button size="small" class="w80">新增笼位</el-button>
      </div>
      <div class="df">
        <mouse-cage
          v-for="(item, index) in cageList"
          :key="index"
          :all-data="item"
          :is-active="isMoving || choosedCage === item.id || isDeling"
          :disabled="isBuilding&&(choosedCage !== item.id)"
          :choiced-list.sync="choicedList"
          :is-choosing-cage="isChoosingCage"
          :cage-id="item.id"
          :choosed-cage.sync="choosedCage"
        />
      </div>
      <div class="mouse__cageChoice--btns pos-a w-100 h60 df s-aic">
        <el-button size="small" class="w100 mr6" @click="goBack()">返回</el-button>
      </div>
    </main-box>
  </div>
</template>

<script>
import MouseCage from '@/components/MouseCage'
import { fetchCageList } from '@/api/mouse'

export default {
  name: 'CageChoice',
  components: {
    MouseCage
  },
  data() {
    return {
      male: 50,
      female: 50,
      cageList: [], // 鼠笼列表
      cagePage: {
        total: 0, // 总页数
        page: 1, // 当前页数
        limit: 10 // 每页显示多少条
      },
      // 移笼相关
      moveBtnText: '移笼',
      isMoving: false, // 正在移笼标识
      isChoosingCage: false, // 正在选鼠笼标识
      choicedList: [], // 当前选中的小鼠列表
      choosedCage: null, // 当前选中的鼠笼id
      // 新建子鼠
      buildBtnText: '新建子鼠',
      isBuilding: false, // 正在新建子鼠标识
      // 删除小鼠
      delBtnText: '移除小鼠',
      isDeling: false // 正在删除小鼠标识
    }
  },
  created() {
    this.getCageList()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    // 鼠笼列表
    getCageList() {
      this.tableLoading = true
      fetchCageList(Object.assign({
        current: this.cagePage.page,
        size: this.cagePage.limit
      })).then(response => {
        this.cageList = response.data.records
        this.cagePage.total = response.data.total
      }).finally(() => {
        this.tableLoading = false
      })
    },
  }
}
</script>

<style lang="scss">
  .mouse__cageChoice{
    padding-top: 17px;
    &--p{
      display: inline-block;
      color: #999;
      span{
        color: #333;
      }
    }
    &--btns {
      bottom: 0;
      left: 0;
      padding-left: 40px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(214,214,214,1);
    }
  }
</style>
