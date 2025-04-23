import React, { useState, useEffect } from 'react';
import StudentItem from './StudentItem.jsx';

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Nguyễn Văn A', class: '12A1', age: 18 },
      { id: 2, name: 'Trần Thị B', class: '12A2', age: 17 },
      { id: 3, name: 'Lê Văn C', class: '12A1', age: 18 },
    ];
  });

  // form thêm
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [age, setAge] = useState('');

  // edit
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editClass, setEditClass] = useState('');
  const [editAge, setEditAge] = useState('');

  // search & filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('All');

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const handleAddStudent = () => {
    if (!name || !studentClass || !age) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    setStudents([...students, {
      id: Date.now(),
      name, class: studentClass, age: parseInt(age)
    }]);
    setName(''); setStudentClass(''); setAge('');
  };

  const handleDelete = id => {
    setStudents(students.filter(s => s.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const handleStartEdit = student => {
    setEditingId(student.id);
    setEditName(student.name);
    setEditClass(student.class);
    setEditAge(student.age.toString());
  };

  const handleSaveEdit = id => {
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

  const handleCancelEdit = () => setEditingId(null);

  const classOptions = ['All', ...new Set(students.map(s => s.class))];
  const filtered = students
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(s => filterClass === 'All' ? true : s.class === filterClass);

  return (
    <div className="container">
      <h1>Danh sách sinh viên</h1>

      {/* Form thêm */}
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Họ tên" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Lớp"   value={studentClass} onChange={e => setStudentClass(e.target.value)} />
        <input placeholder="Tuổi"  type="number" value={age} onChange={e => setAge(e.target.value)} />
        <button onClick={handleAddStudent}>Thêm sinh viên</button>
      </div>

      {/* Search & lọc */}
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Tìm kiếm..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ marginRight: 8 }}/>
        <select value={filterClass} onChange={e => setFilterClass(e.target.value)}>
          {classOptions.map(c => <option key={c} value={c}>{c==='All' ? 'Tất cả lớp' : c}</option>)}
        </select>
      </div>

      {/* Bảng */}
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>Họ tên</th><th>Lớp</th><th>Tuổi</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {filtered.map(s => (
            <StudentItem
              key={s.id}
              student={s}
              isEditing={editingId === s.id}
              editName={editName} editClass={editClass} editAge={editAge}
              onStartEdit={handleStartEdit}
              onChangeEditName={setEditName}
              onChangeEditClass={setEditClass}
              onChangeEditAge={setEditAge}
              onSaveEdit={handleSaveEdit}
              onCancelEdit={handleCancelEdit}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
