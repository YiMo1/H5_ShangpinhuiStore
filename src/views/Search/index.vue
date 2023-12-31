<template>
  <div>
    <TypeNav></TypeNav>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <li class="with-x" v-for="(attrVal, index) in searchParams.props" :key="index">{{ attrVal.split(':')[1] }}
              <i @click="removeAttr(attrVal)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"></SearchSelector>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isActive }" @click="changeOrder(1)">
                  <a>综合
                    <span v-show="isActive">
                      <span v-show="!isDesc">⬆</span>
                      <span v-show="isDesc">⬇</span>
                    </span>
                  </a>
                </li>
                <li :class="{ active: !isActive }" @click="changeOrder(2)">
                  <a>价格
                    <span v-show="!isActive">
                      <span v-show="!isDesc">⬆</span>
                      <span v-show="isDesc">⬇</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${goods.id}`"><img :src="goods.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="goods.title" v-html="goods.title"></a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <pagination :pageNo="pageNo" :pageSize="pageSize" :total="total" :totalPage="totalPages" @goPage="goPage">
          </pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector'
import TypeNav from '@/components/TypeNav'
import { mapGetters, mapState } from 'vuex'
import pagination from '@/components/Pagination'
export default {
  name: 'Search',
  data() {
    return {
      searchParams: {
        categoryName: undefined,
        category1Id: undefined,
        category2Id: undefined,
        category3Id: undefined,
        keyword: undefined,
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: undefined
      }
    }
  },
  components: {
    SearchSelector,
    TypeNav,
    pagination
  },
  beforeMount() {
    Object.assign(this.searchParams, this.$route.params, this.$route.query)
  },
  mounted() {
    this.getSearchData()
  },
  computed: {
    ...mapGetters(['goodsList', 'trademarkList', 'attrsList']),
    isActive() {
      return this.searchParams.order.indexOf('1') != -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') != -1
    },
    ...mapState({
      pageNo: (state) => state.search.searchInfo.pageNo,
      pageSize: (state) => state.search.searchInfo.pageSize,
      total: (state) => state.search.searchInfo.total,
      totalPages: (state) => state.search.searchInfo.totalPages
    }),
  },
  methods: {
    getSearchData() {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    removeCategoryName() {
      Object.assign(this.searchParams, { category1Id: undefined, category2Id: undefined, category3Id: undefined, categoryName: undefined })
      this.getSearchData()
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    removeKeyword() {
      this.$bus.$emit('clear')
      this.searchParams.keyword = undefined
      this.getSearchData()
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      this.getSearchData()
    },
    removeTrademark() {
      this.searchParams.trademark = undefined
      this.getSearchData()
    },
    attrInfo(attrId, attrVal, attrName) {
      if (this.searchParams.props.indexOf(`${attrId}:${attrVal}:${attrName}`) == -1) {
        this.searchParams.props.push(`${attrId}:${attrVal}:${attrName}`)
      }
      this.getSearchData()
    },
    removeAttr(attrVal) {
      this.searchParams.props.splice(this.searchParams.props.indexOf(attrVal), 1)
      this.getSearchData()
    },
    changeOrder(flag) {
      let originFlag = this.searchParams.order.split(':')[0]
      let originOrder = this.searchParams.order.split(':')[1]
      if (flag == originFlag) {
        this.searchParams.order = `${flag}:${originOrder == 'desc' ? 'asc' : 'desc'}`
      } else {
        this.searchParams.order = `${flag}:desc`
      }
      this.searchParams.pageNo = 1
      this.getSearchData()
    },
    goPage(pageNo) {
      this.searchParams.pageNo = pageNo
      this.getSearchData()
    }
  },
  watch: {
    $route(newVal, oldVal) {
      Object.assign(this.searchParams, { category1Id: undefined, category2Id: undefined, category3Id: undefined })
      Object.assign(this.searchParams, this.$route.params, this.$route.query)
      this.getSearchData()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin-top: 10px;
  margin-bottom: 30px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            padding: 0px;
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0px;
            list-style-type: none;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;
          list-style-type: none;
          padding: 0px 20px;
          margin: 0px;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 235px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 3px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  text-decoration: none;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  margin: 0px 10px 0px 0px;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>