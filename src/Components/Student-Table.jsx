import { useState } from "react";
import "./StudentTable.css";

const initialStudentsData = [];

function StudentList({ students, selectedStudents, onCheckboxChange }) {
  return (
    <div className="card custom-card" style={{ width: "calc(100% + 50px)" }}>
      <div className="card-body">
        <h2 className="card-title">Student List</h2>
        <table className="table table-bordered">
          <thead style={{marginRight:'500px'}} className="table-light">
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selectedStudents.some((s) => s.id === student.id)}
                    onChange={() => onCheckboxChange(student)}
                  />
                </td>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SelectedStudents({
  selectedStudents,
  revokeSelection,
  onCheckboxChange,
}) {
  return (
    <div className="card custom-card">
      <div className="card-body">
        <h2 className="card-title">Selected Students</h2>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {selectedStudents.map((student) => (
              <tr key={student.id}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={revokeSelection.some((s) => s.id === student.id)}
                    onChange={() => onCheckboxChange(student)}
                  />
                </td>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function StudentTable() {
  const [students, setStudents] = useState(initialStudentsData);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [pendingSelection, setPendingSelection] = useState([]);
  const [revokeSelection, setRevokeSelection] = useState([]);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });

  const handleCheckboxChange = (student) => {
    setPendingSelection((prev) =>
      prev.find((s) => s.id === student.id)
        ? prev.filter((s) => s.id !== student.id)
        : [...prev, student]
    );
  };

  const handleRevokeCheckboxChange = (student) => {
    setRevokeSelection((prev) =>
      prev.find((s) => s.id === student.id)
        ? prev.filter((s) => s.id !== student.id)
        : [...prev, student]
    );
  };

  const addSelectedStudents = () => {
    setSelectedStudents((prev) => [
      ...new Map(
        [...prev, ...pendingSelection].map((item) => [item.id, item])
      ).values(),
    ]);
    setPendingSelection([]);
  };

  const revokeSelectedStudents = () => {
    setSelectedStudents((prev) =>
      prev.filter((s) => !revokeSelection.some((r) => r.id === s.id))
    );
    setRevokeSelection([]);
  };

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const addNewStudent = () => {
    if (!newStudent.firstName || !newStudent.lastName || !newStudent.address)
      return;

    const exists = students.some(
      (s) =>
        s.firstName === newStudent.firstName &&
        s.lastName === newStudent.lastName &&
        s.address === newStudent.address
    );
    if (!exists) {
      setStudents([...students, { id: students.length + 1, ...newStudent }]);
      setNewStudent({ firstName: "", lastName: "", address: "" });
    }
  };

  return (
    <div style={{justifyContent:'space-around'}} className="container mt-4">
      <div className="mb-3">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newStudent.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newStudent.lastName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={newStudent.address}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={addNewStudent}>
          Add Student
        </button>
      </div>
      <div className="row">
        <div className="col-md-5">
          <StudentList
            students={students}
            selectedStudents={pendingSelection}
            onCheckboxChange={handleCheckboxChange}
          />
        </div>
        <div className="col-md-2 d-flex flex-column align-items-center justify-content-center">
          <button
            className="btn btn-success mb-2"
            onClick={addSelectedStudents}
          >
            ADD
          </button>
          <button className="btn btn-danger" onClick={revokeSelectedStudents}>
            Revoke
          </button>
        </div>
        <div className="col-md-5">
          <SelectedStudents
            selectedStudents={selectedStudents}
            revokeSelection={revokeSelection}
            onCheckboxChange={handleRevokeCheckboxChange}
          />
        </div>
      </div>
    </div>
  );
}
