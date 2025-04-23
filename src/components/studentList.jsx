import React, { useState } from 'react';

export default function StudentList(){
    const [students, setStudents] = useState([
        { id: 1, name: 'Nguyễn Văn A', class: '12A1', age: 18 },
        { id: 2, name: 'Trần Thị B', class: '12A2', age: 17 },
        { id: 3, name: 'Lê Văn C', class: '12A1', age: 18 },
      ]);

    const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [age, setAge] = useState('');

  // States cho edit
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editClass, setEditClass] = useState('');
  const [editAge, setEditAge] = useState('');

  const handleAddStudent = () => {
    if (!name || !studentClass || !age) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newStudent = {
      id: Date.now(), // đảm bảo id duy nhất
      name,
      class: studentClass,
      age: parseInt(age)
    };

    setStudents([...students, newStudent]);

    // Reset input
    setName('');
    setStudentClass('');
    setAge('');
  };

  const handleDeleteStudent = (id) => {
    // Lọc bỏ sinh viên có id bằng id được truyền vào
    setStudents(students.filter(student => student.id !== id));
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditName(student.name);
    setEditClass(student.class);
    setEditAge(student.age.toString());
  };

  const handleSaveEdit = (id) => {
    if (!editName || !editClass || !editAge) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    setStudents(students.map(s =>
      s.id === id
        ? { ...s, name: editName, class: editClass, age: parseInt(editAge) }
        : s
    ));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1>Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Họ tên"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Lớp"
          value={studentClass}
          onChange={e => setStudentClass(e.target.value)}
        />
        <input
          placeholder="Tuổi"
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        <button onClick={handleAddStudent}>Thêm sinh viên</button>
      </div>

      {/* Bảng danh sách */}
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Tuổi</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              {editingId === student.id ? (
                <>
                  <td>
                    <input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      value={editClass}
                      onChange={e => setEditClass(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editAge}
                      onChange={e => setEditAge(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleSaveEdit(student.id)}>Lưu</button>
                    <button onClick={handleCancelEdit}>Huỷ</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.age}</td>
                  <td>
                    <button className='text-blue-500' onClick={() => startEdit(student)}>Sửa</button>
                    <button className='text-red-500' onClick={() => handleDeleteStudent(student.id)}>Xoá</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}