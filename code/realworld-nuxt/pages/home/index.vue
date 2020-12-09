<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <div class="article-meta">
              <!-- <a href="profile.html"
                ><img src="http://i.imgur.com/Qr71crq.jpg"
              /></a> -->
              <nuxt-link :to="`/profile/${article.author.username}`">
                <!-- <img :src="article.author.image" alt="" /> -->
              </nuxt-link>
              <div class="info">
                <nuxt-link class="author" :to="`/profile/${article.author.username}`">
                  {{ article.author.username }}
                </nuxt-link>
                <!-- <a href="" class="author">Eric Simons</a> -->
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
                name: 'article',
                params: { slug: article.slug },
              }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <nav>
          <ul class="pagination">
            <li v-for="item in totalPage" :key="item" class="page-item" :class="{
                active: item === page,
              }">
              <nuxt-link class="page-link" :to="{
                name: 'home',
                query: {
                  page: item
                }
              }">{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for='(item, index) in tags' :key="index" :to="{
                name: 'home',
                query:{
                  tag: item,
                  page: $route.query.page
                }
              }" class="tag-pill tag-default">{{ item }}</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getArticles } from "@/api/article";
  import { getTags } from '@/api/tags'
  export default {
    name: "HomeIndex",
    watchQuery: ['page', 'tag'],
    computed: {
      totalPage() {
        return Math.ceil(this.articlesCount / this.limit);
      },
    },
    async asyncData({ query }) {
      const page = Number.parseInt(query.page || 1);
      const limit = 10;
      const { data } = await getArticles({
        limit, // 每页大小 
        offset: (page - 1) * limit,
        tag: query.tag
      });
      const { data: tags } = await getTags()
      // console.log(data)
      return {
        limit,
        page,
        articlesCount: data.articlesCount,
        articles: data.articles,
        tags: tags.tags
      };
    },
  };
</script>

<style></style>