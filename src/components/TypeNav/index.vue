<template>
	<div class="type-nav">
		<div class="container">
			<div @mouseenter="showSortList" @mouseleave="hideSortList">
				<h2 class="all">全部商品分类</h2>
				<transition name="sort">
					<div class="sort" v-show="show">
						<div class="all-sort-list2" @click="goSearch">
							<div class="item" v-for="c1 in categotyList" :key="c1.categoryId">
								<h3>
									<a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
								</h3>
								<div class="item-list clearfix">
									<div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName
												}}</a>
											</dt>
											<dd>
												<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
													<a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName
													}}</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<div><a href="###">服装城</a></div>
				<div><a href="###">美妆馆</a></div>
				<div><a href="###">全球购</a></div>
				<div><a href="###">尚品汇超市</a></div>
				<div><a href="###">闪购</a></div>
				<div><a href="###">团购</a></div>
				<div><a href="###">有趣</a></div>
				<div><a href="###">秒杀</a></div>
			</nav>

		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'TypeNav',
	data() {
		return {
			show: true
		}
	},
	mounted() {
		if (this.$route.path !== "/home") {
			this.show = false
		}
	},
	computed: {
		...mapState({
			categotyList: state => state.home.categoryList
		})
	},
	methods: {
		goSearch(event) {
			let element = event.target
			let { categoryname, category1id, category2id, category3id } = element.dataset
			if (categoryname) {
				let location = {
					name: "search",
					query: { categoryName: categoryname }
				}
				if (category1id) {
					location.query.category1Id = category1id
				} else if (category2id) {
					location.query.category2Id = category2id
				} else if (category3id) {
					location.query.category3Id = category3id
				}
				if (this.$route.params) {
					location.params = this.$route.params
				}
				this.$router.push(location)
			}
		},
		showSortList() {
			this.show = true
		},
		hideSortList() {
			if (this.$route.path !== "/home") {
				this.show = false
			}
		}
	}
}
</script>

<style lang="less" scoped>
.type-nav {
	border-bottom: 2px solid #e1251b;

	a {
		text-decoration: none;
	}

	.container {
		width: 1200px;
		height: 45px;
		margin: 0 auto;
		display: flex;
		position: relative;

		.all {
			width: 210px;
			height: 45px;
			background-color: #e1251b;
			line-height: 45px;
			text-align: center;
			color: #fff;
			font-size: 14px;
			font-weight: bold;
			margin: 0;
		}

		.nav {
			display: flex;

			div:hover {
				background-color: red;

				&>a {
					color: white;
				}
			}

			a {
				height: 45px;
				margin: 0 22px;
				line-height: 45px;
				font-size: 16px;
				color: #333;
			}
		}

		.sort {
			position: absolute;
			left: 0;
			top: 45px;
			width: 210px;
			height: 460px;
			position: absolute;
			background: #fafafa;
			z-index: 999;

			.all-sort-list2 {
				.item {
					h3 {
						line-height: 27px;
						font-size: 14px;
						font-weight: 400;
						overflow: hidden;
						padding: 0 20px;
						margin: 0;

						a {
							color: #333;
							cursor: pointer;
						}
					}

					.item-list {
						display: none;
						position: absolute;
						min-height: 450px;
						background: #f7f7f7;
						left: 210px;
						border: 1px solid #ddd;
						top: 0;
						z-index: 9999 !important;

						.subitem {
							float: left;
							width: 650px;
							padding: 0 10px;

							.fore {
								margin: 5px 0px;
								padding: 5px 0px;
								overflow: hidden;
								zoom: 1;
								line-height: 20px;

								a {
									cursor: pointer;
								}

								dt {
									width: 80px;
									float: left;
									font-size: 16px;
									text-align: right;
									color: #444;
									text-align: left;
								}

								dd {
									float: left;
									overflow: hidden;
									font-size: 14px;
									margin: 0px;
									max-width: 570px;

									em {
										float: left;
										margin: 2px 0px;
										padding: 0px 8px 0px 4px;
										border-left: 1px solid #ccc;
										font-style: normal;

										a {
											color: #555;

											&:hover {
												text-decoration-line: underline;
											}
										}
									}
								}
							}
						}
					}

					&:hover {
						background-color: rgb(65, 182, 232);

						.item-list {
							display: block;
						}
					}
				}
			}
		}

		.sort-enter {
			height: 0px
		}



		.sort-leave-to {
			height: 0px;
		}

		.sort-enter-active {
			transition: all 0.3s linear;
		}

		.sort-leave-active {
			transition: all 0.15s linear;
		}
	}
}
</style>
