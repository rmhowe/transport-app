import React from 'react';
import DateTime from 'react-datetime';

export default class AddDisruption extends React.Component {
  static propTypes = {
    lineNumber: React.PropTypes.string,
    handleAddDisruption: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      endTime: null
    };
  }

  addDisruption = () => {
    const disruptionData = {
      disruption_title: this.refs.title.value,
      disruption_text: this.refs.description.value,
      start_time: this.state.startTime,
      end_time: this.state.endTime,
      line_number: this.props.lineNumber
    };
    this.props.handleAddDisruption(disruptionData);
    this.clearInputValues();
  };

  setStartTime = (moment) => {
    if (moment) {
      this.setState({
        startTime: moment.toISOString()
      });
    }
  };

  setEndTime = (moment) => {
    if (moment) {
      this.setState({
        endTime: moment.toISOString()
      });
    }
  };

  clearInputValues = () => {
    this.refs.title.value = '';
    this.refs.description.value = '';
    this.setState({
      startTime: null,
      endTime: null
    });
  };

  render() {
    const labelClass = "add-disruption__label";
    const valueClass = "add-disruption__value";
    const dateFormat = "DD MMM YYYY";
    const timeFormat = "HH:mm";

    return (
      <div className="add-disruption">
        <h5 className="add-disruption__title">Create Disruption Notice</h5>
        <span className={labelClass}>Title*</span><input ref="title" className={valueClass}/><br/>
        <span className={labelClass}>Description</span><textarea ref="description" className={valueClass}/><br/>
        <span className={labelClass}>From*</span>
        <DateTime
          ref="startTime"
          className={valueClass}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          onBlur={this.setStartTime}
        /><br/>
        <span className={labelClass}>Until</span>
        <DateTime
          ref="endTime"
          className={valueClass}
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          onBlur={this.setEndTime}
        /><br/>
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
