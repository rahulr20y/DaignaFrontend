import React from "react";
import {
  API,
  links,
  showAlertMessage,
  Modal,
  Spinner,
  Card,
} from "../../common";
import Body from "./component/body";
import Footer from "./component/footer";
import Header from "./component/header";
import { useParams } from "react-router-dom";

function Post(props) {
  const [post, setPost] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const params = useParams();

  React.useEffect(() => {
    if (props.post !== undefined) {
      setPost(props.post);
    } else {
      API({
        ...links.get_single_post,
        callurl: links.get_single_post.callurl + "/" + params.postid,
        urlparams: {},
        isfile: false,
        callback: (res) => {
          if (res.status === 200) {
            setPost(res.data);
            showAlertMessage("Post fetched successfully", "success");
          } else {
            showAlertMessage(res.data.message, "danger");
          }
          setLoading(false);
        },
      });
    }
  }, []);

  return (
    post !== undefined && (
      <div>
        <Card
          className="shadow-sm"
          body={
            <div>
              <Header
                post={post}
                deletePost={
                  props.deletePost !== undefined ? props.deletePost : null
                }
                profile={props.profile != undefined ? props.profile : null}
              />
              <Body post={post} />
            </div>
          }
          footerClass="py-1"
          footer={
            <Footer
              post={post}
              showComments={
                props.showComments === undefined ? true : props.showComments
              }
            />
          }
        />
      </div>
    )
  );
}

export default Post;
