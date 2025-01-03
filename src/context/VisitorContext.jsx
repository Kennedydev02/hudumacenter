import { createContext, useContext, useReducer } from 'react';

const VisitorContext = createContext();

const initialState = {
  visitors: [],
  todayVisitors: 0,
  checkedIn: 0,
  pendingCheckouts: 0,
};

function visitorReducer(state, action) {
  switch (action.type) {
    case 'ADD_VISITOR':
      return {
        ...state,
        visitors: [...state.visitors, action.payload],
        todayVisitors: state.todayVisitors + 1,
        checkedIn: state.checkedIn + 1,
      };
    
    case 'UPDATE_VISITOR':
      return {
        ...state,
        visitors: state.visitors.map(visitor =>
          visitor.id === action.payload.id ? action.payload : visitor
        ),
      };
    
    case 'DELETE_VISITOR':
      const visitorToDelete = state.visitors.find(v => v.id === action.payload);
      return {
        ...state,
        visitors: state.visitors.filter(visitor => visitor.id !== action.payload),
        todayVisitors: state.todayVisitors - 1,
        checkedIn: visitorToDelete?.status === 'CHECKED_IN' ? state.checkedIn - 1 : state.checkedIn,
        pendingCheckouts: visitorToDelete?.status === 'PENDING_CHECKOUT' ? state.pendingCheckouts - 1 : state.pendingCheckouts,
      };

    case 'CHECKOUT_VISITOR':
      return {
        ...state,
        visitors: state.visitors.map(visitor =>
          visitor.id === action.payload
            ? { ...visitor, status: 'CHECKED_OUT' }
            : visitor
        ),
        checkedIn: state.checkedIn - 1,
        pendingCheckouts: state.pendingCheckouts - 1,
      };
      
    default:
      return state;
  }
}

export function VisitorProvider({ children }) {
  const [state, dispatch] = useReducer(visitorReducer, initialState);

  return (
    <VisitorContext.Provider value={{ state, dispatch }}>
      {children}
    </VisitorContext.Provider>
  );
}

export function useVisitor() {
  return useContext(VisitorContext);
}

export default VisitorContext;