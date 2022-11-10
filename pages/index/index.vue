<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<search-input></search-input>
		<!-- #endif -->
		
		<banner></banner>

		<courseCategory></courseCategory>
		
		<view class="list-container">
			<swiperCourse></swiperCourse>
		</view>
		
	</view>
</template>

<script>
	import SearchInput from "@/components/common/searchinput.vue"
	import banner from "@/components/common/banner.vue"
	import courseCategory from "@/pages/index/components/course-category.vue"
	import swiperCourse from "@/pages/index/components/swiper-course.vue"
	// 引入搜索框模型
	import SearchModel from "@/model/searchModel.js"
	export default {
		data() {
			return {
				
			}
		},
		components : {
			SearchInput,
			banner,
			courseCategory,
			swiperCourse
		},
		onLoad() {
			// #ifdef APP-PLUS
			SearchModel.handleUpdatePlaceholderText(this)
			// #endif
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.list-container{
	padding : 0 30rpx;
}
</style>
