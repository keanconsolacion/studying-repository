import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues)
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    /**
     *  initialValues will look for Fields with same key as name and put it in the value.
     *  initialValues is a special prop from reduxform which accepts an object.
     *  In this case, this.props.stream contains an object containing title and description properties.
     **/

    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          onSubmit={this.onSubmit}
          initialValues={{
            title: this.props.stream.title,
            description: this.props.stream.description,
          }} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);

// const StreamEdit = (props) => {
//   const dispatch = useDispatch();
//   const stream = useSelector((state) => state.streams[props.match.params.id]);

//   useEffect(() => {
//     dispatch(fetchStream(props.match.params.id));
//   }, [dispatch, props.match.params.id]);

//   if (!stream) {
//     return <div>Loading...</div>;
//   }

//   return <div>{stream.title}</div>;
// };

// export default StreamEdit;
