// builder.ts
// --- Interfaces for meal components ---

/** Main dish options */
export type MainDish = 'Burger' | 'Pizza' | 'Salad';
/** Side options */
export type Side = 'Fries' | 'Nuggets' | 'Fruit Cup';
/** Drink options */
export type Drink = {
  type: 'Soda' | 'Juice' | 'Water';
  size: 'Small' | 'Medium' | 'Large';
  flavor?: string;
  iceLevel?: 'No Ice' | 'Less Ice' | 'Regular' | 'Extra Ice';
};
/** Dessert options */
export type Dessert = 'Cake' | 'Ice Cream' | 'Cookie';
/** Topping options */
export type Topping = 'Cheese' | 'Bacon' | 'Lettuce' | 'Tomato' | 'Onion';

// --- Meal class ---

/**
 * Represents a complete meal order.
 * Only MealBuilder can construct a Meal.
 */
export class Meal {
  mainDish: MainDish;
  sides: Side[];
  drink?: Drink;
  dessert?: Dessert;
  toppings: Topping[];

  // Make the constructor private to restrict instantiation
  private constructor(builder: MealBuilder) {
    this.mainDish = builder["_mainDish"];
    this.sides = builder["_sides"];
    this.drink = builder["_drink"];
    this.dessert = builder["_dessert"];
    this.toppings = builder["_toppings"];
  }

  /**
   * Only MealBuilder can create a Meal instance
   */
  static fromBuilder(builder: MealBuilder): Meal {
    return new Meal(builder);
  }

  /**
   * Returns a summary of the meal order.
   */
  summary(): string {
    return `Meal: ${this.mainDish}\n` +
      (this.sides.length ? `Sides: ${this.sides.join(', ')}\n` : '') +
      (this.drink ? `Drink: ${this.drink.size} ${this.drink.type}${this.drink.flavor ? ' (' + this.drink.flavor + ')' : ''}${this.drink.iceLevel ? ', ' + this.drink.iceLevel : ''}\n` : '') +
      (this.dessert ? `Dessert: ${this.dessert}\n` : '') +
      (this.toppings.length ? `Toppings: ${this.toppings.join(', ')}\n` : '');
  }
}

// --- Builder class ---

/**
 * Builder for constructing Meal objects step by step.
 */
export class MealBuilder {
  // Use private fields to prevent direct access
  private _mainDish!: MainDish;
  private _sides: Side[] = [];
  private _drink?: Drink;
  private _dessert?: Dessert;
  private _toppings: Topping[] = [];

  /**
   * Set the main dish (required).
   */
  setMainDish(mainDish: MainDish): this {
    this._mainDish = mainDish;
    return this;
  }

  /**
   * Add a side item.
   */
  addSide(side: Side): this {
    this._sides.push(side);
    return this;
  }

  /**
   * Set the drink with options.
   */
  setDrink(drink: Drink): this {
    this._drink = drink;
    return this;
  }

  /**
   * Set the dessert.
   */
  setDessert(dessert: Dessert): this {
    this._dessert = dessert;
    return this;
  }

  /**
   * Add a topping.
   */
  addTopping(topping: Topping): this {
    this._toppings.push(topping);
    return this;
  }

  /**
   * Build and return the Meal object.
   * Throws an error if required fields are missing.
   */
  build(): Meal {
    if (!this._mainDish) {
      throw new Error('Main dish is required to build a meal.');
    }
    return Meal.fromBuilder(this);
  }
}

// --- Example usage (uncomment to test) ---
// const builder = new MealBuilder();
// const myMeal = builder
//   .setMainDish('Burger')
//   .addSide('Fries')
//   .addSide('Nuggets')
//   .setDrink({ type: 'Soda', size: 'Large', flavor: 'Cola', iceLevel: 'Regular' })
//   .addTopping('Cheese')
//   .addTopping('Bacon')
//   .setDessert('Ice Cream')
//   .build();
// console.log(myMeal.summary());
