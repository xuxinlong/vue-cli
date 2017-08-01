<template>
  <div class="staffs">
      <ul class="title">
          <li>姓名</li>
          <li>部门</li>
          <li>职务</li>
          <li>手机号</li>
          <li>邮箱</li>
      </ul>
      <div class="items">
          <template v-for="staff in staffs">
              <ul>
                  <li>{{staff.staffName}}</li>
                  <li>{{staff.deptId}}</li>
                  <li>{{staff.dutyName}}</li>
                  <li>{{staff.mobile}}</li>
                  <li>{{staff.email}}</li>
              </ul>
          </template>
      </div>
  </div>
</template>

<script>
export default {
  name: 'staffList',
  props: ['staffs']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.staffs {
  position: absolute;
  width: 100%;
  top: 0px;
  bottom: 67px;
  overflow-y: scroll;
}
ul {
  font-size: 0px;
  border-bottom: 1px solid #d9dadc;
}
ul,
ul li {
    list-style: none;
    padding: 0px;
    margin: 0px;
}
ul.title {
  border-top: 1px solid #d9dadc;
}
ul li {
  width: 20%;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  display: inline-block;        
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;        
    padding-left: 20px;
}
</style>
