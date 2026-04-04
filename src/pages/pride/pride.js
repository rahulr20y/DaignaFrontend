import React from "react";
import { connect } from "react-redux";
import Createpride from "./component/createpride";
import PridePost from "./component/pridePost";
import { Editor, EditorState, convertToRaw } from "draft-js";
import {
  API,
  links,
  showAlertMessage,
  Modal,
  Spinner,
} from "../../common/index";

function Pride(props) {
  const [prides, setPrides] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    API({
      ...links.get_pride,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        if (res.status === 200) {
          setPrides(res.data);
          showAlertMessage("Prides fetched successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
        setLoading(false);
      },
    });
  }, []);

  function setPride(pride) {
    setPrides([pride, ...prides]);
  }

  function deletePride(prideid) {
    API({
      ...links.delete_pride,
      callurl: links.delete_pride.callurl + "/" + prideid,
      urlparams: {},
      isfile: false,
      callback: (res) => {
        console.log(res);
        if (res.status === 200) {
          setPrides(
            prides.filter((pride) => pride.pride.contentid !== prideid)
          );
          showAlertMessage("Pride Deleted successfully", "success");
        } else {
          showAlertMessage(res.data.message, "danger");
        }
      },
    });
  }

  return (
    <div>
      <Createpride setPride={setPride} />
      {loading ? (
        <>Loading...</>
      ) : (
        <>
          {prides.length > 0 ? (
            prides.map((pride, i) => {
              return (
                <PridePost
                  pride={pride}
                  deletePride={deletePride}
                  profile={props.profile}
                  key={pride.pride.contentid}
                />
              );
            })
          ) : (
            <div className="text-muted text-center">No Prides Found !!!</div>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.general.profile,
  };
};

export default connect(mapStateToProps)(Pride);
