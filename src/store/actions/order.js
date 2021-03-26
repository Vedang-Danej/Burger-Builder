import * as actionTypes from "../actions/actionsTypes";
import axios from "../../axios-orders";

export const purchaseBurger = (orderData, token) => (dispatch) => {
  dispatch({
    type: actionTypes.PURCHASE_BURGER_START,
  });
  axios
    .post("/orders.json?auth=" + token, orderData)
    .then((response) => {
      dispatch({
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: response.data.name,
        orderData: orderData,
      });
    })
    .catch((error) => {
      dispatch({ type: actionTypes.PURCHASE_BURGER_FAIL, error: error });
    });
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrders = (token, userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ORDERS_START });
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
  axios
    .get("/orders.json" + queryParams)
    .then((res) => {
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }
      dispatch({
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: fetchedOrders,
      });
    })
    .catch((err) => {
      dispatch({ type: actionTypes.FETCH_ORDERS_FAIL, error: err });
    });
};
