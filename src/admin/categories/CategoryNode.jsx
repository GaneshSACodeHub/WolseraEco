import React, { useState } from "react";
import { ChevronRight, Pencil, Trash2, Plus } from "lucide-react";

function CategoryNode({ category, categories, setCategories, level }) {

  const [isOpen, setIsOpen] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(category.name);
  const [isAddingChild, setIsAddingChild] = useState(false);
  const [childName, setChildName] = useState("");

  // ================= UPDATE NAME =================
  const updateCategoryName = (id, newName, nodes) => {
    return nodes.map(node => {
      if (node.id === id) {
        return { ...node, name: newName };
      }
      if (node.children.length > 0) {
        return {
          ...node,
          children: updateCategoryName(id, newName, node.children)
        };
      }
      return node;
    });
  };

  // ================= DELETE =================
  const deleteCategory = (id, nodes) => {
    return nodes
      .filter(node => node.id !== id)
      .map(node => ({
        ...node,
        children: deleteCategory(id, node.children)
      }));
  };

  // ================= ADD CHILD =================
  const addChildCategory = (id, name, nodes) => {
    return nodes.map(node => {
      if (node.id === id) {
        return {
          ...node,
          children: [
            ...node.children,
            { id: Date.now(), name, children: [] }
          ]
        };
      }
      if (node.children.length > 0) {
        return {
          ...node,
          children: addChildCategory(id, name, node.children)
        };
      }
      return node;
    });
  };

  const handleRename = () => {
    if (!editName.trim()) return;
    const updated = updateCategoryName(category.id, editName, categories);
    setCategories(updated);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (category.children.length > 0) return;
    const updated = deleteCategory(category.id, categories);
    setCategories(updated);
  };

  const handleAddChild = () => {
    if (!childName.trim()) return;
    const updated = addChildCategory(category.id, childName, categories);
    setCategories(updated);
    setChildName("");
    setIsAddingChild(false);
    setIsOpen(true);
  };

  return (
    <div>

      {/* ================= NODE ROW ================= */}
      <div
        className="flex items-center gap-2 py-2 px-3 rounded-lg 
                   hover:bg-zinc-100 transition-colors duration-200"  // 🔥 UPDATED
        style={{ paddingLeft: `${level * 20}px` }}
      >

        {/* ================= ARROW ================= */}
        {category.children.length > 0 ? (
          <button onClick={() => setIsOpen(!isOpen)}>
            <ChevronRight
              size={18}
              className={`transition-transform duration-200  // 🔥 UPDATED
                          ${isOpen ? "rotate-90" : ""}`}
            />
          </button>
        ) : (
          <div className="w-[18px]" />
        )}

        {/* ================= EDIT MODE ================= */}
        {isEditing ? (
          <>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="border border-zinc-300 rounded px-2 py-1 text-sm"
            />
            <button onClick={handleRename} className="text-green-600 text-sm">✔</button>
            <button onClick={() => setIsEditing(false)} className="text-red-500 text-sm">✖</button>
          </>
        ) : (
          <>
            <span className="flex-1 text-sm font-medium text-zinc-800">
              {category.name}
            </span>

            <div className="flex gap-3">
              <button onClick={() => setIsAddingChild(true)}>
                <Plus size={16} />
              </button>

              <button onClick={() => setIsEditing(true)}>
                <Pencil size={16} />
              </button>

              <button
                onClick={handleDelete}
                disabled={category.children.length > 0}
                className={`${
                  category.children.length > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-red-500"
                }`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </>
        )}

      </div>

      {/* ================= ADD CHILD INPUT ================= */}
      {isAddingChild && (
        <div
          className="flex gap-3 mt-2"
          style={{ paddingLeft: `${(level + 1) * 20}px` }}
        >
          <input
            type="text"
            placeholder="New subcategory"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="border border-zinc-300 rounded-lg p-2 text-sm flex-1"
          />
          <button
            onClick={handleAddChild}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-zinc-800 transition"
          >
            Add
          </button>
        </div>
      )}

      {/* ================= CHILDREN (ANIMATED) ================= */}
      {category.children.length > 0 && (
        <div
          className={`overflow-hidden transition-all duration-300   // 🔥 UPDATED
                      ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
        >
          {/* Optional left guide line */}
          <div className="border-l border-zinc-200 ml-3 pl-3"> {/* 🔥 UPDATED */}

            {category.children.map((child) => (
              <CategoryNode
                key={child.id}
                category={child}
                categories={categories}
                setCategories={setCategories}
                level={level + 1}
              />
            ))}

          </div>
        </div>
      )}

    </div>
  );
}

export default CategoryNode;