import React from "react";

function TodoForm(
  {
    formData,
    handleChange,
    handleSubmit,
    cancelEdit,
    isLoading,
    error,
    buttonLabel,
  }) {
  if (isLoading) return <div className="text-center mt-3">Loading...</div>;
  if (error) return <div className="alert alert-danger">Error fetching data</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h4 className="text-center mb-3">Todo Form</h4>
        <form>
          <div className="row">
            {/* Display Name */}
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="displayName"
                  placeholder="Enter display name"
                  value={formData.displayName}
                  onChange={handleChange}
                />
                <label htmlFor="displayName">Display Name</label>
              </div>
            </div>

            {/* Key */}
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="key"
                  placeholder="Enter key"
                  value={formData.key}
                  onChange={handleChange}
                />
                <label htmlFor="key">Key</label>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Description */}
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="description"
                  rows="2"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="description">Description</label>
              </div>
            </div>

            {/* Attribute */}
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="attribute"
                  rows="2"
                  placeholder="Enter attributes"
                  value={formData.attribute}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="attribute">Attribute</label>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center mt-3">
            <button
              id="submit-update-btn"
              onClick={handleSubmit}
              type="button"
              className="btn btn-primary me-2 px-4"
            >
              {buttonLabel}
            </button>

            <button
              id="cancel-btn"
              onClick={cancelEdit}
              type="button"
              className="btn btn-outline-secondary px-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TodoForm;
