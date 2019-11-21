<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	import { Config } from '../../utils/config.js';
	export default {
		data() {
			return {
				url: Config.restUrl + 'index'
			}
		},
		onReady() {
			
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
