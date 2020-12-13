<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="user.image"
                  :disabled="dis"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="user.username"
                  :disabled="dis"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="user.bio"
                  :disabled="dis"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="user.email"
                  :disabled="dis"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="user.password"
                  :disabled="dis"
                />
              </fieldset>
              <button
                @click="updateSettings"
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="dis"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { updateUser, getUser } from "@/api/user";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
const Cookie = process.client ? require("js-cookie") : undefined;

export default {
  name: "SettingsIndex",
  middleware: "authenticated",
  data() {
    return {
      user: {
        email: "",
        bio: "",
        image: "",
        username: "",
        password: "",
      },
      dis: false,
    };
  },
  computed: {
    ...mapState({
      currentUser: "user",
    }),
  },
  mounted() {
    this.user.bio = this.currentUser.bio;
    this.user.image = this.currentUser.image;
    this.user.username = this.currentUser.username;
  },
  methods: {
    ...mapMutations({
      delUserData: "logout",
    }),
    logout() {
      Cookie.remove("user");
      this.delUserData();
      this.$router.push({
        name: "home",
      });
    },
    async updateSettings() {
      this.dis = true;
      const { data } = updateUser({
        user: this.user,
      });
      this.dis = false;
      console.log(data);
      this.$router.push({
        name: "profile",
        params: { username: data.username },
      });
    },
  },
};
</script>

<style>
</style>