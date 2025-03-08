const express = require('express');
const app = express();
const PORT = 3000;
const courses = require('./data');

app.use(express.urlencoded({ extended: true}))
app.use(express.json({ extended: false }));
app.use(express.static('./views'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    return res.render('index', { courses, searchTerm: '' });
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    const course = courses.find(course => course.id === +id);
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return res.redirect('/');
});

app.post('/add', (req, res) => {
    const { name, soTiet, soTinChi } = req.body;
    const id = courses.length + 1;
    courses.push({ id, name, soTiet, soTinChi });
    console.log(courses)
    return res.redirect('/');
});

app.get('/search', (req, res) => {
    const searchTerm = req.query.search ? req.query.search.toLowerCase() : '';
    const filteredCourses = courses.filter(course => 
        course.name.toLowerCase().includes(searchTerm)
    );
    return res.render('index', { courses: filteredCourses, searchTerm });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});