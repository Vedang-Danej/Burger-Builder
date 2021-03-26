import * as actionTypes from "./actionsTypes";
import axios from "axios";
export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const initIngredients = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://react-my-burger-a9ff8-default-rtdb.firebaseio.com/ingredients.json"
    );
    const data = await res.data;
    dispatch({ type: actionTypes.INIT_INGREDIENT, payload: data });
  } catch (error) {
    dispatch({ type: actionTypes.INIT_INGREDIENTS_FAIL });
  }
};
