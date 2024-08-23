import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { fetchInventory } from "../../features/inventorySlice";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const [products, setProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const { inventory } = useSelector((state) => state.inventory);
  console.log(inventory);
  useEffect(() => {
    dispatch(fetchInventory());
    setProducts(inventory);
  }, [dispatch, inventory]);

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        label="Export"
        icon="pi pi-upload"
        className="p-button-help"
        onClick={exportCSV}
      />
    );
  };

  const header = (
    <div className="flex  gap-4  justify-content-between">
      <h4 className="mt-3">Manage Orders</h4>
      <IconField iconPosition="right">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
      <Button body={rightToolbarTemplate} label="Export Data" />
    </div>
  );

  return (
    <div className="overflow-x-hidden">
      <h1 className="text-center text-3xl font-bold p-4">Inventory</h1>
      <Toast ref={toast} />
      <div className="card">
        <DataTable
          ref={dt}
          value={products}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          header={header}
        >
          <Column selectionMode="multiple" exportable={false}></Column>
          <Column
            field="_id"
            header="ID"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>
          <Column
            field="productId.name"
            header="Name"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>

          <Column
            field="productId.price"
            header="Unit Price"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="quantity"
            header="Quantity"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="productId.description"
            header="Description"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            field="productId.sku"
            header="SKU"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Orders;
