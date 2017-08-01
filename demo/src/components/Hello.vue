<template>
  <div class="hello">
    <h1 @testevent="test">{{ msg }}</h1>
    <h2 @testevent="test">Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data: function () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    test: function(){
      debugger
      alert('clickb');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
