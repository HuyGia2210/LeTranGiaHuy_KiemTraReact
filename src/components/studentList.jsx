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

  return (
    <div className="container">
      <h1>Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Lớp"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
        />
        <input
          placeholder="Tuổi"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={handleAddStudent}>Thêm sinh viên</button>
      </div>

      {/* Danh sách */}
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
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.age}</td>
              <td>
                <button className='text-red-500'>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}