import * as actionTypes from './actionTypes';
import axiosInst from '../../axios-orders';

// const initialState = {
//   ingredients: null,
//     totalPrice: 4,
//     error: false,
//     loading: false
// };

export const addIngredient = (ingredientName) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingredientName
});

export const removeIngredient = (ingredientName) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingredientName
});

export  const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export  const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export  const initIngredients = () => {
    return dispatch => (
        axiosInst.get('/ingredients.json')
            .then(res => {
                dispatch(setIngredients((res.data)))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            })
    );
};


export  const setAuthRedirectPath = (path) => ({
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
});