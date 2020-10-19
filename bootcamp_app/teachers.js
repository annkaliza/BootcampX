const {Pool} = require ('pg');
const args = process.argv;

const pool = new Pool({
user: 'vagrant',
password: '123',
host: 'localhost',
database: 'bootcampx'
});

pool.query(
{text: `
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM teachers   
JOIN assistance_requests ON assistance_requests.teacher_id = teachers.id
JOIN students ON assistance_requests.student_id = students.id
JOIN cohorts ON cohorts.id = students.cohort_id
WHERE cohorts.name LIKE $1
ORDER BY teachers.name;
`,
values: [`%${args[2]}%`]
})
.then(res => {
  res.rows.forEach(user => console.log(user.cohort, user.teacher))
})
.catch(err =>
  console.error('query error', err.stack));