import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { sampleAction } from '../actions/index';
import { bindActionCreators } from 'redux';

export default class Sample extends Component {
  render() {
    return (
      <div>
      { this.props.sample ? 'React Basic Boilerplate' : 'or something else?' }
      </div>
    );
  }
}

Sample.propTypes = {
  sample: PropTypes.bool.isRequired,
  SampleAction: PropTypes.func
};

function mapStateToProps(state) {
  return {
    sample: state.sample
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sampleAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sample);
