const api_links = {
  //AUTH
  oauth: { callurl: "/auth/authizationURL", callmethod: "POST" },
  oauth_response: { callurl: "/auth/google/", callmethod: "POST" },

  //user
  get_user: { callurl: "/api/user", callmethod: "GET" },
  get_users: { callurl: "/api/user/search/", callmethod: "GET" },

  //POSTS
  get_post: { callurl: "/api/feed", callmethod: "GET" },
  get_single_post: { callurl: "/api/post", callmethod: "GET" },
  create_post: { callurl: "/api/post", callmethod: "POST" },
  edit_post: { callurl: "/api/post", callmethod: "PUT" },
  delete_post: { callurl: "/api/post", callmethod: "DELETE" },

  //FEEDBACK
  get_feedback: { callurl: "/api/feedback", callmethod: "GET" },
  create_feedback: { callurl: "/api/feedback", callmethod: "POST" },
  edit_feedback: { callurl: "/api/feedback", callmethod: "PUT" },
  delete_feedback: { callurl: "/api/feedback", callmethod: "DELETE" },

  //PRIDE
  get_pride: { callurl: "/api/pride", callmethod: "GET" },
  create_pride: { callurl: "/api/pride", callmethod: "POST" },
  edit_pride: { callurl: "/api/pride", callmethod: "PUT" },
  delete_pride: { callurl: "/api/pride", callmethod: "DELETE" },

  //comments
  get_comment: { callurl: "/api/comment", callmethod: "GET" },
  post_comment: { callurl: "/api/comment", callmethod: "POST" },
  put_comment: { callurl: "/api/comment", callmethod: "PUT" },
  delete_comment: { callurl: "/api/comment", callmethod: "DELETE" },

  //reply
  get_reply: { callurl: "/api/reply", callmethod: "GET" },
  post_reply: { callurl: "/api/reply", callmethod: "POST" },
  put_reply: { callurl: "/api/reply", callmethod: "PUT" },
  delete_reply: { callurl: "/api/reply", callmethod: "DELETE" },

  //notification
  get_notifications: { callurl: "/api/notification", callmethod: "GET" },
  post_notification: { callurl: "/api/notification", callmethod: "POST" },

  //family-tree
  check_familyname: { callurl: "/api/checkname/family", callmethod: "GET" },
  get_familytree: { callurl: "/api/familytree/", callmethod: "GET" },
  get_family: { callurl: "/api/family", callmethod: "GET" },
  post_family: { callurl: "/api/family", callmethod: "POST" },
  get_members: { callurl: "/api/treenode", callmethod: "GET" },
  post_member: { callurl: "/api/treenode", callmethod: "POST" },
  post_relation: { callurl: "/api/relation", callmethod: "POST" },
  get_relation: { callurl: "/api/relation", callmethod: "GET" },
  delete_relation: { callurl: "/api/relation", callmethod: "DELETE" },
};

export { api_links };
