<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<i-search-input></i-search-input>
		<!-- #endif -->
		<i-new-banner :bannerList="bannerList"></i-new-banner>
		
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption"
			:up="upOption">
			<course-category :categoryList="categoryList"></course-category>
			<view class="list-container">
				<swiper-course name="热门推荐" word="HOT" :courseData="hotCourseList"></swiper-course>
				<scoll-course name="近期上新" word="NEW" :courseData="newCourseList"></scoll-course>
				<swiper-course name="免费精选" word="FREE" :courseData='freeCourseList'></swiper-course>
				<list-course name="付费精品" word="NICE" :courseData="payCourseList"></list-course>
			</view>
		</mescroll-body>

	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";

	import iSearchInput from "@/components/common/i-search-input.vue"
	import iNewBanner from "@/components/common/i-new-banner.vue"
	import courseCategory from "@/pages/index/components/course-category.vue"
	import swiperCourse from "@/pages/index/components/swiper-course.vue"
	import scollCourse from "@/pages/index/components/scroll-course.vue"
	import listCourse from "@/pages/index/components/list-course.vue"

	import SearchModel from "@/model/searchModel.js"
	import IndexModel from "@/model/indexModel.js"
	import indexApi from "@/api/index.js"
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				bannerList: [],
				categoryList: [],
				hotCourseList: [],
				newCourseList: [],
				freeCourseList: [],
				payCourseList: [],
				downOption: {
					offset: 30
				},
				upOption: {
					textLoading: '亲亲，在查询下页数据中',
					page: {
						num: 0,
						size: 10,
					},
					textNoMore: '-- 已加载完所有数据 --',
				}
			}
		},
		onNavigationBarButtonTap: function(e) {
			const index = e.index
			if (index === 0) {
				IndexModel.handleOpenScanCode()
			}
		},
		components: {
			iSearchInput,
			iNewBanner,
			courseCategory,
			swiperCourse,
			scollCourse,
			listCourse
		},
		onLoad() {
			// #ifdef APP-PLUS
			SearchModel.handleUpdatePlaceholderText(this)
			// #endif

			// this.loadData()
		},
		methods: {
			async loadData() {
				this.getBannerList()
				this.getCategoryList()
				this.getHotCourseList()
				this.getNewCourseList()
				this.getFreeCourseList()
			},

			// 获取轮播图接口数据
			async getBannerList() {
				try {
					const res = await indexApi.getBanner()
					this.bannerList = res
				} catch (e) {
					console.log("err", e)
				}
			},
			// 获取分类接口数据
			async getCategoryList() {
				try {
					const res = await indexApi.getCategory()
					this.categoryList = res
				} catch (e) {
					//TODO handle the exception
					console.log("err", e)
				}
			},
			// 获取热门推荐数据
			async getHotCourseList() {
				try {
					this.hotCourseList = await IndexModel.getCourseList({
						sort: "hot"
					})
				} catch (e) {
					console.log("err", e)
				}
			},
			// 获取近期上新数据
			async getNewCourseList() {
				try {
					this.newCourseList = await IndexModel.getCourseList({
						sort: "new"
					})
				} catch (e) {
					console.log("err", e)
				}
			},
			// 获取免费精选数据
			async getFreeCourseList() {
				try {
					this.freeCourseList = await IndexModel.getCourseList({
						isFree: 0
					})
				} catch (e) {
					console.log("err", e)
				}
			},
			// 获取付费精品数据
			async getPayCourseList(page) {
				try {
					const res = await indexApi.getCourseList({
						current: page.num,
						size: page.size,
						isFree: 1
					})
					const currentList = res.records
					this.payCourseList = this.payCourseList.concat(currentList)
					this.mescroll.endBySize(currentList.length, res.total)
				} catch (e) {
					console.log("err", e)
				}
			},
			/*下拉刷新与上拉加载的回调*/
			async upCallback(page) {
				if (page.num === 1) {
					this.loadData()
					this.payCourseList = []
				}
				this.getPayCourseList(page)

			}
		}
	}
</script>

<style lang="scss">
	.list-container {
		padding: 0 30rpx;
	}
</style>
