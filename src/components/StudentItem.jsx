import React from 'react'

export default function StudentItem({
  student, isEditing,
  editName, editClass, editAge,
  onStartEdit, onChangeEditName, onChangeEditClass, onChangeEditAge,
  onSaveEdit, onCancelEdit, onDelete
}) {
  return (
    <tr className="border-b hover:bg-gray-50">
      {isEditing ? (
        <>
          <td className="px-4 py-2">
            <input
              className="border rounded w-full px-2 py-1"
              value={editName}
              onChange={e => onChangeEditName(e.target.value)}
            />
          </td>
          <td className="px-4 py-2">
            <input
              className="border rounded w-full px-2 py-1"
              value={editClass}
              onChange={e => onChangeEditClass(e.target.value)}
            />
          </td>
          <td className="px-4 py-2">
            <input
              className="border rounded w-full px-2 py-1"
              type="number" value={editAge}
              onChange={e => onChangeEditAge(e.target.value)}
            />
          </td>
          <td className="px-4 py-2 flex gap-2">
            <button
              className="bg-green-500 text-white rounded px-3 py-1 hover:bg-green-600"
              onClick={() => onSaveEdit(student.id)}
            >
              Lưu
            </button>
            <button
              className="bg-gray-300 rounded px-3 py-1 hover:bg-gray-400"
              onClick={onCancelEdit}
            >
              Huỷ
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-4 py-2">{student.name}</td>
          <td className="px-4 py-2">{student.class}</td>
          <td className="px-4 py-2">{student.age}</td>
          <td className="px-4 py-2 flex gap-4">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => onStartEdit(student)}
            >
              Sửa
            </button>
            <button
              className="text-red-500 hover:underline"
              onClick={() => onDelete(student.id)}
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  )
}
