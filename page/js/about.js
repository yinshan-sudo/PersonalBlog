var blogComments = new Vue({
  el: "#blog-comment",
  data: {
    total: "",
    comments: []
  },
  computed:{
    reply: function(){
      return function(commentId, userName){
        document.getElementById("comment-reply").value = commentId;
        document.getElementById("comment-reply-name").value = userName;
        location.href = "#send-comment"

      }
    }
  },
  created(){
    
    var bid = -1;
    axios({
      method: "get",
      url: "/queryCommentsByBlogId?bid=" + bid
    }).then(function(resp){
      blogComments.comments = resp.data.data;
      for(var i = 0; i < blogComments.comments.length; i++){
        if(blogComments.comments[i].parent > -1){
          blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
        }
      }
    });
    axios({
      method:"get",
      url: "/queryCommentsCountByBlogId?bid=" + bid
    }).then(function(resp){
      blogComments.total = resp.data.data[0].count;
    })
  }
})



var sendComment = new Vue({
  el: "#send-comment",
  data: {
    vcode: "",
    rightCode: ""
  },
  computed: {
    changeCode: function(){
      return function(){
        axios({
          method: "get",
          url: "/queryRandomCode"
        }).then(function (resp){
          sendComment.vcode = resp.data.data.data;
          sendComment.rightCode = resp.data.data.text;
          console.log(sendComment.rightCode);
        })
      }
    },
    sendComment: function(){
      return function(){
        var code = document.getElementById("comment-code").value;
        if(code != sendComment.rightCode){
          alert("验证码错误");
          return;
        }
        
        var bid = -1;

        var reply = document.getElementById("comment-reply").value;
        var replyName = document.getElementById("comment-reply-name").value;
        var name = document.getElementById("comment-name").value;
        var email = document.getElementById("comment-email").value;
        var content = document.getElementById("comment-content").value;

        axios({
          method: "get",
          url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
        }).then(function(resp){
          alert(resp.data.msg);
        })

      }
    }
  },
  created(){
    this.changeCode();
  }
})