import { Toast } from "primereact/toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { deleteMessage, fetchMails } from "../../features/mailSlice";
import { useDispatch, useSelector } from "react-redux";

const Mails = () => {
  const [products, setProducts] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const dispatch = useDispatch();
  const { mails } = useSelector((state) => state.mails);
  useEffect(() => {
    dispatch(fetchMails());
    setProducts(mails);
  }, [dispatch, mails]);

  const exportCSV = () => {
    dt.current.exportCSV();
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
          onClick={() => dispatch(deleteMessage(rowData._id))}
        />
      </>
    );
  };

  const header = (
    <div className="flex  gap-2  justify-content-between">
      <h4 className="mt-3">Manage Messages</h4>
      <IconField iconPosition="right">
        <InputIcon className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </IconField>
      <Button onClick={exportCSV} label="Export Data"></Button>
    </div>
  );

  return (
    <div className="overflow-x-hidden">
      <h1 className="text-center text-3xl font-bold p-4">Messages</h1>
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
            field="name"
            header="Name"
            sortable
            style={{ minWidth: "10rem" }}
          ></Column>

          <Column
            field="email"
            header="Email"
            sortable
            style={{ minWidth: "12rem" }}
          ></Column>

          <Column
            field="message"
            header="Message"
            sortable
            style={{ minWidth: "16rem" }}
          ></Column>
          <Column
            field="createdAt"
            header="Time and Date"
            sortable
            style={{ minWidth: "12rem" }}
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

export default Mails;
