<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                  :disabled="dis"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                  :disabled="dis"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                  :disabled="dis"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keydown.enter="enterTags"
                  v-model="tag"
                  :disabled="dis"
                />
                <div class="taglist">
                  <div
                    v-for="Otag in article.tagList"
                    :key="Otag"
                    class="tag-default tag-pill"
                  >
                    <i @click="deTag(Otag)" class="ion-close-round"></i>
                    {{ Otag }}
                  </div>
                  <!-- <div class="tag-default tag-pill">
                    <i class="ion-close-round"></i>
                    fsg
                  </div> -->
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="publishArticle"
                :disabled="dis"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article";
export default {
  name: "EditorIndex",
  middleware: "authenticated",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      tag: "",
      dis: false,
    };
  },
  methods: {
    async publishArticle() {
      this.dis = true;
      const { data } = await createArticle({
        article: this.article,
      });
      this.dis = false;
      console.log(data);
      // const { data } =
      this.$router.push({
        name: "article",
        params: {
          slug: data.article.slug,
        },
      });
    },
    enterTags() {
      let num = 0;
      this.article.tagList.forEach((element) => {
        if (element === this.tag) {
          num = num + 1;
        }
      });
      if (num > 0) {
        this.tag = "";
      } else {
        this.article.tagList.push(this.tag);
        this.tag = "";
      }
    },
    deTag(Otag) {
      this.article.tagList.forEach((element, index) => {
        if (element === Otag) {
          this.article.tagList.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style>
</style>