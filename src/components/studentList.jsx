export default function studentList(){
    const sampleStudents = [
        { id: 1, name: 'Nguyễn Văn A', class: '12A1', age: 18 },
        { id: 2, name: 'Trần Thị B', class: '12A2', age: 17 },
        { id: 3, name: 'Lê Văn C', class: '12A1', age: 18 },
      ];

      return (
    <div className="container">
      <h1>Danh sách sinh viên</h1>
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
          {sampleStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.age}</td>
              <td>
                <button>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}