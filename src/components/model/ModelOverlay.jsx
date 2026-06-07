const ModelOverlay = ({ title, text, onClose }) => {
  return (
    <main
      style={{
        width: "100%",
        height: "100dvh",
        background: "rgba(0,0,0,0.6)",
        zIndex: 1050,
        justifyContent: "center",
      }}
      className="position-fixed top-0 start-0 d-flex justify-content-center align-items-center text-dark"
    >
      <div
        style={{ width: "60%", height: "45%", margin: "auto" }}
        className="border p-3 rounded shadow bg-white d-flex flex-column"
      >
        <div className="d-flex justify-content-between align-items-center border-bottom border-2 pb-3">
          <h3> {title} </h3>
          <button onClick={onClose} className="btn fs-5 border-danger ">
            X
          </button>
        </div>
        <div className="text-center mt-5">
          <p>{text}</p>
        </div>

        <button onClick={onClose} className="btn btn-danger mt-auto">
          Close
        </button>
      </div>
    </main>
  );
};

export default ModelOverlay;
