import React from 'react';

export default class AddDisruption extends React.Component {
  addDisruption = () => {
    const disruptionData = {
      disruption_title: this.refs.title.value,
      disruption_text: this.refs.description.value,
      start_time: this.refs.startTime.value,
      end_time: this.refs.endTime.value,
      line_number: this.props.lineNumber
    };
    this.props.handleAddDisruption(disruptionData);
    this.clearInputValues();
  };

  clearInputValues = () => {
    this.refs.title.value = '';
    this.refs.description.value = '';
    this.refs.startTime.value = '';
    this.refs.endTime.value = '';
  };

  render() {
    const labelClass = "add-disruption__label";
    const valueClass = "add-disruption__value";

    return (
      <div className="add-disruption">
        <h5 className="add-disruption__title">Create Disruption Notice</h5>
        <span className={labelClass}>Title*</span><input ref="title" className={valueClass}/><br/>
        <span className={labelClass}>Description</span><textarea ref="description" className={valueClass}/><br/>
        <span className={labelClass}>From*</span><input ref="startTime" className={valueClass}/><br/>
        <span className={labelClass}>Until</span><input ref="endTime" className={valueClass}/><br/>
        <div
          className="add-disruption__submit"
          onClick={this.addDisruption}
        >
          Submit
        </div>
      </div>
    );
  }
}
