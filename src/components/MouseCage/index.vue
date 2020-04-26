<template>
  <div class="mouse-cage">
    <div class="mouse-cage__header df s-jcsa s-aic">
      <div class="mouse-cage__number df s-jcc">
        <p>01<i>笼位</i></p>
        <p>25<i>房间</i></p>
        <p>42<i>架号</i></p>
      </div>
      <div class="mouse-cage__man">
        负责人
        <el-button size="mini">
          张三
          <svg-icon icon-class="shift" class="cl-green" />
        </el-button>
      </div>
      <div class="mouse-cage__status">
        <span class="isIdle">闲置</span>
        <span class="isExpt">实验</span>
        <span class="isBreed">繁育</span>
      </div>
    </div>
    <div class="mouse-cage__list df s-jcfs">
      <div class="list__title df s-fdc s-aic s-jcfs">
        <div class="list__title--female df s-fdc s-aic s-jcc">
          <svg-icon icon-class="female" class="fs40 mb4" />
          <span>15只</span>
        </div>
        <div class="list__title--male df s-fdc s-aic s-jcc">
          <svg-icon icon-class="male" class="fs40 mb4" />
          <span>15只</span>
        </div>
      </div>
      <div class="list__content">
        <div class="list__content--male df s-jcfs s-aic ofh">
          <div
            v-for="item in items"
            :key="item.id"
            class="mouse__item ta-c"
            :class="{'isChoiced': item.id == curId}"
            @click="taggle(item.id)"
          >
            <div class="pos-r">
              <svg-icon icon-class="mouse" class="fs50" />
              <p>AD-01</p>
              <span>fdafdfs</span>
              <i class="pos-a mouse__item--female">02</i>
            </div>
          </div>
        </div>
        <div class="list__content--female df s-jcfs s-aic ofh">
          <div
            v-for="item in items"
            :key="item.id"
            class="mouse__item pos-r ta-c"
            @click="taggle(item.id)"
          >
            <div class="pos-r">
              <svg-icon icon-class="mouse" class="fs50" />
              <p>AD-01</p>
              <span>fdafdfs</span>
              <i class="pos-a mouse__item--male">02</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MouseCage',
  data() {
    return {
      curId: null,
      items: [
        {
          id: 1
        }, {
          id: 2
        }, {
          id: 3
        }, {
          id: 4
        }, {
          id: 5
        }, {
          id: 6
        }, {
          id: 7
        }, {
          id: 8
        }, {
          id: 9
        }, {
          id: 10
        }, {
          id: 11
        }
      ]
    }
  },
  methods: {
    taggle(id) {
      if (this.curId === id) { // 再次点击取消选框
        this.curId = null
      } else {
        this.curId = id
      }
      console.log(id, this.curId)
    }
  }
}
</script>

<style lang="scss">
  .mouse-cage {
    width: 538px;
    height: 280px;
    border: 1px solid #D6D6D6;
    &__header {
      height: 48px;
      background: #F0F0F0;
      border-bottom: 1px solid #D6D6D6;
      font-size: 14px;
      color: #333;
    }
    &__number {
      > p {
        margin-right: 16px;
        font-size: 15px;
      }
      > p > i {
        color: #666;
      }
    }

    &__list {
      height: calc( 100% - 48px );
    }

    .list__title, .list__content {
      height: 100%;
      &--female, &--male {
        width: 66px;
        height: 50%;
      }
    }

    .list__content {
      padding: 10px 0;
      &--female, &--male {
        width: 470px;
        overflow-x: scroll;
      }
    }

    .mouse__item {
      width: 80px;
      height: 88px;
      padding: 0 13px;
      margin-right: 3px;
      box-sizing: border-box;
      border-width: 2px;
      border-style: solid;
      border-color: #fff;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
      cursor: pointer;

      &.isChoiced {
        border-color: #00CB7C;
      }

      &--female {
        background-color: #9A68B4;
      }

      &--male {
        background-color: #58A2FB;
      }

      span {
        font-size: 12px;
        color: #999;
      }

      i {
        top: 17px;
        right: -3px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 10px;
        font-size: 12px;
        color: #fff;
      }
    }

    .fs50 {
      font-size: 50px;
    }

    .isIdle{
      &::before {
        content: '●';
        color: #F6AC2D
      }
    }
    .isExpt{
      &::before {
        content: '●';
        color: #58A2FB;
      }
    }
    .isBreed{
      &::before {
        content: '●';
        color: #00CB7C;
      }
    }
  }
</style>
