import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = ( props ) => {
    //transform ingredient object state as an array using Object.keys() which returns an array
    //then chain in .map() method to loop over the array of ingredients
    //igKey is the element=ingredient name salad,cheese etc..
    //...Array is javascript will return an array ex: ...Array(3) will give you 3 undefined spaces
    //...Array(length) should be the  amount of the given ingredients
    //chain .map() to get the index of the array, element=_ is not needed
    //chain in reduce func to flatten the array 
    //reduce is a built-in array func allows to transform an array to something else
    //two inputs arr=prev value el=current value, []=initial value of the reduced value
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [ ...Array( props.ingredients[igKey] ) ].map((_, i) => {
           return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, [])
    
    //check if there are ingredients
    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
                {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}

export default burger;