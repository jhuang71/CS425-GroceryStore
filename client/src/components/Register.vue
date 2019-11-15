<template>
  <div>
    <h1>
      Register
    </h1>
    <input type="email" name="email" v-model="username" placeholder="email here">
    <input type="password" name="password" v-model="password" placeholder="password">
    <button @click ="register">
      Register
    </button>
    <button @click ="login">
      Log In
    </button>
    <ul>
      <li v-for="item in User">
        Username: {{item.username}},
        User Password: {{item.pword}}
      </li>
    </ul>

    <ul>
      <li v-for="item in UserLoggedIn">
        Username: {{item.username}},
      </li>
    </ul>

  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import axios from 'axios'
export default {
  data () {
    return {
      User: [{}], // catched
      UserLoggedIn: [{}],
      username: '',
      password: ''
    }
  },
  methods: { // send to backend
    async register () {
      const response = await AuthenticationService.register({
        username: this.username,
        password: this.password
      })
      this.$router.go(); // refresh page
      console.log(response.data)
    }, 
    login () {
      axios.get(`http://localhost:3000/login/${this.username}/${this.password}`).then((response) =>{
        console.log("hi");
        this.UserLoggedIn = response.data;
      })
      .catch((error) => {
        console.log(error);
      })
      // this.$router.push("/");
      console.log(response.data);
    }
  },
  mounted() { // catch data from the route
    axios.get('http://localhost:3000').then((response) =>{
      console.log(response.data);
      this.User = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
    }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
