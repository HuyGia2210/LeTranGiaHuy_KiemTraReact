import React from 'react';

export default function StudentItem({
  student,
  isEditing,
  editName, editClass, editAge,
  onStartEdit,
  onChangeEditName, onChangeEditClass, onChangeEditAge,
  onSaveEdit, onCancelEdit,
  onDelete
}) {
  return (
    <tr>
      {isEditing ? (
        <>
          <td>
            <input
              value={editName}
              onChange={e => onChangeEditName(e.target.value)}
            />
          </td>
          <td>
            <input
              value={editClass}
              onChange={e => onChangeEditClass(e.target.value)}
            />
          </td>
          <td>
            <input
              type="number"
              value={editAge}
              onChange={e => onChangeEditAge(e.target.value)}
            />
          </td>
          <td>
            <button onClick={() => onSaveEdit(student.id)}>Lưu</button>
            <button onClick={onCancelEdit}>Huỷ</button>
          </td>
        </>
      ) : (
        <>
          <td>{student.name}</td>
          <td>{student.class}</td>
          <td>{student.age}</td>
          <td>
            <button onClick={() => onStartEdit(student)}>Sửa</button>
            <button onClick={() => onDelete(student.id)}>Xoá</button>
          </td>
        </>
      )}
    </tr>
  );
}
