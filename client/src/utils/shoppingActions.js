export const normalize = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[.,!?]/g, "")
    .replace(/s$/, "");

// ---------------- ADD ----------------

export function addItem(
  shoppingList,
  result
) {

  const index = shoppingList.findIndex(
    item =>
      normalize(item.name) === normalize(result.item)
  );

  if (index !== -1) {

    const updated = [...shoppingList];

    updated[index] = {

      ...updated[index],

      quantity:
        updated[index].quantity + result.quantity,

      status: "Added",

    };

    return {

      updated,

      lastItem: updated[index].name,

      message: `Added ${result.quantity} ${updated[index].name} to your shopping list.`

    };

  }

  const newItem = {

    id: Date.now(),

    name:
      result.item.charAt(0).toUpperCase() +
      result.item.slice(1),

    category: "Others",

    quantity: result.quantity,

    status: "Added",

  };

  return {

    updated: [...shoppingList, newItem],

    lastItem: newItem.name,

    message: `Added ${newItem.name} to your shopping list.`

  };

}

// ---------------- REMOVE ----------------

export function removeItem(
  shoppingList,
  result
){

  let found=false;

  const updated=shoppingList.map(item=>{

    if(
      normalize(item.name)===normalize(result.item)
    ){

      found=true;

      return{

        ...item,

        quantity:Math.max(
          0,
          item.quantity-result.quantity
        ),

        status:"Pending",

      };

    }

    return item;

  });

  return{

    found,

    updated,

    message:found
      ?`Removed ${result.quantity} ${result.item}.`
      :"Product not found."

  };

}

// ---------------- SEARCH ----------------

export function searchItem(
  shoppingList,
  result
){

  const found=shoppingList.find(item=>

    normalize(item.name)===normalize(result.item)

  );

  return{

    found,

    message:found
      ?`${found.name} is already in your shopping list. Need ${found.quantity}.`
      :"Product not found."

  };

}