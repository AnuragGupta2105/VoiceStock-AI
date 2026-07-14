import products from "../data/products";

// ================= NORMALIZE =================

export const normalize = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[.,!?]/g, "")
    .replace(/s$/, "");

// ================= ADD =================

export function addItem(shoppingList, result) {

  const index = shoppingList.findIndex(

    item => normalize(item.name) === normalize(result.item)

  );

  if (index !== -1) {

    const updated = [...shoppingList];

    updated[index] = {

      ...updated[index],

      quantity:

        updated[index].quantity +

        result.quantity,

      status: "Added",

    };

    return {

      updated,

      lastItem: updated[index].name,

      message: `Added ${result.quantity} ${updated[index].name} to your shopping list.`,

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

    message: `Added ${newItem.name} to your shopping list.`,

  };

}

// ================= REMOVE =================

export function removeItem(

  shoppingList,

  result

) {

  let found = false;

  const updated = shoppingList.map(item => {

    if (

      normalize(item.name) ===

      normalize(result.item)

    ) {

      found = true;

      return {

        ...item,

        quantity: Math.max(

          0,

          item.quantity -

            result.quantity

        ),

        status: "Pending",

      };

    }

    return item;

  });

  return {

    found,

    updated,

    message: found

      ? `Removed ${result.quantity} ${result.item}.`

      : "Product not found.",

  };

}

// ================= SEARCH =================

export function searchItem(result) {

  let filtered = [...products];

  // -------------------------
  // Product Name
  // -------------------------

  // Search by product name ONLY if category isn't specified
if (result.item && !result.category) {

  filtered = filtered.filter(product =>

    normalize(product.name).includes(
      normalize(result.item)
    )

  );

}
  // -------------------------
  // Brand
  // -------------------------

  if (result.brand) {

    filtered = filtered.filter(product =>

      product.brand &&

      normalize(product.brand).includes(

        normalize(result.brand)

      )

    );

  }

  // -------------------------
  // Category
  // -------------------------

  if (result.category) {

    filtered = filtered.filter(product =>

      product.category &&

      normalize(product.category).includes(

        normalize(result.category)

      )

    );

  }

  // -------------------------
  // Price
  // -------------------------

  if (result.price) {

    filtered = filtered.filter(product =>

      product.price <= result.price

    );

  }

  // -------------------------
  // No Result
  // -------------------------

  if (filtered.length === 0) {

    return {

      found: false,

      items: [],

      message:

        "Sorry, I couldn't find any matching products.",

    };

  }

  // -------------------------
  // Format Response
  // -------------------------

  const list = filtered

    .map(

      product =>

        `${product.name} | ${product.brand} | ₹${product.price}`

    )

    .join(", ");

  return {

    found: true,

    items: filtered,

    message:

      `Found ${filtered.length} product(s): ${list}.`,

  };

}