const sample = (state = true, action) => {
  switch (action.type) {
    case 'SAMPLE_ACTION':
      return !state;
    default:
      return state;
  }
};

export default sample;
