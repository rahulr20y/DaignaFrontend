import React from "react";
import { connect } from "react-redux";
import Leftbar from "../../common/layout/leftbar";
import Createpost from "./component/createpost";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { API, links, showAlertMessage } from "../../common/index";
import Post from "./../post/post";

function Home(props) {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    API({
      ...links.get_post,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          setPosts(res.data);
          showAlertMessage("Posts fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, []);

  function setPost(post) {
    setPosts([post, ...posts]);
  }

  function deletePost(postid) {
    API({
      ...links.delete_post,
      callurl: links.delete_post.callurl + "/" + postid,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        console.log(res);
        if (res.status === 200) {
          setPosts(posts.filter((post) => post.post.contentid !== postid));
          showAlertMessage("Post Deleted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
      },
    });
  }

  return (
    <div>
      <Createpost setPost={setPost} />
      {loading ? (
        <>Loading...</>
      ) : (
        <div>
          {posts.length > 0 ? (
            posts.map((post, i) => {
              return (
                <Post
                  profile={props.profile}
                  key={post.post.contentid}
                  post={post}
                  deletePost={deletePost}
                  showComments={false}
                />
              );
            })
          ) : (
            <div className="text-muted text-center">No Posts Found !!!</div>
          )}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.general.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // update_secondary_bar: (new_state) => { dispatch({ type: 'SECONDARYBAR_SET', secondaySidebarShow: new_state }) },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
