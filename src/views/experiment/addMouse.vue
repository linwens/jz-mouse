<template>
  <div class="mouse__info">
    <main-box class="bg-gray">
      <div class="df s-jcsb mt16">
        <div class="mouse__info1 bg-white df s-fdc s-jcsb">
          <div>
            <h6 class="mouse__info--h6">品系信息</h6>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">品系:</span><i class="mouse__info--i">A品系</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">毛色:</span><i class="mouse__info--i">白色</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">饲养条件:</span><i class="mouse__info--i">恒温箱</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">健康状态:</span><i class="mouse__info--i">健康</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">基因型:</span><i class="mouse__info--i">P65-/-</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p w-100"><span class="mouse__info--span">应用领域:</span><i class="mouse__info--i">应用于XXXXXX领域…</i></p>
            </div>
          </div>
          <div>
            <h6 class="mouse__info--h6">基本信息</h6>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">系统编号:</span><i class="mouse__info--i">AD-01</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">性别:</span><i class="mouse__info--i">雄</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">周龄:</span><i class="mouse__info--i">2周2天</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">标记:</span><i class="mouse__info--i">21</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">出生日期:</span><i class="mouse__info--i">{{ time | timeFormat('yyyy-MM-dd') }}</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">体重:</span><i class="mouse__info--i">10g</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">笼位号:</span><i class="mouse__info--i">10-01</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">状态:</span><i class="mouse__info--i">繁殖</i></p>
              <p class="mouse__info--p">
                <span class="mouse__info--span">显示颜色:</span>
                <i class="mouse__info--i dib" :style="{'width': '16px', 'height': '16px', 'backgroundColor': color}" />
              </p>
              <p class="mouse__info--p">
                <span class="mouse__info--span">附件:</span>
                <el-button type="text">查看</el-button>
                <svg-icon icon-class="upload" class="cp" />
              </p>
            </div>

          </div>
          <div>
            <h6 class="mouse__info--h6">遗传信息</h6>
            <div class="df s-jcfs s-aic">
              <p class="mouse__info--p" style="width: 540px;">
                <span class="mouse__info--span">更改位置时间:</span>
                <i class="mouse__info--i">{{ time | timeFormat('yyyy年MM月dd日 14:26:45') }}</i>
              </p>
              <p class="mouse__info--p">
                <span class="mouse__info--span">小鼠家谱:</span>
                <el-button type="text">查看</el-button>
              </p>
            </div>
          </div>
        </div>
        <div class="mouse__info2 bg-white df s-fdc s-jcsb">
          <div>
            <h6 class="mouse__info--h6">实验信息</h6>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">实验组名称:</span><i class="mouse__info--i">实验组1号</i></p>
              <p class="mouse__info--p" style="width: 205px;"><span class="mouse__info--span">起止时间:</span><i class="mouse__info--i">2020.3.28-2020.3.30</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p"><span class="mouse__info--span">分组名称:</span><i class="mouse__info--i">A小组</i></p>
              <p class="mouse__info--p"><span class="mouse__info--span">处理:</span><i class="mouse__info--i">P65-/-</i></p>
            </div>
            <div class="df s-jcfs s-aic mb8">
              <p class="mouse__info--p w-100"><span class="mouse__info--span">检测:</span><i class="mouse__info--i">检测方式名称</i></p>
            </div>
          </div>
          <div>
            <h6 class="mouse__info--h6">实验进度</h6>
            <div class="df s-jcsb s-aic mb8">
              <p class="mouse__info--p">
                <span class="mouse__info--span">检测试验结果:</span>
                <el-button type="text">查看</el-button>
                <svg-icon icon-class="upload" />
              </p>
              <p class="mouse__info--p">
                <i class="mouse__info--i mr20">
                  <svg-icon icon-class="circle" class="fs12 cl-green"></svg-icon>
                  处理时间
                </i>
                <i class="mouse__info--i">
                  <svg-icon icon-class="circle" class="fs12 cl-yellow"></svg-icon>
                  检测时间
                </i>
              </p>
            </div>
          </div>
          <div>
            <div class="pos-r">
              <svg-icon icon-class="loc-green" class="mouse__progrTag mouse__progrTag--g" :style="{'left': '20px'}" />
              <svg-icon icon-class="loc-yellow" class="mouse__progrTag mouse__progrTag--y" :style="{'left': '50px'}" />
              <el-progress :text-inside="true" :stroke-width="24" :percentage="45" color="#58A2FB" />
            </div>
            <div class="df s-jcc s-aic mt30">
              <el-button size="small" class="w100">设置时间</el-button>
              <el-button type="primary" size="small" class="w100">记录查看</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="mouse__info3 bg-white w-100 mt16">
        <div class="df mb16">
          <el-button class="w80" size="small" @click="goBack()">返回</el-button>
          <el-button class="w80" size="small">确认添加</el-button>
        </div>
        我的鼠笼
      </div>
    </main-box>
  </div>
</template>

<script>
export default {
  name: 'MouseMain',
  data() {
    return {
      activeName: 'first', // 鼠笼tab
      time: 1587375335305,
      color: '#C4C4CD'
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    // 新增小鼠
    goAdd(row) {
      this.goPage('addMouse', { id: 1 })
    },
    // 新增子鼠
    goBuild(row) {
      this.goPage('addChild', { id: 2 })
    },
    goPage(r, obj) {
      this.$router.push({ name: r, params: obj })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss">
  .mouse__info {
    &1{
      width: 680px;
      height: 352px;
      padding: 16px 24px;
    }
    &2{
      width: 428px;
      height: 352px;
      padding: 16px 24px;
    }
    &3{
      padding: 16px 16px 16px;
    }
    &--h6{
      margin-bottom: 8px;
      font-size: 16px;
      color: #333;
    }
    &--p{
      width: 180px;
      font-size: 14px;
      display: inline-block;
    }
    &--span {
      margin-right: 5px;
      color: #999;
    }
    &--i {
      color: #333;
    }
    .mouse__progrTag {
      position: absolute;
      z-index: 1;
      &--g{
        top: -12px;
      }
      &--y{
        bottom: -12px;
      }
    }
  }
</style>
