import React from "react";
import Modal from "react-bootstrap/Modal";

const ModelViewUser = (props) => {
  const { show, setShow, dataView } = props;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>

              <input
                type="text"
                className="form-control"
                value={dataView?.email || ""}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>

              <input
                type="text"
                className="form-control"
                value={dataView?.username || ""}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Role</label>

              <input
                type="text"
                className="form-control"
                value={dataView?.role || ""}
                disabled
              />
            </div>

            <div className="col-md-12">
              <label className="form-label">Image</label>

              <div className="img-preview">
                {dataView?.image ? (
                  <img
                    src={`data:image/jpeg;base64,${dataView.image}`}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "300px",
                    }}
                  />
                ) : (
                  <span>No image</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelViewUser;
