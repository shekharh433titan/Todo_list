import React from "react";

function TodoForm(
  {
    formData,
    handleChange,
    handleSubmit,
    cancelEdit,
    isLoading,
    error,
    buttonLabel }) {


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    < div className = "form-container" >
      <form>
        <div className="form-input-row">
          <div className="mb-3">
            <label htmlFor="displayName" className="form-label">
              Display Name
            </label>
            <input
              type="text"
              className="form-control"
              id="displayName"
              placeholder="Enter display name"
              value={formData.displayName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="key" className="form-label">
              Key
            </label>
            <input
              type="text"
              className="form-control"
              id="key"
              placeholder="Enter key"
              value={formData.key}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-input-row">
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="2"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="attribute" className="form-label">
              Attribute
            </label>
            <textarea
              className="form-control"
              id="attribute"
              rows="2"
              placeholder="Enter attributes"
              value={formData.attribute}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>

        <div className="btn-group">
          <button
            id="submit-update-btn"
            onClick={handleSubmit}
            type="button"
            className="btn btn-primary me-2"
          >
            {buttonLabel}
          </button>

          <button
            id="cancel-btn"
            onClick={cancelEdit}
            type="button"
            className="btn btn-secondry me-2"
          >
            Cancel
          </button>
        </div>
      </form>
      </div >
  );
}

export default TodoForm;
