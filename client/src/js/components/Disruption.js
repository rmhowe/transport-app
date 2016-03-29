import React from 'react';
import Moment from 'moment';

export default class Disruption extends React.Component {
  parseDate(isoDate) {
    if (isoDate) {
      const moment = new Moment(isoDate);
      return moment.format('DD MMM YYYY HH:mm');
    }
  }

  deleteDisruption = () => {
    this.props.handleDeleteDisruption(this.props.disruption.get('id'));
  };

  render() {
    const { disruption } = this.props;
    const startTime = this.parseDate(disruption.get('start_time'));
    const endTime = this.parseDate(disruption.get('end_time'));
    return (
      <div className="disruption">
        <h5 className="disruption__title">{disruption.get('disruption_title')}</h5>
        <div className="disruption__text">{disruption.get('disruption_text')}</div>
        From <span className="disruption__start-time">{startTime}</span><br/>
        until <span className="disruption__end-time">{endTime}</span>
        <div
          className="disruption__delete"
          onClick={this.deleteDisruption}
        >
          Delete
        </div>
      </div>
    );
  }
}
