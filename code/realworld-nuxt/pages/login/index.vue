<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register"
              >Need an account?</nuxt-link
            >
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(msgs, field) in errors">
              <li v-for="(msg, index) in msgs" :key="index">
                {{ field }}:{{ msg }}
              </li>
            </template>
          </ul>

          <form @submit.prevent="">
            <fieldset v-if="!isLogin" class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
                required
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
                required
              />
            </fieldset>
            <button
              @click="onSubmit"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              {{ isLogin ? "Sign in" : "Sign up" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from "@/api/user";
export default {
  name: "LoginIndex",
  computed: {
    isLogin() {
      return this.$route.name === "login";
    },
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      errors: {}, // 错误信息
    };
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await login({
          user: this.user,
        });

        console.log(data);
        // 保存登陆状态
        this.$router.push("/");
      } catch (error) {
        console.log("请求失败", error);
        console.dir(error);
        this.errors = error.response.data.errors;
      }
    },
  },
};
</script>

<style>
</style>