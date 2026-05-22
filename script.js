const form = document.getElementById("studentForm");

const studentList = document.getElementById("studentList");

/* ADD STUDENT */

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        course: document.getElementById("course").value,

        mobile: document.getElementById("mobile").value

    };

    await fetch("http://localhost:3000/students", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    });

    alert("Student Added Successfully");

    loadStudents();

});

/* LOAD STUDENTS */

async function loadStudents(){

    const response = await fetch("http://localhost:3000/students");

    const students = await response.json();

    studentList.innerHTML = "";

    students.forEach((student) => {

        studentList.innerHTML += `

            <div class="student-card">

                <h3>${student.name}</h3>

                <p>Email: ${student.email}</p>

                <p>Course: ${student.course}</p>

                <p>Mobile: ${student.mobile}</p>

            </div>

        `;

    });

}

loadStudents();