import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { fetchUsers, deleteUser } from "../../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Orders = () => {
  const [products, setProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  console.log(users);
  useEffect(() => {
    dispatch(fetchUsers());
    setProducts(users);
  }, [dispatch, users]);

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

  const Delete = (rowData) => {
    console.log(rowData);
    return (
      <>
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          // onClick={() => confirmDeleteProduct(rowData)}
          // onClick={() => alert(`Deleted (Pending) ${rowData._id} `)}
          onClick={() => dispatch(deleteUser(rowData._id))}
        />
      </>
    );
  };
  const header = (
    <div className="flex  gap-4  justify-content-between">
      <h4 className="mt-3">Manage Users</h4>
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
      <h1 className="text-center text-3xl font-bold p-4">Users</h1>
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
            style={{ minWidth: "14rem" }}
          ></Column>
          <Column
            field="firstName"
            header="F-Name"
            sortable
            style={{ minWidth: "13rem" }}
          ></Column>
          <Column
            field="lastName"
            header="L-Name"
            sortable
            style={{ minWidth: "13rem" }}
          ></Column>

          <Column
            field="email"
            header="Email"
            sortable
            style={{ minWidth: "14rem" }}
          ></Column>

          <Column
            header="Delete"
            body={Delete}
            exportable={false}
            style={{ minWidth: "6rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default Orders;
