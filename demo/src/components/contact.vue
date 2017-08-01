<template>
<div class='container'>
	<div class="header">
		<span>Vue cli demo 学习</span>
	</div>
	<div id="container">
		<div class="depts">
			<ul class="dept-tree"><dept-tree  @changedept="changedept" :dept="depts"></dept-tree></ul>
		</div>
		<div class="content">
			<staff-list :staffs="staffs"></staff-list>
			<paging :page="page"></paging>
		</div>
	</div>
	</div>
</template>

<script>
import deptTree from './deptTree'
import paging from './paging'
import staffList from './staffList'

// const Axios = Vue.prototype.$axios
export default {
	data: () => {
		return {
			'page': {
				'size': [20, 40, 60, 80],
				'pageNo': 1,
				'pageSize': 20,
				'totalPage': null,
				'openSkip': false,
				'openSize': false
			},
			'depts': null,
			'currentDept': null,
			'staffs': null,
			'cur_all_staffs': null,
			'all_staffs': null
		}
	},
	mounted: function() {
		const Axios = this.$axios
		var that = this;
		Axios.all([Axios.get('/static/sever/user/dept.json'), Axios.get('/static/sever/user/staff.json')]).then(function(data){
			var depts = data[0].data.data.dept;
			var staffs = data[1].data.data.list;
			var index = [],
				temp;
			var addDeptsPramer = function(depts, index) {
				var i = 0;
				depts.open = false;
				depts.index = JSON.stringify(index);
				if (depts.children.length > 0) {
					while (depts.children[i]) {
						temp = [].concat(index);
						temp.push(i);
						addDeptsPramer(depts.children[i++], temp);
					}
				}
			};
			addDeptsPramer(depts, index);
			depts.open = true;
			that.$data.page.totalPage = Math.ceil(staffs.length / 20);
			that.$data.depts = depts;
			that.$data.currentDept = depts.id;
			that.$data.staffs = staffs.slice(0, 20);
			that.$data.cur_all_staffs = staffs;
			that.$data.all_staffs = staffs;
		});
	},
	components: {
		'paging': paging,
		'deptTree': deptTree,
		'staffList': staffList
	},
	methods: {
		getDeptStaff(staffs, d_id) {
			var i = 0;
			var staff = this.all_staffs[i];
			var result = [];
			while (staff) {
				if (d_id == 1) {
					result.push(staff);
				} else if (staff.deptId == d_id && !staff.partTime) {
					result.push(staff);
				}
				staff = this.all_staffs[++i];
			}
			return result;
		},
		changedept(){
			var id = arguments[0];
			var data = this.$data;
			var staffs = this.getDeptStaff(this.all_staffs, id);
			data.cur_all_staffs = staffs;
			data.staffs = data.cur_all_staffs.slice(0, data.page.pageSize);
			data.currentDept = id;
			data.page.pageNo = 1;
			data.page.totalPage = Math.ceil(data.cur_all_staffs.length / data.page.pageSize);
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
	height: 60px;
	line-height: 60px;
	font-size: 18px;
	background-color: #4B84F9;
	color: #FFF;
	font-weight: 400;
	text-align: center;
}
.header span {
	color: #FFF;
}
#container {
	position: absolute;
	top: 60px;
	bottom: 0px;
	width: 100%;
}
.depts {
	position: absolute;
	display: inline-block;
	left: 0px;
	width: 300px;
	height: 100%;
	overflow-y: scroll;
	background-color: #eaeaea;
}
ul,
ul li {
    list-style: none;
    padding: 0px;
    margin: 0px;
    text-align: left;
}
.depts ul li,
.depts label {
	height: 32px;
	line-height: 32px;
	font-size: 14px;
    display: block;
    cursor: pointer;
    background-color: #eaeaea;
}
.depts ul li.select,
.depts label.select,
.depts ul li:hover,
.depts label:hover {
    background-color: #e4e4e4;
}
.depts ul.dept-tree {
	padding-left: 10px;
}
.depts ul.expanded {
	display: block;
}
.depts ul.collapsed {
	display: none;
}
.container {
	position: relative;
    width: 100%;	
    height: 100%;	
}
.content {
	position: relative;
    height: 100%;
	margin-left: 300px;
	display: block;	
}
</style>
