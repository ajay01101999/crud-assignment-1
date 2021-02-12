import { Table, Button, Typography, Input, Select, Modal } from "antd";
import { useState } from "react";

const { Option } = Select;

import "./styles.css";
import "antd/dist/antd.css";

export default function App() {
  const dataSource = [
    { id: 1, name: "Ajay Sharma", age: "20", option: ["delete", "edit"] },
    { id: 2, name: "Shiv", age: "22", option: ["delete", "add"] }
  ];

  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [nameVal, setNameVal] = useState("");
  const [age, setAge] = useState("Above 18");
  const [data, setData] = useState(dataSource);

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Age", dataIndex: "age" },
    {
      title: "Option",
      dataIndex: "option",
      render: (option, record) => (
        // option.map((btn) => (
        <div>
          <Button
            style={{ marginRight: "20px" }}
            type="link"
            onClick={() => handleDelete(record.id)}
          >
            {"delete".toUpperCase()}
          </Button>
          <Button onClick={(e) => handleEdit(record)}>edit</Button>
        </div>
      )
      // ))
    }
  ];

  const handleDelete = (id) => {
    var newData = [...data];
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].id === id) {
        newData.splice(i, 1);
      }
    }
    setData(newData);
  };

  const handleEdit = (record) => {
    setModal(true);
    // setNameVal(record.name);
    var newData = [...data];
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].id === record.id) {
        newData[i].name = name;
      }
    }
    setData(newData);
    setName("");
  };

  const addData = () => {
    const obj = {
      id: data.length + 1,
      name,
      age,
      option: ["delete", "edit"]
    };
    setData((prevState) => [...prevState, { ...obj }]);
    setName("");
  };

  const showModal = () => {
    setModal(true);
  };

  const handleOk = () => {
    setModal(false);
  };

  const handleCancel = () => {
    setModal(false);
  };

  return (
    <div className="App">
      <Typography>
        <h1
          style={{
            margin: "20px",
            backgroundColor: "lightgray",
            borderRadius: "8px",
            padding: "10px",
            color: "white"
          }}
        >
          Table using Ant design
        </h1>
      </Typography>
      {/* <span style={{color:'red'}}>ADD TASK </span> */}
      <Button
        type="danger"
        onClick={() => {
          setModal(!modal);
          setNameVal("");
        }}
      >
        Add Task
      </Button>
      <Table style={{ margin: "20px" }} columns={columns} dataSource={data} />
      <Modal
        title="ADD TASK"
        visible={modal}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="input"
          style={{ width: "460px", marginBottom: "20px" }}
          placeholder="Enter Name"
        />
        <Select
          className="select"
          defaultValue="Above 18"
          onChange={(e) => setAge(e)}
        >
          <Option value="Above 18">Above 18</Option>
          <Option value="Below 18">Below 18</Option>
        </Select>
        <br />
        <Button className="btn" type="primary" onClick={addData}>
          Add
        </Button>
      </Modal>
      {/* <div className="modal" style={{ display: modal ? "block" : "none" }}>
        <br /> */}
      {/* </div> */}
    </div>
  );
}
