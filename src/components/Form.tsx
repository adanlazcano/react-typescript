import {  ChangeEvent, FormEvent } from "react";
import { Sub } from "types";
import useNewSubForm from "hooks/useNewSubForm";


interface FormProps {
  onNewSub: (newSub: Sub) => void;
}



const Form = ({ onNewSub }: FormProps) => {
  

   const [inputValues, dispatch] = useNewSubForm();
   
//with useState inside hook
  // const {inputValues, setInputValues,clearValues} = useNewSubForm();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({
      type: "change_value",
      payload: { inputName: name, inputValue: value },
    });
    // setInputValues({
    //   ...inputValues,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (inputValues.nick, inputValues.subMonths, inputValues.avatar) &&
      onNewSub(inputValues);
    //  clearValues();
     dispatch({type:"clear"})
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValues.nick}
        placeholder="nickname"
        name="nick"
        onChange={handleChange}
      />
      <input
        value={inputValues.subMonths}
        placeholder="subMonths"
        name="subMonths"
        type="number"
        min="0"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="avatar"
        className="avatar"
        value={inputValues.avatar}
        name="avatar"
        onChange={handleChange}
      />
      <textarea
        placeholder="description"
        name="desc"
        value={inputValues.desc}
        onChange={handleChange}
      />
      <button type="submit">Save new Sub!</button>
    </form>
  );
};

export default Form;
