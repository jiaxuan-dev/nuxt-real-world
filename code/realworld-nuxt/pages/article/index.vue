<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>

        <article-meta :article="article"></article-meta>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div v-html="article.body" class="col-md-12"></div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article"></article-meta>
      </div>

      <div class="row">
        <article-comments :article="article"></article-comments>
      </div>
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import articleMeta from "./components/article-meta.vue";
import ArticleComments from "./components/article-comments.vue";
export default {
  components: { articleMeta, ArticleComments },
  name: "ArticleIndex",
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    const { data } = await getArticle(params.slug);
    const { article } = data;
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    // console.log(data);
    return {
      article,
    };
  },
  head() {
    return {
      title: `${this.article.title} - RealWorld`,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.article.description,
        },
      ],
    };
  },
};
</script>

<style>
</style>