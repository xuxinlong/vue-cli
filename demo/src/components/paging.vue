<template>
	<div class="page">
		<a href="javascript:void(0);" @click="prev">上一页</a>
		<div>
			<ul v-if="page.openSkip">
				<li v-for="index in page.totalPage" @click="changePage(index)">第{{index}}页</li>
			</ul>
			<a href="javascript:void(0);" @click="toggleSkip">第{{page.pageNo}}页</a>
		</div>
		<a href="javascript:void(0);" @click="next">下一页</a>
		<div class="page-size">
			<span>每页显示</span>
			<ul v-if="page.openSize">
				<li v-for="index in page.size" @click="changeSize(index)">{{index}}</li>
			</ul>
			<a href="javascript:void(0);" @click="toggleSize">{{page.pageSize}}</a>
			<span>条</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'paging',
	props: ['page'],
	methods: {
		updateStaff: function(da) {
			da.staffs = da.cur_all_staffs.slice((da.page.pageNo - 1) * da.page.pageSize, da.page.pageNo * da.page.pageSize);
		},
		prev: function() {
			var da = this.$parent.$data;
			if (da.page.pageNo <= 1) {
				return;
			}
			da.page.pageNo--;
			this.updateStaff(da);
			// da.staffs = da.cur_all_staffs.splice((da.page.pageNo-1) * da.page.pageSize, da.page.pageNo * da.page.pageSize);
		},
		next: function() {
			var da = this.$parent.$data;
			if (da.page.pageNo >= da.page.totalPage) {
				return;
			}
			da.page.pageNo++;
			this.updateStaff(da);
			// da.staffs = da.cur_all_staffs.splice((da.page.pageNo-1) * da.page.pageSize, da.page.pageNo * da.page.pageSize);
		},
		changePage: function(pageNo) {
			var da = this.$parent.$data;
			da.page.pageNo = pageNo;
			this.toggleSkip();
			this.updateStaff(da);
			// console.log(arguments);
		},
		changeSize: function(pageSize) {
			var da = this.$parent.$data;
			da.page.pageSize = pageSize;
			da.page.totalPage = Math.ceil(da.cur_all_staffs.length / pageSize);
			if (da.page.pageNo > da.page.totalPage) {
				da.page.pageNo = da.page.totalPage;
			}
			this.toggleSize();
			this.updateStaff(da);
			// console.log(arguments);
		},
		toggleSkip: function() {
			this.$parent.$data.page.openSkip = !this.$parent.$data.page.openSkip;
		},
		toggleSize: function() {
			this.$parent.$data.page.openSize = !this.$parent.$data.page.openSize;
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

a {
	text-decoration: none;
}
.page {
	position: absolute;
	width: 100%;
	bottom: 0px;
	margin-top: 20px;
	margin-bottom: 20px;
	font-size: 0px;
	text-align: center;
}
.page > div {
	display: inline-block;
	position: relative;
}
.page > div > ul {
	border-radius: 3px;
	font-size: 0px;
	position: absolute;
	width: 80px;
	background-color: #FFF;
	border: 1px solid #d9dadc;
	max-height: 200px;
	bottom: 100%;
	left: 5px;
	padding: 10px 0px;
	overflow-y: scroll;
}
.page > div.page-size > ul {
	left: 53px;
}
.page > div > ul li {
	font-size: 12px;
	cursor: pointer;
	height: 22px;
	line-height: 22px;
}
.page > div > ul li:hover {
	background-color: #4590e4;
	color: #FFF;
}
.page span {
	font-size: 12px;
}
.page a {
    text-decoration: none;
	width: 80px;
	font-size: 12px;
    display: inline-block;
	height: 26px;
	line-height: 26px;
    border: 1px solid #d9dadc;
    border-radius: 3px;
    text-align: center;
}
.page a, 
.page > div {
    margin: 0px 5px;
}
.page a:hover {
	background-color: #4590e4;
	color: #FFF;	
}
</style>
