const filmReducer = (state = { films: null }, action) => {
  switch (action.type) {
    case "FILM":
      return { ...state, films: action.payload };

    default:
      return state;
  }
};

export default filmReducer;
