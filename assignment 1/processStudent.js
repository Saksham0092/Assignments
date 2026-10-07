const fs = require("fs");

function readData(callback) {
    fs.readFile("student.json", "utf8", (err, data) => {
        if (err) {
            callback(err);
            return;
        }

        const student = JSON.parse(data);
        callback(null, student);
    });
}

function calculatePercentage(student, callback) {
    const total = student.marks.reduce((sum, mark) => sum + mark, 0);

    student.percentage = total / student.marks.length;

    callback(null, student);
}

function findGrade(student, callback) {
    if (student.percentage >= 90) {
        student.grade = "A+";
    } else if (student.percentage >= 80) {
        student.grade = "A";
    } else if (student.percentage >= 70) {
        student.grade = "B";
    } else if (student.percentage >= 60) {
        student.grade = "C";
    } else if (student.percentage >= 50) {
        student.grade = "D";
    } else {
        student.grade = "F";
    }

    callback(null, student);
}

function saveResult(student, callback) {
    fs.writeFile(
        "result.json",
        JSON.stringify(student, null, 2),
        (err) => {
            if (err) {
                callback(err);
                return;
            }

            callback(null, "Result saved successfully!");
        }
    );
}

function processStudent() {
    readData((err, student) => {
        if (err) {
            return console.log(err);
        }

        calculatePercentage(student, (err, student) => {
            if (err) {
                return console.log(err);
            }

            findGrade(student, (err, student) => {
                if (err) {
                    return console.log(err);
                }

                saveResult(student, (err, message) => {
                    if (err) {
                        return console.log(err);
                    }

                    console.log(message);
                });
            });
        });
    });
}

processStudent();
