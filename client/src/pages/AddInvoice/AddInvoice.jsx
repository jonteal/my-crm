const AddInvoice = () => {
  const handleSubmit = () => {
    console.log("form submit clicked");
  };
  return (
    <div>
      <h1>AddInvoice</h1>

      <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder="Invoice Amount" />
      </form>
    </div>
  );
};

export default AddInvoice;
