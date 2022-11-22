import { useReducer} from 'react';
import {Sub} from 'types';

interface FormState {
  inputValues: Sub;
}


const INITIAL_STATE: Sub = {
  nick: "",
  subMonths: 0,
  avatar: "",
  desc: "",
};

type FormReducerAction =
  | {
      type: "change_value";
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | {
      type: "clear";
    };

const formReducer = (
  state: FormState["inputValues"],
  action: FormReducerAction
) => {
  switch (action.type) {
    case "change_value":
      const { inputName, inputValue } = action.payload;

      return {
        ...state,
        [inputName]: inputValue,
      };
    case "clear":
      return INITIAL_STATE;

      default: return state;
  }
};

const useNewSubForm= () =>{

  //  const [inputValues, setInputValues] = useState<FormState["inputValues"] >(INITIAL_STATE);

  //  const clearValues = () =>{
  //   setInputValues(INITIAL_STATE);
  //  }

  //  return{inputValues,setInputValues,clearValues}

   return useReducer(formReducer,INITIAL_STATE);
}

export default useNewSubForm;