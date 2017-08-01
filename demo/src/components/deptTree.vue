<template>
  <li @click="expandDept" v-if="dept.children.length <= 0"><label>{{dept.deptName}}</label></li>
  <li v-else>
    <label @click="expandDept" :index="dept.index">{{dept.deptName}}</label>
    <ul class="dept-tree" v-if="dept.open">
      <dept-tree v-for="item in dept.children" :depts="depts" :dept="item" :key="item.id"></dept-tree>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'deptTree',
  props: ['depts', 'dept'],
  data(){
    return {
      // 'page': this.page,
      // 'currentDept': this.currentDept,
      // 'staffs': this.staffs,
      // 'all_staffs': this.all_staffs,
      // 'depts': this.depts,
      // 'dept': this.dept,
      // 'test': this.test
    }
  },
  methods: {
    expandDept: function(ev) {
      var getdepttaff = function(staffs, d_id) {
        var i = 0;
        var staff = staffs[i];
        var result = [];
        while (staff) {
          if (d_id == 1) {
            result.push(staff);
          } else if (staff.deptId == d_id && !staff.partTime) {
            result.push(staff);
          }
          staff = staffs[++i];
        }
        return result;
      };
      var self = this;
      var target = ev.target;
      var i = 0;
      var index = target.getAttribute('index');
      index = JSON.parse(index);
      var contact_vm = this.$root.$children[0].$children[0];
      debugger
      if (contact_vm.currentDept == self.$props.dept.id) {
        self.$props.dept.open = !self.$props.dept.open;
      } else {
        contact_vm.$data.currentDept = self.$props.dept.id;
        contact_vm.$children[0].$emit('changedept', self.$props.dept.id);
      }
      // 触发deptTree的自定义事件changedept
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul.dept-tree {
  padding-left: 20px;
}
ul,
ul li {
    list-style: none;
    padding: 0px;
    margin: 0px;
}
li label {
  width: 100%;
  cursor: pointer;
}
</style>
