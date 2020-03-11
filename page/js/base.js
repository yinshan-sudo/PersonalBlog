var randomTags = new Vue({
  el: "#random-tags",
  data: {
    tags: [],
  },
  computed: {
    randomColor: function(){
      return function(){
        var red = Math.random() * 255;
        var green = Math.random() * 255;
        var blue = Math.random() * 255;
        var rgb = `rgb(${red}, ${green}, ${blue})`;
        return rgb;
      }
    },
    randomSize: function(){
      return function(){
        var size = (Math.random() * 20 + 12) + "px";
        return size;
      }
    }
  },
  created(){
    axios({
      method: "get",
      url: "/queryRandomTags"
    }).then(function(resp){
      var result = [];
      for(var i = 0; i < resp.data.data.length; i++){
        result.push({text:resp.data.data[i].tag, link: "/?tag=" + resp.data.data[i].tag});
      }
      randomTags.tags = result;
    });
  }
})



var newHot = new Vue({
  el: "#new-hot",
  data: {
    titleList: []
  },
  created(){
    axios({
      method: "get",
      url: "/queryHotBlog"
    }).then(function(resp){
      var result = [];
      for(var i = 0; i < resp.data.data.length; i++){
        var temp = {};
        temp.title = resp.data.data[i].title;
        temp.link = "/blog-detail.html?bid=" + resp.data.data[i].id;
        result.push(temp);
      }
      newHot.titleList = result;
    });
  }
})




var newComments = new Vue({
  el: "#new-comments",
  data: {
    commentList: [
      {name: "这里是用户名", date: "2018-10-10", comment: "这里是评论"},
      {name: "这里是用户名", date: "2018-10-10", comment: "这里是评论"},
      {name: "这里是用户名", date: "2018-10-10", comment: "这里是评论"},
      {name: "这里是用户名", date: "2018-10-10", comment: "这里是评论"},
      {name: "这里是用户名", date: "2018-10-10", comment: "这里是评论"},
      {name: "这里是用户名", date: "2018-10-10", comment: "这里是评论"},
    ]
  },
  created(){
    axios({
      method: "get",
      url: "/queryNewComments"
    }).then(function(resp){
      var result = [];
      for(var i = 0; i < resp.data.data.length; i++){
        var temp = {};
        temp.name = resp.data.data[i].user_name;
        temp.date = resp.data.data[i].ctime;
        temp.comment = resp.data.data[i].comments;
        // temp.link = "/blog-detail.html?bid=" + resp.data.data[i].id;
        result.push(temp);
      }
      newComments.commentList = result;
    });
  }
})