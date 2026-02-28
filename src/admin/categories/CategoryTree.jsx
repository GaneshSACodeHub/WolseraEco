import React from "react";
import CategoryNode from "./CategoryNode";

function CategoryTree({ categories, setCategories }) {

  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <CategoryNode
          key={category.id}
          category={category}
          categories={categories}
          setCategories={setCategories}
          level={0}
        />
      ))}
    </div>
  );
}

export default CategoryTree;