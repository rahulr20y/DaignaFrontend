import React from "react";
import { connect } from "react-redux";
import Leftbar from "../../common/layout/leftbar";
import Createpost from "./component/createpost";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { API, links, showAlertMessage, Spinner, AnimatedPage } from "../../common/index";
import { useTranslation } from "react-i18next";
import Post from "./../post/post";
import SkeletonPost from "../post/SkeletonPost";

function Home(props) {
  const { t } = useTranslation();
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
          // showAlertMessage(t("Posts fetched successfully"), "success");
        } else {
          showAlertMessage(res.data.message || t("Error fetching posts"), "danger");
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
          showAlertMessage(t("Post Deleted successfully"), "success");
        } else {
          showAlertMessage(res.data.message || t("Error deleting post"), "danger");
        }
      },
    });
  }

  return (
    <AnimatedPage>
      <div>
        <Createpost setPost={setPost} />
        {loading ? (
          <div className="py-2">
            <SkeletonPost />
            <SkeletonPost />
            <SkeletonPost />
          </div>
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
              <div className="text-muted text-center p-4">
                <i className="bi bi-chat-dots font-30 d-block mb-3"></i>
                {t("No Posts Found !!!")}
              </div>
            )}
          </div>
        )}
      </div>
    </AnimatedPage>
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
