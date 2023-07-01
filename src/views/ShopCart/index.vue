<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" :checked="cart.isChecked" @change="updateCheck(cart, $event)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="hander('mins', -1, cart)">-</a>
            <input type="number" :value="cart.skuNum" @change="hander('change', $event.target.value * 1, cart)">
            <a class="plus" @click="hander('plus', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartList(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isChecked && cartInfoList.length > 0"
          @change="updateAllCheck(cartInfoList, $event)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteSelectCartList(cartInfoList)">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{ selectTotal }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import debounce from 'lodash/debounce'
import router from '@/router';
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$store.dispatch("getCartList");
    },
    hander: debounce(async function (flag, disNum, cart) {
      switch (flag) {
        case "mins":
          cart.skuNum > 1 ? disNum = -1 : disNum = 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1)
            disNum = 0;
          disNum = parseInt(disNum) - cart.skuNum;
          break;
        case "plus":
          disNum = 1;
          break;
      }
      if (disNum == 0)
        return this.getData();
      try {
        await this.$store.dispatch("addOrUpdateShopCart", { skuId: cart.skuId, skuNum: disNum });
        this.getData();
      }
      catch (error) {
        alert(error.message);
      }
    }, 500),
    deleteCartList(cart) {
      try {
        this.$store.dispatch("deleteCartListById", cart.skuId);
        this.getData();
      }
      catch (error) {
        alert(error.message);
      }
    },
    async updateCheck(cart, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckById", { skuId: cart.skuId, isChecked: isChecked });
        this.getData();
      }
      catch (error) {
        alert(error.message);
      }
    },
    updateAllCheck(cartInfoList, event) {
      let isChecked = event.target.checked ? "1" : "0";
      cartInfoList.forEach(item => {
        if (item.isChecked != isChecked)
          this.updateCheck(item, event);
      });
    },
    deleteSelectCartList(cartInfoList) {
      cartInfoList.forEach(item => {
        if (item.isChecked == 1)
          this.deleteCartList(item);
      });
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        sum += item.cartPrice * item.skuNum;
      });
      return sum;
    },
    isChecked() {
      return this.cartInfoList.every(item => item.isChecked == 1);
    },
    selectTotal() {
      let sum = 0;
      this.cartInfoList.forEach(item => {
        if (item.isChecked == 1)
          sum++;
      });
      return sum;
    }
  },
  components: { router }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      &>div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;

      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        list-style-type: none;

        a {
          text-decoration: none;
        }

        &>li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;

        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            cursor: pointer;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            cursor: pointer;
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
            cursor: pointer;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        cursor: pointer;
        text-decoration: none;
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
          text-decoration: none;
        }
      }
    }
  }
}
</style>