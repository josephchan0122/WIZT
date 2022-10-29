

const initialState = {
      count: 3,
      next: null,
      previous: null,
      results: []
};

const plansReducer = function (state = initialState, action) {

      switch (action.type){
            case  "GET_PLANS":
                  {
                        return{
                              ...state,
                              ...action.payload,
                        }
                  }
            default:
                  {
                        return state;
                  }
      }
      
}

export default plansReducer;