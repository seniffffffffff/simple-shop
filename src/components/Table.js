import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import NewModal from "./Modal";
import { useState } from "react";

const NewTable = ({ data, deleteSingleProduct }) => {
  const [show, setShow] = useState(null);
  const handleClose = () => setShow(null);
  const handleOpen = (id) => setShow(id);
  const saveChanges = (id) => {
    deleteSingleProduct(show);
    handleClose();
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>category</th>
            <th>description</th>
            <th>image</th>
            <th>price</th>
            <th>Delete column</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((itemProduct) => {
              return (
                <tr key={itemProduct.id}>
                  <td>{itemProduct.id}</td>
                  <td>{itemProduct.title}</td>
                  <td>{itemProduct.category}</td>
                  <td>{itemProduct.description}</td>
                  <td>
                    <Image
                      src={itemProduct.image}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{itemProduct.price}</td>
                  <td
                    onClick={() => handleOpen(itemProduct.id)}
                    style={{ cursor: "pointer" }}
                  >
                    X
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <NewModal
        show={!!show}
        saveChanges={saveChanges}
        handleClose={handleClose}
      />
    </>
  );
};

export default NewTable;
