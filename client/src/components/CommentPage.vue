<template>
  <div class="CommentPage">
    <div class="comment_container overflow-auto">
      <Card :data="comments" />
    </div>
    <div class="form_container">
      <b-form-group label="Comment" class="my-3 form-input-comment mx-3">
        <b-form-input
          id="input-1"
          v-model="localDescription"
          type="text"
          trim
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Tags" class="my-3 form-input-comment mx-3">
        <b-form-input
          id="input-1"
          v-model="localTags"
          type="text"
          trim
        ></b-form-input>
      </b-form-group>

      <b-button
        :disabled="this.localDescription === `` || this.localTags === ``"
        @click="handlePostComment"
        class="comment_btn"
        >Submit</b-button
      >
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";
import { mapActions, mapState, mapWritableState } from "pinia";
import { useCommentStore } from "@/stores/CommentStore";
export default {
  name: "CommentPage",
  data() {
    return {
      localDescription: "",
      localTags: "",
    };
  },
  components: {
    Card,
  },
  computed: {
    ...mapState(useCommentStore, ["comments"]),
    ...mapWritableState(useCommentStore, ["description", "tags"]),
  },
  methods: {
    ...mapActions(useCommentStore, ["getComments", "postComment"]),
    async handlePostComment() {
      try {
        this.description = this.localDescription;
        this.tags = this.localTags.split(" ");
        await this.postComment();
        await this.getComments();
      } catch (err) {
        console.log(err);
      } finally {
        this.localDescription = "";
        this.localTags = "";
      }
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style>
.CommentPage {
  height: 100vh;
  width: 100vw;
  background: #dbe2ef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.comment_container {
  margin-top: 20px;
  width: 80%;
  height: 80%;
  background: #3f72af;
  border-radius: 12px;
}
.form_container {
  display: flex;
  /* background: red; */
  justify-content: center;
}
.comment_btn {
  background: #112d4e !important;
  border-radius: 10px;
  margin: 7% 0;
}
.comment_btn:hover {
  background: #dbe2ef !important;
  color: #3f72af !important;
}
.form-input-comment {
  width: 80%;
  color: #3f72af;
}
</style>
