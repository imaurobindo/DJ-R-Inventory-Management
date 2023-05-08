{showAddForm1 ? (
  <form onSubmit={handleSubmit1} method="post">
    <div>
      <label htmlFor="sub_category_name">
        Sub-Category Name
        <input
          type="text"
          name="sub_category_name"
          value={state1.sub_category_name}
          onChange={handleChange1}
        />
      </label>
    </div>
    <div>
      <label htmlFor="sub_category">
        Sub-Category
        <select
          name="sub_category"
          value={state1.sub_category}
          onChange={handleChange1}
        >
          <option value="">Select Sub-Category</option>
          {selectedCategorySubcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.sub_category_name}
            </option>
          ))}
        </select>
      </label>
    </div>
    <div>
      <label htmlFor="sub_sub_category_name">
        Sub-Sub-Category Name
        <input
      type="text"
      name="sub_sub_category_name"
      value={state1.sub_sub_category_name}
      onChange={handleChange1}
    />
  </label>
</div>
<div>
  <button type="submit">Add Sub-Sub-Category</button>
  <button type="button" onClick={() => setShowAddForm1(false)}>
    Cancel
  </button>
</div>
</form>
) : (
<button onClick={() => setShowAddForm1(true)}>
Add Sub-Sub-Category
</button>
)}