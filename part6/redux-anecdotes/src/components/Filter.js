import React from "react";
import { connect } from "react-redux";
import { filterInputChange } from "../reducers/filterReducer";

const Filter = props => {
  //console.log("filter.js, props", props);
  const handleChange = event => {
    //  console.log("event", event);
    let filterTerm = event.target.value;
    console.log("filterterm", filterTerm);
    //dispatch through action creator
    filterInputChange(filterTerm);
    console.log("filtercomponenent, store state", props.store.getState());
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={e => handleChange(e)} />
    </div>
  );
};

const mapDispatchToProps = {
  filterInputChange
};
export default connect(
  null,
  mapDispatchToProps
)(Filter);
