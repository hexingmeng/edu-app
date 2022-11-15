<template>
	<list-box :name="name" :word="word">
		<i-course-item :item="item" v-for="(item,index) in courseData" :key="index"></i-course-item>
	</list-box>
</template>

<script>
import listBox from "@/pages/index/components/list-box.vue"
import iCourseItem from "@/components/common/i-course-item.vue"
export default {
	props : {
		name : {
			type : String,
			default : ""
		},
		word : {
			type : String,
			default : ""
		},
		courseData : {
			type : Array,
			default : () => []
		}
	},
	components : {
		listBox,
		iCourseItem
	}
}
</script>

<style>
</style>