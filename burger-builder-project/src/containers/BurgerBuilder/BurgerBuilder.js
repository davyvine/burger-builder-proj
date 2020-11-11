import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

//global constant for ingredient prices
//uses same type e.g salad
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4, //base price
    purchasable: false
  };

  updatePurchaseState (ingredients) {
      //ingredients=updatedIngredients passed by addIngredientHandler and removeIngredientHandler
      //turn ingredients to array of values
      const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]; //will return the amount of the ingredient
        })
        .reduce ((sum, el) => { //sum is currernt sum the final result 0 is the initial, el is a numberr accessed in .map()
            return sum + el;
        }, 0); //turn array into single number sum of all ingredients
        //set state
        this.setState({ purchasable: sum > 0 }) // will return true or false
    }

  addIngredientHandler = (type) => {
    //initial state count of ingredients
    const oldCount = this.state.ingredients[type];
    //increment count by 1
    const updatedCount = oldCount + 1;
    //create new ingredient object from original state ingredient object
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    //update ingredient count using the new ingredient object created
    updatedIngredients[type] = updatedCount;
    //get the initial ingredient price from the global price based on type passed
    const priceAddition = INGREDIENT_PRICES[type];
    //initial state of ingredient price
    const oldPrice = this.state.totalPrice;
    //add the initial price and global ingredient type price
    const newPrice = oldPrice + priceAddition;
    //update state of the price and ingredients
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //to enable the order now button call updatePurchaseState func
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    //initial state count of ingredients
    const oldCount = this.state.ingredients[type];
    //check if there is an ingredient to be removed
    if (oldCount <= 0){
        return;
    }
    //deduct count by 1
    const updatedCount = oldCount - 1;
    //create new ingredient object from original state ingredient object
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    //update ingredient count using the new ingredient object created
    updatedIngredients[type] = updatedCount;
    //get the initial ingredient price from the global price based on type passed
    const priceDeduction = INGREDIENT_PRICES[type];
    //initial state of ingredient price
    const oldPrice = this.state.totalPrice;
    //minus the initial price and global ingredient type price
    const newPrice = oldPrice - priceDeduction;
    //update state of the price and ingredients
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    //logic for disable and enable of button
    const disabledInfo = {
        ...this.state.ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0 //will return true or false
    } //returned structure of for loop will be {salad: true, meat: false}

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler} 
        ingredientRemoved={this.removeIngredientHandler}
        disabled={disabledInfo}
        purchasable={this.state.purchasable}
        price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
