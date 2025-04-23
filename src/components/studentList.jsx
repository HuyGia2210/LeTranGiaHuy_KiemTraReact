import React, { useState, useEffect } from 'react'
import StudentItem from "./StudentItem.jsx" 

export default function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('students')
    return saved ? JSON.parse(saved) : []
  })
  const [name, setName] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [age, setAge] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editClass, setEditClass] = useState('')
  const [editAge, setEditAge] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('All')

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students))
  }, [students])

  const handleAdd = () => {
    if (!name || !studentClass || !age) return
    setStudents([...students, { id: Date.now(), name, class: studentClass, age: +age }])
    setName(''); setStudentClass(''); setAge('')
  }
  const handleDelete = id => {
    setStudents(students.filter(s => s.id !== id))
    if (editingId === id) setEditingId(null)
  }
  const startEdit = s => {
    setEditingId(s.id)
    setEditName(s.name); setEditClass(s.class); setEditAge(s.age.toString())
  }
  const saveEdit = id => {
    setStudents(students.map(s => s.id===id ? { ...s, name: editName, class: editClass, age: +editAge } : s))
    setEditingId(null)
  }
  const cancelEdit = () => setEditingId(null)

  const classOptions = ['All', ...new Set(students.map(s=>s.class))]
  const filtered = students
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(s => filterClass==='All' ? true : s.class===filterClass)

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center mb-6">Quản lý sinh viên</h1>

        {/* form thêm */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Họ tên" value={name}
            onChange={e=>setName(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2 w-full"
            placeholder="Lớp" value={studentClass}
            onChange={e=>setStudentClass(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="border rounded px-3 py-2 flex-1"
              placeholder="Tuổi" type="number" value={age}
              onChange={e=>setAge(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 flex-shrink-0"
              onClick={handleAdd}
            >
              Thêm
            </button>
          </div>
        </div>

        {/* search & lọc */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <input
            className="border rounded px-3 py-2 flex-1"
            placeholder="Tìm kiếm..." value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
          />
          <select
            className="border rounded px-3 py-2 w-full sm:w-auto"
            value={filterClass} onChange={e=>setFilterClass(e.target.value)}
          >
            {classOptions.map(c=>(
              <option key={c} value={c}>{c==='All'?'Tất cả lớp':c}</option>
            ))}
          </select>
        </div>

        {/* table trên desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                {['Họ tên','Lớp','Tuổi','Hành động'].map(h=>(
                  <th key={h} className="border px-4 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? filtered.map(s=>(
                <StudentItem
                  key={s.id}
                  student={s}
                  isEditing={editingId===s.id}
                  editName={editName} editClass={editClass} editAge={editAge}
                  onStartEdit={startEdit}
                  onChangeEditName={setEditName}
                  onChangeEditClass={setEditClass}
                  onChangeEditAge={setEditAge}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                  onDelete={handleDelete}
                />
              )) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">Không có sinh viên</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* card view trên mobile */}
        <div className="md:hidden space-y-4">
          {filtered.length > 0 ? filtered.map(s=>(
            <div key={s.id} className="bg-gray-50 border rounded-lg p-4 shadow-sm">
              {editingId===s.id ? (
                <>
                  <input
                    className="border rounded w-full mb-2 px-2 py-1"
                    value={editName} onChange={e=>setEditName(e.target.value)}
                  />
                  <input
                    className="border rounded w-full mb-2 px-2 py-1"
                    value={editClass} onChange={e=>setEditClass(e.target.value)}
                  />
                  <input
                    className="border rounded w-full mb-3 px-2 py-1"
                    type="number" value={editAge} onChange={e=>setEditAge(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button onClick={()=>saveEdit(s.id)} className="flex-1 bg-green-500 text-white rounded py-1">Lưu</button>
                    <button onClick={cancelEdit} className="flex-1 bg-gray-300 rounded py-1">Huỷ</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-gray-600">Lớp: {s.class}</p>
                  <p className="text-sm text-gray-600 mb-3">Tuổi: {s.age}</p>
                  <div className="flex gap-4">
                    <button onClick={()=>startEdit(s)} className="text-blue-500">Sửa</button>
                    <button onClick={()=>handleDelete(s.id)} className="text-red-500">Xoá</button>
                  </div>
                </>
              )}
            </div>
          )) : (
            <p className="text-center text-gray-500">Không có sinh viên</p>
          )}
        </div>
      </div>
    </div>
  )
}
