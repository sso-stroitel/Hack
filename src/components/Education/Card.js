import React from 'react';
import './style.scss';

export class EducationCard extends React.Component {
  constructor(props) {
		super(props);
  }

  render(){
    const { header, status, progress, content1, content2, content3 } = this.props.props;
    var progress_style = {right: "0%"}; progress_style.right = "calc(100% - "+progress+")";

    var classes = "task " + (!progress ? "no-progress" : "");

    return (<div className={classes}>
    <div className="task__name">{ header }</div>
    <div className="task__status">{status}</div>
    <div className="task__progress-bar" style={progress_style}></div>
    <div className="task__notes">
      <div>{content1}</div>
      <div>{content2}</div>
      <div>{content3}</div>
    </div>
  </div>);
  }
}