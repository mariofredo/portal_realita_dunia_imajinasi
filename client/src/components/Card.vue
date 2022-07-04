<template>
  <div class="container-fluid card_container">
    <div v-for="item in this.data" class="comment_card">
      <div class="comment_item">
        <div class="foto_user">
          <img src="../assets/logo.png" alt="logoVue" class="image_comment" />
          <p style="font-weight: 700">{{ item.User[0].username }}</p>
        </div>
        <div class="text_container">
          <a href="" @click.prevent="handleCloseComment(item._id)">
            <img
              src="../assets/kisspng-computer-icons-symbol-x-5b49c174ea0483.3273325115315603089586.png"
              alt="x-sign"
              style="
                width: 20px;
                height: 20px;
                position: absolute;
                top: 0;
                right: 0;
                margin-top: 7px;
                margin-right: 7px;
              "
            />
          </a>
          <div style="display: block">
            <div class="message">Comment: {{ item.description }}</div>
            <hr />
            <div class="tags">
              Tags:
              <p style="margin: 0 10px" v-for="tag in item.Tags">
                #{{ tag.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCommentStore } from "@/stores/CommentStore";
import { mapActions } from "pinia";
export default {
  name: "Card",
  props: ["data"],
  methods: {
    ...mapActions(useCommentStore, ["deleteComment", "getComments"]),
    async handleCloseComment(id) {
      try {
        await this.deleteComment(id);
        await this.getComments();
      } catch (err) {
        this.$swal.fire({
          icon: "error",
          title: err.response.status,
          text: err.response.data.message,
        });
      }
    },
  },
  created() {
    console.log(this.data);
  },
};
</script>

<style>
.card_container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment_card {
  width: 80%;
  height: 20%;
  background: #dbe2ef;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
}
.foto_user {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.image_comment {
  height: 50px;
  width: 50px;
}
.text_container {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: relative;
}
.comment_item {
  margin-left: 5%;
  display: flex;
  width: 100%;
}
.tags {
  display: flex;
}
</style>
