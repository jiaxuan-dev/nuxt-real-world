<template>
  <div class="col-xs-12 col-md-8 offset-md-2">
    <form @submit.prevent="" class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="yourComments"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button @click="postComment" class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;

        <nuxt-link
          :to="{
            name: 'profile',
            params: {
              username: comment.author.username,
            },
          }"
          class="comment-author"
        >
          {{ comment.author.username }}
        </nuxt-link>
        <!-- <a href="" class="comment-author">Jacob Schmidt</a> -->
        <span class="date-posted">{{
          comment.createdAt | date("MMMM DD, YY")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment } from "@/api/article";
import { mapState } from "vuex";

export default {
  name: "ArticleComments",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      comments: [],
      yourComments: "",
    };
  },
  async mounted() {
    const { data } = await getComments(this.article.slug);
    // console.log(data);
    this.comments = data.comments;
  },
  methods: {
    async postComment() {
      const { data } = await addComment(this.article.slug, {
        comment: {
          body: this.yourComments,
        },
      });
    },
  },
};
</script>

<style>
</style>