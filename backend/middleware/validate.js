const validateStore = (req, res, next) => {
  const { name, category, floor } = req.body;

  const errors = [];

  if (!name || name.trim() === "") {
    errors.push("Store name is required");
  }

  if (!category || category.trim() === "") {
    errors.push("Category is required");
  } else {
    const validCategories = [
      "Food & Beverage",
      "Fashion",
      "Electronics",
      "Services",
    ];
    if (!validCategories.includes(category)) {
      errors.push("Invalid category");
    }
  }

  if (!floor || floor.trim() === "") {
    errors.push("Floor/Location is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
};

export { validateStore };