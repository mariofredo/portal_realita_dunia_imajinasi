import { defineStore } from "pinia";
import axios from "axios";
export const useCommentStore = defineStore({
  id: "CommentPage",
  state: () => ({
    comments: [],
    description: "",
    tags: [],
  }),
  getters: {},
  actions: {
    async getComments() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "https://portalrealita.herokuapp.com/comments",
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.comments = data;
      } catch (err) {
        console.log(err);
      }
    },
    postComment() {
      return axios({
        method: "POST",
        url: "https://portalrealita.herokuapp.com/comments",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
        data: {
          description: this.description,
          tags: this.tags,
        },
      });
    },
    deleteComment(id) {
      return axios({
        method: "DELETE",
        url: `https://portalrealita.herokuapp.com/comments/${id}`,
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
    },
  },
});
